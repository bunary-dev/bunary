/**
 * bunary - Package manifest test
 *
 * Every subpath in `package.json` `exports` must have a source entry that the
 * build script compiles, and the four sub-packages must be pinned to the same
 * release line as the meta-package.
 */

import { describe, expect, it } from "bun:test";
import { existsSync } from "node:fs";
import { join } from "node:path";
import pkg from "../package.json";

const ROOT = join(import.meta.dir, "..");

const SUBPATHS: Record<string, string> = {
  ".": "index",
  "./core": "core",
  "./http": "http",
  "./http/provider": "http-provider",
  "./auth": "auth",
  "./auth/provider": "auth-provider",
  "./orm": "orm",
  "./orm/provider": "orm-provider",
};

describe("package.json", () => {
  it("is version 0.5.0", () => {
    expect(pkg.version).toBe("0.5.0");
  });

  it("depends on http ^0.7.1 (route model binding) and the rest at ^0.4.0", () => {
    expect(pkg.dependencies).toEqual({
      "@bunary/auth": "^0.4.0",
      "@bunary/core": "^0.4.0",
      "@bunary/http": "^0.7.1",
      "@bunary/orm": "^0.4.0",
    });
  });

  it("exports exactly the documented subpaths", () => {
    expect(Object.keys(pkg.exports).sort()).toEqual(
      [...Object.keys(SUBPATHS), "./package.json"].sort(),
    );
  });

  for (const [subpath, entry] of Object.entries(SUBPATHS)) {
    it(`maps ${subpath} to a built source entry`, () => {
      expect(existsSync(join(ROOT, "src", `${entry}.ts`))).toBe(true);
      expect(pkg.scripts.build).toContain(`./src/${entry}.ts`);
      expect(pkg.exports[subpath as keyof typeof pkg.exports]).toEqual({
        types: `./dist/${entry}.d.ts`,
        import: `./dist/${entry}.js`,
        default: `./dist/${entry}.js`,
      });
    });
  }
});
