# PayPal Credit Messaging

---

[![Compare Snapshots](https://github.com/paypal/paypal-messaging-components/actions/workflows/snapshotCompare.yml/badge.svg)](https://github.com/paypal/paypal-messaging-components/actions/workflows/snapshotCompare.yml) [![dependencies Status](https://david-dm.org/paypal/paypal-messaging-components/status.svg)](https://david-dm.org/paypal/paypal-messaging-components) [![devDependencies Status](https://david-dm.org/paypal/paypal-messaging-components/dev-status.svg)](https://david-dm.org/paypal/paypal-messaging-components?type=dev)

A messaging component allowing easy integration of PayPal Credit Messages onto your site.

## Dev Docs

See **[developer.paypal.com/docs/business/pay-later/integrate/](https://developer.paypal.com/docs/business/pay-later/integrate/)**

---

## Development

Please feel free to follow the [Contribution Guidelines](./CONTRIBUTING.md) to contribute to this repository. PRs are welcome, but for major changes please raise an issue first.

### Quick Setup

#### For PayPal Internal Testing Only:

-   Make a copy of `.env.boilerplate` and rename the copy to `.env`.
-   Set `STAGE_URL` to be the base url name for internal stage testing, including `www.` and `.com`.

Set up your env:

```bash
npm install
```

Run tests:

```bash
npm test
```

Run in dev mode:

```bash
npm start
```

## Creating a Bundle

```
npm run build
```

Options

-   `-v` - version, optional
-   `-e` - environment, one of `production`, `sandbox` or `stage`
-   `-m` - module, optional, one of `library`, `components`, or `render`
-   `-t` - tag, optional, name of the stage tag
-   `-s` - testEnv, optional, link to a test environment

The command you'll most likely need to use is

```
npm run build -- -t stage-tag-name -s test-environment-link
```

## Scripts

-   `build`

    -   runs [semantic-release/assets.sh](./scripts/semantic-release/assets.sh) to build assets for all environments in `dist/`

-   `build:<env>` where `<env>` is `stage`, `sandbox`, or `production`

    -   runs webpack with `NODE_ENV=<env>`

-   `build:analyze`

    -   runs [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) in static gzip mode

-   `build:demo`

    -   runs webpack with `env.demo` set

-   `dev`

    -   runs webpack-dev-server with `TARGET=sdk`, `NODE_ENV=local`, `STAGE_TAG=local`

-   `dev:<target>` where `<target>` is `standalone`, `modal`, or `lander`

    -   runs webpack-dev-server with `TARGET=<target>`, `NODE_ENV=local`, `STAGE_TAG=local`
    -   note: `modal` uses `TARGET=standalone-modal`

-   `dev:<env>` where `<env>` is `stage`, `sandbox`, or `production`

    -   runs webpack-dev-server with `TARGET=standalone` and `NODE_ENV=<env>`

-   `lint`

    -   checks our codebase for style issues

-   `preinstall`

    -   runs automatically on `npm install` and removes `node_modules/`

-   `start`

    -   runs `npm run dev`

-   `test`

    -   runs all unit tests

-   `test:<type>` where `<type>` is `func`, `func:nosnaps` or `func:ciupdate`
    -   `func` runs all snapshot functional tests
    -   `func:nosnaps` runs all non-snapshot functional tests
    -   `func:ciupdate` updates all snapshots generated by functional tests

## Testing

### Functional

1. Run `npm run dev:ci` in one command line instance
2. In a second window run the below command, which runs tests for a specific `integrationType`
    - `integrationType` is one of: `api`, `sdk`, `standalone`, or `webpage`

```
CONFIG_PATH={locale}/{account} npm run test:func:snapshots -- --testPathPattern {integrationType}
```

Example

```
CONFIG_PATH=US/DEV_US_MULTI npm run test:func:snapshots -- --testPathPattern sdk
```

Alternatively, you can remove `-- --testPathPattern {integrationType}` and just run the following to run tests on an account for all integration types.

```
CONFIG_PATH={locale}/{account} npm run test:func:snapshots
```

## Releasing

This package is published weekly, **Every Wednesday**. Please [view our Changelog](CHANGELOG.md) to stay updated with bug fixes and new features.
