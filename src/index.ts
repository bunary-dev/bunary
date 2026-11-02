/**
 * Bunary - A Bun-first backend framework
 *
 * This is the umbrella package that re-exports all Bunary modules.
 * You can import everything from here, or use the individual subpaths.
 *
 * Every runtime and type export of `@bunary/core`, `@bunary/http`,
 * `@bunary/auth`, `@bunary/orm` and their `/provider` integrations is
 * re-exported flat from this entry, except the one name collision:
 * `createCookieJar` / `CookieJar` exist in both `@bunary/http` and
 * `@bunary/auth` with different types, so import them from `bunary/http` or
 * `bunary/auth`. `tests/completeness.test.ts` and
 * `tests/type-surface.test.ts` fail if this list drifts from the
 * sub-packages.
 *
 * @example
 * ```ts
 * // Import everything from bunary
 * import { createApp, createRouter, defineModel, httpProvider, serve } from "bunary";
 *
 * // Or import from subpaths
 * import { createApp } from "bunary/core";
 * import { createRouter } from "bunary/http";
 * import { httpProvider, serve } from "bunary/http/provider";
 * import { defineModel } from "bunary/orm";
 * ```
 *
 * @packageDocumentation
 */

// Re-export auth (`createCookieJar` and `CookieJar` collide with http: subpath only)
export type {
  AttemptResult,
  AuthConfig,
  AuthContext,
  AuthCookieJar,
  AuthHandlerResult,
  AuthLocals,
  AuthManagerInterface,
  AuthMiddleware,
  AuthRequestContext,
  AuthUser,
  BasicGuardOptions,
  CookieOptions,
  Credentials,
  Guard,
  GuardInput,
  JwtGuardOptions,
  QueuedCookieJar,
  SessionGuardOptions,
  UserProvider,
} from "@bunary/auth";
export {
  createAuth,
  createAuthManager,
  createBasicGuard,
  createJwtGuard,
  createSessionGuard,
} from "@bunary/auth";
export type {
  AuthAppRequestContext,
  AuthMiddlewareOptions,
  AuthUserLocals,
  RequiredAuthLocals,
} from "@bunary/auth/provider";
export {
  AuthToken,
  authMiddleware,
  authProvider,
  requireAuth,
} from "@bunary/auth/provider";
// Re-export core
export type {
  AppConfig,
  Application,
  BunaryConfig,
  Command,
  CommandArg,
  CommandFlag,
  ConfigPath,
  ConfigRepository,
  ConfigSchema,
  CreateAppOptions,
  EnvironmentType,
  EnvOf,
  Provider,
  SchemaLike,
  StandardSchemaV1,
  Token,
  ValidationIssue,
} from "@bunary/core";
export {
  BunaryError,
  createApp,
  createConfig,
  createToken,
  defineConfig,
  defineEnv,
  defineProvider,
  Environment,
  env,
  environment,
  isDev,
  isProd,
  isTest,
  MissingBindingError,
  resolveEnvironment,
  ValidationError,
  validateWith,
} from "@bunary/core";
// Re-export http (`createCookieJar` and `CookieJar` collide with auth: subpath only)
export type {
  AnyContext,
  BindingContext,
  BindResolver,
  BodyOf,
  BodyReader,
  BoundContext,
  BoundOf,
  BoundWebSocketData,
  BoundWebSocketRouteOptions,
  BunaryServer,
  CookieSerializeOptions,
  CorsOptions,
  GroupCallback,
  GroupOptions,
  GroupRouter,
  HandlerResponse,
  HttpConfig,
  HttpErrorOptions,
  HttpMethod,
  InferSchemaOutput,
  ListenOptions,
  Middleware,
  ParamsOf,
  PathParams,
  ProblemDetails,
  ProblemOptions,
  ProblemResponseOptions,
  QueryOf,
  QueryParams,
  RateLimitHit,
  RateLimitOptions,
  RateLimitStore,
  RequestContext,
  ResourceConverter,
  RouteBindings,
  RouteBuilder,
  RouteHandler,
  RouteInfo,
  RouteRegistration,
  Router,
  RouterOptions,
  RouterWebSocketHandler,
  RouteSchema,
  RouteSchemas,
  ServeStaticOptions,
  SseEvent,
  SseOptions,
  SseStream,
  StandardSchemaLike,
  ValidatedContext,
  ValidatedRouteHandler,
  WebSocketBindings,
  WebSocketData,
  WebSocketHandlers,
  WebSocketRegistration,
  WebSocketRouteOptions,
} from "@bunary/http";
export {
  abort,
  BadRequestError,
  BodyParseError,
  ConflictError,
  cors,
  createRouter,
  ForbiddenError,
  HttpError,
  html,
  InternalServerError,
  isHttpError,
  json,
  MethodNotAllowedError,
  NotFoundError,
  problem,
  problemResponse,
  Resource,
  rateLimit,
  redirect,
  serveStatic,
  sse,
  status,
  TooManyRequestsError,
  text,
  toResponse,
  UnauthorizedError,
  UnprocessableError,
} from "@bunary/http";
export {
  httpProvider,
  RouterToken,
  serve,
} from "@bunary/http/provider";
// Re-export orm
export type {
  AnyDatabase,
  CheckRelationNames,
  CheckReservedColumns,
  CheckReservedScopes,
  DatabaseConfig,
  DefineModelOptions,
  InstanceMethods,
  InstanceOf,
  LoadedRelations,
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
  PostgresDatabaseConfig,
  PrimaryKeyColumn,
  QueryMethods,
  QueryOptions,
  RelatedModel,
  RelationsJson,
  RelationsOf,
  ReservedColumnName,
  ReservedScopeName,
  RowOf,
  Scope,
  ScopeConstraint,
  ScopeMap,
  ScopeMethods,
  ScopesOf,
  SelectQuery,
  SoftDeleteInstanceMethods,
  SoftDeleteQueryMethods,
  SoftDeletesRequiresDeletedAt,
  SqliteDatabaseConfig,
  SupportsSoftDeletes,
  TableFor,
  TransactionFor,
  WithRelations,
} from "@bunary/orm";
export { defineModel, ModelNotFoundError } from "@bunary/orm";
export type { OrmProviderOptions } from "@bunary/orm/provider";
export { DatabaseToken, ormProvider } from "@bunary/orm/provider";
