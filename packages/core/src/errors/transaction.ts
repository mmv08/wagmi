import type { Hash } from 'viem'

import { BaseError } from './base.js'

export type TransactionRevertedErrorType = TransactionRevertedError & {
  name: 'TransactionRevertedError'
}
export class TransactionRevertedError extends BaseError {
  override name = 'TransactionRevertedError'

  constructor({ cause, hash }: { cause: Error; hash: Hash }) {
    super(`Transaction with hash "${hash}" reverted.`, { cause })
  }
}
