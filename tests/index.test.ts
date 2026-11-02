/**
 * bunary - Named re-export test
 *
 * Imports every runtime name the meta-package documents, by name, from the
 * root entry and each subpath. A named import of a binding that no longer
 * exists fails module linking (and `tsc --noEmit`), so this file breaks as
 * soon as a sub-package drops something `bunary` still promises.
 */

import { describe, expect, it } from "bun:test";
import * as auth from "@bunary/auth";
import * as core from "@bunary/core";
import * as http from "@bunary/http";
import {
  createAuth as authCreateAuth,
  createAuthManager as authCreateAuthManager,
  createBasicGuard as authCreateBasicGuard,
  createCookieJar as authCreateCookieJar,
  createJwtGuard as authCreateJwtGuard,
  createSessionGuard as authCreateSessionGuard,
} from "../src/auth";
import {
  authMiddleware as authProviderAuthMiddleware,
  authProvider as authProviderAuthProvider,
  AuthToken as authProviderAuthToken,
  requireAuth as authProviderRequireAuth,
} from "../src/auth-provider";
import {
  BunaryError as coreBunaryError,
  createApp as coreCreateApp,
  createConfig as coreCreateConfig,
  createToken as coreCreateToken,
  defineConfig as coreDefineConfig,
  defineEnv as coreDefineEnv,
  defineProvider as coreDefineProvider,
  env as coreEnv,
  Environment as coreEnvironment,
  environment as coreEnvironmentFn,
  isDev as coreIsDev,
  isProd as coreIsProd,
  isTest as coreIsTest,
  MissingBindingError as coreMissingBindingError,
  resolveEnvironment as coreResolveEnvironment,
  validateWith as coreValidateWith,
  ValidationError as coreValidationError,
} from "../src/core";
import {
  abort as httpAbort,
  BadRequestError as httpBadRequestError,
  BodyParseError as httpBodyParseError,
  ConflictError as httpConflictError,
  cors as httpCors,
  createCookieJar as httpCreateCookieJar,
  createRouter as httpCreateRouter,
  ForbiddenError as httpForbiddenError,
  html as httpHtml,
  HttpError as httpHttpError,
  InternalServerError as httpInternalServerError,
  isHttpError as httpIsHttpError,
  json as httpJson,
  MethodNotAllowedError as httpMethodNotAllowedError,
  NotFoundError as httpNotFoundError,
  problem as httpProblem,
  problemResponse as httpProblemResponse,
  rateLimit as httpRateLimit,
  redirect as httpRedirect,
  Resource as httpResource,
  serveStatic as httpServeStatic,
  sse as httpSse,
  status as httpStatus,
  text as httpText,
  TooManyRequestsError as httpTooManyRequestsError,
  toResponse as httpToResponse,
  UnauthorizedError as httpUnauthorizedError,
  UnprocessableError as httpUnprocessableError,
} from "../src/http";
import {
  httpProvider as httpProviderHttpProvider,
  RouterToken as httpProviderRouterToken,
  serve as httpProviderServe,
} from "../src/http-provider";
import * as bunary from "../src/index";
import {
  AuthToken,
  abort,
  authMiddleware,
  authProvider,
  BadRequestError,
  BodyParseError,
  BunaryError,
  ConflictError,
  cors,
  createApp,
  createAuth,
  createAuthManager,
  createBasicGuard,
  createConfig,
  createJwtGuard,
  createRouter,
  createSessionGuard,
  createToken,
  DatabaseToken,
  defineConfig,
  defineEnv,
  defineModel,
  defineProvider,
  Environment,
  env,
  environment,
  ForbiddenError,
  HttpError,
  html,
  httpProvider,
  InternalServerError,
  isDev,
  isHttpError,
  isProd,
  isTest,
  json,
  MethodNotAllowedError,
  MissingBindingError,
  ModelNotFoundError,
  NotFoundError,
  ormProvider,
  problem,
  problemResponse,
  Resource,
  RouterToken,
  rateLimit,
  redirect,
  requireAuth,
  resolveEnvironment,
  serve,
  serveStatic,
  sse,
  status,
  TooManyRequestsError,
  text,
  toResponse,
  UnauthorizedError,
  UnprocessableError,
  ValidationError,
  validateWith,
} from "../src/index";
import {
  defineModel as ormDefineModel,
  ModelNotFoundError as ormModelNotFoundError,
} from "../src/orm";
import {
  DatabaseToken as ormProviderDatabaseToken,
  ormProvider as ormProviderOrmProvider,
} from "../src/orm-provider";

const ROOT = {
  AuthToken,
  abort,
  authMiddleware,
  authProvider,
  BadRequestError,
  BodyParseError,
  BunaryError,
  ConflictError,
  cors,
  createApp,
  createAuth,
  createAuthManager,
  createBasicGuard,
  createConfig,
  createJwtGuard,
  createRouter,
  createSessionGuard,
  createToken,
  DatabaseToken,
  defineConfig,
  defineEnv,
  defineModel,
  defineProvider,
  Environment,
  env,
  environment,
  ForbiddenError,
  HttpError,
  html,
  httpProvider,
  InternalServerError,
  isDev,
  isHttpError,
  isProd,
  isTest,
  json,
  MethodNotAllowedError,
  MissingBindingError,
  ModelNotFoundError,
  NotFoundError,
  ormProvider,
  problem,
  problemResponse,
  RouterToken,
  Resource,
  rateLimit,
  redirect,
  requireAuth,
  resolveEnvironment,
  serve,
  serveStatic,
  sse,
  status,
  TooManyRequestsError,
  text,
  toResponse,
  UnauthorizedError,
  UnprocessableError,
  ValidationError,
  validateWith,
};

const SUBPATHS = {
  core: [
    coreBunaryError,
    coreCreateApp,
    coreCreateConfig,
    coreCreateToken,
    coreDefineConfig,
    coreDefineEnv,
    coreDefineProvider,
    coreEnvironment,
    coreEnv,
    coreEnvironmentFn,
    coreIsDev,
    coreIsProd,
    coreIsTest,
    coreMissingBindingError,
    coreResolveEnvironment,
    coreValidationError,
    coreValidateWith,
  ],
  http: [
    httpAbort,
    httpBadRequestError,
    httpBodyParseError,
    httpConflictError,
    httpCors,
    httpCreateCookieJar,
    httpCreateRouter,
    httpForbiddenError,
    httpHttpError,
    httpHtml,
    httpInternalServerError,
    httpIsHttpError,
    httpJson,
    httpMethodNotAllowedError,
    httpNotFoundError,
    httpProblem,
    httpProblemResponse,
    httpResource,
    httpRateLimit,
    httpRedirect,
    httpServeStatic,
    httpSse,
    httpStatus,
    httpTooManyRequestsError,
    httpText,
    httpToResponse,
    httpUnauthorizedError,
    httpUnprocessableError,
  ],
  "http/provider": [
    httpProviderHttpProvider,
    httpProviderRouterToken,
    httpProviderServe,
  ],
  auth: [
    authCreateAuth,
    authCreateAuthManager,
    authCreateBasicGuard,
    authCreateCookieJar,
    authCreateJwtGuard,
    authCreateSessionGuard,
  ],
  "auth/provider": [
    authProviderAuthToken,
    authProviderAuthMiddleware,
    authProviderAuthProvider,
    authProviderRequireAuth,
  ],
  orm: [ormDefineModel, ormModelNotFoundError],
  "orm/provider": [ormProviderDatabaseToken, ormProviderOrmProvider],
} as const;

describe("bunary entry point", () => {
  it("resolves every documented root export", () => {
    for (const [name, value] of Object.entries(ROOT)) {
      expect({ name, value }).toEqual({ name, value: expect.anything() });
    }
    expect(Object.keys(ROOT)).toHaveLength(60);
  });

  it("resolves every documented subpath export", () => {
    for (const [subpath, values] of Object.entries(SUBPATHS)) {
      values.forEach((value, index) => {
        expect({ subpath, index, value }).toEqual({
          subpath,
          index,
          value: expect.anything(),
        });
      });
    }
  });

  it("re-exports core's createApp, not a removed http one", () => {
    expect(createApp).toBe(core.createApp);
    expect("createApp" in http).toBe(false);
  });

  it("keeps the colliding cookie-jar factories on their own subpaths", () => {
    expect(httpCreateCookieJar).toBe(http.createCookieJar);
    expect(authCreateCookieJar).toBe(auth.createCookieJar);
    expect("createCookieJar" in bunary).toBe(false);
  });

  it("no longer re-exports APIs removed in the 0.4.0 sub-packages", () => {
    for (const removed of [
      "BaseModel",
      "Model",
      "Schema",
      "Migrator",
      "createMigrator",
      "defineOrmConfig",
      "auth",
      "installAuthPlugin",
      "getAuthManager",
      "setAuthManager",
      "clearAuthManager",
      "createCookieStorage",
      "getBunaryConfig",
      "clearBunaryConfig",
    ]) {
      expect({ removed, present: removed in bunary }).toEqual({
        removed,
        present: false,
      });
    }
  });
});
