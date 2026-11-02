/**
 * bunary - Re-export completeness test
 *
 * Asserts `exports(bunary) ⊇ exports(each sub-package entry)` at runtime, so a
 * new export added to a sub-package cannot silently go missing from the
 * meta-package, and every subpath mirrors its sub-package entry exactly.
 * Type-only exports cannot be observed at runtime; they are covered by
 * `tests/type-surface.test.ts`, which `tsc --noEmit` enforces.
 */

import { describe, expect, it } from "bun:test";
import * as auth from "@bunary/auth";
import * as authProvider from "@bunary/auth/provider";
import * as core from "@bunary/core";
import * as http from "@bunary/http";
import * as httpProvider from "@bunary/http/provider";
import * as orm from "@bunary/orm";
import * as ormProvider from "@bunary/orm/provider";
import * as bunaryAuth from "../src/auth";
import * as bunaryAuthProvider from "../src/auth-provider";
import * as bunaryCore from "../src/core";
import * as bunaryHttp from "../src/http";
import * as bunaryHttpProvider from "../src/http-provider";
import * as bunary from "../src/index";
import * as bunaryOrm from "../src/orm";
import * as bunaryOrmProvider from "../src/orm-provider";

/**
 * Sub-package exports deliberately NOT flattened onto the `bunary` root.
 * Every entry needs a reason.
 *
 * `createCookieJar` is exported by both `@bunary/http` (a plain `CookieJar`)
 * and `@bunary/auth` (a `QueuedCookieJar`). Neither wins the root name: import
 * it from `bunary/http` or `bunary/auth`. (The `CookieJar` type collides the
 * same way; see `tests/type-surface.test.ts`.)
 */
const ROOT_EXCLUSIONS: Record<string, ReadonlySet<string>> = {
  "@bunary/core": new Set(),
  "@bunary/http": new Set(["createCookieJar"]),
  "@bunary/http/provider": new Set(),
  "@bunary/auth": new Set(["createCookieJar"]),
  "@bunary/auth/provider": new Set(),
  "@bunary/orm": new Set(),
  "@bunary/orm/provider": new Set(),
};

const SUB_PACKAGES = [
  { name: "@bunary/core", module: core, subpath: bunaryCore },
  { name: "@bunary/http", module: http, subpath: bunaryHttp },
  {
    name: "@bunary/http/provider",
    module: httpProvider,
    subpath: bunaryHttpProvider,
  },
  { name: "@bunary/auth", module: auth, subpath: bunaryAuth },
  {
    name: "@bunary/auth/provider",
    module: authProvider,
    subpath: bunaryAuthProvider,
  },
  { name: "@bunary/orm", module: orm, subpath: bunaryOrm },
  {
    name: "@bunary/orm/provider",
    module: ormProvider,
    subpath: bunaryOrmProvider,
  },
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
      for (const key of runtimeKeys(module)) {
        expect((subpath as ModuleShape)[key]).toBe(
          (module as ModuleShape)[key],
        );
      }
    });
  }

  it("root exports nothing that is not a sub-package export", () => {
    const known = new Set(
      SUB_PACKAGES.flatMap(({ module }) => runtimeKeys(module)),
    );
    expect(runtimeKeys(bunary).filter((key) => !known.has(key))).toEqual([]);
  });

  it("excludes exactly the colliding names from the root", () => {
    const owners = new Map<string, unknown>();
    const collisions = new Set<string>();
    for (const { module } of SUB_PACKAGES) {
      for (const key of runtimeKeys(module)) {
        const value = (module as ModuleShape)[key];
        if (owners.has(key) && owners.get(key) !== value) collisions.add(key);
        owners.set(key, value);
      }
    }
    const excluded = new Set(
      Object.values(ROOT_EXCLUSIONS).flatMap((names) => [...names]),
    );
    expect([...collisions].sort()).toEqual([...excluded].sort());
    for (const key of excluded) expect(key in bunary).toBe(false);
  });
});
