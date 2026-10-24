// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

/**
 * A discriminated union representing either success ({@link Result.Ok}) or failure ({@link Result.Err}).
 * @public
 */
export type Result<T, E = string> = Result.Ok<T> | Result.Err<E>;

export namespace Result {
  /**
   * Successful result containing a value.
   * @public
   */
  export type Ok<T> = Readonly<{
    ok: true;
    value: T;
    error?: never;
  }>;

  /**
   * Failed result containing an error.
   * @public
   */
  export type Err<E = string> = Readonly<{
    ok: false;
    value?: never;
    error: E;
  }>;

  /** @public */
  export function ok<T>(value: T): Ok<T> {
    return { ok: true, value };
  }

  /** @public */
  export function err<E = string>(error: E): Err<E> {
    return { ok: false, error };
  }

  /** @public */
  export async function fromPromise<T>(
    promise: Promise<T>
  ): Promise<Result<T, unknown>> {
    try {
      return ok(await promise);
    } catch (error) {
      return err(error);
    }
  }
}
