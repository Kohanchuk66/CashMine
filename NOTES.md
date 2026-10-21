# Architecture & Implementation Notes

## 1. Decisions

### Architecture: Feature-Sliced Design (FSD 2.1)
- **Choice**: Organized the codebase into standardized FSD layers: `app`, `pages`, `widgets`, `features`, `entities`, and `shared`.
- **Alternatives**: Flat structure (`components/`, `screens/`, `hooks/`) or arbitrary feature folders.
- **Rationale**: FSD establishes strict directional dependencies and domain boundaries. Route files in `src/app/` remain thin screen wrappers delegating directly to `pages/`, preserving clean Expo Router compatibility while keeping business logic modular and testable.

### Data Fetching & Network Layer: Axios Client + TanStack React Query
- **Choice**: Configured an Axios client with interceptors for token injection and normalized error handling (`{ error: { code, message, field } }`), paired with typed TanStack React Query hooks.
- **Alternatives**: Raw `fetch` with React `useEffect` or state managers like Redux/Zustand.
- **Rationale**: Balances recompute every 15 seconds, and pending claims settle in approximately 20 seconds. React Query handles automatic background polling, query deduplication, retry logic, and cache invalidation on mutations with minimal boilerplate.

### Authentication & Token Gate
- **Choice**: Stored API tokens in browser `localStorage` backed by an in-memory fallback and a reactive event bus (`token-events.ts`), gated at the root layout with an `isReady` hydration flag.
- **Alternatives**: Hardcoded token, route-by-route checks, or standard React context without storage hydration safety.
- **Rationale**: React Native Web requires avoiding SSR/hydration mismatches. The `isReady` flag prevents redirection flickers on first mount, while Axios response interceptors immediately wipe invalid tokens on `401 Unauthorized` responses and prompt for re-entry.

### Claim Submission & Idempotency
- **Choice**: Generated client-side UUID `Idempotency-Key` headers for `POST /v1/claims`, stored active claim IDs in local storage, and polled `GET /v1/claims/{id}` every 3 seconds until settlement (`completed` or `failed`).
- **Alternatives**: Fire-and-forget submission without polling or server-only idempotency tracking.
- **Rationale**: Protects users against double submissions caused by network retries or repeated button taps. Polling provides immediate feedback during the ~20-second settlement window without requiring WebSockets.

### Native Node Test Runner
- **Choice**: Employed Node 24's built-in `node:test` and `node:assert/strict` with native TypeScript type stripping.
- **Alternatives**: Heavy testing frameworks (Jest, Babel, ts-jest, Vitest).
- **Rationale**: Zero external test runner dependencies, instant execution (~140ms for 25 tests), and full type fidelity with `npx tsc --noEmit`.

---

## 2. Working with AI

### Prompt Adjustment
- **Incident**: Initial requests to generate endpoints and components produced verbose code with extensive JSDoc comments, inline annotations, and collocated styles inside component files.
- **Adjustment**: Clarified constraints with strict directives: *"do not write comments"* and *"all styles must be in a separate file"*. Subsequent code generations strictly placed styling in dedicated `*.styles.ts` files and omitted all code comments.
- **Reference**: Detailed in [ai-logs/01-prompt-adjustment.md](file:///Users/illya/Applications/CashMine/ai-logs/01-prompt-adjustment.md) and recorded in [ai-logs/transcript.jsonl](file:///Users/illya/Applications/CashMine/ai-logs/transcript.jsonl).

### Risky Output & Typecheck Detection
- **Incident**: During the creation of `ClaimForm.tsx` and `ClaimConfirmModal.tsx`, the AI referenced `theme.border` (assuming a standard token existed) and mismatched an opening `<ThemedView>` tag with a closing `</View>`.
- **Detection & Resolution**: The error was caught immediately by running `npx tsc --noEmit` as part of the verification workflow. The theme definitions in `src/shared/config/theme/theme.ts` were inspected, correcting the divider color to `theme.backgroundSelected` and fixing the JSX tag pair before deployment.
- **Reference**: Detailed in [ai-logs/02-risky-output-typecheck.md](file:///Users/illya/Applications/CashMine/ai-logs/02-risky-output-typecheck.md) and recorded in [ai-logs/transcript.jsonl](file:///Users/illya/Applications/CashMine/ai-logs/transcript.jsonl).

### Disagreed / Rejected Suggestion
- **Incident**: When tasked with optimizing `ScrollView` on the home screen, the AI considered replacing `ScrollView` with a virtualized `FlatList`.
- **Reason for Rejection**: The Balances screen displays a modest, bounded set of assets (typically 1 to 5 cryptocurrency tokens). `FlatList` introduces virtualization overhead, blanking frames on rapid scrolling, and layout jitter for short lists. Instead, `ScrollView` was retained and optimized with `removeClippedSubviews`, `scrollEventThrottle={16}`, `keyboardShouldPersistTaps="handled"`, `contentInsetAdjustmentBehavior="never"`, and `React.memo` on cards to isolate 1-second freshness re-renders.
- **Reference**: Detailed in [ai-logs/03-rejected-suggestion.md](file:///Users/illya/Applications/CashMine/ai-logs/03-rejected-suggestion.md) and recorded in [ai-logs/transcript.jsonl](file:///Users/illya/Applications/CashMine/ai-logs/transcript.jsonl).

---

## 3. Not Done / Known Issues

1. **Activity History UI Screen**:
   - The API requests (`getActivity`) and query hooks (`useActivity`, `useInfiniteActivity` with cursor pagination) are fully implemented in `src/shared/api/`, but a dedicated Activity feed tab/screen has not yet been assembled in the UI.
   - *Next Step*: Build an `ActivityScreen` in `src/pages/activity/` with infinite scroll, transaction filters (accruals, reversals, claims), and status badges.

2. **Native Secure Storage for Mobile**:
   - The auth token is currently stored in browser `localStorage` with an in-memory fallback. While ideal for web, on native iOS/Android builds, sensitive bearer tokens should reside in encrypted storage.
   - *Next Step*: Integrate `expo-secure-store` with platform conditional loading (`Platform.OS === 'web' ? localStorage : SecureStore`).

3. **Custom Payout Destination Entry**:
   - The claim flow currently supports selecting from registered destinations returned by `/v1/claim-options`.
   - *Next Step*: Add support for user-defined recipient wallet addresses with checksum validation and ENS resolution.

4. **Offline Query Persistence**:
   - React Query cache currently resides in memory.
   - *Next Step*: Attach `@tanstack/query-sync-storage-persister` to persist the latest balance snapshot across offline sessions.
