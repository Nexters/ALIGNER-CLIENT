import { useNavigate } from "react-router";
import { CourseRecommendation } from "@/features/course-recommendation";
import { ROUTES } from "@/shared/config/routes";
import 낙타 from "@/shared/assets/imgs/낙타.png";
import { DUMMY_COURSE } from "../mock/mock";

// TODO: 실제 API(GET /courses/{courseId}) 연동

export function CourseRecommendationPage() {
  const navigate = useNavigate();

  return (
    <CourseRecommendation
      course={DUMMY_COURSE}
      heroImageSrc={낙타}
      onBack={() => navigate(-1)}
      onStart={() => navigate(ROUTES.home, { replace: true })}
    />
  );
}
