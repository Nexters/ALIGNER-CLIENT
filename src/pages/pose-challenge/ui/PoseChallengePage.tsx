import { useState } from "react";
import { useNavigate } from "react-router";
import type { PoseChallengeStatus } from "@/entities/pose";
import { Button } from "@/shared/ui/button";
import { ProgressRingItem } from "@/shared/ui/progress-ring-item";
import { TopNavBar } from "@/shared/ui/top-nav-bar";
import { mapPoseChallengeProgress } from "../api/map-pose-challenge";
import { useBodyParts, useTargetPoseProgress } from "../api/use-pose-challenge-progress";

type PoseFilter = "all" | Exclude<PoseChallengeStatus, "idle">;

export function PoseChallengePage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<PoseFilter>("all");

  const bodyPartsQuery = useBodyParts();
  const progressQuery = useTargetPoseProgress();

  if (bodyPartsQuery.isPending || progressQuery.isPending) {
    return null;
  }

  if (!bodyPartsQuery.data || !progressQuery.data) {
    return null;
  }

  const view = mapPoseChallengeProgress(progressQuery.data, bodyPartsQuery.data);

  const filteredGroups =
    filter === "all"
      ? view.groups
      : view.groups
          .map((group) => ({
            ...group,
            poses: group.poses.filter((pose) => pose.status === filter),
          }))
          .filter((group) => group.poses.length > 0);

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

      <div className="mt-[2.4rem] flex w-full flex-col gap-[2.4rem]">
        {filteredGroups.map(({ bodyPart, poses }) => (
          <div key={bodyPart} className="flex w-full flex-col gap-[0.8rem]">
            <h2 className="typo-body-emphasized w-full text-black">{bodyPart}</h2>
            <div className="grid w-full grid-cols-3 gap-x-[1.45rem] gap-y-[1.6rem]">
              {poses.map((pose) => (
                <ProgressRingItem
                  key={pose.id}
                  imageSrc={pose.imageSrc}
                  alt={pose.name}
                  label={pose.name}
                  current={pose.current}
                  total={pose.total}
                  badgeLabel={
                    pose.status === "idle"
                      ? undefined
                      : pose.status === "completed"
                        ? "완성"
                        : `${pose.current}/${pose.total}`
                  }
                  className="w-full"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
