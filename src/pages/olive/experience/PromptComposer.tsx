import { createContext, useContext, useId, type ReactNode } from "react";
import Button from "@/components/ui/Button";
import { useDraft } from "./useDraft";
import styles from "./PromptComposer.module.css";

const services = {
  chatgpt: { name: "ChatGPT", company: "OpenAI", url: "https://chatgpt.com/" },
  claude: {
    name: "Claude",
    company: "Anthropic",
    url: "https://claude.ai/new",
  },
} as const;
type Service = keyof typeof services;
const ServiceContext = createContext<{
  service: Service;
  selectService: (service: Service) => void;
} | null>(null);

export function ServiceProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useDraft("preferred-service", {
    service: "chatgpt",
  });
  const service = preference.service === "claude" ? "claude" : "chatgpt";
  return (
    <ServiceContext.Provider
      value={{
        service,
        selectService: (value) => setPreference({ service: value }),
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
}

function useService() {
  const value = useContext(ServiceContext);
  if (!value) throw new Error("PromptComposer requires ServiceProvider");
  return value;
}

export function ServicePicker() {
  const { service, selectService } = useService();
  const groupId = useId();
  return (
    <fieldset className={styles.picker}>
      <legend>선호하는 서비스를 선택해 주세요.</legend>
      <div className={styles.options}>
        {(Object.keys(services) as Service[]).map((key) => (
          <label key={key} data-selected={service === key}>
            <input
              type="radio"
              name={groupId}
              value={key}
              checked={service === key}
              onChange={() => selectService(key)}
            />
            <span className={styles.serviceName}>
              <strong>{services[key].name}</strong>
              <span>{services[key].company}</span>
            </span>
            <span className={styles.selectedMark} aria-hidden="true">
              {service === key ? "✓" : ""}
            </span>
          </label>
        ))}
      </div>
      <p>이후 요청은 선택한 서비스로 보냅니다.</p>
    </fieldset>
  );
}

type Props = {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  disabled?: boolean;
  sendText?: string;
};

export default function PromptComposer({
  label,
  value,
  onChange,
  placeholder = "AI에 보낼 요청을 작성해 주세요.",
  rows = 4,
  maxLength = 4000,
  disabled = false,
  sendText = value,
}: Props) {
  const { service } = useService();
  const id = useId();
  const destination = services[service];
  const canSend =
    !disabled && Boolean(value.trim()) && Boolean(sendText.trim());
  return (
    <div className={styles.composer}>
      <form
        className={styles.requestForm}
        action={destination.url}
        method="get"
        target="_blank"
        rel="noopener noreferrer"
        onSubmit={(event) => {
          if (!canSend) event.preventDefault();
        }}
      >
        <input type="hidden" name="q" value={sendText.trim()} />
        <div className={styles.content}>
          <label className={styles.label} htmlFor={`${id}-message`}>
            {label}
          </label>
          <textarea
            id={`${id}-message`}
            value={value}
            onChange={
              onChange ? (event) => onChange(event.target.value) : undefined
            }
            readOnly={!onChange}
            placeholder={placeholder}
            rows={rows}
            maxLength={maxLength}
            aria-describedby={`${id}-hint`}
          />
          <p id={`${id}-hint`} className={styles.hint}>
            작성한 요청을 담아 새 탭을 엽니다. {destination.name}에서 내용을
            확인하고 전송해 주세요.
          </p>
        </div>
        <div className={styles.actions}>
          <Button
            type="submit"
            label={`${destination.name}로 보내기`}
            status={canSend ? "accent" : "disabled"}
            ariaLabel={`${destination.name}로 보내기 (새 탭)`}
          />
        </div>
      </form>
    </div>
  );
}
