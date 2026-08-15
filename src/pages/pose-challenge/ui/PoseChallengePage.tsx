import { useMemo, useState } from "react";
import type { PoseChallenge } from "@/entities/pose";
import { Button } from "@/shared/ui/button";
import { ProgressRingItem } from "@/shared/ui/progress-ring-item";
import yogaImage from "@/shared/assets/images/yoga-1.png";

// TODO: 실제 API 연동 전까지의 목데이터. entities/pose 타입에 맞춰 추후 fetch 훅으로 교체한다.
const MOCK_POSES: PoseChallenge[] = [
  { id: "1", name: "활", bodyPart: "등", current: 1, total: 4, imageSrc: yogaImage },
  { id: "2", name: "낙타자세", bodyPart: "등", current: 4, total: 4, imageSrc: yogaImage },
  { id: "3", name: "휠", bodyPart: "등", current: 4, total: 4, imageSrc: yogaImage },
  { id: "4", name: "반보트", bodyPart: "복부", current: 0, total: 4, imageSrc: yogaImage },
  { id: "5", name: "보트자세", bodyPart: "복부", current: 2, total: 4, imageSrc: yogaImage },
  { id: "6", name: "사이드플랭크", bodyPart: "복부", current: 3, total: 4, imageSrc: yogaImage },
  { id: "7", name: "브릿지", bodyPart: "골반", current: 0, total: 4, imageSrc: yogaImage },
  { id: "8", name: "말라사나", bodyPart: "골반", current: 0, total: 4, imageSrc: yogaImage },
  { id: "9", name: "파이어로그", bodyPart: "골반", current: 0, total: 4, imageSrc: yogaImage },
  // 부위별 항목이 3개를 넘을 때 다음 행으로 잘 줄바꿈되는지 확인하기 위한 목데이터
  { id: "10", name: "고양이자세", bodyPart: "등", current: 0, total: 4, imageSrc: yogaImage },
  { id: "11", name: "메뚜기자세", bodyPart: "등", current: 2, total: 4, imageSrc: yogaImage },
  { id: "12", name: "플랭크", bodyPart: "복부", current: 1, total: 4, imageSrc: yogaImage },
  { id: "13", name: "레그레이즈", bodyPart: "복부", current: 4, total: 4, imageSrc: yogaImage },
  { id: "14", name: "나비자세", bodyPart: "골반", current: 0, total: 4, imageSrc: yogaImage },
];

type PoseStatus = "idle" | "inProgress" | "completed";
type PoseFilter = "all" | Exclude<PoseStatus, "idle">;

function getPoseStatus(pose: PoseChallenge): PoseStatus {
  if (pose.current <= 0) return "idle";
  if (pose.current >= pose.total) return "completed";
  return "inProgress";
}

function groupByBodyPart(poses: PoseChallenge[]) {
  const groups = new Map<string, PoseChallenge[]>();
  for (const pose of poses) {
    const group = groups.get(pose.bodyPart) ?? [];
    group.push(pose);
    groups.set(pose.bodyPart, group);
  }
  return [...groups.entries()];
}

export function PoseChallengePage() {
  const [filter, setFilter] = useState<PoseFilter>("all");

  const inProgressCount = useMemo(
    () => MOCK_POSES.filter((pose) => getPoseStatus(pose) === "inProgress").length,
    [],
  );
  const completedCount = useMemo(
    () => MOCK_POSES.filter((pose) => getPoseStatus(pose) === "completed").length,
    [],
  );

  const filteredGroups = useMemo(() => {
    const filtered =
      filter === "all" ? MOCK_POSES : MOCK_POSES.filter((pose) => getPoseStatus(pose) === filter);
    return groupByBodyPart(filtered);
  }, [filter]);

  const tabs: { key: PoseFilter; label: string }[] = [
    { key: "all", label: `전체 ${MOCK_POSES.length}` },
    { key: "inProgress", label: `도전 중 ${inProgressCount}` },
    { key: "completed", label: `완성 ${completedCount}` },
  ];

  return (
    <main className="relative flex min-h-screen flex-col items-center pb-[8rem]">
      {/* TODO: 뒤로가기 헤더(TopNavBar) 나중에 연결. 지금은 자리만 표시 */}
      <p className="w-full typo-body-emphasized text-black">header</p>

      <div
        className="mt-[3rem] flex w-full gap-[0.8rem]"
        role="tablist"
        aria-label="자세 도전 현황 필터"
      >
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            role="tab"
            aria-selected={filter === tab.key}
            color="white"
            size="small"
            isSelected={filter === tab.key}
            onClick={() => setFilter(tab.key)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      <div className="mt-[2.4rem] flex w-full flex-col gap-[2.4rem]">
        {filteredGroups.map(([bodyPart, poses]) => (
          <div key={bodyPart} className="flex w-full flex-col gap-[0.8rem]">
            <h2 className="typo-body-emphasized w-full text-black">{bodyPart}</h2>
            <div className="grid w-full grid-cols-3 gap-x-[1.45rem] gap-y-[1.6rem]">
              {poses.map((pose) => {
                const status = getPoseStatus(pose);
                return (
                  <ProgressRingItem
                    key={pose.id}
                    imageSrc={pose.imageSrc}
                    alt={pose.name}
                    label={pose.name}
                    current={pose.current}
                    total={pose.total}
                    badgeLabel={
                      status === "idle"
                        ? undefined
                        : status === "completed"
                          ? "완성"
                          : `${pose.current}/${pose.total}`
                    }
                    className="w-full"
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
