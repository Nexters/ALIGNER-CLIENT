import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { withMinDelay } from "./with-min-delay";

describe("withMinDelay", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("작업이 최소 대기시간보다 먼저 끝나도 최소 대기시간이 지날 때까지 기다린다", async () => {
    const result = withMinDelay(Promise.resolve("done"), 3000);

    let resolved = false;
    result.then(() => {
      resolved = true;
    });

    await vi.advanceTimersByTimeAsync(2999);
    expect(resolved).toBe(false);

    await vi.advanceTimersByTimeAsync(1);
    expect(resolved).toBe(true);
    expect(await result).toBe("done");
  });

  test("작업이 최소 대기시간보다 오래 걸리면 작업이 끝나는 즉시 반환한다", async () => {
    const slowTask = new Promise<string>((resolve) => {
      setTimeout(() => resolve("slow"), 5000);
    });
    const result = withMinDelay(slowTask, 3000);

    await vi.advanceTimersByTimeAsync(5000);
    expect(await result).toBe("slow");
  });

  test("작업이 실패하면 최소 대기시간을 기다리지 않고 즉시 거부한다", async () => {
    const result = withMinDelay(Promise.reject(new Error("boom")), 3000);

    await expect(result).rejects.toThrow("boom");
  });
});
