<p align="center">
  <img src="https://bunary.dev/bunary-orange-black.svg" alt="Bunary" width="100" />
</p>

# Bunary

A Bun-first backend framework inspired by Laravel's elegant developer experience.

## Installation

```bash
bun add bunary
```

This installs the complete Bunary framework including:
- `@bunary/core` - Configuration and environment helpers
- `@bunary/http` - HTTP routing and middleware
- `@bunary/auth` - Authentication guards

## Quick Start

```typescript
import { createApp, env, isDev } from "bunary";

const app = createApp();

// Middleware
app.use(async (ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`);
  return next();
});

// Routes
app.get("/", () => ({ message: "Hello from Bunary!" }));

app.get("/users/:id", (ctx) => ({
  id: ctx.params.id,
  name: `User ${ctx.params.id}`,
}));

// Route groups
app.group("/api", (router) => {
  router.get("/health", () => ({ status: "ok" }));
  router.get("/version", () => ({ version: "1.0.0" }));
});

// Start server
const port = 3000;
app.listen({ port });
console.log(`Server running on http://localhost:${port}`);
if (isDev()) console.log("Development mode");
```

## Subpath Imports

You can also import directly from Bunary submodules:

```typescript
import { env, defineConfig } from "bunary/core";
import { createApp } from "bunary/http";
import { createAuth, createJwtGuard } from "bunary/auth";
```

## Individual Packages

You can also install packages individually:

```bash
bun add @bunary/core    # Just config/env helpers
bun add @bunary/http    # Just HTTP routing
bun add @bunary/auth    # Just authentication
```

## Documentation

Visit [bunary.dev](https://bunary.dev) for full documentation.

## License

MIT
