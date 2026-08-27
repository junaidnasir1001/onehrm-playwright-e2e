# Playwright Automation Framework

A production-ready Playwright automation framework with Page Object Model, Smart Page Objects, role-based testing, and CI/CD integration — built and battle-tested on a live enterprise HRM system.

---

## ✅ Proven in Production

This framework is not a demo. It was built for **OneHRM** — an enterprise HR management system handling payroll, salary deductions and employee financial records for real organizations. 
Not a tutorial project: it ran against a live product, under production constraints, with real releases depending on it.

**Results at handover:**

| Metric | Result |
|---|---|
| E2E tests automated | **50 tests** |
| Full CI pipeline runtime | **~17 minutes** |
| Manual QA cycle eliminated | **2 weeks → fully automated** |

*I no longer work on OneHRM and no longer have access to that environment, so the
CI pipeline in this repository does not run against it. What's here is the framework
itself — complete, documented, and ready to point at your own application.*

Before this framework, every release required 2 weeks of manual regression testing — and bugs still reached production. By handover, every push to `main` was validated in under 17 minutes before any release decision was made.

---

## 🛡️ Business Risk Coverage

Tests are designed around business risk — not technical coverage metrics. Every critical flow that could cost the business money, trust, or compliance is protected first.

| Business Risk Area | What's Protected | Risk Level |
|---|---|---|
| Payroll & Salary | Additions, deductions, salary setup, loans, overtime, e-wallet | 🔴 Critical |
| Access Control | Role creation, permission assignment, role-to-employee mapping | 🔴 Critical |
| Authentication | Login flows, session handling, credential validation | 🔴 Critical |
| Employee Records | Profiles, documents, dependants, qualifications, bank accounts | 🟠 High |
| Org Structure | Company, branch, department, designation, company policy | 🟠 High |
| Leave & Attendance | Holiday calendars, holiday entries, office shift management | 🟡 Medium |
| Internal Comms | Announcements — create, edit, delete | 🟡 Medium |

**Not covered:** API-layer validation, visual regression and performance benchmarks were
scoped but never built. Naming the gaps matters as much as naming the coverage — a suite
that reports everything green is the one you shouldn't trust.

## Release confidence scoring

While building this suite I kept wanting one number that answered "is this release safe to ship" — pass/fail logs don't. So I built one: **SQAline**, a tool that scores release confidence per commit rather than just listing results. It's my own product, still early.
This project is where the idea came from.

Reporter on npm: [`@sqaline/playwright-reporter`](https://www.npmjs.com/package/@sqaline/playwright-reporter) · Product: [sqaline.com](https://app.sqaline.com)

![SQAline dashboard](./screenshots/sqaline-dashboard.png)
*SQAline scoring this project's runs. Self-issued — my own tool, not third-party validation.*

---

## Where I'd take this next

The suite covered the highest-risk flows first. These are the next layers, in the order
I'd build them:

1. **API-layer validation** — salary computation checked against expected outputs, response
   schema checking. A UI test confirms the screen rendered; only an API assertion confirms
   the maths.
2. **Multi-role scenarios** — admin vs manager vs employee as a matrix rather than
   separate specs.
3. **Cross-browser** — Firefox and WebKit alongside Chromium.
4. **Visual regression on critical pages** — payslip and dashboard first, where a layout
   break becomes a support ticket.
5. **PR-level gates** — block a merge below a confidence threshold instead of reporting
   after the fact.

Ordering principle throughout: protect what costs money or trust first. Chase coverage
percentages never.

---

## 🚀 Quick Start

### Create a New Project

```bash
# Step 1: Copy this entire directory to your new project
cp -r /path/to/automation-framework /path/to/my-new-automation

# Step 2: Navigate to your new project
cd /path/to/my-new-automation

# Step 3: Install dependencies
npm install

# Step 4: Install Playwright browsers
npx playwright install

# Step 5: Configure environment
cp .env.example .env
# Edit .env with your application URL and credentials

# Step 6: Start writing tests
# Create your page objects in pages/
# Write your tests in tests/
```

### Run Tests

```bash
# Run all tests
npm test

# Run framework verification tests
npm test tests/framework-verification.spec.ts

# Run with UI mode
npm run test:ui

# Run in headed mode
npm run test:headed

# Run in debug mode
npm run test:debug

# View HTML test report
npm run test:report

# Record new tests with codegen
npm run test:codegen
```

---

These are capabilities the framework provides. Not all of them were enabled on the OneHRM suite — see Business Risk Coverage above for what actually ran in production.

## ✨ Features

### Built-in Reliability
- **Flaky Test Tracking** — automatically identifies unstable tests across runs and generates fix suggestions
- **Built-in Retries** — configurable retry mechanism for transient failures
- **Trace Recording** — automatic trace capture on first retry for debugging
- **Video Recording** — captures full video of test failures for review

### Page Object Model
- **BasePage** — 50+ utility methods covering navigation, interaction, assertions, waits, and API mocking
- **SmartPageObject** — auto-healing selectors with multi-selector fallback chains; built for dynamic and evolving UIs
- **Role-Based Fixtures** — pre-authenticated test contexts per user role with reusable login/logout logic

### API Testing Layer
- **Type-Safe API Client** — clean wrapper around Playwright's request API
- **Error Handling** — automatic validation with detailed, actionable error messages
- **Response Validation** — schema checking and type safety on every response
- **Authentication Support** — Bearer token and API key handling out of the box

### Visual Regression Testing
- **Pixel-by-Pixel Comparison** — detects unintended UI changes before they reach users
- **Baseline Management** — simple baseline updates when UI changes intentionally
- **Configurable Thresholds** — adjustable sensitivity per component or page

### CI/CD Integration
- **GitHub Actions** — ready-to-use workflow, no configuration required
- **Multi-Browser Matrix** — test on Chromium, Firefox, and WebKit
- **SQAline Integration** — confidence score per commit, not just raw pass/fail logs
- **Artifact Upload** — automatic upload of test results and screenshots on failure

**Not covered on this project:** API-layer validation, visual regression and performance gates. The framework supports the first two — they were never switched on for this suite. Naming the gaps matters as much as naming the coverage: a suite that reports everything
green is the one you shouldn't trust.

---

## 📁 Structure

```
automation-framework/
├── pages/
│   ├── BasePage.ts               # Core utilities (50+ methods)
│   ├── SmartPageObject.ts        # Auto-healing page objects
│   ├── configs/                  # Field configuration templates
│   └── examples/                 # Example page objects
├── utils/
│   ├── test-data.ts              # Test data generation
│   ├── test-results-parser.ts    # Result parsing and formatting
│   ├── llm-summarizer.ts         # AI-powered test summaries (optional)
│   ├── api-client.ts             # Type-safe API testing layer
│   ├── flaky-tracker.ts          # Flaky test detection and reporting
│   ├── visual-comparator.ts      # Visual regression testing
│   └── types.ts                  # Shared type definitions
├── fixtures/
│   └── base-fixtures.ts          # Role-based fixture patterns
├── tests/
│   ├── examples/                 # Example tests (copy and customise)
│   └── framework-verification.spec.ts  # Framework health checks
├── docs/
│   ├── FRAMEWORK_GUIDE.md        # Architecture and core concepts
│   ├── PATTERN_GUIDE.md          # Coding patterns and best practices
│   └── UPDATE_GUIDE.md           # How to update without breaking tests
├── .github/
│   └── workflows/
│       └── test.yml              # GitHub Actions CI workflow
├── playwright.config.ts
├── .env.example
└── README.md
```

---

## 🔧 Usage

### Create a Page Object

```typescript
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly emailInput = 'input[name="email"]';
  private readonly passwordInput = 'input[name="password"]';
  private readonly loginButton = 'button[type="submit"]';

  async login(email: string, password: string) {
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }
}
```

### SmartPageObject — Auto-Healing Selectors

```typescript
import { SmartPageObject, FieldConfig } from './SmartPageObject';

export class FormPage extends SmartPageObject {
  private readonly fields: Record<string, FieldConfig> = {
    email: {
      name: 'Email',
      selectors: [
        'input[name="email"]',
        'input[type="email"]',
        '[data-testid="email"]'
      ],
      required: true,
      type: 'text'
    }
  };

  async fillForm(data: any) {
    await this.smartFill(this.fields.email, data.email);
  }
}
```

### Role-Based Fixtures

```typescript
import { test as base } from '@playwright/test';

export const testAsAdmin = base.extend({
  page: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await loginAsAdmin(page);
    await use(page);
    await context.close();
  }
});

testAsAdmin('admin can access settings', async ({ page }) => {
  // Runs as a fully authenticated admin — no login steps needed
});
```

### Flaky Test Tracking

```typescript
import { flakyTracker } from './utils/flaky-tracker';

test.beforeEach(async ({}, testInfo) => {
  flakyTracker.trackTestExecution(testInfo);
});

test.afterEach(async ({}, testInfo) => {
  if (testInfo.status === 'failed') {
    flakyTracker.recordFailure(testInfo);
  }
});

// After run: generates report with flakiness scores and fix suggestions
flakyTracker.printSummary();
flakyTracker.generateReport();
```

### API Testing

```typescript
import { APIClient } from './utils/api-client';

const api = new APIClient(page, 'https://api.example.com', {
  apiKey: process.env.API_KEY,
});

const users = await api.get('/api/users');
expect(users.data.users).toHaveLength(10);

const created = await api.post('/api/users', { name: 'John' });
expect(created.status).toBe(201);
```

### Visual Regression Testing

```typescript
import { VisualComparator } from './utils/visual-comparator';

const comparator = new VisualComparator(
  page,
  'screenshots/baseline',
  'screenshots/current',
  0.01  // 1% pixel difference threshold
);

test('dashboard has no visual regression', async ({ page }) => {
  await page.goto('/dashboard');
  await comparator.compare(page, 'dashboard');
});
```

---

## 📝 Environment Configuration

```env
# Application
QA_BASE_URL=https://your-app.example.com

# Authentication
TEST_ADMIN_EMAIL=admin@example.com
TEST_ADMIN_PASSWORD=your-password
TEST_USER_EMAIL=user@example.com
TEST_USER_PASSWORD=your-password

# Optional — AI-powered test summaries
OPENAI_API_KEY=your-key

# Optional — API testing
API_KEY=your-key
```

---

## 📊 Reporting

| Report | What It Shows | Where |
|---|---|---|
| GitHub Actions log | Raw test pass/fail per run | CI pipeline |
| Playwright HTML report | Per-test duration, traces, screenshots | `npm run test:report` |
| Flaky test report | Flakiness scores, failure patterns, fix suggestions | `reports/flaky-report.json` |
| Visual regression report | Pixel diff results per page | `screenshots/` |
| SQAline dashboard | Release confidence score, run history, trend analysis | [sqaline.com](https://sqaline.com) |

---

## 🛠️ Troubleshooting

**Tests failing randomly?**
- Check `reports/flaky-report.json` for patterns and fix suggestions
- Switch to `SmartPageObject` for auto-healing selectors
- Increase retries in `playwright.config.ts`

**Selectors not working?**
- Use `data-testid` attributes wherever the codebase allows
- Add fallback selectors in `SmartPageObject` field configs
- Run `npm run test:debug` to step through the failing test

**Framework needs updating?**
- Check `CHANGELOG.md` for breaking changes before updating
- Back up your custom files, copy new framework files, merge changes

---

## 📖 Documentation

- [Framework Guide](./docs/FRAMEWORK_GUIDE.md) — architecture, design decisions, core concepts
- [Pattern Guide](./docs/PATTERN_GUIDE.md) — coding patterns and best practices
- [Update Guide](./docs/UPDATE_GUIDE.md) — how to update the framework without breaking tests
- [Changelog](./CHANGELOG.md) — version history

---

## 👋 About

Built by **Junaid Nasir** — QA automation engineer working in Playwright, GitHub Actions CI/CD, and release-confidence tooling for production systems.

This framework is the foundation that replaced a two-week manual regression cycle on a live enterprise HRM system with 50 automated E2E tests across its critical business flows.

I build automation as a QA engineer — so it's actually tested. If your team is shipping behind a manual regression pass, or sitting on a suite nobody trusts any more, I'm happy to take a look. **Open to freelance projects — Playwright automation, CI/CD setup, QA strategy:**

- 🔗 [Upwork Profile](https://www.upwork.com/freelancers/junaidnasir)
- 🔗 [sqaline.com](https://sqaline.com) — QA automation services
- 📊 [SQAline — Release Copilot](https://sqaline.com)
- 🐙 [GitHub](https://github.com/junaidnasir1001)

---

*Happy testing! 🚀*
