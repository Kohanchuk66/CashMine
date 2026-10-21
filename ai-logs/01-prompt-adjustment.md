# AI Log 1: Prompt Adjustment

## Context
When requesting API integration and architecture changes, initial prompts produced code containing docstrings, explanatory inline comments, and styles embedded directly in `.tsx` files via `StyleSheet.create`.

## Initial Prompt
```text
using tanstack/react-query write connection to api, api URL get from env. structure should be requests where api calls via axios and hooks where react-query uses
```

## Problem
The generated code contained extensive block comments, explanatory code annotations, and collocated styles, which did not align with project formatting guidelines.

## Adjusted Prompt
```text
do not write comments and
Errors
    { "error": { "code": "VALIDATION", "message": "...", "field": "amount" } }
All styles must be in a separate file
```

## Result
Subsequent code outputs adhered strictly to the separation of concerns:
- Zero comments in any code files.
- All styles extracted into dedicated `*.styles.ts` files.
- Standardized error normalization in `client.ts` matching `{ error: { code, message, field } }`.
