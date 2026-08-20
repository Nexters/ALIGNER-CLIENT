const HANGUL_SYLLABLE_START = 0xac00;
const HANGUL_SYLLABLE_END = 0xd7a3;
const JONGSEONG_COUNT = 28;
const RIEUL_JONGSEONG_INDEX = 8;

/** 받침이 없거나 'ㄹ' 받침이면 "로", 그 외 받침이 있으면 "으로"를 반환한다. */
export function roParticle(word: string): "로" | "으로" {
  const lastChar = word.at(-1);
  if (!lastChar) return "로";

  const code = lastChar.charCodeAt(0);
  if (code < HANGUL_SYLLABLE_START || code > HANGUL_SYLLABLE_END) return "로";

  const jongseongIndex = (code - HANGUL_SYLLABLE_START) % JONGSEONG_COUNT;
  return jongseongIndex === 0 || jongseongIndex === RIEUL_JONGSEONG_INDEX ? "로" : "으로";
}
