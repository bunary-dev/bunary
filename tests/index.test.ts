/**
 * bunary - Smoke test
 *
 * Verifies the meta-package's entry point re-exports what it claims to.
 * This is intentionally minimal: it exists so `bun test` and the coverage
 * threshold have something to run against a package that is otherwise pure
 * re-exports with no logic of its own.
 */

import { describe, expect, it } from "bun:test";
import * as bunary from "../src/index";

describe("bunary entry point", () => {
  it("re-exports the expected core bindings", () => {
    expect(typeof bunary.env).toBe("function");
    expect(typeof bunary.createConfig).toBe("function");
    expect(typeof bunary.defineConfig).toBe("function");
    expect(typeof bunary.getBunaryConfig).toBe("function");
    expect(typeof bunary.clearBunaryConfig).toBe("function");
    expect(typeof bunary.isDev).toBe("function");
    expect(typeof bunary.isProd).toBe("function");
    expect(typeof bunary.isTest).toBe("function");
  });

  it("re-exports the expected http bindings", () => {
    expect(typeof bunary.createApp).toBe("function");
  });

  it("re-exports the expected auth bindings", () => {
    expect(typeof bunary.auth).toBe("function");
    expect(typeof bunary.createAuth).toBe("function");
    expect(typeof bunary.createAuthManager).toBe("function");
    expect(typeof bunary.getAuthManager).toBe("function");
    expect(typeof bunary.setAuthManager).toBe("function");
    expect(typeof bunary.clearAuthManager).toBe("function");
    expect(typeof bunary.installAuthPlugin).toBe("function");
    expect(typeof bunary.createBasicGuard).toBe("function");
    expect(typeof bunary.createJwtGuard).toBe("function");
    expect(typeof bunary.createCookieStorage).toBe("function");
  });
});
