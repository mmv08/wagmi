---
"@wagmi/core": minor
"wagmi": minor
"@wagmi/vue": minor
"@wagmi/solid": minor
---

Added `TransactionRevertedError`. `waitForTransactionReceipt` now throws it when the receipt marks the transaction as reverted; the error it threw before (the revert reason, or the error that stopped the lookup) is on `cause`.

Fixed `useWaitForTransactionReceipt` reporting a reverted transaction about seven seconds after its receipt arrived. `waitForTransactionReceiptQueryOptions` now sets `retry` so that TanStack Query does not retry `TransactionRevertedError`, and retries other errors as before (3 times in the browser, never on the server). A `retry` default set on the `QueryClient` no longer applies to this query; pass `query.retry` to change it.
