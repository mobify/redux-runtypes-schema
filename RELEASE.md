# Release process

`redux-runtypes-schema` is managed by Mobify's
[Mobitron](github.com/mobify/mobitron) bot. Releases are started by messaging
@mobitron in Slack. @mobitron creates a release branch from `develop`, updates
the version numbers, and merges to `master`.

Once that is done, a CircleCI build will run and push the updated code to npm.

## Starting a release

Message @mobitron in Slack. `@mobitron release redux-runtypes-schema
minor|patch`. Choose between `minor` and `patch` when doing the release.
Releases should follow [semver](semver.org).
