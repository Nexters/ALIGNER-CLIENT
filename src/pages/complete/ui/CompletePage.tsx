import { CompletePoseFeedback } from "./CompletePoseFeedback";
import { CompleteReport } from "./CompleteReport";

// TODO: 세션 데이터의 perceivedResult 유무로 분기 (세션/API 연동 전까지 세션-6 상태로 고정)
const HAS_PERCEIVED_RESULT = false;

export function CompletePage() {
  return HAS_PERCEIVED_RESULT ? <CompleteReport /> : <CompletePoseFeedback />;
}
