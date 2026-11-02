/**
 * bunary - Publish scripts test
 *
 * `npm publish` packs whatever is in `dist/`, so publishing must rebuild it from
 * clean first, and a build must never mix old and new files (#27).
 */

import { describe, expect, it } from "bun:test";
import pkg from "../package.json";

const scripts: Record<string, string | undefined> = pkg.scripts;

describe("publish scripts", () => {
  it("has a clean script that empties dist", () => {
    expect(scripts.clean).toBe("rm -rf dist");
  });

  it("starts build with bun run clean", () => {
    expect(scripts.build?.startsWith("bun run clean && ")).toBe(true);
  });

  it("runs clean then build in prepublishOnly, then tests and typecheck", () => {
    const prepublish = scripts.prepublishOnly ?? "";
    const steps = prepublish.split("&&").map((step) => step.trim());
    expect(steps).toEqual([
      "bun run clean",
      "bun run build",
      "bun test",
      "bun run typecheck",
    ]);
  });
});
