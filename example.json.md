## What `example.json` Represents

`example.json` is a minified spreadsheet state snapshot—exactly the shape we pack into the URL hash (via `minifyState` in `modules/urlManager.js`). It is **not** the expanded grid; it is the compact form with sparse arrays and short keys.

## Field Reference
- `r`: row count (int).
- `c`: column count (int).
- `t`: theme string (`"light"` or `"dark"`).
- `d`: data as sparse triplets `[row, col, value]`. Only non-empty cells appear.
- `f`: formulas as sparse triplets `[row, col, "=FORMULA()"]`.
- `s`: cell styles as sparse triplets `[row, col, styleObject]` where style keys are minified: `a` align, `b` background color, `c` text color, `z` font size (px).
- `w`: column widths array (length = `c`). Defaults are omitted, so presence here means custom widths.

## How to Read It
1) Treat `d`, `f`, and `s` as sparse arrays—build an empty `r x c` grid first, then set only the listed coordinates.
2) Expand style keys: `{ "b": "#ffee00", "c": "#000000" }` ⇒ `{ bg: "#ffee00", color: "#000000" }`.
3) If a field is missing, assume defaults: empty cells, no formulas, default styles, default row heights/col widths, light theme, read-only off.

## Typical Flow in Code
- Decode hash → `expandState`/`validateAndNormalizeState` → render.
- Encode for sharing → `minifyState` → compress/encrypt → hash.

This file is already decompressed; you can load it directly by parsing JSON, expanding sparse arrays to a dense grid, and applying styles/formulas.***
