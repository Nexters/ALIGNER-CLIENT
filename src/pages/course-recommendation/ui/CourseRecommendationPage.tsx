import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { CourseRecommendation, useCourseDetail } from "@/features/course-recommendation";
import { ROUTES } from "@/shared/config/routes";

export function CourseRecommendationPage() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { data: course, isError } = useCourseDetail(Number(courseId));

  useEffect(() => {
    if (isError) navigate(ROUTES.home, { replace: true });
  }, [isError, navigate]);

  if (!course) return null;

  return (
    <CourseRecommendation
      course={course}
      heroImageSrc={course.targetPoseImageAssetKey ?? undefined}
      onBack={() => navigate(-1)}
    />
  );
}
