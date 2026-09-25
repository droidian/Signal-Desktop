// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';

/**
 * A string containing valid JSON
 * @public
 */
export type Json = Tagged<string, 'Json'>;

/**
 * A JSON primitive value: `null`, `boolean`, `number`, or `string`.
 * @public
 */
export type JsonPrimitive = null | boolean | number | string;

/**
 * A JSON array.
 * @public
 */
export type JsonArray = Array<JsonValue> | ReadonlyArray<JsonValue>;

/**
 * A JSON object with string keys.
 * @public
 */
export type JsonObject = { [Key in string]: JsonValue };

/**
 * Any valid JSON value.
 * @public
 */
export type JsonValue = JsonPrimitive | JsonArray | JsonObject;

export namespace Json {
  /** @public */
  export type Of<T extends JsonValue> = Tagged<Json, 'Json.Of', T>;

  /** @public */
  export const Schema: z.ZodMiniType<Json, string> = z.pipe(
    z.string().check(
      z.superRefine((input, ctx) => {
        try {
          JSON.parse(input);
        } catch (error) {
          ctx.issues.push({
            code: 'custom',
            message: error instanceof Error ? error.message : 'invalid json',
            input,
          });
        }
      })
    ),
    z.custom<Json>()
  );

  /** @public */
  export function isValid(input: string): input is Json {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromString(input: string): Json {
    return Schema.parse(input);
  }

  /** @public */
  export function stringify<T extends JsonValue>(input: T): Of<T>;
  export function stringify(input: JsonValue): Json;
  export function stringify(input: JsonValue): Json {
    return JSON.stringify(input) as Json;
  }

  /** @public */
  export function parse<T extends JsonValue>(input: Of<T>): T;
  export function parse(input: Json): JsonValue;
  export function parse(input: Json): JsonValue {
    return JSON.parse(input);
  }
}

export namespace JsonPrimitive {
  /** @public */
  export const Schema: z.ZodMiniType<JsonPrimitive> = z.union([
    z.null(),
    z.boolean(),
    z.number(),
    z.string(),
  ]);

  /** @public */
  export function isValid(input: unknown): input is JsonPrimitive {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromUnknown(input: unknown): JsonPrimitive {
    return Schema.parse(input);
  }
}

export namespace JsonArray {
  /** @public */
  export const Schema: z.ZodMiniType<JsonArray> = z.array(z.json());

  /** @public */
  export function isValid(input: unknown): input is JsonArray {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromUnknown(input: unknown): JsonArray {
    return Schema.parse(input);
  }
}

export namespace JsonObject {
  /** @public */
  export const Schema: z.ZodMiniType<JsonObject> = z.record(
    z.string(),
    z.json()
  );

  /** @public */
  export function isValid(input: unknown): input is JsonObject {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromUnknown(input: unknown): JsonObject {
    return Schema.parse(input);
  }
}

export namespace JsonValue {
  /** @public */
  export const Schema: z.ZodMiniType<JsonValue> = z.json();

  /** @public */
  export function isValid(input: unknown): input is JsonValue {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromUnknown(input: unknown): JsonValue {
    return Schema.parse(input);
  }
}
