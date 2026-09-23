export type GraphQLErrorDetail = {
  message: string;
  path?: Array<string | number>;
  extensions?: Record<string, unknown>;
};

export class GraphQLRequestError extends Error {
  readonly status: number;
  readonly errors: GraphQLErrorDetail[];
  readonly partialData: unknown;

  constructor(
    message: string,
    status: number,
    errors: GraphQLErrorDetail[] = [],
    partialData?: unknown,
  ) {
    super(message);
    this.name = "GraphQLRequestError";
    this.status = status;
    this.errors = errors;
    this.partialData = partialData;
  }
}

type ClientOptions = {
  endpoint: string;
  headers?: HeadersInit | (() => HeadersInit | Promise<HeadersInit>);
  credentials?: RequestCredentials;
  fetch?: typeof fetch;
};

type RequestOptions = {
  signal?: AbortSignal;
  operationName?: string;
};

// No retries by default: blindly replaying a mutation may duplicate an action.
export function createGraphQLClient(options: ClientOptions) {
  return async function request<
    TData,
    TVariables extends Record<string, unknown> = Record<string, unknown>,
  >(
    query: string,
    variables?: TVariables,
    requestOptions: RequestOptions = {},
  ): Promise<TData> {
    if (!options.endpoint)
      throw new Error("VITE_GRAPHQL_ENDPOINT를 설정해 주세요.");
    const headers = new Headers(
      typeof options.headers === "function"
        ? await options.headers()
        : options.headers,
    );
    headers.set("Content-Type", "application/json");
    headers.set(
      "Accept",
      "application/graphql-response+json, application/json",
    );
    const response = await (options.fetch ?? globalThis.fetch)(
      options.endpoint,
      {
        method: "POST",
        headers,
        credentials: options.credentials ?? "same-origin",
        signal: requestOptions.signal,
        body: JSON.stringify({
          query,
          variables,
          operationName: requestOptions.operationName,
        }),
      },
    );
    let result: { data?: TData; errors?: GraphQLErrorDetail[] };
    try {
      result = await response.json();
    } catch {
      throw new GraphQLRequestError(
        "서버가 JSON 응답을 반환하지 않았습니다.",
        response.status,
      );
    }
    if (!result || typeof result !== "object") {
      throw new GraphQLRequestError(
        "올바른 GraphQL 응답이 아닙니다.",
        response.status,
      );
    }
    if (!response.ok || result.errors?.length) {
      throw new GraphQLRequestError(
        result.errors?.map((error) => error.message).join("\n") ||
          `HTTP ${response.status}`,
        response.status,
        result.errors,
        result.data,
      );
    }
    if (!("data" in result))
      throw new GraphQLRequestError("응답에 data가 없습니다.", response.status);
    return result.data as TData;
  };
}
