import AppLink from "@/components/ui/AppLink";
import { cx } from "@/lib/styles";
import { links } from "@/data/home";
import styles from "./Footer.module.css";
export default function Footer() {
  return (
    <>
      <footer className={cx(styles, "footer typo-body-xs")}>
        <div className={cx(styles, "container footer-inner")}>
          <div className={cx(styles, "company")}>
            <strong>코드스쿼드</strong>
            <p>대표자: 김정</p>
            <p>
              사업자등록번호: 676-88-00504 | 통신판매신고: 제
              2017-서울강남-04281호
            </p>
            <p>
              주소: 서울특별시 강남구 강남대로62길 23 4층 | 전화: 070-4117-1005
            </p>
            <p>
              대표 이메일:{" "}
              <AppLink href={links.email}>yoda@codesquad.kr</AppLink>
            </p>
            <p>Copyright ⓒ 2026 코드스쿼드. All rights reserved</p>
            {/* <a class="refund" href={links.refund}>환불규정</a> */}
          </div>
          <nav aria-label="푸터 메뉴">
            {/* <div>
    <strong>코드스쿼드</strong>
    <a href={links.teamCulture}>팀 문화</a>
    <a href={links.recruit}>채용</a>
    </div> */}
            <div>
              <strong>교육 과정</strong>
              <AppLink href={links.masters}>마스터즈</AppLink>
              <AppLink href={links.olive}>함께 배우는 AI</AppLink>
              <AppLink href={links.partners}>LC - Learning Consulting</AppLink>
            </div>
            {/* <div>
    <strong>자주 묻는 질문</strong>
    <a href={links.faq}>FAQ</a>
    </div> */}
            <div>
              <strong>미디어</strong>
              <AppLink href={links.blog} target="_blank" rel="noreferrer">
                블로그
              </AppLink>
              <AppLink href={links.youtube} target="_blank" rel="noreferrer">
                유튜브
              </AppLink>
              <AppLink href={links.facebook} target="_blank" rel="noreferrer">
                페이스북
              </AppLink>
              <AppLink href={links.kakao} target="_blank" rel="noreferrer">
                카카오톡 채널
              </AppLink>
            </div>
          </nav>
        </div>
      </footer>
    </>
  );
}
