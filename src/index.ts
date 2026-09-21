/**
 * Bunary - A Bun-first backend framework
 *
 * This is the umbrella package that re-exports all Bunary modules.
 * You can import everything from here, or use the individual packages.
 *
 * @example
 * ```ts
 * // Import everything from bunary
 * import { createApp, env, isDev } from "bunary";
 *
 * // Or import from submodules
 * import { createApp } from "bunary/http";
 * import { env } from "bunary/core";
 * ```
 *
 * @packageDocumentation
 */

export type {
  AuthConfig,
  AuthContext,
  AuthManagerInterface,
  AuthPlugin,
  AuthUser,
  BasicGuardOptions,
  Guard,
  JwtGuardOptions,
} from "@bunary/auth";
// Re-export auth
export {
  auth,
  clearAuthManager,
  createAuth,
  createAuthManager,
  createBasicGuard,
  createCookieStorage,
  createJwtGuard,
  getAuthManager,
  installAuthPlugin,
  setAuthManager,
} from "@bunary/auth";
export type { AppConfig, BunaryConfig, OrmConfig } from "@bunary/core";
// Re-export core
export {
  clearBunaryConfig,
  createConfig,
  defineConfig,
  env,
  getBunaryConfig,
  isDev,
  isProd,
  isTest,
} from "@bunary/core";
// Re-export http
export {
  type BunaryApp,
  type BunaryServer,
  createApp,
  type GroupRouter,
  type Middleware,
  type RequestContext,
  type RouteBuilder,
  type RouteHandler,
} from "@bunary/http";
