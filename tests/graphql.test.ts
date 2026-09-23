import { test } from "node:test";
import assert from "node:assert/strict";
import {
  createGraphQLClient,
  GraphQLRequestError,
} from "../src/lib/graphql.ts";

test("sends variables, dynamic auth and cancellation signal", async () => {
  const controller = new AbortController();
  let token = "first";
  const request = createGraphQLClient({
    endpoint: "https://example.test/graphql",
    headers: () => ({ Authorization: `Bearer ${token}` }),
    fetch: async (url, init) => {
      assert.equal(url, "https://example.test/graphql");
      assert.equal(init?.method, "POST");
      assert.equal(
        new Headers(init?.headers).get("Authorization"),
        "Bearer second",
      );
      assert.equal(init?.signal, controller.signal);
      assert.deepEqual(JSON.parse(String(init?.body)), {
        query: "query Example($id: ID!) { item(id: $id) { id } }",
        variables: { id: "1" },
        operationName: "Example",
      });
      return Response.json({ data: { item: { id: "1" } } });
    },
  });
  token = "second";
  const result = await request(
    "query Example($id: ID!) { item(id: $id) { id } }",
    { id: "1" },
    { signal: controller.signal, operationName: "Example" },
  );
  assert.deepEqual(result, { item: { id: "1" } });
});

test("rejects GraphQL errors in HTTP 200 and preserves partial data", async () => {
  const request = createGraphQLClient({
    endpoint: "/graphql",
    fetch: async () =>
      Response.json({
        data: { item: null },
        errors: [{ message: "Forbidden", path: ["item"] }],
      }),
  });
  await assert.rejects(request("{ item { id } }"), (error) => {
    assert.ok(error instanceof GraphQLRequestError);
    assert.equal(error.status, 200);
    assert.deepEqual(error.partialData, { item: null });
    assert.equal(error.errors[0].message, "Forbidden");
    return true;
  });
});

test("rejects an HTTP failure", async () => {
  const request = createGraphQLClient({
    endpoint: "/graphql",
    fetch: async () =>
      Response.json({ errors: [{ message: "Unauthorized" }] }, { status: 401 }),
  });
  await assert.rejects(request("{ viewer { id } }"), {
    name: "GraphQLRequestError",
    status: 401,
  });
});

test("rejects non-JSON and malformed responses", async () => {
  for (const response of [
    new Response("Bad gateway", { status: 502 }),
    Response.json(null),
    Response.json({}),
  ]) {
    const request = createGraphQLClient({
      endpoint: "/graphql",
      fetch: async () => response,
    });
    await assert.rejects(request("{ viewer { id } }"), GraphQLRequestError);
  }
});

test("does not retry mutations after a network failure", async () => {
  let calls = 0;
  const request = createGraphQLClient({
    endpoint: "/graphql",
    fetch: async () => {
      calls++;
      throw new TypeError("Failed to fetch");
    },
  });
  await assert.rejects(request("mutation { apply { id } }"), TypeError);
  assert.equal(calls, 1);
});

test("passes abort errors through", async () => {
  const request = createGraphQLClient({
    endpoint: "/graphql",
    fetch: async () => {
      throw new DOMException("Aborted", "AbortError");
    },
  });
  await assert.rejects(request("{ viewer { id } }"), { name: "AbortError" });
});

test("requires explicit endpoint configuration", async () => {
  const request = createGraphQLClient({
    endpoint: "",
    fetch: async () => {
      throw new Error("must not fetch");
    },
  });
  await assert.rejects(request("{ viewer { id } }"), /VITE_GRAPHQL_ENDPOINT/);
});
