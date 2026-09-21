/**
 * bunary - Re-export completeness test
 *
 * Asserts `exports(bunary) ⊇ exports(each sub-package)` at runtime, so a new
 * export added to a sub-package cannot silently go missing from the
 * meta-package. Type-only exports cannot be observed at runtime; they are
 * covered by `tests/type-surface.test.ts`, which `tsc --noEmit` enforces.
 */

import { describe, expect, it } from "bun:test";
import * as auth from "@bunary/auth";
import * as core from "@bunary/core";
import * as http from "@bunary/http";
import * as orm from "@bunary/orm";
import * as bunaryAuth from "../src/auth";
import * as bunaryCore from "../src/core";
import * as bunaryHttp from "../src/http";
import * as bunary from "../src/index";
import * as bunaryOrm from "../src/orm";

/**
 * Sub-package exports deliberately NOT flattened onto the `bunary` root.
 * Every entry needs a reason. Currently empty: the four packages have no
 * name collisions, so everything is re-exported.
 */
const ROOT_EXCLUSIONS: Record<string, ReadonlySet<string>> = {
  "@bunary/core": new Set(),
  "@bunary/http": new Set(),
  "@bunary/auth": new Set(),
  "@bunary/orm": new Set(),
};

const SUB_PACKAGES = [
  { name: "@bunary/core", module: core, subpath: bunaryCore },
  { name: "@bunary/http", module: http, subpath: bunaryHttp },
  { name: "@bunary/auth", module: auth, subpath: bunaryAuth },
  { name: "@bunary/orm", module: orm, subpath: bunaryOrm },
] as const;

type ModuleShape = Record<string, unknown>;

function runtimeKeys(mod: object): string[] {
  return Object.keys(mod)
    .filter((key) => key !== "default")
    .sort();
}

describe("bunary re-export completeness", () => {
  for (const { name, module, subpath } of SUB_PACKAGES) {
    const exclusions = ROOT_EXCLUSIONS[name] ?? new Set<string>();

    it(`root re-exports every runtime export of ${name}`, () => {
      const missing = runtimeKeys(module).filter(
        (key) => !exclusions.has(key) && !(key in bunary),
      );
      expect(missing).toEqual([]);
    });

    it(`root re-exports of ${name} are the same bindings`, () => {
      for (const key of runtimeKeys(module)) {
        if (exclusions.has(key)) continue;
        expect((bunary as ModuleShape)[key]).toBe((module as ModuleShape)[key]);
      }
    });

    it(`subpath entry mirrors ${name} exactly`, () => {
      expect(runtimeKeys(subpath)).toEqual(runtimeKeys(module));
    });
  }

  it("has no root-level name collisions between sub-packages", () => {
    const seen = new Map<string, string>();
    for (const { name, module } of SUB_PACKAGES) {
      for (const key of runtimeKeys(module)) {
        const owner = seen.get(key);
        expect(owner ?? name).toBe(name);
        seen.set(key, name);
      }
    }
  });
});
