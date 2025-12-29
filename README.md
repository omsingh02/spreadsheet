# Spreadsheet

A lightweight, client-only spreadsheet web application. All data persists in the URL hash for instant sharing—no backend required.

## Features

- **Zero Backend** - All state saved in URL hash, works offline
- **Instant Sharing** - Copy URL to share your spreadsheet with anyone
- **Dynamic Grid** - Up to 30 rows and 15 columns (A-O)
- **Dark/Light Theme** - Toggle themes with preference persistence
- **Mobile Responsive** - Touch-friendly design, works on any device
- **Sticky Headers** - Row and column headers stay visible while scrolling

## Quick Start

Open `index.html` directly in your browser, or use a local server:

```bash
npx serve .
```

## How It Works

Your spreadsheet data is stored entirely in the URL hash:

```
https://yoursite.com/spreadsheet/#{"rows":10,"cols":10,"data":[["A1","B1"],["A2","B2"]],"theme":"light"}
```

When you edit cells, the URL updates automatically. Share the URL to share your data—no account or database needed.

## Tech Stack

- Vanilla HTML/CSS/JavaScript
- Font Awesome 6.5.1 (icons)
- No frameworks or build tools required

## Usage

| Action | How |
|--------|-----|
| Edit cells | Click any cell and type |
| Add row | Click "Add Row" button (max 30) |
| Add column | Click "Add Column" button (max 15) |
| Share | Click copy button to copy URL to clipboard |
| Toggle theme | Click the sun/moon icon |

## Limitations

- Maximum 30 rows
- Maximum 15 columns (A-O)
- Default grid: 10 x 10

## Browser Support

- Modern browsers: Full support
- Older browsers: Graceful degradation (fallback copy method)
- Mobile: iOS and Android supported

## License

MIT
