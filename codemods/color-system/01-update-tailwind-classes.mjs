// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
// @ts-check
import { declare } from '@babel/helper-plugin-utils';

class ParseError extends Error {
  /**
   * @param {string} message
   * @param {number} cursor
   * @param {string} input
   */
  constructor(message, cursor, input) {
    super(`${message} at ${cursor} in "${input}"`);
  }
}

const COLORS_PROPERTY_PREFIXES = [
  'bg-',
  'text-',
  'decoration-',
  'border-t-',
  'border-b-',
  'border-l-',
  'border-r-',
  'border-s-',
  'border-e-',
  'border-bs-',
  'border-be-',
  'border-', // needs to be after others
  'outline-',
  'divide-',
  // 'shadow-',
  // 'inset-shadow-',
  'ring-',
  'inset-ring-',
  'accent-',
  'caret-',
  'scrollbar-thumb-',
  'scrollbar-track-',
  'stroke-',
];

const IGNORED_PROPERTIES = [
  /^text-(start|center|end)$/,
  /^text-(pretty|balance)$/,
  /^text-ellipsis$/,
  /^bg-size-/,
  /^bg-linear-to-/,
  /^bg-linear-\d+$/,
  /^bg-(contain|center|cover|no-repeat)$/,
  /^border-(separate|collapse)$/,
  /^border-(dotted|solid)$/,
  /^border-(t|b|l|r|s|e)(-|$)/,
  /^border-spacing-/,
  /^outline-offset-/,

  // custom utils
  /^outline-focus-ring$/,
  /^outline-focus-ring-inset$/,
  /^outline-focus-ring-error$/,
];

/** @type {Record<string, string>} */
const PROPERTY_MAPPINGS = {
  /**
   * Labels
   */

  'text-label-primary': 'text-primary',
  'text-label-secondary': 'text-secondary',
  'text-label-placeholder': 'text-placeholder',
  'text-label-disabled': 'text-disabled',
  'text-label-primary-on-color': 'text-primary-oncolor',
  'text-label-secondary-on-color': 'text-secondary-oncolor',
  'text-label-placeholder-on-color': 'text-placeholder-oncolor',
  'text-label-disabled-on-color': 'text-disabled-oncolor',
  'text-label-primary-inverted': 'text-primary-inverted',
  'text-label-secondary-inverted': 'text-secondary-inverted',
  'text-label-placeholder-inverted': 'text-placeholder-inverted',
  'text-label-disabled-inverted': 'text-disabled-inverted',

  /**
   * Labels (Colors)
   */

  'text-color-label-primary': 'text-accent',
  'text-color-label-primary-disabled': 'text-accent-disabled',
  'text-color-label-affirmative': 'text-affirmative',
  'text-color-label-affirmative-disabled': 'text-affirmative-disabled',
  'text-color-label-destructive': 'text-destructive',
  'text-color-label-destructive-disabled': 'text-destructive-disabled',

  /**
   * Surfaces
   */

  'bg-background-primary': 'bg-surface-primary',
  'bg-background-secondary': 'bg-surface-secondary',
  'bg-message-fill-incoming-primary': 'bg-surface-message-incoming',
  'bg-message-fill-outgoing-primary': 'bg-surface-message-outgoing',

  /**
   * Materials
   */

  'bg-elevated-background-primary': 'bg-material-primary',
  'bg-elevated-background-secondary': 'bg-material-secondary',
  'bg-elevated-background-tertiary': 'bg-material-tertiary',
  'bg-elevated-background-quaternary': 'bg-material-quaternary',

  // remapped to materials
  'bg-fill-floating': 'bg-material-tertiary',
  'bg-fill-floating-pressed': 'bg-material-tertiary-pressed',

  /**
   * Fills
   */

  'bg-fill-secondary': 'bg-primary',
  'bg-fill-secondary-pressed': 'bg-primary-pressed',
  'bg-fill-selected': 'bg-secondary',
  'bg-fill-primary': 'bg-control',
  'bg-fill-primary-pressed': 'bg-control-pressed',
  'bg-fill-inverted': 'bg-inverted',
  'bg-fill-inverted-pressed': 'bg-inverted-pressed',

  // remapped to fills
  'bg-background-overlay': 'bg-overlay',

  /**
   * Fills (Colors)
   */

  'bg-color-fill-primary': 'bg-accent',
  'bg-color-fill-primary-pressed': 'bg-accent-pressed',
  'bg-color-fill-affirmative': 'bg-affirmative',
  'bg-color-fill-affirmative-pressed': 'bg-affirmative-pressed',
  'bg-color-fill-warning': 'bg-warning-bright',
  'bg-color-fill-warning-pressed': 'bg-warning-bright-pressed',
  'bg-color-fill-destructive': 'bg-destructive',
  'bg-color-fill-destructive-pressed': 'bg-destructive-pressed',

  // remapped to fills
  'bg-color-label-light-disabled': 'bg-accent-tint',

  'bg-message-fill-incoming-secondary': 'bg-onmessage-incoming-primary',
  'bg-message-fill-incoming-secondary-pressed':
    'bg-onmessage-incoming-primary-pressed',
  'bg-message-fill-incoming-tertiary': 'bg-onmessage-incoming-secondary',
  'bg-message-fill-outgoing-secondary': 'bg-onmessage-outgoing-primary',
  'bg-message-fill-outgoing-secondary-pressed':
    'bg-onmessage-outgoing-primary-pressed',
  'bg-message-fill-outgoing-tertiary': 'bg-onmessage-outgoing-secondary',

  /**
   * Borders
   */

  'border-border-primary': 'border-primary',
  'border-border-secondary': 'border-secondary',
  'border-border-selected': 'border-selected',
  'border-border-selected-on-color': 'border-selected-oncolor',
  'border-border-focused': 'border-focused-inner',

  'outline-border-primary': 'outline-primary',
  'outline-border-secondary': 'outline-secondary',
  'outline-border-selected': 'outline-selected',
  'outline-selected-on-color': 'outline-selected-oncolor',
  'outline-border-focused': 'outline-focused-inner',

  'stroke-border-primary': 'stroke-primary',
  'stroke-border-secondary': 'stroke-secondary',
  'stroke-border-selected': 'stroke-selected',
  'stroke-selected-on-color': 'stroke-selected-oncolor',
  'stroke-border-focused': 'stroke-focused-inner',

  // remapped to borders
  'border-color-label-light': 'border-focused-inner',

  /**
   * Deprecated
   */

  'border-border-error': 'border-(--axo-color-deprecated-border-error)',
  'outline-border-error': 'outline-(--axo-color-deprecated-border-error)',
  'stroke-border-error': 'stroke-(--axo-color-deprecated-border-error)',

  /**
   * Legacy
   */

  'bg-legacy-signal-conversation-bg':
    'bg-(--axo-color-legacy-signal-conversation-bg)',
  'bg-legacy-warning-badge/12': 'bg-(--axo-color-legacy-warning-badge)/12',
  'text-legacy-warning-badge': 'text-(--axo-color-legacy-warning-badge)',
  'bg-legacy-official-chat-badge-bg':
    'bg-(--axo-color-legacy-official-chat-badge-bg)',
  'text-legacy-official-chat-badge-text':
    'text-(--axo-color-legacy-official-chat-badge-text)',
  'bg-legacy-signal-chat-message-bg':
    'bg-(--axo-color-legacy-signal-chat-message-bg)',
  'bg-legacy-conversation-header-bg':
    'bg-(--axo-color-legacy-conversation-header-bg)',
};

const PROPERTY_MAPPING_VALUES = new Set(Object.values(PROPERTY_MAPPINGS));

const UPDATED_PROPERTIES = new Set([
  // labels
  'text-primary',
  'text-secondary',
  'text-placeholder',
  'text-disabled',
  'text-primary-oncolor',
  'text-secondary-oncolor',
  'text-placeholder-oncolor',
  'text-disabled-oncolor',
  'text-primary-onbright',
  'text-secondary-onbright',
  'text-placeholder-onbright',
  'text-disabled-onbright',
  'text-primary-inverted',
  'text-secondary-inverted',
  'text-placeholder-inverted',
  'text-disabled-inverted',
  'text-accent',
  'text-accent-disabled',
  'text-affirmative',
  'text-affirmative-disabled',
  'text-warning',
  'text-warning-disabled',
  'text-safety',
  'text-safety-disabled',
  'text-destructive',
  'text-destructive-disabled',

  // surfaces
  'bg-surface-primary',
  'bg-surface-secondary',
  'bg-surface-tertiary',
  'bg-surface-quaternary',
  'bg-surface-card',
  'bg-surface-message-incoming',
  'bg-surface-message-outgoing',
  'fill-surface-primary',
  'fill-surface-secondary',
  'fill-surface-tertiary',
  'fill-surface-quaternary',
  'fill-surface-card',
  'fill-surface-message-incoming',
  'fill-surface-message-outgoing',

  // materials
  'bg-material-primary',
  'bg-material-secondary',
  'bg-material-tertiary',
  'bg-material-tertiary-pressed',
  'bg-material-quaternary',
  'bg-material-quaternary-pressed',
  'bg-material-dim-primary',
  'bg-material-dim-secondary',
  'bg-material-dialog',
  'bg-material-warning',
  'fill-material-primary',
  'fill-material-secondary',
  'fill-material-tertiary',
  'fill-material-tertiary-pressed',
  'fill-material-quaternary',
  'fill-material-quaternary-pressed',
  'fill-material-dim-primary',
  'fill-material-dim-secondary',
  'fill-material-dialog',
  'fill-material-warning',

  // fills
  'bg-primary',
  'bg-primary-pressed',
  'bg-secondary',
  'bg-secondary-pressed',
  'bg-tertiary',
  'bg-tertiary-pressed',
  'bg-control',
  'bg-control-pressed',
  'bg-inverted',
  'bg-inverted-pressed',
  'bg-overlay',
  'bg-onmessage-incoming-primary',
  'bg-onmessage-incoming-primary-pressed',
  'bg-onmessage-incoming-secondary',
  'bg-onmessage-incoming-secondary-pressed',
  'bg-onmessage-outgoing-primary',
  'bg-onmessage-outgoing-primary-pressed',
  'bg-onmessage-outgoing-secondary',
  'bg-onmessage-outgoing-secondary-pressed',
  'bg-accent',
  'bg-accent-pressed',
  'bg-accent-bright',
  'bg-accent-bright-pressed',
  'bg-accent-tint',
  'bg-accent-tint-pressed',
  'bg-affirmative',
  'bg-affirmative-pressed',
  'bg-affirmative-bright',
  'bg-affirmative-bright-pressed',
  'bg-affirmative-tint',
  'bg-affirmative-tint-pressed',
  'bg-warning-bright',
  'bg-warning-bright-pressed',
  'bg-warning-tint',
  'bg-warning-tint-pressed',
  'bg-safety',
  'bg-safety-pressed',
  'bg-safety-tint',
  'bg-safety-tint-pressed',
  'bg-destructive',
  'bg-destructive-pressed',
  'bg-destructive-tint',
  'bg-destructive-tint-pressed',
  'bg-white',
  'bg-white-pressed',

  'fill-primary',
  'fill-primary-pressed',
  'fill-secondary',
  'fill-secondary-pressed',
  'fill-tertiary',
  'fill-tertiary-pressed',
  'fill-control',
  'fill-control-pressed',
  'fill-inverted',
  'fill-inverted-pressed',
  'fill-overlay',
  'fill-onmessage-incoming-primary',
  'fill-onmessage-incoming-primary-pressed',
  'fill-onmessage-incoming-secondary',
  'fill-onmessage-incoming-secondary-pressed',
  'fill-onmessage-outgoing-primary',
  'fill-onmessage-outgoing-primary-pressed',
  'fill-onmessage-outgoing-secondary',
  'fill-onmessage-outgoing-secondary-pressed',
  'fill-accent',
  'fill-accent-pressed',
  'fill-accent-bright',
  'fill-accent-bright-pressed',
  'fill-accent-tint',
  'fill-accent-tint-pressed',
  'fill-affirmative',
  'fill-affirmative-pressed',
  'fill-affirmative-bright',
  'fill-affirmative-bright-pressed',
  'fill-affirmative-tint',
  'fill-affirmative-tint-pressed',
  'fill-warning-bright',
  'fill-warning-bright-pressed',
  'fill-warning-tint',
  'fill-warning-tint-pressed',
  'fill-safety',
  'fill-safety-pressed',
  'fill-safety-tint',
  'fill-safety-tint-pressed',
  'fill-destructive',
  'fill-destructive-pressed',
  'fill-destructive-tint',
  'fill-destructive-tint-pressed',
  'fill-white',
  'fill-white-pressed',

  // borders
  'border-primary',
  'border-secondary',
  'border-tertiary',
  'border-selected',
  'border-selected-oncolor',
  'border-focused-inner',
  'border-focused-outer',
  'border-focused-inner-oncolor',
  'border-focused-outer-oncolor',

  'stroke-primary',
  'stroke-secondary',
  'stroke-tertiary',
  'stroke-selected',
  'stroke-selected-oncolor',
  'stroke-focused-inner',
  'stroke-focused-outer',
  'stroke-focused-inner-oncolor',
  'stroke-focused-outer-oncolor',
]);

/**
 * @param {string} input
 */
function parseTailwindClass(input) {
  const segments = [];
  let important = false;

  /** @type {string[]} */
  const stack = [];
  let buffer = '';
  let cursor = 0;

  /**
   * @param {boolean} condition
   * @param {string} message
   * @returns {asserts condition}
   */
  function assert(condition, message) {
    if (!condition) {
      throw new ParseError(message, cursor, input);
    }
  }

  while (cursor < input.length) {
    const char = input[cursor];

    if (char === '!' && cursor === input.length - 1) {
      important = true;
      cursor += 1;
      break;
    }

    if (char === '[' || char === '(') {
      stack.push(char);
      cursor += 1;
      buffer += char;
      continue;
    }

    if (char === ']' || char === ')') {
      const expected = char === ']' ? '[' : '(';
      const actual = stack.pop();
      assert(
        actual === expected,
        `missing opening "${expected}" for "${char}"`
      );
      cursor += 1;
      buffer += char;
      continue;
    }

    if (char === ':' && stack.length === 0) {
      segments.push(buffer);
      cursor += 1;
      buffer = '';
      continue;
    }

    cursor += 1;
    buffer += char;
  }

  assert(stack.length === 0, `unmatched ${stack.join(',')}`);
  assert(
    cursor === input.length,
    `parser is broken, cursor = ${cursor}, length = ${input.length}`
  );

  segments.push(buffer);

  const property = segments.pop();
  assert(property != null, 'no segments?');
  const modifiers = segments;

  return { property, modifiers, important };
}

/**
 * @param {string} property
 */
function maybeParseColor(property) {
  for (const prefix of COLORS_PROPERTY_PREFIXES) {
    if (property.startsWith(prefix)) {
      return property.slice(prefix.length);
    }
  }
  return null;
}

/**
 * @param {string} property
 * @param {string} color
 */
function shouldIgnoreColorProperty(property, color) {
  return (
    color.startsWith('[') ||
    color.startsWith('(') ||
    color === 'none' ||
    color === 'inherit' ||
    color === 'transparent' ||
    /^\d+/.test(color) ||
    IGNORED_PROPERTIES.some(regex => {
      return regex.test(property);
    }) ||
    PROPERTY_MAPPING_VALUES.has(property) ||
    UPDATED_PROPERTIES.has(property)
  );
}

const VISITED = Symbol('VISITED');

export default declare(function transform(babel) {
  const { types: t } = babel;

  return {
    visitor: {
      CallExpression(callPath, state) {
        if (callPath.node.callee.type !== 'Identifier') {
          return;
        }

        if (callPath.node.callee.name !== 'tw') {
          return;
        }

        callPath.traverse({
          StringLiteral(stringPath) {
            if (stringPath.getData(VISITED)) {
              return;
            }
            stringPath.setData(VISITED, true);

            const { value } = stringPath.node;
            const updatedValue = value
              .split(' ')
              .map(className => {
                const parsed = parseTailwindClass(className);

                const color = maybeParseColor(parsed.property);
                if (color == null) {
                  return className;
                }
                if (shouldIgnoreColorProperty(parsed.property, color)) {
                  return className;
                }

                const updatedProperty = PROPERTY_MAPPINGS[parsed.property];
                if (updatedProperty == null) {
                  // oxlint-disable-next-line no-console
                  console.log(`UNMATCHED: ${className} -- ${state.filename}`);
                  return className;
                }

                let result = '';
                for (const modifier of parsed.modifiers) {
                  result += `${modifier}:`;
                }
                result += updatedProperty;
                if (parsed.important) {
                  result += '!';
                }
                return result;
              })
              .join(' ');

            if (value === updatedValue) {
              return;
            }

            stringPath.replaceWith(t.stringLiteral(updatedValue));
          },
        });
      },
    },
  };
});
