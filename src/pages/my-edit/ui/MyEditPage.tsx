import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { type ExperienceLevel } from "@/features/onboarding-form";
import { createStepPath, ROUTES } from "@/shared/config/routes";
import { ExperienceStep } from "./ExperienceStep";
import { ProfileEditForm } from "./ProfileEditForm";

const editStepPath = createStepPath<"experience">(ROUTES.myEdit);

export function MyEditPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEditingExperience = searchParams.get("step") === "experience";

  // TODO: 실제 유저 프로필 API 연동 전까지의 목데이터. 필드마다 나중에 실제 응답 형식이 다를 수 있어 하나의 객체로 묶지 않고 각자 하드코딩해둔다.
  const [nickname, setNickname] = useState("한두살차이");
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>("ONE_TO_THREE_YEARS");
  const [heightCm, setHeightCm] = useState("160");
  const [weightKg, setWeightKg] = useState("50");

  const handleSave = () => {
    // TODO: 실제 프로필 저장 API 연동
    navigate(-1);
  };

  if (isEditingExperience) {
    return (
      <ExperienceStep
        value={experienceLevel}
        onChange={setExperienceLevel}
        onBack={() => navigate(-1)}
      />
    );
  }

  return (
    <ProfileEditForm
      nickname={nickname}
      onNicknameChange={setNickname}
      experienceLevel={experienceLevel}
      onEditExperience={() => navigate(editStepPath("experience"))}
      heightCm={heightCm}
      onHeightChange={setHeightCm}
      weightKg={weightKg}
      onWeightChange={setWeightKg}
      onBack={() => navigate(-1)}
      onSave={handleSave}
    />
  );
}
