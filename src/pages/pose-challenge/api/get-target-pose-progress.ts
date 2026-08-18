import { api } from "@/shared/api";
import type { TargetPoseProgressResponse } from "./types";

export function getTargetPoseProgress() {
  return api.get<TargetPoseProgressResponse>("courses/progress/target-poses");
}
