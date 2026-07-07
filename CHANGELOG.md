# Changelog

All notable changes to `bunary` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

