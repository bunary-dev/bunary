/**
 * bunary - Type re-export surface
 *
 * Type-only exports are erased at runtime, so `completeness.test.ts` cannot
 * see them. This file re-exports every type the meta-package promises, from
 * the root entry and from each subpath; `tsc --noEmit` (the `typecheck`
 * script) fails if any of them stops resolving. Keep the lists in sync with
 * the sub-packages' declared type exports.
 *
 * `CookieJar` is declared by both `@bunary/http` and `@bunary/auth` as
 * different types, so it is not flattened onto the root (like the
 * `createCookieJar` runtime collision): import it from `bunary/http` or
 * `bunary/auth`.
 */

import { describe, expect, it } from "bun:test";

// Subpaths: the colliding names stay reachable where they belong, and each
// provider subpath carries its own types.
export type { CookieJar as AuthSubpathCookieJar } from "../src/auth";
export type {
  AuthMiddlewareOptions as AuthProviderSubpathMiddlewareOptions,
  RequiredAuthLocals as AuthProviderSubpathRequiredAuthLocals,
} from "../src/auth-provider";
export type {
  Application as CoreSubpathApplication,
  Token as CoreSubpathToken,
} from "../src/core";
export type {
  CookieJar as HttpSubpathCookieJar,
  Router as HttpSubpathRouter,
} from "../src/http";
export type { HttpConfig as HttpProviderSubpathHttpConfig } from "../src/http-provider";
// Root entry: every sub-package type except the `CookieJar` collision.
export type {
  // @bunary/http
  AnyContext,
  // @bunary/orm
  AnyDatabase,
  // @bunary/core
  AppConfig,
  Application,
  // @bunary/auth
  AttemptResult,
  // @bunary/auth/provider
  AuthAppRequestContext,
  AuthConfig,
  AuthContext,
  AuthCookieJar,
  AuthHandlerResult,
  AuthLocals,
  AuthManagerInterface,
  AuthMiddleware,
  AuthMiddlewareOptions,
  AuthRequestContext,
  AuthUser,
  AuthUserLocals,
  BasicGuardOptions,
  BodyOf,
  BodyReader,
  BunaryConfig,
  BunaryServer,
  CheckRelationNames,
  CheckReservedColumns,
  CheckReservedScopes,
  Command,
  CommandArg,
  CommandFlag,
  ConfigPath,
  ConfigRepository,
  ConfigSchema,
  CookieOptions,
  CookieSerializeOptions,
  CorsOptions,
  CreateAppOptions,
  Credentials,
  DatabaseConfig,
  DefineModelOptions,
  EnvironmentType,
  EnvOf,
  GroupCallback,
  GroupOptions,
  GroupRouter,
  Guard,
  GuardInput,
  HandlerResponse,
  HttpConfig,
  HttpErrorOptions,
  HttpMethod,
  InferSchemaOutput,
  InstanceMethods,
  InstanceOf,
  JwtGuardOptions,
  ListenOptions,
  LoadedRelations,
  Middleware,
  Model,
  ModelEvent,
  ModelEventTargets,
  ModelInstance,
  ModelListener,
  ModelListeners,
  ModelMethods,
  ModelQuery,
  NewRowOf,
  NoRelations,
  NoScopes,
  // @bunary/orm/provider
  OrmProviderOptions,
  ParamsOf,
  PathParams,
  PostgresDatabaseConfig,
  PrimaryKeyColumn,
  ProblemDetails,
  ProblemOptions,
  ProblemResponseOptions,
  Provider,
  QueryMethods,
  QueryOf,
  QueryOptions,
  QueryParams,
  QueuedCookieJar,
  RateLimitHit,
  RateLimitOptions,
  RateLimitStore,
  RelatedModel,
  RelationsJson,
  RelationsOf,
  RequestContext,
  RequiredAuthLocals,
  ReservedColumnName,
  ReservedScopeName,
  ResourceConverter,
  RouteBuilder,
  RouteHandler,
  RouteInfo,
  Router,
  RouterOptions,
  RouterWebSocketHandler,
  RouteSchema,
  RouteSchemas,
  RowOf,
  SchemaLike,
  Scope,
  ScopeConstraint,
  ScopeMap,
  ScopeMethods,
  ScopesOf,
  SelectQuery,
  ServeStaticOptions,
  SessionGuardOptions,
  SoftDeleteInstanceMethods,
  SoftDeleteQueryMethods,
  SoftDeletesRequiresDeletedAt,
  SqliteDatabaseConfig,
  SseEvent,
  SseOptions,
  SseStream,
  StandardSchemaLike,
  StandardSchemaV1,
  SupportsSoftDeletes,
  TableFor,
  Token,
  TransactionFor,
  UserProvider,
  ValidatedContext,
  ValidatedRouteHandler,
  ValidationIssue,
  WebSocketData,
  WebSocketHandlers,
  WebSocketRouteOptions,
  WithRelations,
} from "../src/index";
export type { Model as OrmSubpathModel } from "../src/orm";
export type { OrmProviderOptions as OrmProviderSubpathOptions } from "../src/orm-provider";

describe("bunary type surface", () => {
  it("is enforced by tsc (see file header)", () => {
    expect(true).toBe(true);
  });
});
