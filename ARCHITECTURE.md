# React SPA 구조

## 렌더링과 라우팅

`main.tsx`에서 React StrictMode로 앱을 시작합니다. `App.tsx`의 React Router가 URL을 관리하고 공통 Header/Footer 사이에 페이지를 렌더링합니다. React Router의 ScrollRestoration으로 히스토리별 스크롤을 복원합니다. 이동 후 본문에 포커스를 전달하되 스크롤은 변경하지 않습니다.

각 페이지의 Layout은 문서 제목과 SEO 메타데이터를 갱신합니다. 정적 HTML을 서버에서 생성하던 Astro의 SSR/SSG 구조와 달리, 화면 콘텐츠는 브라우저에서 렌더링됩니다.

## 디자인 보존

원본 Astro 컴포넌트의 마크업을 JSX로 변환하고 각 스타일을 CSS Modules로 옮겼습니다. `cx`는 원본 클래스와 해당 모듈의 클래스를 함께 지정합니다. 원본 클래스는 전역 타이포그래피 및 부모의 `:global(...)` 선택자를 유지하고 모듈 클래스는 섹션 간 스타일 충돌을 방지합니다.

원본에 이미 있던 React 캐러셀과 연혁은 재사용합니다. 헤더 메뉴와 강사진 탭은 React 상태로 구현해 페이지 재진입 시 이벤트 중복 등록을 피합니다. 탭은 방향키, Home, End 탐색을 지원합니다.

정적 이미지 import는 Vite URL입니다. Image 컴포넌트는 `imageSizes.ts`의 원본 크기를 사용해 이미지가 로드되기 전에도 비율을 예약합니다. 이미지를 교체할 때 해당 크기를 함께 갱신합니다.

## 데이터 경계

홈페이지의 소개 콘텐츠는 원본의 정적 데이터를 사용합니다. `/olive`의 `OliveCourses`는 Olive 공개 API의 과정 목록을 조회해 최대 3개 카드를 표시합니다. 로딩·오류·빈 목록 상태를 구분하고, 15초 요청 제한과 페이지 이탈 시 취소를 적용합니다.

`createGraphQLClient`는 fetch를 감싼 함수이며 React에 의존하지 않습니다. `olive.ts`가 필수 `x-locale` 헤더와 비로그인 요청(`credentials: "omit"`)을 설정하고, 공개 과정 목록 조회 함수를 제공합니다. `api.ts`는 브라우저용 엔드포인트를 설정합니다. 화면에 조회를 적용할 때는 로딩·실패·성공 상태를 구분하고 언마운트 시 AbortController로 요청을 취소합니다.

요청은 `/api/olive/graphql` → Olive의 `/api/graphql` → DB 순으로 전달됩니다. 개발·미리보기에서는 Vite 프록시, Netlify 배포에서는 `_redirects`가 전달을 담당합니다. 다른 호스팅은 별도 프록시 설정이 필요합니다. 기본 대상은 운영 Olive이고 `OLIVE_API_ORIGIN`으로 개발 프록시 대상을 변경할 수 있습니다.

실제 미션 본문은 공개 범위가 정해지지 않아 조회하지 않습니다. 현재 `getPublicCourses`는 기존 공개 API의 과정 소개 필드만 요청합니다. 공개 본문을 추가할 때는 Olive 서버가 허용된 콘텐츠를 선별해야 하며, 홈페이지에서만 필터링하지 않습니다.

## 검증

- `npm run build`: 타입 검사와 프로덕션 번들
- `npm test`: GraphQL 응답·오류·인증·취소 처리와 Olive 비로그인 요청 계약
- `npm run check:olive`: 개발 서버 프록시를 통한 실제 Olive 공개 과정 조회
- `npm run test:e2e`: 3개 반응형 크기의 7개 경로, SPA 이동과 히스토리, 메뉴, 강사진 탭, 연혁, 캐러셀, FAQ
- `scripts/compare-design.mjs`: 원본/React 전체 페이지 스크린샷 및 주요 영역 좌표 비교
