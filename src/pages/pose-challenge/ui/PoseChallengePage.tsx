import { useState } from "react";
import { useNavigate } from "react-router";
import type { PoseChallengeStatus } from "@/entities/pose";
import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/button";
import { ErrorMessage } from "@/shared/ui/error-message";
import { ProgressRingItem, type ProgressRingItemProps } from "@/shared/ui/progress-ring-item";
import { Skeleton } from "@/shared/ui/skeleton";
import { TopNavBar } from "@/shared/ui/top-nav-bar";
import { mapPoseChallengeProgress } from "../api/map-pose-challenge";
import { useBodyParts, useTargetPoseProgress } from "../api/use-pose-challenge-progress";

const TRANSITION_DURATION = 300;
const STAGGER_STEP = 30;
const STAGGER_MAX_STEPS = 8;

type PoseFilter = "all" | Exclude<PoseChallengeStatus, "idle">;

const RING_STATUS: Record<PoseChallengeStatus, ProgressRingItemProps["status"]> = {
  idle: "idle",
  inProgress: "progress",
  completed: "complete",
};

export function PoseChallengePage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<PoseFilter>("all");

  const bodyPartsQuery = useBodyParts();
  const progressQuery = useTargetPoseProgress();

  if (bodyPartsQuery.isPending || progressQuery.isPending) {
    return (
      <main className="relative flex min-h-screen flex-col items-center px-[2rem] pb-[8rem]">
        <TopNavBar
          onBack={() => navigate(-1)}
          className="w-full"
          children={<span className="typo-headline-emphasized text-black">자세 도전 현황</span>}
        />
        <div className="mt-[2.4rem] grid w-full grid-cols-3 gap-x-[1.45rem] gap-y-[1.6rem]">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="aspect-square w-full rounded-full" />
          ))}
        </div>
      </main>
    );
  }

  if (bodyPartsQuery.error || progressQuery.error || !bodyPartsQuery.data || !progressQuery.data) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-[2rem]">
        <ErrorMessage
          message="정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요."
          className="typo-body-regular text-gray-50"
        />
      </main>
    );
  }

  const view = mapPoseChallengeProgress(progressQuery.data, bodyPartsQuery.data);

  const tabs: { key: PoseFilter; label: string }[] = [
    { key: "all", label: `전체 ${view.totalCount}` },
    { key: "inProgress", label: `도전 중 ${view.inProgressCount}` },
    { key: "completed", label: `완성 ${view.completedCount}` },
  ];

  return (
    <main className="relative flex min-h-screen flex-col items-center px-[2rem] pb-[8rem]">
      <TopNavBar
        onBack={() => navigate(-1)}
        className="w-full"
        children={<span className="typo-headline-emphasized text-black">자세 도전 현황</span>}
      />

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

      {/* body part 영역(제목+그리드)은 필터와 무관하게 항상 그대로 두고, 그 안의 카드만 나타났다 사라진다 —
          카드 개수만큼 그리드가 접히지 않도록 group.poses는 필터링하지 않고 전부 렌더링한다. */}
      <div className="mt-[2.4rem] flex w-full flex-col gap-[2.4rem]">
        {view.groups.map(({ bodyPart, poses }) => (
          <div key={bodyPart} className="flex w-full flex-col gap-[0.8rem]">
            <h2 className="typo-body-emphasized w-full text-black">{bodyPart}</h2>
            <div className="grid w-full grid-cols-3 gap-x-[1.45rem] gap-y-[1.6rem]">
              {poses.map((pose, index) => {
                const visible = filter === "all" || pose.status === filter;
                return (
                  <ProgressRingItem
                    key={pose.id}
                    imageSrc={pose.imageSrc}
                    alt={pose.name}
                    label={pose.name}
                    current={pose.current}
                    total={pose.total}
                    status={RING_STATUS[pose.status]}
                    badgeLabel={
                      pose.status === "idle"
                        ? undefined
                        : pose.status === "completed"
                          ? "완성"
                          : `${pose.current}/${pose.total}`
                    }
                    aria-hidden={!visible}
                    className={cn(
                      "w-full transition-all ease-out",
                      visible ? "scale-100 opacity-100" : "pointer-events-none scale-90 opacity-0",
                    )}
                    style={{
                      transitionDuration: `${TRANSITION_DURATION}ms`,
                      transitionDelay: visible
                        ? `${Math.min(index, STAGGER_MAX_STEPS) * STAGGER_STEP}ms`
                        : "0ms",
                    }}
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
