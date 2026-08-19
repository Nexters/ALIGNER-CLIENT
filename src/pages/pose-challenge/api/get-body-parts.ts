import { api } from "@/shared/api";
import type { BodyPartResponse } from "./types";

export function getBodyParts() {
  return api.get<BodyPartResponse[]>("screening/body-parts");
}
