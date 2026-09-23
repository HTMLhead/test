# 코드스쿼드 AX 메인 시안 — Design QA

검토일: 2026-09-22

## 비교 범위

Dala를 참고한 코드스쿼드 홈페이지 개편이다. 사용자 승인에 따라 이미지 시안 생성 단계를 생략하고 웹·Canvas로 직접 구현했다. 원본의 문구·사진·그래픽을 픽셀 단위로 복제하는 작업은 아니다. 검은 배경, 큰 제목, 바이올렛 행동 버튼, 스크롤에 따라 모이는 입자라는 디자인 언어가 코드스쿼드의 교육 철학과 함께 전달되는지를 확인했다.

- Source visual truth: `artifacts/dala-reference/desktop-start.png` (1440×1000), `artifacts/dala-reference/mobile-start.png` (390×844).
- Source scroll evidence: `artifacts/dala-reference/desktop-26.png`, `desktop-58.png` 등.
- Implementation: `http://127.0.0.1:4322/ax-home/index.html`.
- Implementation screenshots: `artifacts/ax-home/desktop.png` (1440×1000), `mobile.png` (390×844), `tablet.png` (834×1000), `narrow.png` (320×740).
- CSS viewport와 PNG 픽셀 크기 동일, deviceScaleFactor=1. 합성 시 리사이즈하지 않았다.
- State: 첫 화면 / 기본 미션 / 스크롤 장면. 구현의 첫 화면은 재현 가능한 캡처를 위해 배경 자동 회전만 정지한 상태다. 원본은 라이브 애니메이션의 캡처 시점이다.
- Full-view comparison: `artifacts/ax-home/comparison-desktop-final.png` (2880×1000), `comparison-mobile-final.png` (780×844). 왼쪽은 원본, 오른쪽은 구현.
- Focused evidence: `artifacts/ax-home/detail-hero-copy.png`, `detail-mission.png`. 글자와 인터랙션 영역을 원본 픽셀 밀도로 확인했다. 미션은 코드스쿼드 고유 요구사항이므로 원본에 대응하는 미션 화면은 없다.
- Section evidence: `artifacts/ax-home/desktop-approach.png`, `desktop-together.png`, `desktop-mission.png`, `desktop-programs.png`, `desktop-values.png`, `desktop-contact.png` 및 모바일 대응 파일.

## 비교 이력과 수정

1. **[P2, 해결] 입자 형태가 약해 핵심 표현이 드러나지 않음.**
   - Evidence: `comparison-desktop-v1.png`, `comparison-mobile-v1.png`.
   - 입자의 밀도와 대비가 낮고 구도가 크게 잘려 움직임이 단순한 배경 점처럼 보였다.
   - Fix: 데스크톱 2,240개·모바일 560개로 조정, 고리 형태의 구조와 가까운 점 사이 연결, 크기·중심·기울기·색 대비 조정. 모바일은 본문 뒤를 어둡게 하면서 하단에 형태를 배치했다.
   - Post-fix: `comparison-desktop-v2.png`, 최종 비교 이미지에서 고리와 구의 형태가 명확해졌다.
2. **[P2, 해결] 전환 중 그래픽의 밝기 적용 위치가 갑자기 바뀜.**
   - 왼쪽 장면으로 이동하는 동안 이전 장면의 본문 보호 영역을 적용해 구형 그래픽이 불필요하게 어두웠다.
   - Fix: 두 장면의 밝기 마스크를 스크롤 진행에 맞춰 보간.
   - Post-fix: `desktop-approach.png`에서 왼쪽 입자는 보이고 오른쪽 본문 가독성은 유지된다.
3. **[P2, 해결] 고정 모션 버튼과 첫 화면의 보조 문구가 겹침.**
   - Evidence: `comparison-mobile-v2.png`의 하단.
   - Fix: 데스크톱 보조 문구에 버튼 여유 공간을 추가하고 모바일에서는 중복 영문 보조 문구를 생략했다. 360px 이하에서는 장식 캡션도 생략했다.
   - Post-fix: `comparison-mobile-final.png`, `narrow.png`.
4. **[P2, 해결] 미션 본문과 답안의 모바일 글자가 작음.**
   - Fix: 회의록·답안·미션 안내는 14px, 프롬프트·피드백은 13px로 조정. 입력 관련 안내는 12px로 조정.
   - Post-fix: `detail-mission.png`와 최종 모바일 캡처. 수정 후 전체 12개 E2E 검증 재통과.

## 필수 검토 표면

- **서체·타이포그래피:** Pretendard 로컬 서체가 로딩됨을 확인. 원본의 얇고 큰 영문 제목을 한국어에 맞는 크기와 줄바꿈으로 적용했다. 모바일 첫 제목과 메뉴에 잘림 없음. 미션의 핵심 읽기 영역은 별도 확대 확인.
- **간격·레이아웃:** 넓은 첫 화면과 교차 배치된 이야기 구간, 정보를 찾기 쉬운 교육 목록을 확인. 데스크톱·태블릿·모바일·320px에서 수평 넘침 없음. 미션이나 문의 폼에 겹치는 고정 제어 없음.
- **색상·토큰:** 어두운 기본면, 흰색 제목, 라일락 강조, 바이올렛 주 행동을 일관되게 사용. 피드백은 색상과 설명 문장을 함께 제공. 모든 대비에 대한 WCAG 인증을 의미하지는 않는다.
- **이미지·그래픽 품질:** 기존 회사 로고는 원본 SVG를 재사용. 사용자에게 승인받은 독자적 Canvas 입자 표현을 사용했으며 원본의 3D 자산을 복제하지 않았다. 데스크톱과 모바일의 밀도 차이는 성능과 가독성을 위한 의도된 차이다. 이미지 로딩 오류 없음.
- **문구·콘텐츠:** AX 교육, 실습·프로젝트·협업·피드백·현업 적용과 세 가지 가치를 반영했다. 기관 협업은 사용자가 제공한 사실에 한정했다. 미션의 가상 데이터·AI 미연결 상태와 문의 메일 초안 동작을 안내한다.

## 동작 검증

Playwright 전용 Headless Chromium으로 3개 뷰포트에서 12개 테스트 통과.

- 미리보기 주소 두 변형에서 실제 HTML로 이동.
- 화면 렌더링, 이미지 오류 및 가로 넘침 확인.
- 미션 원문 → 오답 두 종류 → 원문 재확인 → 정답 → 프롬프트 복사 → 재시작.
- 미션 진행 후 제목 초점 이동.
- 모바일 메뉴 열기·Escape 닫기·초점 복귀·메뉴 링크 이동.
- 기관 문의 대상 자동 선택과 입력.
- prefers-reduced-motion 반영, 모션 정지 시 Canvas 이미지 유지, 재생 시 이미지 변화.
- 캡처 과정의 런타임 오류: 0. 초기 페이지 콘솔 오류 검사 통과.
- 320px 추가 화면 검사에서도 가로 넘침과 런타임 오류 없음.

## 남은 범위

실제 AI API 연결, 신청 정보 저장, 공개 배포는 이번 시안 범위 밖이다. 실제 iOS Safari·Android 기기와 보조공학 도구를 이용한 검증은 하지 않았다. 통제된 프로토타입 검증이며 실제 사용자 연구나 접근성 인증은 아니다.

## Implementation checklist

- [x] 레퍼런스 실제 캡처와 동일 뷰포트 비교
- [x] 교육 철학과 AX 미션 구현
- [x] 모바일·모션 제어·키보드 기본 흐름 확인
- [x] P2 시각 문제 수정 후 재캡처
- [x] 빌드 통과 및 12개 E2E 테스트 통과
- [x] 최종 화면과 기능 검증 기록 저장

추가 수정이 필요한 P0/P1/P2 발견 없음.

final result: passed
