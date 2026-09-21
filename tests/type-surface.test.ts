/**
 * bunary - Type re-export surface
 *
 * Type-only exports are erased at runtime, so `completeness.test.ts` cannot
 * see them. This file imports every type the meta-package promises to
 * re-export; `tsc --noEmit` (the `typecheck` script, run in CI) fails if any
 * of them disappears from the root entry. Keep the lists in sync with the
 * sub-packages' declared type exports.
 */

import { describe, expect, it } from "bun:test";
import type {
  // @bunary/core
  AppConfig,
  // @bunary/http
  AppOptions,
  // @bunary/auth
  AuthConfig,
  AuthContext,
  AuthManagerInterface,
  AuthPlugin,
  AuthPluginRouter,
  AuthStorage,
  AuthUser,
  BasicGuardOptions,
  BunaryApp,
  BunaryConfig,
  BunaryServer,
  CorsOptions,
  // @bunary/orm
  DatabaseConfig,
  DatabaseDriver,
  DatabaseType,
  DriverFactory,
  EnvironmentType,
  GroupCallback,
  GroupOptions,
  GroupRouter,
  Guard,
  GuardInput,
  HandlerResponse,
  HttpMethod,
  InstallableAuthManager,
  JwtGuardOptions,
  ListenOptions,
  Middleware,
  MigrationModule,
  MigrationRecord,
  MigrationStatus,
  MigratorOptions,
  ModelData,
  MysqlConfig,
  OrmConfig,
  PathParams,
  QueryBuilder,
  QueryResult,
  RequestContext,
  RouteBuilder,
  RouteHandler,
  RouteInfo,
  SqliteConfig,
  TableBuilder,
  TableBuilderCallback,
} from "../src/index";

// Referencing each type keeps `noUnusedLocals`-style tooling quiet and makes
// the intent explicit: these names must resolve from the root entry.
type RootTypeSurface = [
  AppConfig,
  AppOptions,
  AuthConfig,
  AuthContext,
  AuthManagerInterface,
  AuthPlugin,
  AuthPluginRouter,
  AuthStorage,
  AuthUser,
  BasicGuardOptions,
  BunaryApp,
  BunaryConfig,
  BunaryServer,
  CorsOptions,
  DatabaseConfig,
  DatabaseDriver,
  DatabaseType,
  DriverFactory,
  EnvironmentType,
  GroupCallback,
  GroupOptions,
  GroupRouter,
  Guard,
  GuardInput,
  HandlerResponse,
  HttpMethod,
  InstallableAuthManager,
  JwtGuardOptions,
  ListenOptions,
  Middleware,
  MigrationModule,
  MigrationRecord,
  MigrationStatus,
  MigratorOptions,
  ModelData,
  MysqlConfig,
  OrmConfig,
  PathParams,
  QueryBuilder,
  QueryResult,
  RequestContext,
  RouteBuilder,
  RouteHandler,
  RouteInfo,
  SqliteConfig,
  TableBuilder,
  TableBuilderCallback,
];

describe("bunary type surface", () => {
  it("is enforced by tsc (see file header)", () => {
    const surfaceSize: RootTypeSurface["length"] = 47;
    expect(surfaceSize).toBe(47);
  });
});
