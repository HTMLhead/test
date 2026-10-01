import { useState, type ReactNode } from "react";
import Button from "@/components/ui/Button";
import { experienceOutcomes } from "@/data/experience";
import { MediaSlot, RefinementExample } from "./Interactions";
import PromptComposer, { ServicePicker } from "./PromptComposer";
import AiResponseJourney from "./AiResponseJourney";
import { useDraft } from "./useDraft";
import styles from "./index.module.css";

function Quiz({
  id,
  context,
  question,
  answers,
  correct,
  hint,
  explanation,
}: {
  id: string;
  context?: ReactNode;
  question: string;
  answers: string[];
  correct: number;
  hint: string;
  explanation: string;
}) {
  const [answer, setAnswer] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<number | null>(null);
  return (
    <div
      className={styles.quiz}
      role="group"
      aria-labelledby={`${id}-question`}
    >
      {context && <div className={styles.quizContext}>{context}</div>}
      <h3 id={`${id}-question`} className={styles.quizQuestion}>
        {question}
      </h3>
      <div className={styles.quizChoices}>
        {answers.map((text, index) => {
          const result =
            submitted === index
              ? index === correct
                ? "correct"
                : "incorrect"
              : undefined;
          return (
            <label
              key={text}
              className={
                result === "correct"
                  ? styles.correctChoice
                  : result === "incorrect"
                    ? styles.incorrectChoice
                    : undefined
              }
              data-result={result}
            >
              <input
                type="radio"
                name={id}
                checked={answer === index}
                onChange={() => {
                  setAnswer(index);
                  setSubmitted(null);
                }}
              />
              {text}
            </label>
          );
        })}
      </div>
      <div className={styles.quizActions}>
        <Button
          label="정답 확인하기"
          status={answer === null ? "disabled" : "accent"}
          onClick={() => setSubmitted(answer)}
        />
        <p
          role="status"
          className={`${styles.feedback} ${
            submitted === null
              ? ""
              : submitted === correct
                ? styles.correctFeedback
                : styles.incorrectFeedback
          }`}
        >
          {submitted === null
            ? "답을 하나 고르고 정답 확인하기를 눌러 보세요."
            : submitted === correct
              ? `맞아요. ${explanation}`
              : `다시 생각해 보세요. 힌트: ${hint}`}
        </p>
      </div>
    </div>
  );
}

function ReadMore({ links }: { links: [string, string][] }) {
  return (
    <p className={styles.readMore}>
      더 알고 싶다면:{" "}
      {links.map(([label, href], i) => (
        <span key={href}>
          {i > 0 && ", "}
          <a href={href} target="_blank" rel="noopener noreferrer">
            {label}
            <span className={styles.srOnly}> (새 탭)</span>
          </a>
        </span>
      ))}
    </p>
  );
}

const activities = [
  {
    title: "퀴즈 풀기",
    text: "배운 내용을 짧은 퀴즈로 확인하고, 틀리면 힌트를 보고 다시 풀어 봅니다.",
  },
  {
    title: "직접 요청하기",
    text: "예시 요청부터 내 고민까지, ChatGPT나 Claude에 질문하고 직접 답을 받아 봅니다.",
  },
  {
    title: "검토하기",
    text: "원하는 요구사항을 잘 수행했는지 확인하고 필요하다면 수정해서 다시 요청해봅니다.",
  },
  {
    title: "확인해보기",
    text: "코스를 마친 후 목표를 이루었는지 확인해봅니다.",
  },
];

export function StartTask() {
  return (
    <div className={styles.lesson}>
      <MediaSlot
        kind="video"
        title="이 코스에서 함께 해 볼 것"
        description="AI에 대한 간단한 지식과 해당 코스를 통해서 작업할 간단한 내용, 예시 내용 등.."
      />
      <section>
        <h2>대화형 AI 사용하기 코스에 오신걸 환영합니다</h2>
        <p>
          여러분은 이 코스에서 AI에 대한 간단한 지식을 익히고, 실제 업무 하나를
          AI와 함께 해결해 보게 됩니다.
          <br />
          읽기만 하는 코스가 아닙니다. 한 시간 동안 코스 곳곳에서 여러 활동들을
          진행하게 됩니다.
        </p>
        <ul className={styles.introActivities}>
          {activities.map((activity) => (
            <li key={activity.title}>
              <strong>{activity.title}</strong>
              <p>{activity.text}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>시작하기 전에 알아 두세요</h2>
        <ul className={styles.readingList}>
          <li>
            3단계부터 ChatGPT나 Claude에 실제로 요청을 보냅니다. 새 탭에 미리
            열어 두면 편해요.
          </li>
          <li>
            정답은 없어요. AI의 답이 예시와 달라도, 중간에 막혀도 괜찮습니다.
          </li>
        </ul>
        <p>
          자, 준비가 되었다면 다음 단계에서 AI가 무엇이고 대화형 AI와 어떻게
          대화할 수 있는지 가볍게 살펴봅니다.
        </p>
      </section>
    </div>
  );
}

const chatgptFeatures = [
  {
    title: "파일 올리기",
    text: "문서나 표, PDF를 올려 요약하거나 필요한 내용을 찾아 달라고 할 수 있어요.",
  },
  {
    title: "검색",
    text: "웹에서 최신 정보를 찾아 답에 반영해요.",
  },
  {
    title: "개인 맞춤 설정",
    text: "알려 둔 정보나 원하는 답변 방식을 기억해 다음 대화에 반영해요.",
  },
  {
    title: "이미지 만들기·고치기",
    text: "설명만으로 이미지를 만들거나, 올린 이미지를 원하는 대로 고쳐요.",
  },
  {
    title: "데이터 분석",
    text: "표 데이터를 정리하고 계산하거나, 그래프로 만들어 보여 줘요.",
  },
  {
    title: "코드 작성·분석",
    text: "코드를 작성하거나, 기존 코드에서 필요한 부분을 찾아 설명해 줘요.",
  },
  {
    title: "안전 기능",
    text: "문제가 될 수 있는 요청과 답변을 다루는 안전 장치가 함께 작동해요.",
  },
];

export function UnderstandingTask() {
  return (
    <div className={styles.lesson}>
      <section>
        <p>
          <strong>AI(인공지능)</strong>는 컴퓨터가 사람처럼 보고, 듣고, 말하거나
          판단하도록 만드는 기술을 두루 가리키는 가장 큰 범위의 말이에요. 영상
          추천, 얼굴 인식, 길 찾기, 자동 번역처럼 서로 다른 일을 하는 기술이
          모두 AI에 포함됩니다.
        </p>
        <p>
          <strong>LLM(대규모 언어 모델)</strong>은 그중에서 글과 대화를 다루도록
          만들어진 AI 모델의 한 종류예요. 아주 많은 글을 미리 살펴보며 단어와
          문장이 어떤 관계로 쓰이는지 학습합니다. 그래서 질문에 답하거나, 글을
          요약하거나, 초안을 만드는 일을 할 수 있어요.
        </p>
        <p>
          <strong>ChatGPT</strong>혹은 <strong>Claude</strong>등의 대화형 AI들은
          LLM을 바탕으로 만든 AI 서비스예요. 우리가 대화창에 요청을 입력하면
          LLM이 글을 만들고, AI서비스가 그 결과를 화면에 보여 줍니다. LLM이 글을
          다루는 ‘엔진’이라면, ChatGPT나 Claude는 그 엔진을 우리가 편하게 사용할
          수 있도록 만든 ‘서비스’라고 보면 되요.
        </p>
        <div
          className={styles.aiHierarchy}
          role="img"
          aria-label="AI 안에 LLM이 있고, LLM을 바탕으로 ChatGPT 같은 서비스가 만들어지는 포함 관계"
        >
          <div className={`${styles.aiLevel} ${styles.aiLevelOuter}`}>
            <div className={styles.aiLevelHeading}>
              <strong>AI</strong>
              <span>가장 큰 범위</span>
            </div>
            <p>보고, 듣고, 말하고, 판단하는 여러 기술</p>
            <div className={`${styles.aiLevel} ${styles.aiLevelMiddle}`}>
              <div className={styles.aiLevelHeading}>
                <strong>LLM</strong>
                <span>AI의 한 종류</span>
              </div>
              <p>글과 대화를 이해하고 만드는 언어 모델</p>
              <div className={`${styles.aiLevel} ${styles.aiLevelInner}`}>
                <div className={styles.aiLevelHeading}>
                  <strong>ChatGPT, Claude, Gemini...</strong>
                  <span>LLM을 활용한 대화형 AI 서비스</span>
                </div>
                <p>
                  LLM과 여러 기능을 대화로 편리하게 사용할 수 있게 만든 서비스
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h2>대화형 AI 서비스에 질문하면 어떤 일이 일어날까요?</h2>
        <p>
          질문을 입력하면 모델이 답변 전체를 한꺼번에 만드는 것은 아닙니다.
          다음에 올 가능성이 높은 단어나 구절을 예측하며 한 단계씩 답변을
          완성합니다.
        </p>
        <AiResponseJourney />
        <p>
          새로 만들어진 단어는 다음 단어를 예측할 때 참고하는 맥락에 포함됩니다.
          이렇게 작은 단계를 여러 번 반복하면서 하나의 완성된 답변을 만듭니다.
          이 과정은 검색이 아니라 예측이라고 설명할 수 있습니다. 모델이
          데이터베이스에 저장된 답변을 그대로 꺼내는 것이 아니라, 학습한 패턴과
          사용자의 지시, 대화의 맥락을 바탕으로 새로운 답변을 생성하기
          때문입니다.
        </p>
        <p>다음 단계에서는 직접 AI 서비스를 열어 첫 대화를 나눠 봅니다.</p>
      </section>
      <section className={styles.quizSection}>
        <h2>퀴즈로 확인하기</h2>
        <Quiz
          id="ai-introduction"
          question="ChatGPT에 대한 설명으로 가장 알맞은 것은 무엇인가요?"
          answers={[
            "모든 질문의 정답을 보장하는 사전이다.",
            "LLM을 바탕으로 요청에 맞는 답을 만들어 주는 AI 서비스다.",
            "내 질문을 받은 사람이 대신 답을 써 주는 서비스다.",
          ]}
          correct={1}
          hint="ChatGPT의 대화창 뒤에서 답변을 만드는 역할을 누가 맡는지 떠올려 보세요."
          explanation="ChatGPT는 대규모 언어 모델(LLM)을 바탕으로 만든 AI 서비스예요. 모델은 미리 학습한 내용과 우리가 보낸 요청을 보고 답을 만들지만, 그 답이 맞는지는 내가 확인해야 해요."
        />
        <ReadMore
          links={[
            [
              "OpenAI의 ChatGPT 사용 안내",
              "https://learn.chatgpt.com/docs/use-chatgpt",
            ],
          ]}
        />
      </section>
    </div>
  );
}

const firstConversation =
  "나는 대화형 AI를 처음 써봐.\n일상에서 해볼 만한 간단한 활용 예시를 세 가지 알려줘.\n각 예시마다 내가 그대로 입력할 수 있는 요청 문장도 써줘.";

export function ServicesTask() {
  const [draft, setDraft] = useDraft("first-conversation", {
    prompt: firstConversation,
  });
  return (
    <div className={styles.lesson}>
      <section>
        <ServicePicker />
        <p>
          둘 다 평소 말하듯 요청하면 됩니다. 처음에는 편한 서비스 하나면
          충분해요. 다른 AI 서비스나 기능은 써 보다가 필요해질 때 하나씩
          알아가도 늦지 않습니다.
        </p>
      </section>
      <section>
        <h2>첫 대화를 보내 보세요</h2>
        <p>
          예시를 그대로 보내도 되고, 조금 바꿔도 좋아요. 입력창 아래의 보내기
          버튼을 누르면 선택한 서비스의 새 탭에 요청을 담아 엽니다.
        </p>
        <PromptComposer
          label="나의 첫 대화"
          rows={5}
          value={draft.prompt}
          onChange={(prompt) => setDraft({ prompt })}
        />
        <p className={styles.exampleNote}>
          로그인 화면이 나타나면 로그인해 주세요. 요청이 입력되지 않았다면
          로그인 후 이 페이지에서 전송 버튼을 다시 눌러 보세요.
        </p>
        <Checklist
          storageKey="first-answer"
          items={["AI에게서 첫 답변을 받았어요."]}
        />
      </section>
      <section>
        <h2>이제 원하는 것을 물어볼 차례예요</h2>
        <p>
          첫 질문을 보내고 답변까지 받아 보았어요. 이제 예시를 따라 하는 데서 한
          걸음 더 나아가, 내가 실제로 궁금한 것이나 도움받고 싶은 일을 AI에게
          물어볼 차례입니다. 예를 들어볼까요?
        </p>
        <blockquote>간단한 저녁 메뉴를 추천해 줘.</blockquote>
        <p>
          위처럼 거창한 질문일 필요는 없어요. 오늘 먹을 메뉴, 읽고 있는 글에서
          이해되지 않는 부분, 작성하기 어려운 문장처럼 지금 나에게 필요한 것부터
          편하게 물어보세요.
        </p>
        <p>
          다음 단계에서는 원하는 답변에 더 가까워질 수 있도록 요청에 필요한
          정보를 더하고, 받은 답변을 다시 다듬는 방법을 자세히 알아봅니다. 직접
          요청을 작성하고 결과가 어떻게 달라지는지도 확인해 볼 거예요.
        </p>
        <ReadMore
          links={[
            [
              "OpenAI의 프롬프팅 안내",
              "https://learn.chatgpt.com/docs/prompting",
            ],
            ["ChatGPT", "https://learn.chatgpt.com/docs"],
            [
              "Gemini",
              "https://support.google.com/gemini/answer/17216260?hl=en",
            ],
            ["Claude Academy", "https://academy.claude.com/"],
          ]}
        />
      </section>
    </div>
  );
}

export function PracticeTask() {
  const [draft, setDraft] = useDraft("dinner-menu", {
    preference: "",
    conditions: "",
    budget: "",
    output: "",
    followup: "",
    before: "",
    after: "",
  });
  const asSentence = (value: string) => {
    const sentence = value.trim();
    if (!sentence) return "";
    return /[.!?。！？]$/.test(sentence) ? sentence : `${sentence}.`;
  };
  const dinnerPrompt = [
    "오늘 먹을 저녁 메뉴를 정하고 싶어요.",
    draft.preference,
    draft.conditions,
    draft.budget,
    draft.output,
  ]
    .map(asSentence)
    .filter(Boolean)
    .join(" ");
  return (
    <div className={styles.lesson}>
      <section>
        <h2>오늘 저녁 메뉴를 결정해 봅시다</h2>
        <p>
          “간단한 저녁 메뉴를 추천해 줘.”라고 물어도 AI는 답할 수 있어요. 하지만
          내 취향이나 상황을 모르면 지금 나에게 잘 맞는 메뉴를 고르기는
          어렵습니다. 원하는 답변에 영향을 주는 정보를 함께 알려주면 추천을 실제
          선택에 쓰기 쉬워져요.
        </p>
        <p>
          이렇게 대화형 AI서비스에 무엇을 알고 싶고, 만들고 싶고, 바꾸고 싶은지
          알려주는 방법을 프롬프팅이라고 합니다. 프롬프트는 질문일 수도, 지시일
          수도, 목표일 수도 있습니다. 특별한 명령어나 정해진 공식은 필요하지
          않습니다. 평소 쓰는 말로 시작해 답변을 확인하고, 후속 메시지로 결과를
          다듬어 볼수도 있어요.
        </p>
        <p>
          짧은 프롬프트만으로 충분할 때도 많지만 더 나에게 맞는 결과물을
          얻기위해 여러가지 정보를 추가할 수 있습니다.
          <ul className={styles.readingList}>
            <li>목표: 무엇을 해야 하나요?</li>
            <li>맥락: 어떤 정보나 자료가 도움이 되나요?</li>
            <li>결과물: 어떤 형식과 길이로, 얼마나 자세히 받고 싶나요?</li>
            <li>
              제약 조건: 무엇을 바꾸면 안 되나요? 무엇을 피하거나 실행 전에
              확인해야 하나요?
            </li>
          </ul>
          아래에서 간단한 저녁메뉴를 추천받기 위한 여러가지 정보를 추가하고
          대화형 AI에게 전달해봅시다.
        </p>
        <div className={styles.promptConditions}>
          <div className={styles.promptCondition}>
            <strong>목표</strong>
            <span>오늘 먹을 저녁 메뉴 정하기</span>
          </div>
          {(
            [
              {
                key: "conditions",
                label: "맥락",
                placeholder:
                  "예: 매콤한 한식을 좋아하고, 냉장고에 두부와 달걀이 있어요.",
              },
              {
                key: "budget",
                label: "결과물",
                placeholder:
                  "예: 메뉴 세 가지를 재료와 조리 시간까지 비교해 주세요.",
              },
              {
                key: "output",
                label: "제약 조건",
                placeholder:
                  "예: 1인분 기준 30분 안에, 재료비 10,000원 이내로 만들 수 있어야 해요.",
              },
            ] as const
          ).map((field) => (
            <label className={styles.promptCondition} key={field.key}>
              <strong>{field.label}</strong>
              <input
                type="text"
                maxLength={200}
                placeholder={field.placeholder}
                value={draft[field.key]}
                onChange={(event) =>
                  setDraft({ ...draft, [field.key]: event.target.value })
                }
              />
            </label>
          ))}
        </div>
        <PromptComposer label="완성된 요청" rows={7} value={dinnerPrompt} />
        <p className={styles.exampleNote}>
          모든 칸을 채우지 않아도 됩니다. 먼저 기본 요청을 보내 보고, 필요한
          정보를 하나씩 더해 답변이 어떻게 달라지는지 살펴보세요.
        </p>
      </section>
      <section id="refine">
        <h2>요청을 다듬어봅시다.</h2>
        <p>
          첫 요청이 완벽할 필요는 없어요. 받은 추천을 살펴본 뒤, 빠진 정보를
          더하거나 한눈에 볼 수 있도록 정리해달라고 한다거나, 달라진 상황과
          원하는 수정 방향을 같은 대화창에서 말하면 답변을 수정할 수 있습니다.
          메세지를 보냈던 창으로 이동해서 후속 요청을 보내보세요.
        </p>
        <RefinementExample />
        <p>
          후속 요청은 길게 쓰지 않아도 됩니다. 바꾸고 싶은 점 한두 가지만 분명히
          말하면 충분해요. 예를 들어 봅시다.
        </p>
        <ul className={styles.readingList}>
          <li>
            <strong>바꿀 것과 그대로 둘 것을 함께</strong> — “첫 번째 메뉴는
            그대로 두고, 나머지 두 개만 더 간단한 것으로 바꿔줘.”
          </li>
          <li>
            <strong>빠뜨린 정보 더하기</strong> — “냉장고에 돼지고기가 있어.
            그걸 쓰는 메뉴로 다시 추천해줘.”
          </li>
          <li>
            <strong>자세함의 정도 조절</strong> — “조리 순서는 빼고 재료와 예상
            시간만 알려줘.”
          </li>
          <li>
            <strong>다른 선택지 보기</strong> — “맵지않은 다른 메뉴 세 가지도
            보여줘.”
          </li>
          <li>
            <strong>꼭 지킬 조건 알려주기</strong> — “예산은 그대로 유지해줘.
            매운 음식은 빼줘.”
          </li>
          <li>
            <strong>쓰기 좋은 형태로 받기</strong> — “표 형식으로 정리해줘.”
          </li>
        </ul>
        <p>
          답변을 중요한 일에 쓸 때는 마지막에 점검을 부탁해도 좋아요. “빠진
          재료가 없는지 확인해줘”처럼 말하면 AI가 한 번 더 살펴봅니다. 물론 최종
          확인은 내가 해야 합니다.
        </p>
        <p>
          한 번에 모든 것을 고치려 하지 않아도 괜찮아요. 요청하고, 답변을 보고,
          다시 요청하는 과정을 두세 번 거치는 편이 처음부터 완벽한 요청을 쓰는
          것보다 쉽고 빠를 때가 많습니다.
        </p>
      </section>
      <section className={styles.quizSection}>
        <h2>퀴즈로 확인하기</h2>
        <Quiz
          id="prompt-refine"
          context={
            <>
              <p>
                친구에게 보낼 생일 축하 메시지가 필요해 AI에 다음과 같이
                요청했습니다.
              </p>
              <blockquote>생일 축하 메시지 써줘.</blockquote>
              <p>AI는 다음과 같이 답했습니다. 아래는 교육용 예시입니다.</p>
              <blockquote>
                생일 진심으로 축하해! 🎂🎉 오늘은 맛있는 것도 많이 먹고, 행복한
                일만 가득한 하루 보내길 바라!
              </blockquote>
              <p>
                친구에게 보낼 메시지로는 너무 간단하고 평범하게 느껴집니다.
                친구와 평소 대화하듯 편하고 장난기 있는 메시지로 바꾸려면, 어떤
                후속 요청이 가장 도움이 될까요?
              </p>
            </>
          }
          question="친구에게 보낼 메시지를 원하는 말투로 바꾸려면 어떤 후속 요청이 가장 도움이 될까요?"
          answers={[
            "“너무 평범해. 이번에는 더 잘 써줘.”",
            "“10년지기 친구에게 카톡으로 보낼거야. 반말로, 가볍게 장난치는 말투로 두세 문장가량 작성해줘.”",
            "“마음에 들지 않아. 다시 만들어줘.”",
          ]}
          correct={1}
          hint="처음 요청에는
      받는 사람과 원하는 말투에 대한 정보가 없습니다. 이 정보를 알려주는
      선택지를 찾아보세요."
          explanation="받는 사람과 메시지를 보낼 곳, 원하는 말투와
      길이를 구체적으로 알려주면 AI가 그 정보를 참고해 답변을 바꿀 수 있습니다.
      “더 잘 써줘”라고 하거나 같은 요청을 반복하면 원하는 방향을 충분히 전달하기
      어렵습니다."
        />
        <ReadMore
          links={[
            [
              "OpenAI의 프롬프팅 안내",
              "https://learn.chatgpt.com/docs/prompting",
            ],
          ]}
        />
      </section>
    </div>
  );
}

function Checklist({
  storageKey,
  items,
}: {
  storageKey: string;
  items: readonly string[];
}) {
  const [checked, setChecked] = useDraft(
    storageKey,
    Object.fromEntries(items.map((_, i) => [String(i), ""])),
  );
  return (
    <div className={styles.checklist}>
      {items.map((item, i) => (
        <label key={item}>
          <input
            type="checkbox"
            checked={checked[i] === "yes"}
            onChange={(event) =>
              setChecked({ ...checked, [i]: event.target.checked ? "yes" : "" })
            }
          />
          <span>{item}</span>
        </label>
      ))}
    </div>
  );
}

const myWorkExamples = [
  {
    name: "메일 초안",
    goal: "다음 주 회의 일정을 조율하는 메일을 써줘.",
    context:
      "동료 두 명에게 보내고, 화요일 오전 10시와 목요일 오후 2시가 가능해.",
    output: "제목과 본문을 나눠 정중하지만 간결하게 써줘.",
    limits: "날짜와 시간은 바꾸지 말고, 내가 확인할 수 있게 초안으로만 써줘.",
  },
  {
    name: "긴 글 요약",
    goal: "해리포터 소설을 요약해줘.",
    context: "어린 아이를 재울 때 읽어줄 예정이야.",
    output:
      "중요한 이벤트는 잊지말고, 어린 아이도 이해할 수 있는 내용으로 작성해줘.",
    limits: "소설에 없는 내용은 넣지 말고, 빠진 정보가 있으면 알려줘.",
  },
  {
    name: "용어 설명",
    goal: "ROAS가 무엇인지 설명해줘.",
    context: "나는 이번에 마케팅 업무를 처음 맡았어. 숫자에 익숙하지 않아.",
    output: "쉬운 말로 설명하고, 예시를 하나 들어줘.",
    limits: "어려운 용어를 쓸 때는 바로 뜻을 풀어서 써줘.",
  },
];

export function MyWorkTask() {
  const [fields, setFields] = useDraft("my-prompt", {
    goal: "",
    context: "",
    output: "",
    limits: "",
  });
  const [showExamples, setShowExamples] = useState(false);
  const asSentence = (value: string) => {
    const sentence = value.trim();
    if (!sentence) return "";
    return /[.!?。！？]$/.test(sentence) ? sentence : `${sentence}.`;
  };
  const myPrompt = [fields.goal, fields.context, fields.output, fields.limits]
    .map(asSentence)
    .filter(Boolean)
    .join(" ");
  const isMyPromptReady = Boolean(fields.goal.trim());
  return (
    <div className={styles.lesson}>
      <section>
        <p>
          저녁 메뉴를 정하면서 요청을 만들고 다듬어 봤습니다. 이렇게 요청을
          만들고 다듬은 방법 그대로 다른일도 요청해볼 수 있어요. 앞에서 쓴
          목표와 맥락, 결과물, 제약 조건을 그대로 옮기면 됩니다.
        </p>
        <ul className={styles.featureGrid}>
          <li>
            <strong>메일 초안 쓰기</strong>
            <p>
              <b>목표:</b> 다음 주 회의 일정을 조율하는 메일을 써줘.
              <br />
              <b>맥락:</b> 동료 두 명에게 보내고, 화요일 오전 10시와 목요일 오후
              2시가 가능해.
              <br />
              <b>결과물:</b> 제목과 본문을 나눠 정중하지만 간결하게 써줘.
              <br />
              <b>제약 조건:</b> 날짜와 시간은 바꾸지 말고, 내가 확인할 수 있게
              초안으로만 써줘.
            </p>
          </li>
          <li>
            <strong>긴 글 요약하기</strong>
            <p>
              <b>목표:</b> 해리포터 소설을 요약해줘.
              <br />
              <b>맥락:</b> 어린 아이를 재울 때 읽어줄 예정이야.
              <br />
              <b>결과물:</b> 중요한 이벤트는 잊지말고, 어린 아이도 이해할 수
              있는 내용으로 작성해줘.
              <br />
              <b>제약 조건:</b> 소설에 없는 내용은 넣지 말고, 빠진 정보가 있으면
              알려줘.
            </p>
          </li>
          <li>
            <strong>용어 설명 듣기</strong>
            <p>
              <b>목표:</b> ROAS가 무엇인지 설명해줘.
              <br />
              <b>맥락:</b> 나는 마케팅 업무를 이번에 처음 맡았어. 숫자에
              익숙하지 않아.
              <br />
              <b>결과물:</b> 쉬운 말로 설명하고, 예시를 하나 들어줘.
              <br />
              <b>제약 조건:</b> 어려운 용어를 쓸 때는 바로 뜻을 풀어서 써줘.
            </p>
          </li>
        </ul>
        <p className={styles.exampleNote}>
          세 예시 모두 ‘목표 → 맥락 → 결과물 → 제약 조건’ 순서로 이어져 있어요.
          네 가지를 매번 다 채워야 하는 것은 아니고, 도움이 될 것만 골라 담으면
          됩니다.
        </p>
        <p>
          프롬프트에 정해진 문법이나 양식은 없습니다. 질문이어도 되고, 하고 싶은
          일을 그대로 적어도 돼요. 짧은 한 줄로 충분한 날도 많고, 결과가 중요한
          일일수록 네 가지를 챙기면 받는 답이 달라집니다.
        </p>
      </section>
      <section>
        <h2>이번에는 내 일로 만들어 봅시다</h2>
        <p>
          요즘 하는 일이나 미뤄 두었던 일에서 하나를 골라 보세요. 칸을 채우면
          보낼 요청이 완성되고, 앞에서 고른 서비스로 바로 보낼 수 있어요.
          떠오르지 않으면 예시를 열어 가져다 쓰면 됩니다.
        </p>
        <div className={styles.presets}>
          <Button
            type="button"
            aria-expanded={showExamples}
            onClick={() => setShowExamples(!showExamples)}
            label={showExamples ? "예시 닫기" : "막히면 예시 보기"}
          />
          {showExamples &&
            myWorkExamples.map((example) => (
              <Button
                type="button"
                key={example.name}
                onClick={() =>
                  setFields({
                    goal: example.goal,
                    context: example.context,
                    output: example.output,
                    limits: example.limits,
                  })
                }
                label={example.name}
              />
            ))}
        </div>
        <div className={styles.promptConditions}>
          {(
            [
              ["goal", "목표", "예: 다음 주 회의 일정을 조율하는 메일을 써줘."],
              [
                "context",
                "맥락",
                "예: 동료 두 명에게 보내고, 화요일 오전과 목요일 오후가 가능해.",
              ],
              [
                "output",
                "결과물",
                "예: 제목과 본문을 나눠 정중하지만 간결하게 써줘.",
              ],
              [
                "limits",
                "제약 조건",
                "예: 날짜는 바꾸지 말고, 보내기 전에 확인할 수 있게 초안으로만.",
              ],
            ] as const
          ).map(([key, label, placeholder]) => (
            <label className={styles.promptCondition} key={key}>
              <strong>{label}</strong>
              <input
                type="text"
                maxLength={200}
                placeholder={placeholder}
                value={fields[key]}
                onChange={(event) =>
                  setFields({ ...fields, [key]: event.target.value })
                }
              />
            </label>
          ))}
        </div>
        <PromptComposer
          label="완성된 요청"
          rows={7}
          value={myPrompt}
          disabled={!isMyPromptReady}
        />
        <p className={styles.exampleNote}>
          입력한 내용은 ‘목표 → 맥락 → 결과물 → 제약 조건’ 순서로 이어집니다.
          목표만 적어도 보낼 수 있고, 아래 칸을 더할수록 요청이 또렷해져요.
        </p>
      </section>
      <section>
        <h2>보내기 전에 확인해 보세요</h2>
        <Checklist
          storageKey="prompt-checks"
          items={[
            "무엇을 해달라는 요청인지 알아볼 수 있다.",
            "AI가 모를 상황과 자료를 담았다.",
            "원하는 결과의 형태나 길이를 알려 줬다.",
            "바꾸면 안 되는 것이나 피해야 할 것을 적었다.",
          ]}
        />
      </section>
      <section>
        <h2>오늘 해 본 것</h2>
        <p>
          한 번 해 봤다고 바로 익숙해지지는 않아요. 그래도 요청하고, 답변을
          보고, 다시 요청하는 일을 반복하다 보면 어떤 정보를 미리 알려주면
          좋은지 감이 생깁니다. 그 감각이 쌓인 것이 프롬프팅 실력이에요.
        </p>
        <p>
          잘 통한 요청은 메모해 두고 다음에 다시 써 보세요. 그렇게 모인 문장들이
          나만의 방식이 됩니다. 마지막 단계에서는 받은 답변을 그대로 써도 될지
          판단하는 기준과, 앞으로 AI를 배워 갈 방법을 함께 정리합니다.
        </p>
        <ReadMore
          links={[
            [
              "OpenAI의 프롬프팅 안내",
              "https://learn.chatgpt.com/docs/prompting",
            ],
          ]}
        />
      </section>
    </div>
  );
}

export function JudgmentTask() {
  return (
    <div className={styles.lesson}>
      <section>
        <h2>답을 그대로 사용하기 전에</h2>
        <p>
          AI는 자연스럽고 자신 있게 말하지만, 내용이 항상 맞지는 않아요. 내가
          알려주지 않은 사정이 빠져 있을 수도 있고, AI가 잘못 이해한 부분이 있을
          수도 있어요. 답변을 곧이곧대로 믿기 전에 세 가지만 확인해 보세요.
        </p>
        <div className={styles.takeaway}>
          <h3>확인 기준</h3>
          <ul className={styles.readingList}>
            <li>사실과 숫자가 원래 자료와 같은가요?</li>
            <li>내가 요청한 조건이 빠짐없이 담겼나요?</li>
            <li>내 상황에서 실제로 쓸 수 있는 결과인가요?</li>
          </ul>
        </div>
        <p>
          확인을 마쳤다면 마지막 판단은 내 몫입니다. AI는 초안을 빠르게 만들어
          주지만, 무엇이 사실이고 지금 상황에 맞는지, 그대로 내보낼 준비가
          되었는지는 내가 정해야해요. 보고서에 담기거나 동료에게 전해지는 순간
          그것은 AI가 아니라 내 이름으로 나가는 결과물이기 때문입니다.
        </p>
        <p>
          그래서 돈이나 건강, 계약처럼 결과가 큰 일은 AI의 답을 참고 자료로만
          쓰고, 담당자나 전문가에게 한 번 더 확인하는 편이 좋습니다. AI는 판단을
          돕는 도구이지, 판단을 대신하는 도구가 아니라는것을 인지해둡시다.
        </p>
      </section>
      <section>
        <h2>AI는 이렇게 계속 배워 가요</h2>
        <p>
          한 번에 익히겠다는 생각보다 자주 써 보면서 손에 익히는 도구라고
          생각해야 합니다. 오늘부터 이렇게 시작해 보세요.
        </p>
        <ul className={styles.readingList}>
          <li>하루에 한 번, 작은 일 하나를 AI에게 먼저 맡겨 보기</li>
          <li>답이 잘 나온 요청은 모아 두고 다음에 다시 쓰기</li>
          <li>마음에 안 들면 포기하지 말고 한 번 더 요청해 보기</li>
          <li>써 본 경험을 사람들과 나누고, 서로의 방법 배우기</li>
        </ul>
        <MediaSlot
          kind="video"
          title="앞으로 AI를 어떻게 배워 나갈지"
          description="오늘 해 본 것을 돌아보고, 내 일에 AI를 더 넓게 쓰기 위해 어떻게 배워 나가면 좋을지 소개하는 마무리 영상"
        />
      </section>
      <section>
        <h2>학습을 마치며</h2>
        <p>
          AI에게 요청하고, 답을 고치고, 내 일에 직접 써 봤습니다. 처음 세운
          목표를 이루었는지 확인해 보세요.
        </p>
        <Checklist storageKey="learning-goals" items={experienceOutcomes} />
      </section>
    </div>
  );
}
