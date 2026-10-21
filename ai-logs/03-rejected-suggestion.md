# AI Log 3: Disagreed / Rejected Suggestion

## Context
When handling the request to "optimize ScrollView in the home screen", the AI initially considered replacing the root `ScrollView` with a `FlatList` component.

## Proposal Considered by AI
Convert the entire Home screen composition into a `FlatList` with `ListHeaderComponent` containing the Total Balance Card and Freshness Indicator, rendering `BalanceItemCard` items via `renderItem`.

## Why It Was Rejected
1. **Bounded Data Size**: The balances endpoint returns a small snapshot list of assets (typically 1 to 5 cryptocurrency tokens such as USDT, ETH, BTC), not an infinite feed of thousands of items.
2. **Virtualization Drawbacks**: `FlatList` virtualization adds unnecessary memory overhead, unmounting calculations, and potential blanking flashes on quick scrolls for short lists.
3. **Pull-to-Refresh & Header Sync**: A continuous `ScrollView` provides natural iOS bounce physics and smooth pull-to-refresh across the total balance, freshness indicator, and asset cards simultaneously.
4. **Better Optimization Path**: Instead of switching components, the `ScrollView` was tuned using React Native native props:
   - `removeClippedSubviews={Platform.OS !== 'web'}`
   - `scrollEventThrottle={16}`
   - `keyboardShouldPersistTaps="handled"`
   - `contentInsetAdjustmentBehavior="never"`
   - `bounces={true}` & `alwaysBounceVertical={true}`
   - Memoizing child cards via `React.memo` to isolate 1-second freshness timer re-renders.
