// 10x10 Spreadsheet Web App
// Data persists in URL hash for easy sharing

(function() {
    'use strict';

    // Constants
    const ROWS = 10;
    const COLS = 10;
    const DEBOUNCE_DELAY = 200;

    // Data model - 10x10 array of cell values
    let data = createEmptyData();

    // Debounce timer
    let debounceTimer = null;

    // Create empty 10x10 data array
    function createEmptyData() {
        return Array(ROWS).fill(null).map(() => Array(COLS).fill(''));
    }

    // Convert column index to letter (0 = A, 1 = B, etc.)
    function colToLetter(col) {
        return String.fromCharCode(65 + col);
    }

    // Encode data to URL-safe string
    function encodeState() {
        const json = JSON.stringify(data);
        return encodeURIComponent(json);
    }

    // Decode URL hash to data array
    function decodeState(hash) {
        try {
            const decoded = decodeURIComponent(hash);
            const parsed = JSON.parse(decoded);

            // Validate structure
            if (Array.isArray(parsed) && parsed.length === ROWS) {
                return parsed.map(row => {
                    if (Array.isArray(row) && row.length === COLS) {
                        return row.map(cell => String(cell || ''));
                    }
                    return Array(COLS).fill('');
                });
            }
        } catch (e) {
            console.warn('Failed to decode state from URL:', e);
        }
        return null;
    }

    // Update URL hash without page jump
    function updateURL() {
        const encoded = encodeState();
        const newHash = '#' + encoded;

        if (history.replaceState) {
            history.replaceState(null, null, newHash);
        } else {
            location.hash = newHash;
        }
    }

    // Debounced URL update
    function debouncedUpdateURL() {
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }
        debounceTimer = setTimeout(updateURL, DEBOUNCE_DELAY);
    }

    // Render the spreadsheet grid
    function renderGrid() {
        const container = document.getElementById('spreadsheet');
        if (!container) return;

        container.innerHTML = '';

        // Corner cell (empty)
        const corner = document.createElement('div');
        corner.className = 'corner-cell';
        container.appendChild(corner);

        // Column headers (A-J)
        for (let col = 0; col < COLS; col++) {
            const header = document.createElement('div');
            header.className = 'header-cell';
            header.textContent = colToLetter(col);
            container.appendChild(header);
        }

        // Rows
        for (let row = 0; row < ROWS; row++) {
            // Row header (1-10)
            const rowHeader = document.createElement('div');
            rowHeader.className = 'header-cell';
            rowHeader.textContent = row + 1;
            container.appendChild(rowHeader);

            // Data cells
            for (let col = 0; col < COLS; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';

                const input = document.createElement('input');
                input.type = 'text';
                input.dataset.row = row;
                input.dataset.col = col;
                input.value = data[row][col];
                input.setAttribute('aria-label', `Cell ${colToLetter(col)}${row + 1}`);

                cell.appendChild(input);
                container.appendChild(cell);
            }
        }
    }

    // Handle input changes
    function handleInput(event) {
        const input = event.target;
        if (input.tagName !== 'INPUT') return;

        const row = parseInt(input.dataset.row, 10);
        const col = parseInt(input.dataset.col, 10);

        if (!isNaN(row) && !isNaN(col)) {
            data[row][col] = input.value;
            debouncedUpdateURL();
        }
    }

    // Load state from URL on page load
    function loadStateFromURL() {
        const hash = window.location.hash.slice(1); // Remove #

        if (hash) {
            const loadedData = decodeState(hash);
            if (loadedData) {
                data = loadedData;
            }
        }
    }

    // Initialize the app
    function init() {
        // Load any existing state from URL
        loadStateFromURL();

        // Render the grid
        renderGrid();

        // Set up event delegation for input handling
        const container = document.getElementById('spreadsheet');
        if (container) {
            container.addEventListener('input', handleInput);
        }

        // Handle browser back/forward
        window.addEventListener('hashchange', function() {
            loadStateFromURL();
            renderGrid();
        });
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
