# CashMine Mobile & Web App

Payback and claims management application built with Expo SDK 58, React Native, and Feature-Sliced Design (FSD 2.1).

## Live Link

- **Live Production App**: [https://cashmine-app-66.web.app](https://cashmine-app-66.web.app)
- **Alternative URL**: [https://cashmine-app-66.firebaseapp.com](https://cashmine-app-66.firebaseapp.com)
- **Local Dev Server**: [http://localhost:8081](http://localhost:8081)

---

## How to Run Locally

### Prerequisites
- Node.js v20+ or v24+
- npm or bun

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file in the project root:
```bash
cp .env.example .env
```
Ensure `EXPO_PUBLIC_API_URL` is set:
```env
EXPO_PUBLIC_API_URL="api"
```

### 3. Run the App
- **Web**:
  ```bash
  npm run web
  # or: npx expo start --web
  ```
- **iOS / Android**:
  ```bash
  npm run ios
  # or: npm run android
  ```

### 4. Run Tests & Health Checks
- **Unit Tests (25 tests)**:
  ```bash
  npm test
  ```
- **TypeScript Check**:
  ```bash
  npx tsc --noEmit
  ```
- **Expo Diagnostics**:
  ```bash
  npx expo-doctor
  ```

---

## What Works

### 1. Authentication & Token Management
- First-open prompt asking for the API Bearer token with local storage persistence.
- In-app token change modal accessible anytime from headers.
- Route protection: redirecting to the Home screen only when an API token exists.
- Axios `401 Unauthorized` interceptor that clears stored tokens and re-prompts for authentication.

### 2. Balances (Home Screen)
- Displays individual asset balances (Available, Pending, Claiming).
- Computes estimated total portfolio USD value using live snapshot exchange rates.
- Snapshot freshness indicator tracking age against the 15-second API recomputation cycle.
- Pull-to-refresh (`RefreshControl`), manual retry buttons, and loading states.
- Performance-tuned `ScrollView` with off-screen view clipping, 60fps event throttling, and `React.memo` isolation.
- Direct "Claim" shortcut on eligible asset balance cards.

### 3. Claim Page (`/claim`)
- Asset selection chips displaying available balance and USD equivalents.
- Numeric amount input with a **MAX** button to quickly populate the full available balance.
- Live calculation displaying gross amount, network fee, and net received amount (`amount - fee`).
- Destination wallet selector fetching available payout channels via `GET /v1/claim-options`.
- Real-time client-side validation against all API rules:
  - Minimum claim amount (`minAmount <= amount`).
  - Available balance limit (`amount <= available`).
  - Precision limit (`decimals` decimal places).
  - Network fee coverage (`amount > fee`).
  - Destination selection required.
- Review confirmation modal before submission.
- Idempotent claim submission (`POST /v1/claims` with UUID `Idempotency-Key` header).
- Live claim follower polling `GET /v1/claims/{id}` every 3 seconds until settlement (`pending` ~20s, `completed`, `failed`).
- Displays failure reason with notification that funds returned to available balance if rejected.
- Local storage persistence of active claim ID across page reloads.

### 4. Code Quality & Architecture
- Feature-Sliced Design (FSD 2.1) layered architecture.
- Complete separation of styles into dedicated `*.styles.ts` files.
- Zero comments across all application and test code files.
- High-coverage unit test suite validating amount parsing, validation rules, fees, and portfolio totals.
