<p align="center">
  <img src="https://bunary.dev/bunary-orange-black.svg" alt="Bunary" width="100" />
</p>

# Bunary

A Bun-first backend framework inspired by Laravel's elegant developer experience.

Requires Bun ≥ 1.4.0.

## Installation

```bash
bun add bunary@^0.4.0
```

This installs the complete Bunary framework at 0.4.0:
- `@bunary/core` - Application container, providers, config, environment and validation helpers
- `@bunary/http` - Router, middleware, response helpers, CORS, rate limiting, static files, SSE
- `@bunary/auth` - Session, JWT and Basic guards
- `@bunary/orm` - `defineModel()` models on [Drizzle](https://orm.drizzle.team) (`drizzle-orm` is a peer dependency, installed automatically by `bun add`)

Every export of those packages and of their `/provider` integrations is available flat from `bunary`, except `createCookieJar` and the `CookieJar` type: `@bunary/http` and `@bunary/auth` both define them, with different types, so import them from `bunary/http` or `bunary/auth`. The full export list is in [docs/index.md](./docs/index.md).

## Quick Start

```typescript
import { cors, createApp, createRouter, httpProvider, isDev, serve } from "bunary";

const router = createRouter();

router.use(cors({ origin: "*" }));

router.get("/", (ctx) => ctx.json({ message: "Hello from Bunary!" }));

router.get("/users/:id", (ctx) => ({
  id: ctx.params.id,
  name: `User ${ctx.params.id}`,
}));

router.group("/api", (api) => {
  api.get("/health", () => ({ status: "ok" }));
});

const app = await createApp({
  config: { app: { name: "my-api" }, http: { port: 3000 } },
  providers: [httpProvider(router)],
}).boot();

serve(app);
if (isDev()) console.log("Development mode");
```

## Subpath Imports

Each package also has its own subpath, mirroring its exports exactly:

| Subpath | Re-exports |
| --- | --- |
| `bunary` | everything below, flat (minus `createCookieJar` / `CookieJar`) |
| `bunary/core` | `@bunary/core` |
| `bunary/http` | `@bunary/http` |
| `bunary/http/provider` | `@bunary/http/provider` |
| `bunary/auth` | `@bunary/auth` |
| `bunary/auth/provider` | `@bunary/auth/provider` |
| `bunary/orm` | `@bunary/orm` |
| `bunary/orm/provider` | `@bunary/orm/provider` |

```typescript
import { createApp, defineConfig, env } from "bunary/core";
import { createRouter, createCookieJar } from "bunary/http";
import { httpProvider, serve } from "bunary/http/provider";
import { createAuth, createJwtGuard } from "bunary/auth";
import { authProvider, requireAuth } from "bunary/auth/provider";
import { defineModel } from "bunary/orm";
import { DatabaseToken, ormProvider } from "bunary/orm/provider";
```

## Individual Packages

You can also install packages individually:

```bash
bun add @bunary/core@^0.4.0                # Application, config, environment
bun add @bunary/http@^0.4.0                # HTTP routing
bun add @bunary/auth@^0.4.0                # Authentication
bun add @bunary/orm@^0.4.0 drizzle-orm     # Models
```

## Documentation

See [docs/index.md](./docs/index.md) for the full export list, and [bunary.dev](https://bunary.dev) for the framework documentation.

## License

MIT
