import { createGraphQLClient } from "./graphql.ts";

// Only fields already exposed by Olive's public course list are requested.
// Mission bodies need a separate, explicit publication contract on Olive.
const PUBLIC_COURSES_QUERY = `
  query HomePublicCourses {
    getCourses {
      id
      title
      path
      description
      thumbnailUrl
    }
  }
`;

export type PublicCourse = {
  id: string;
  title: string;
  path: string;
  description: string;
  thumbnailUrl: string | null;
};

export function createOliveClient(options: {
  endpoint: string;
  locale?: "ko" | "en";
  fetch?: typeof fetch;
}) {
  const request = createGraphQLClient({
    endpoint: options.endpoint,
    headers: { "x-locale": options.locale ?? "ko" },
    credentials: "omit",
    fetch: options.fetch,
  });

  return {
    request,
    async getPublicCourses(options: { signal?: AbortSignal } = {}) {
      const data = await request<{
        getCourses: Array<Omit<PublicCourse, "id"> & { id: string | number }>;
      }>(PUBLIC_COURSES_QUERY, undefined, {
        ...options,
        operationName: "HomePublicCourses",
      });
      // The deployed Olive endpoint currently returns numeric IDs.
      return data.getCourses.map((course): PublicCourse => ({
        ...course,
        id: String(course.id),
      }));
    },
  };
}
