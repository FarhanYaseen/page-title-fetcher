# URL Title Fetcher

A lightweight Express web service that fetches and displays the HTML `<title>` of one or more URLs. Written in TypeScript with async/await throughout.

## Features

- Fetch page titles for one or many URLs in parallel
- Supports comma-separated URLs and repeated query parameters
- Auto-prefixes bare hostnames with `https://`
- Graceful error handling — returns `NO RESPONSE` for unreachable URLs
- Production-ready logging (Morgan combined format in production, dev format locally)

## Requirements

- Node.js >= 18

## Getting Started

```bash
npm install
```

### Development

```bash
npm run dev
```

Starts the server with `ts-node` and hot-reloading via `nodemon`. Defaults to port `3000`.

### Production

```bash
npm run build   # Compile TypeScript → dist/
npm start       # Run compiled output
```

### Environment Variables

| Variable   | Default | Description                                      |
|------------|---------|--------------------------------------------------|
| `PORT`     | `3000`  | Port to listen on                                |
| `NODE_ENV` | —       | Set to `production` for combined-format logging  |

## API

### `GET /I/want/title`

Returns an HTML page listing the `<title>` of each provided URL.

**Query Parameters**

| Parameter | Required | Description                                    |
|-----------|----------|------------------------------------------------|
| `address` | Yes      | One or more URLs to fetch (see formats below)  |

**Accepted URL formats**

```
# Single URL
GET /I/want/title?address=https://example.com

# Comma-separated
GET /I/want/title?address=example.com,google.com

# Repeated parameter
GET /I/want/title?address=example.com&address=google.com
```

Bare hostnames (no protocol) are automatically prefixed with `https://`.

**Errors**

| Status | Reason                                                          |
|--------|-----------------------------------------------------------------|
| `400`  | `address` missing, extra query params present, or no valid URLs |

## Project Structure

```
.
├── src/
│   ├── app.ts              # Express app configuration
│   ├── server.ts           # HTTP server entry point
│   ├── routes/
│   │   └── index.ts        # Route handlers
│   ├── services/
│   │   └── scraper.ts      # URL fetching & title extraction
│   └── types/
│       └── index.ts        # Shared TypeScript interfaces
├── views/
│   ├── index.ejs           # Results template
│   └── error.ejs           # Error template
├── public/
│   └── stylesheets/
│       └── style.css
├── dist/                   # Compiled output (git-ignored)
├── tsconfig.json
└── package.json
```

## Scripts

| Script            | Description                              |
|-------------------|------------------------------------------|
| `npm run dev`     | Run with hot-reload (ts-node + nodemon)  |
| `npm run build`   | Compile TypeScript to `dist/`            |
| `npm start`       | Run compiled production build            |
| `npm run clean`   | Delete `dist/`                           |
