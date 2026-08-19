import { useNavigate, useSearchParams } from "react-router";
import { type Member, useMemberProfile, useUpdateMemberProfile } from "@/entities/member";
import { createStepPath, ROUTES } from "@/shared/config/routes";
import { useProfileEditForm } from "../model/use-profile-edit-form";
import { ExperienceStep } from "./ExperienceStep";
import { ProfileEditForm } from "./ProfileEditForm";

const editStepPath = createStepPath<"experience">(ROUTES.myEdit);

export function MyEditPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEditingExperience = searchParams.get("step") === "experience";
  const { data: member, isPending, error } = useMemberProfile();

  return (
    <main className="flex min-h-screen flex-col bg-gray-98 px-6">
      {isPending ? null : error || !member ? (
        // TODO: 에러 상태 통일
        <div className="flex flex-1 flex-col items-center justify-center">
          <p className="typo-body-regular text-gray-50">
            정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
          </p>
        </div>
      ) : (
        <MyEditForm
          member={member}
          isEditingExperience={isEditingExperience}
          onNavigateBack={() => navigate(-1)}
          onEditExperience={() => navigate(editStepPath("experience"))}
        />
      )}
    </main>
  );
}

function MyEditForm({
  member,
  isEditingExperience,
  onNavigateBack,
  onEditExperience,
}: {
  member: Member;
  isEditingExperience: boolean;
  onNavigateBack: () => void;
  onEditExperience: () => void;
}) {
  const {
    values,
    errors,
    handlers,
    validateNickname,
    validateHeight,
    validateWeight,
    isDirty,
    isValid,
    handleSubmit,
    resetToMember,
  } = useProfileEditForm(member);
  const updateMemberProfile = useUpdateMemberProfile();

  const handleSave = handleSubmit((data) => {
    updateMemberProfile.mutate(
      {
        nickname: data.nickname,
        experienceLevel: data.experienceLevel,
        heightCm: Number(data.heightCm),
        weightKg: Number(data.weightKg),
      },
      { onSuccess: resetToMember },
    );
  });

  if (isEditingExperience) {
    return (
      <ExperienceStep
        value={values.experienceLevel}
        onChange={handlers.updateExperienceLevel}
        onBack={onNavigateBack}
      />
    );
  }

  return (
    <ProfileEditForm
      nickname={values.nickname}
      onNicknameChange={handlers.updateNickname}
      onNicknameBlur={validateNickname}
      nicknameError={errors.nickname}
      experienceLevel={values.experienceLevel}
      onEditExperience={onEditExperience}
      heightCm={values.heightCm}
      onHeightChange={handlers.updateHeight}
      onHeightBlur={validateHeight}
      heightError={errors.heightCm}
      weightKg={values.weightKg}
      onWeightChange={handlers.updateWeight}
      onWeightBlur={validateWeight}
      weightError={errors.weightKg}
      onBack={onNavigateBack}
      onSave={handleSave}
      isSaving={updateMemberProfile.isPending}
      canSave={isDirty && isValid}
    />
  );
}
