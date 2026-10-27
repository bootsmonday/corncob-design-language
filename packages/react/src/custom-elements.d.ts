/**
 * Type boundary for the React package.
 *
 * Components import ./custom-elements.js so the vanilla elements register at
 * runtime. This declaration is resolved instead of that implementation, which
 * keeps tsc from following those imports and writing .d.ts files next to the
 * standard JS components.
 */
export {};
