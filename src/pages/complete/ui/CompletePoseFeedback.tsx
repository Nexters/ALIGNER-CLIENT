import { Button } from "@/shared/ui/button";

// TODO: type 파일로 이동
type PoseAnswer = "SUCCEEDED" | "STILL_HARD" | "TOO_HARD";

const ANSWER_OPTIONS: { value: PoseAnswer; label: string }[] = [
  { value: "SUCCEEDED", label: "잘됐어요" },
  { value: "STILL_HARD", label: "아직 어려워요" },
  { value: "TOO_HARD", label: "안될 거 같아요" },
];

export function CompletePoseFeedback() {
  // TODO: 핀포즈 캡처 이미지, 자세 이름을 세션 상태에서 받아오도록 연동
  const poseName = "낙타자세";

  // TODO: 선택 결과에 따라 다음 자세로 진행하거나 자세를 교체하는 로직 연동
  const handleAnswer = (answer: PoseAnswer) => {
    void answer;
  };

  return (
    <main className="flex min-h-screen flex-col gap-7 bg-bg-inverse pt-8 px-6">
      {/* TODO: 비디오로 교체 */}
      <div className="h-112 w-full rounded-[2.8rem] bg-media-placeholder" />

      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-4">
          <h1 className="typo-title-1-emphasized text-ink-inverse">
            오늘 {poseName},
            <br />
            어땠어요?
          </h1>
          <p className="typo-subheadline-regular text-gray-80">느낀 그대로 골라주세요.</p>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            {ANSWER_OPTIONS.map(({ value, label }) => (
              <Button key={value} color="black" onClick={() => handleAnswer(value)}>
                {label}
              </Button>
            ))}
          </div>
          <p className="typo-caption-1-regular w-full text-gray-80">
            '안될 거 같아요'를 고르면 다른 자세로 바꿔드려요.
          </p>
        </div>
      </div>
    </main>
  );
}
