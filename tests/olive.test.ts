import { test } from "node:test";
import assert from "node:assert/strict";
import { createOliveClient } from "../src/lib/olive.ts";

test("public course query sends Olive locale without session credentials", async () => {
  const controller = new AbortController();
  const client = createOliveClient({
    endpoint: "/api/olive/graphql",
    fetch: async (url, init) => {
      assert.equal(url, "/api/olive/graphql");
      assert.equal(init?.credentials, "omit");
      assert.equal(init?.signal, controller.signal);
      const headers = new Headers(init?.headers);
      assert.equal(headers.get("x-locale"), "ko");
      assert.equal(headers.has("Authorization"), false);
      const body = JSON.parse(String(init?.body));
      assert.equal(body.operationName, "HomePublicCourses");
      assert.match(body.query, /getCourses/);
      assert.doesNotMatch(
        body.query,
        /\b(tasks|content|hint|templateAnswers)\b/,
      );
      return Response.json({
        data: {
          getCourses: [
            {
              id: 4,
              title: "과정",
              path: "course",
              description: "소개",
              thumbnailUrl: null,
            },
          ],
        },
      });
    },
  });
  const courses = await client.getPublicCourses({ signal: controller.signal });
  assert.equal(courses[0].id, "4");
  assert.equal(courses[0].title, "과정");
});

test("supports English and a successful empty course list", async () => {
  const client = createOliveClient({
    endpoint: "/api/olive/graphql",
    locale: "en",
    fetch: async (_, init) => {
      assert.equal(new Headers(init?.headers).get("x-locale"), "en");
      return Response.json({ data: { getCourses: [] } });
    },
  });
  assert.deepEqual(await client.getPublicCourses(), []);
});
