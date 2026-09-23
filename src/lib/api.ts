import { createOliveClient } from "./olive";

export const { request: graphqlRequest, getPublicCourses } = createOliveClient({
  endpoint: import.meta.env.VITE_GRAPHQL_ENDPOINT || "/api/olive/graphql",
});
