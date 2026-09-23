# 코드스쿼드 React 홈페이지

`../home`의 디자인과 콘텐츠를 React + TypeScript로 옮긴 SPA입니다. Vite로 실행하고 React Router로 내부 페이지를 전환합니다. Apollo Client는 사용하지 않습니다.

## 실행

Node.js 22.12 이상이 필요합니다.

```sh
npm install
npm run dev
```

기본 주소: http://127.0.0.1:4322 (`package.json`의 개발 서버 설정)

```sh
npm run build     # TypeScript 검사 + dist 생성
npm run preview   # 프로덕션 빌드 확인
npm test          # GraphQL 요청 모듈 테스트
```

브라우저 테스트:

```sh
npx playwright install chromium
npm run test:e2e
```

기존 Chromium 실행 파일을 사용하려면 `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`를 지정합니다. 테스트는 모바일 390px, 태블릿 834px, 데스크톱 1440px에서 실행됩니다. 테스트 주소는 `package.json`의 개발 포트를 따르며 `PLAYWRIGHT_BASE_URL`로 변경할 수 있습니다.

## 화면

| 주소               | 화면           |
| ------------------ | -------------- |
| `/`                | 홈             |
| `/masters`         | 마스터즈       |
| `/olive`           | 함께 배우는 AI |
| `/partners`        | LC 기업 교육   |
| `/learning-method` | 교육과 학습법  |
| `/about`           | 회사 소개      |
| 그 외              | 404 안내       |

이미지, Pretendard 폰트, 디자인 토큰, 반응형 배치를 원본에서 가져왔습니다. 모바일 메뉴, 헤더 스크롤 상태, 강사진 탭, 교육 연혁, 캐러셀과 FAQ를 유지합니다. 내부 링크는 React Router를 사용하며 뒤로 가기와 스크롤 복원을 지원합니다.

## GraphQL 연결

Olive 공개 GraphQL API에 연결되어 있습니다. 기본 요청 경로는 `/api/olive/graphql`이고, Vite 개발·미리보기 서버가 `https://olive.codesquad.kr/api/graphql`로 프록시합니다. `x-locale: ko`를 보내며 로그인 쿠키는 전송하지 않습니다. 기본 설정으로 실행할 때 환경 변수 파일은 필요하지 않습니다.

개발 서버를 실행한 뒤 다른 터미널에서 실제 연결을 확인합니다. 운영 Olive에 공개 과정 목록 조회 요청만 보냅니다.

```sh
npm run check:olive
```

개발 포트가 다르면 `OLIVE_CHECK_ENDPOINT=http://127.0.0.1:포트/api/olive/graphql`을 지정합니다.

로컬 Olive를 사용하려면 `.env.example`을 `.env.local`로 복사하고 `OLIVE_API_ORIGIN=http://127.0.0.1:3001`로 변경한 뒤 개발 서버를 다시 시작합니다. Olive 서버는 별도로 실행해야 합니다. `OLIVE_API_ORIGIN`은 개발·미리보기 프록시 설정이며 브라우저에 노출되는 환경 변수가 아닙니다.

화면에서 사용할 조회 함수:

```ts
import { getPublicCourses } from "@/lib/api";

const courses = await getPublicCourses({
  signal: abortController.signal,
});
```

`src/lib/olive.ts`는 실제 Olive 스키마의 `getCourses`로 공개 과정의 ID, 제목, 경로, 설명, 썸네일을 조회합니다. 영어 조회가 필요하면 `createOliveClient({ endpoint, locale: "en" })`을 사용합니다. `/olive` 페이지는 첫 소개 영역 아래에 API 응답 순서대로 최대 3개 과정을 표시하며, 카드를 누르면 Olive의 해당 과정으로 이동합니다. 조회 실패 시 다시 불러오기, 빈 목록 안내, 썸네일 대체 표시를 지원합니다.

학습 자료·미션 본문은 아직 조회하지 않습니다. Olive에 명시적으로 공개할 콘텐츠를 지정하는 기준과 조회 API를 마련한 뒤 추가해야 합니다. 공개 과정에 속한다는 사실이나 `locked: false`만으로 본문 공개를 판단하지 않습니다. 이 클라이언트와 개발 프록시는 서버의 공개 범위 검사를 대신하지 않습니다.

`src/lib/graphql.ts`는 HTTP 오류, HTTP 200에 포함된 GraphQL 오류, 잘못된 응답을 구분합니다. 부분 성공도 기본적으로 오류로 처리하며 `GraphQLRequestError.partialData`로 부분 데이터를 확인할 수 있습니다. 요청 취소 신호를 전달할 수 있고 mutation을 자동 재시도하지 않습니다.

`VITE_GRAPHQL_ENDPOINT`로 브라우저가 호출할 주소를 바꿀 수 있습니다. 다른 도메인을 직접 지정하면 대상 서버가 CORS를 허용해야 하므로 같은 출처의 프록시 사용을 권장합니다. `VITE_` 환경 변수에 DB 접속 정보나 서버 비밀키를 넣지 않습니다.

## 배포

`npm run build` 결과인 `dist`를 정적 호스팅에 배포합니다. `/about` 같은 경로로 직접 접속하거나 새로고침해도 앱이 열리도록 **존재하지 않는 파일 요청을 `/index.html`로 연결하는 SPA fallback**이 필요합니다. Netlify용 `public/_redirects`가 포함되어 있습니다. 다른 호스팅에서는 같은 rewrite를 설정합니다.

Netlify용 `_redirects`에는 SPA fallback보다 먼저 `/api/olive/graphql`을 운영 Olive의 `/api/graphql`로 전달하는 프록시 규칙도 포함되어 있습니다. 다른 호스팅에서는 이 경로의 POST 본문과 `Content-Type`, `Accept`, `x-locale` 헤더를 전달하는 프록시를 별도로 설정해야 합니다. Vite 프록시는 정적 빌드에 포함되지 않습니다. 운영 API 주소가 바뀌면 `_redirects` 또는 호스팅 프록시도 함께 변경합니다.

이 버전은 클라이언트 렌더링입니다. 페이지 이동 시 제목·description·canonical·OG 메타데이터를 갱신하지만, JavaScript를 실행하지 않는 크롤러와 링크 미리보기는 초기 HTML만 읽을 수 있습니다. 원본 Astro와 동일한 페이지별 초기 HTML이 필요하면 사전 렌더링 또는 SSR을 추가해야 합니다. 없는 경로의 화면은 404 안내를 표시하지만 SPA fallback의 HTTP 상태는 일반적으로 200입니다.

`VITE_SITE_URL`은 canonical 기준 주소입니다. Google Analytics는 `VITE_GA_MEASUREMENT_ID`가 설정된 경우에만 로드하고 SPA 페이지 이동을 기록합니다.

## 구조

- `src/pages`: 페이지 조합
- `src/components/pageComponent`: 원본 섹션을 변환한 React 컴포넌트
- `src/components/ui`: 버튼, 태그, 이미지, 내부/외부 링크
- `src/styles`: 공통 색상·폰트·타이포그래피
- `*.module.css`: 컴포넌트별로 분리한 원본 스타일
- `src/data`: 기존 콘텐츠, SEO, 이미지 크기
- `src/lib`: GraphQL 요청, 스타일 유틸리티, 페이지뷰 기록
- `tests`: 요청 모듈 및 SPA 브라우저 테스트

원본과의 시각 비교는 원본 Astro를 4324번 포트에 별도로 실행한 뒤 `REACT_PORT=4322 node scripts/compare-design.mjs`로 수행할 수 있습니다. 결과는 `output/design-comparison`에 저장됩니다.
