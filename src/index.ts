/**
 * Bunary - A Bun-first backend framework
 *
 * This is the umbrella package that re-exports all Bunary modules.
 * You can import everything from here, or use the individual packages.
 *
 * Every runtime and type export of `@bunary/core`, `@bunary/http`,
 * `@bunary/auth` and `@bunary/orm` is re-exported flat from this entry
 * (the four packages have no name collisions). `tests/completeness.test.ts`
 * and `tests/type-surface.test.ts` fail if this list drifts from the
 * sub-packages.
 *
 * @example
 * ```ts
 * // Import everything from bunary
 * import { createApp, env, isDev, BaseModel } from "bunary";
 *
 * // Or import from submodules
 * import { createApp } from "bunary/http";
 * import { env } from "bunary/core";
 * import { BaseModel } from "bunary/orm";
 * ```
 *
 * @packageDocumentation
 */

// Re-export auth
export type {
  AuthConfig,
  AuthContext,
  AuthManagerInterface,
  AuthPlugin,
  AuthPluginRouter,
  AuthStorage,
  AuthUser,
  BasicGuardOptions,
  Guard,
  GuardInput,
  InstallableAuthManager,
  JwtGuardOptions,
} from "@bunary/auth";
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
// Re-export core
export type { AppConfig, BunaryConfig, EnvironmentType } from "@bunary/core";
export {
  clearBunaryConfig,
  createConfig,
  defineConfig,
  Environment,
  env,
  getBunaryConfig,
  isDev,
  isProd,
  isTest,
} from "@bunary/core";
// Re-export http
export type {
  AppOptions,
  BunaryApp,
  BunaryServer,
  CorsOptions,
  GroupCallback,
  GroupOptions,
  GroupRouter,
  HandlerResponse,
  HttpMethod,
  ListenOptions,
  Middleware,
  PathParams,
  RequestContext,
  RouteBuilder,
  RouteHandler,
  RouteInfo,
} from "@bunary/http";
export { BodyParseError, cors, createApp } from "@bunary/http";
// Re-export orm
export type {
  DatabaseConfig,
  DatabaseDriver,
  DatabaseType,
  DriverFactory,
  MigrationModule,
  MigrationRecord,
  MigrationStatus,
  MigratorOptions,
  ModelData,
  MysqlConfig,
  OrmConfig,
  QueryBuilder,
  QueryResult,
  SqliteConfig,
  TableBuilder,
  TableBuilderCallback,
} from "@bunary/orm";
export {
  BaseModel,
  clearDriverRegistry,
  clearOrmConfig,
  closeDriver,
  createDriver,
  createMigrator,
  defineOrmConfig,
  enableCoreConfig,
  getDriver,
  getOrmConfig,
  MigrationsRepository,
  Migrator,
  Model,
  MysqlDriver,
  registerDriver,
  resetDriver,
  Schema,
  SqliteDriver,
  setOrmConfig,
} from "@bunary/orm";
