# bunary (meta package) — agent instructions

`bunary` re-exports `@bunary/core`, `@bunary/http`, `@bunary/orm` and `@bunary/auth` flat and per
subpath. It owns no behaviour of its own: a change here is about which versions and exports it
re-exports.

## Definition of done

A PR that changes anything a user of the package can observe (exports, subpaths, dependency
ranges) is not done until, in the same PR:

- `docs/index.md` and `README.md` list exactly the exports and subpaths the package ships, and the
  install line names the current version.
- `package.json` `version` is bumped by semver (the tag-release workflow fails on a duplicate tag),
  and `CHANGELOG.md` has an entry under the new version, ending with the issue number.
- The re-export list matches each sub-package's actual exports at the versions in `dependencies`
  (a test proves every re-exported name resolves).

Internal-only changes (tests, refactors, CI) need a CHANGELOG entry only if they fix a
user-visible bug.

## Out of scope

No npm publishing and no CI/CD or release workflows: the maintainer publishes `@bunary/*` packages
by hand, in dependency order, after review.
