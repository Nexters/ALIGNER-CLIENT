import { CheckMarkGroup } from "@/shared/ui/check-mark";

const WEEK_DAYS = [
  { label: "월", isChecked: true },
  { label: "화", isChecked: true },
  { label: "수", isChecked: true },
  { label: "목", isChecked: true },
  { label: "금", isChecked: true },
  { label: "토", isChecked: false },
  { label: "일", isChecked: false },
];

export function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-[3.2rem] p-[3.2rem]">
      <h1 className="text-2xl font-semibold">ALIGNER</h1>

      <section className="flex w-full flex-col gap-[1.6rem]">
        <h2 className="typo-headline-emphasized">CheckMarkGroup (요일 스트릭)</h2>
        <div className="rounded-[1.6rem] bg-white p-[2rem]">
          <CheckMarkGroup>
            {WEEK_DAYS.map((day) => (
              <CheckMarkGroup.Item key={day.label} isChecked={day.isChecked}>
                <CheckMarkGroup.Indicator />
                <CheckMarkGroup.Label label={day.label} />
              </CheckMarkGroup.Item>
            ))}
          </CheckMarkGroup>
        </div>
      </section>

      <section className="flex w-full flex-col gap-[1.6rem]">
        <h2 className="typo-headline-emphasized">CheckMarkGroup (label 없음)</h2>
        <div className="rounded-[1.6rem] bg-white p-[2rem]">
          <CheckMarkGroup>
            <CheckMarkGroup.Item isChecked={true}>
              <CheckMarkGroup.Indicator />
            </CheckMarkGroup.Item>
            <CheckMarkGroup.Item isChecked={false}>
              <CheckMarkGroup.Indicator />
            </CheckMarkGroup.Item>
          </CheckMarkGroup>
        </div>
      </section>
    </main>
  );
}
