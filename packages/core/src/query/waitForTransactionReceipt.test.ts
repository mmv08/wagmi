import { config } from '@wagmi/test'
import { HttpRequestError } from 'viem'
import { expect, test } from 'vitest'

import { TransactionRevertedError } from '../errors/transaction.js'
import { waitForTransactionReceiptQueryOptions } from './waitForTransactionReceipt.js'

const hash =
  '0x745367f76807d411b7fa4c3a552a62e3e45303ef40145fff04d84b867c2575d3'

test('default', () => {
  expect(
    waitForTransactionReceiptQueryOptions(config, {}),
  ).toMatchInlineSnapshot(`
    {
      "enabled": false,
      "queryFn": [Function],
      "queryKey": [
        "waitForTransactionReceipt",
        {},
      ],
      "retry": [Function],
    }
  `)
})

test('behavior: does not retry a reverted transaction', () => {
  const retry = waitForTransactionReceiptQueryOptions(config, { hash })
    .retry as (failureCount: number, error: Error) => boolean
  const revertedError = new TransactionRevertedError({
    cause: new Error('unknown reason'),
    hash,
  })
  const requestError = new HttpRequestError({ url: 'https://example.com' })

  expect(retry(0, revertedError)).toBe(false)
  expect(retry(0, requestError)).toBe(true)
  expect(retry(2, requestError)).toBe(true)
  expect(retry(3, requestError)).toBe(false)
})

test('behavior: query.retry', () => {
  expect(
    waitForTransactionReceiptQueryOptions(config, {
      hash,
      query: { retry: 1 },
    }).retry,
  ).toBe(1)
})
