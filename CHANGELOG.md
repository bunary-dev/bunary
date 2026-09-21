# Changelog

All notable changes to `bunary` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.1] - 2026-09-21

### Fixed

- Removed the `OrmConfig` type re-export from the root entry; `@bunary/core` ≥ 0.2.0 no longer exports it, which broke typecheck and d.ts emit once core was bumped (#1)

## [0.2.0] - 2026-09-21

### Changed

- **Requires Bun ≥ 1.4.0** (`engines.bun`); `.bun-version` pins 1.4.2 for CI and contributors
- Toolchain: `@types/bun` replaces `bun-types`, `typescript` ^7 and `@biomejs/biome` 2.5.1 pinned as devDependencies; `bun.lock` committed
- `tsconfig.json` is now self-contained (previously extended a sibling package's config path, which only resolved by coincidence of the local monorepo checkout) and aligned with Bun 1.4 `bun init` defaults (`module: Preserve`, `verbatimModuleSyntax`, `noUncheckedIndexedAccess`, `noImplicitOverride`, `noFallthroughCasesInSwitch`)
- CI: Bun version read from `.bun-version`, plus a non-required `bun latest` canary job; build job verifies the publish tarball with `bun pm pack --dry-run`; `tag-release.yml` on `actions/checkout@v7`
- `exports` conditions now list `types` before `import`/`default`; added `./package.json` subpath
- Added `publishConfig.access: public` and `sideEffects: false`
- Added `biome.json`, `lint`/`format` scripts covering `src` and `tests`
- Added `bunfig.toml` with coverage collection and threshold, and a smoke test covering the package's re-export surface
- Added `.github/dependabot.yml` (npm weekly + github-actions monthly)

### Fixed

- Added missing `LICENSE` file (MIT) to the repo and the published tarball

## [0.1.0] - 2026-01-31

### Added

- First minor release — API stable for development use until 1.0.0
- Re-export `createConfig`, `getBunaryConfig`, `clearBunaryConfig` from `@bunary/core`
- Re-export `createAuth`, `createBasicGuard`, `createJwtGuard`, `createCookieStorage`, `AuthContext` from `@bunary/auth`

### Changed

- Bumped `@bunary/core`, `@bunary/http`, `@bunary/auth` to ^0.1.0
- Updated README: `app.listen({ port })` API, auth example uses `createAuth`
- Aligned exports with current package APIs

## [0.0.1] - 2026-01-27

### Added

- Initial umbrella package release re-exporting `@bunary/core`, `@bunary/http`, and `@bunary/auth`
- Subpath entrypoints: `bunary/core`, `bunary/http`, `bunary/auth`

