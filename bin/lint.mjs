#!/usr/bin/env zx

await $`prettier --write "**/*.{json,jsonc,scss,yml,yaml}" --color`;
await $`eslint "**/*.{ts,js,tsx,jsx,mjs}" --no-warn-ignored --fix --color`;
