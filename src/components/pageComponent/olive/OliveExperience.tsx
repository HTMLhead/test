import Button from "@/components/ui/Button";
import { links } from "@/data/home";
import styles from "./OliveExperience.module.css";

export default function OliveExperience() {
  return (
    <section
      id="ai-experience"
      className={styles.section}
      aria-labelledby="experience-heading"
    >
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <h2 id="experience-heading">함께 시작해요</h2>
          <p>
            AI를 써 보고 싶었지만 어디서부터 시작할지 몰라 망설이셨나요? 괜찮아요,
            처음엔 누구나 그렇습니다. 평소 하시던 일 하나를 골라 원리부터 차근차근
            함께 짚어 드릴게요. 직접 요청을 써 보고 다듬다 보면, 어느새 AI를
            내 일에 맞게 능숙하게 활용하고 계실 거예요.
          </p>
          <Button
            label="체험해보기"
            href={links.aiExperience}
            status="accent"
            icon="right"
          />
        </div>
        <div className={styles.path}>
          <ol>
            <li>
              <span>01</span>
              <div>
                <h3>원리 이해하기</h3>
                <p>같은 질문도 맥락에 따라 달라지는 이유를 알아봅니다.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>내 요청 만들기</h3>
                <p>하고 싶은 일과 필요한 정보를 한 문장씩 담아봅니다.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>이어서 다듬기</h3>
                <p>길이와 말투를 바꾸는 후속 요청을 연습합니다.</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
