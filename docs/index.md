# bunary

`bunary` is the umbrella package of the Bunary framework. It owns no behaviour of its own: it
depends on `@bunary/http` `^0.7.1` and `@bunary/core`, `@bunary/auth` and `@bunary/orm` `^0.4.0`,
and re-exports them, flat from the root entry and one subpath per package entry.

Requires Bun ≥ 1.4.0.

## Installation

```bash
bun add bunary@^0.5.0
```

`@bunary/orm` has `drizzle-orm` (`^0.45.0`) as a peer dependency; `bun add` installs it with
`bunary`. The root entry loads every package, so `drizzle-orm` must be installed even if an
application never defines a model.

## Entries

| Import | Re-exports |
| --- | --- |
| `bunary` | every entry below, flat, minus the collisions listed under [Name collisions](#name-collisions) |
| `bunary/core` | `@bunary/core` |
| `bunary/http` | `@bunary/http` |
| `bunary/http/provider` | `@bunary/http/provider` (`httpProvider`, `serve`, `RouterToken`) |
| `bunary/auth` | `@bunary/auth` |
| `bunary/auth/provider` | `@bunary/auth/provider` (`authProvider`, `AuthToken`, `authMiddleware`, `requireAuth`) |
| `bunary/orm` | `@bunary/orm` |
| `bunary/orm/provider` | `@bunary/orm/provider` (`ormProvider`, `DatabaseToken`) |

Each subpath is `export * from` its package entry, so it mirrors that entry exactly. The
sub-packages ship their `@bunary/core` integration on a separate `/provider` subpath because core
is an optional peer for them; `bunary` always depends on core, so the provider exports are also
on the root.

```typescript
import { createApp, createRouter, defineModel, httpProvider, serve } from "bunary";
```

## Name collisions

The root entry flattens every export except names that two packages define differently:

| Name | Kind | `bunary/http` | `bunary/auth` |
| --- | --- | --- | --- |
| `createCookieJar` | function | returns an http `CookieJar` | returns a `QueuedCookieJar` |
| `CookieJar` | type | http's cookie jar | auth's structural cookie-jar interface |

Neither is exported from `bunary`; import the one you need from its subpath:

```typescript
import { createCookieJar } from "bunary/http";
import type { CookieJar } from "bunary/auth";
```

Names re-exported by more than one entry as the same binding (`HttpConfig` from `@bunary/http` and
`@bunary/http/provider`; `DatabaseConfig`, `PostgresDatabaseConfig` and `SqliteDatabaseConfig`
from `@bunary/orm` and `@bunary/orm/provider`) are not collisions and are on the root.

## Export list

What each subpath exports. The root entry exports the union, minus the collisions above.

### `bunary/core` (`@bunary/core`)

Runtime: `BunaryError`, `Environment`, `MissingBindingError`, `ValidationError`, `createApp`, `createConfig`, `createToken`, `defineConfig`, `defineEnv`, `defineProvider`, `env`, `environment`, `isDev`, `isProd`, `isTest`, `resolveEnvironment`, `validateWith`

Types: `AppConfig`, `Application`, `BunaryConfig`, `Command`, `CommandArg`, `CommandFlag`, `ConfigPath`, `ConfigRepository`, `ConfigSchema`, `CreateAppOptions`, `EnvOf`, `EnvironmentType`, `Provider`, `SchemaLike`, `StandardSchemaV1`, `Token`, `ValidationIssue`

### `bunary/http` (`@bunary/http`)

Runtime: `BadRequestError`, `BodyParseError`, `ConflictError`, `ForbiddenError`, `HttpError`, `InternalServerError`, `MethodNotAllowedError`, `NotFoundError`, `Resource`, `TooManyRequestsError`, `UnauthorizedError`, `UnprocessableError`, `abort`, `cors`, `createCookieJar`, `createRouter`, `html`, `isHttpError`, `json`, `problem`, `problemResponse`, `rateLimit`, `redirect`, `serveStatic`, `sse`, `status`, `text`, `toResponse`

Types: `AnyContext`, `BindResolver`, `BindingContext`, `BodyOf`, `BodyReader`, `BoundContext`, `BoundOf`, `BoundWebSocketData`, `BoundWebSocketRouteOptions`, `BunaryServer`, `CookieJar`, `CookieSerializeOptions`, `CorsOptions`, `GroupCallback`, `GroupOptions`, `GroupRouter`, `HandlerResponse`, `HttpConfig`, `HttpErrorOptions`, `HttpMethod`, `InferSchemaOutput`, `ListenOptions`, `Middleware`, `ParamsOf`, `PathParams`, `ProblemDetails`, `ProblemOptions`, `ProblemResponseOptions`, `QueryOf`, `QueryParams`, `RateLimitHit`, `RateLimitOptions`, `RateLimitStore`, `RequestContext`, `ResourceConverter`, `RouteBindings`, `RouteBuilder`, `RouteHandler`, `RouteInfo`, `RouteRegistration`, `RouteSchema`, `RouteSchemas`, `Router`, `RouterOptions`, `RouterWebSocketHandler`, `ServeStaticOptions`, `SseEvent`, `SseOptions`, `SseStream`, `StandardSchemaLike`, `ValidatedContext`, `ValidatedRouteHandler`, `WebSocketBindings`, `WebSocketData`, `WebSocketHandlers`, `WebSocketRegistration`, `WebSocketRouteOptions`

### `bunary/http/provider` (`@bunary/http/provider`)

Runtime: `RouterToken`, `httpProvider`, `serve`

Types: `HttpConfig`

### `bunary/auth` (`@bunary/auth`)

Runtime: `createAuth`, `createAuthManager`, `createBasicGuard`, `createCookieJar`, `createJwtGuard`, `createSessionGuard`

Types: `AttemptResult`, `AuthConfig`, `AuthContext`, `AuthCookieJar`, `AuthHandlerResult`, `AuthLocals`, `AuthManagerInterface`, `AuthMiddleware`, `AuthRequestContext`, `AuthUser`, `BasicGuardOptions`, `CookieJar`, `CookieOptions`, `Credentials`, `Guard`, `GuardInput`, `JwtGuardOptions`, `QueuedCookieJar`, `SessionGuardOptions`, `UserProvider`

### `bunary/auth/provider` (`@bunary/auth/provider`)

Runtime: `AuthToken`, `authMiddleware`, `authProvider`, `requireAuth`

Types: `AuthAppRequestContext`, `AuthMiddlewareOptions`, `AuthUserLocals`, `RequiredAuthLocals`

### `bunary/orm` (`@bunary/orm`)

Runtime: `ModelNotFoundError`, `defineModel`

Types: `AnyDatabase`, `CheckRelationNames`, `CheckReservedColumns`, `CheckReservedScopes`, `DatabaseConfig`, `DefineModelOptions`, `InstanceMethods`, `InstanceOf`, `LoadedRelations`, `Model`, `ModelEvent`, `ModelEventTargets`, `ModelInstance`, `ModelListener`, `ModelListeners`, `ModelMethods`, `ModelQuery`, `NewRowOf`, `NoRelations`, `NoScopes`, `PostgresDatabaseConfig`, `PrimaryKeyColumn`, `QueryMethods`, `QueryOptions`, `RelatedModel`, `RelationsJson`, `RelationsOf`, `ReservedColumnName`, `ReservedScopeName`, `RowOf`, `Scope`, `ScopeConstraint`, `ScopeMap`, `ScopeMethods`, `ScopesOf`, `SelectQuery`, `SoftDeleteInstanceMethods`, `SoftDeleteQueryMethods`, `SoftDeletesRequiresDeletedAt`, `SqliteDatabaseConfig`, `SupportsSoftDeletes`, `TableFor`, `TransactionFor`, `WithRelations`

### `bunary/orm/provider` (`@bunary/orm/provider`)

Runtime: `DatabaseToken`, `ormProvider`

Types: `DatabaseConfig`, `OrmProviderOptions`, `PostgresDatabaseConfig`, `SqliteDatabaseConfig`


## Upgrading from 0.4.x

0.5.0 moves `@bunary/http` from `^0.4.0` to `^0.7.1` (0.7.0 was a broken build). Nothing is
removed; it adds route model binding (`bind` on a route's options, read from a typed
`ctx.bound`, and on `ws()` routes onto `ws.data.bound`) and maps `@bunary/orm`'s
`ModelNotFoundError` (e.g. from `findOrFail()`) to a `404` problem instead of a `500`.

```ts
import { createRouter } from "bunary";

createRouter().get("/users/:user", { bind: { user: (id) => User.find(Number(id)) } }, (ctx) =>
  ctx.bound.user, // User, never null; a missing user answers 404
);
```

## Upgrading from 0.3.x

The 0.4.0 sub-packages are a redesign, and the APIs they removed are no longer re-exported:

- http: `createApp` (and `BunaryApp`, `AppOptions`) is gone; build a router with `createRouter()`
  and either `router.listen()` or, with core, `httpProvider(router)` plus `serve(app)`. The
  `createApp` exported by `bunary` is now `@bunary/core`'s application container.
- core: `getBunaryConfig`, `clearBunaryConfig` are gone; config lives on the application
  (`app.config`).
- auth: the global singleton (`auth`, `getAuthManager`, `setAuthManager`, `clearAuthManager`),
  `installAuthPlugin`, `createCookieStorage` and the `AuthPlugin`, `AuthPluginRouter`,
  `AuthStorage`, `InstallableAuthManager` types are gone; use `createAuth()` middleware or
  `authProvider` from `bunary/auth/provider`.
- orm: `BaseModel`, `Model` (class), `Schema`, `Migrator`, `createMigrator`,
  `MigrationsRepository`, the driver registry and `defineOrmConfig` / `getOrmConfig` /
  `setOrmConfig` / `clearOrmConfig` / `enableCoreConfig` are gone; models are `defineModel(db,
  table)` on Drizzle, and migrations use drizzle-kit.

See each package's own documentation for the details.
