# Playwright Automation Framework

[![Playwright Demo CI](https://github.com/junaidnasir1001/onehrm-playwright-e2e/actions/workflows/playwright.yml/badge.svg)](https://github.com/junaidnasir1001/onehrm-playwright-e2e/actions/workflows/playwright.yml)

A TypeScript and Playwright framework showing page objects, reusable test utilities, failure artifacts, and a GitHub Actions pipeline against a deterministic local application.

## Public demo suite

The public CI workflow starts [The Internet](https://github.com/saucelabs/the-internet) in a pinned Docker container and runs four Chromium tests against `localhost`:

- successful login with the application's published demo credentials;
- rejected login with invalid credentials;
- dropdown form interaction and state verification;
- condition-based waiting for dynamically loaded content.

The tests do not depend on a live third-party URL, shared data, or repository secrets. The existing OneHRM files demonstrate the larger page-object framework, but require private application access and are intentionally excluded from public CI.

## Run locally

Prerequisites: Node.js 22+, npm, and Docker.

```bash
npm ci
npx playwright install chromium
npm run demo:up
npm run test:demo
npm run demo:down
```

`npm run demo:up` waits for the container health check. To run the same explicit readiness check used by CI:

```bash
npm run demo:wait
```

The demo defaults to `http://127.0.0.1:7080`. Override it when needed:

```bash
BASE_URL=http://127.0.0.1:7080 npm run test:demo
```

No credentials or other environment variables are required for the public suite.

## Test design

The example suite uses `pages/demo/TheInternetPage.ts` for navigation and interactions. Tests assert user-visible outcomes, begin with a fresh browser context, and use Playwright's web-first assertions instead of fixed delays.

CI uses one retry and one worker for diagnostics and predictable resource use. Local runs have no retries and use Playwright's normal parallel execution.

## Reports and failure artifacts

Each run writes:

- an HTML report to `playwright-report/`;
- a JSON result file to `reports/demo-results.json`;
- screenshots and retained videos for failures in `test-results/`;
- a trace when a CI retry is needed.

Open the local HTML report with:

```bash
npm run test:report
```

GitHub Actions uploads these files as the `playwright-report` artifact for 14 days, including failed runs.

## Continuous integration

`.github/workflows/playwright.yml` runs on pushes and pull requests to `main` and supports manual dispatch. It installs dependencies from `package-lock.json`, starts the local application, polls `/login` with a bounded timeout, runs the suite, uploads diagnostics, and always stops the container.

The badge at the top of this README is GitHub's native status badge for that exact workflow.

## OneHRM project history

This framework was originally built for OneHRM, an enterprise HR management system. It ran against a live product and covered payroll, employee records, access control, organization structure, leave, attendance, and internal communications.

Results recorded at handover:

| Metric                           | Result           |
| -------------------------------- | ---------------- |
| End-to-end tests automated       | 50 tests         |
| Full CI pipeline runtime         | About 17 minutes |
| Previous manual regression cycle | 2 weeks          |

I no longer work on OneHRM and no longer have access to that environment. Those application-specific tests are retained as framework examples, but this repository does not claim that they are currently passing or that the private application remains unchanged.

API-layer validation, visual regression, and performance benchmarks were scoped but not built for the OneHRM suite.

## Release confidence scoring

The OneHRM work led to **SQAline**, my own early-stage tool for scoring release confidence per commit. The dashboard below is self-issued product output, not third-party validation.

[Playwright reporter on npm](https://www.npmjs.com/package/@sqaline/playwright-reporter) | [SQAline](https://app.sqaline.com)

![SQAline dashboard](./screenshots/sqaline-dashboard.png)

## Framework structure

```text
pages/
  demo/                    Public demo page object
  employee/                Extended page-object examples
  holiday-management/
  leave-management/
  organization/
tests/
  demo/                    Four tests run by public CI
  employee/                Private-application examples
  holiday-management/
  leave-management/
  organization/
utils/                     API, reporting, test-data, and reliability helpers
playwright.demo.config.ts  Isolated public-suite configuration
playwright.config.ts       Extended framework configuration
compose.yml                Pinned local test application
```

Further framework documentation:

- [Framework Guide](./docs/FRAMEWORK_GUIDE.md)
- [Pattern Guide](./docs/PATTERN_GUIDE.md)
- [Update Guide](./docs/UPDATE_GUIDE.md)
- [Changelog](./CHANGELOG.md)

## About

<img src="https://github.com/junaidnasir1001.png?size=120" width="96" height="96" alt="Junaid Nasir" />

Built by **Junaid Nasir**, a QA automation engineer focused on Playwright, reliable browser automation, and CI/CD test pipelines.

- [GitHub](https://github.com/junaidnasir1001)
- [Upwork](https://www.upwork.com/freelancers/junaidnasir)
- [SQAline QA automation services](https://sqaline.com)
