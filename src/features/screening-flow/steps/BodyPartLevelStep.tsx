import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { ROUTES } from "@/shared/config/routes";
import { MannequinScanIcon } from "@/shared/ui/icons";
import { recommendCourse } from "../api/screening-api";
import type {
  BodyPart,
  CourseLevel,
  RecommendCourseRequest,
  RecommendCourseResponse,
} from "../api/types";
import BodyPartMarker from "../components/BodyPartMarker";
import type { BodyPartCode } from "../constants/body-parts";
import { LEVEL_OPTIONS } from "../constants/level-options";
import { screeningStepPath } from "../model/screening-steps";
import { Select } from "@/shared/ui/select";
import { TopNavBar } from "@/shared/ui/top-nav-bar";

type BodyPartLevelStepLocationState = {
  bodyParts: BodyPart[];
};

function isBodyPartLevelStepLocationState(state: unknown): state is BodyPartLevelStepLocationState {
  return typeof state === "object" && state !== null && "bodyParts" in state;
}

export default function BodyPartLevelStep() {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedBodyPartCode, setExpandedBodyPartCode] = useState<BodyPartCode>();

  const { mutate, isPending } = useMutation<
    RecommendCourseResponse,
    unknown,
    RecommendCourseRequest
  >({
    mutationFn: recommendCourse,
    onSuccess: () => navigate(ROUTES.home, { replace: true }),
  });

  if (!isBodyPartLevelStepLocationState(location.state)) {
    return <Navigate to={screeningStepPath("analyzing")} replace />;
  }

  const { bodyParts } = location.state;

  const toggleBodyPart = (code: BodyPartCode) => {
    if (isPending) return;
    setExpandedBodyPartCode((current) => (current === code ? undefined : code));
  };

  return (
    <div className="flex h-full flex-col px-[2rem] w-full">
      <TopNavBar onBack={() => navigate(-1)} className="h-[5.7rem]" />

      <h1 className="typo-title-2-5-emphasized text-black mt-[3.6rem] mb-[5.3rem]">
        강화하고 싶은 부위를 선택하면
        <br />
        맞춤 동작을 추천드려요
      </h1>

      <div className="flex w-full items-start justify-center gap-[2.1rem]">
        <div aria-hidden="true" className="relative w-full">
          <MannequinScanIcon className="w-full" />
          {bodyParts.map((bodyPart) => (
            <BodyPartMarker
              key={bodyPart.bodyPartCode}
              bodyPartCode={bodyPart.bodyPartCode}
              isSelected={bodyPart.bodyPartCode === expandedBodyPartCode}
              onClick={() => toggleBodyPart(bodyPart.bodyPartCode)}
            />
          ))}
        </div>
        <ul className="flex flex-col gap-[1.2rem]">
          {bodyParts.map((bodyPart) => (
            <li key={bodyPart.bodyPartCode}>
              <Select
                className="w-full"
                open={expandedBodyPartCode === bodyPart.bodyPartCode}
                onOpenChange={() => {
                  if (isPending) return;
                  toggleBodyPart(bodyPart.bodyPartCode);
                }}
                onValueChange={(value) =>
                  mutate({
                    bodyPartCode: bodyPart.bodyPartCode,
                    level: Number(value) as CourseLevel,
                  })
                }
              >
                <Select.Trigger disabled={isPending} className="w-full disabled:opacity-40">
                  {bodyPart.name}
                </Select.Trigger>
                <Select.Content>
                  {LEVEL_OPTIONS.map((option) => (
                    <Select.Item key={option.level} value={String(option.level)}>
                      {option.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
