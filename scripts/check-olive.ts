import { createOliveClient } from "../src/lib/olive.ts";

// Start npm run dev first. Override the URL when using another local port.
const endpoint =
  process.env.OLIVE_CHECK_ENDPOINT || "http://127.0.0.1:4322/api/olive/graphql";

try {
  const client = createOliveClient({ endpoint });
  const courses = await client.getPublicCourses({
    signal: AbortSignal.timeout(20_000),
  });
  console.log(`Olive 비로그인 연결 성공: 공개 과정 ${courses.length}개`);
  for (const course of courses) {
    console.log(`- ${course.title} (${course.path})`);
  }
} catch (error) {
  console.error(
    "Olive 연결 실패. 개발 서버와 OLIVE_API_ORIGIN 설정을 확인해 주세요.",
  );
  console.error(error instanceof Error ? error.message : "알 수 없는 오류");
  process.exitCode = 1;
}
