# DealFinderApi

DealFinderApi is a lightweight **REST API** built with **Node.js**, **Express**, and **TypeScript** for the DealFinder React Native application.

The API provides deal-list, search, and detail endpoints used by the mobile/web client.

## Features

- REST API built with Express
- TypeScript support
- Deal list endpoint
- Deal search with `searchTerm`
- Deal detail endpoint
- Separate summary and detail response shapes
- CORS support
- Local-network access for mobile-device testing
- Development mode with `tsx watch`

## Tech Stack

- Node.js
- Express
- TypeScript
- CORS
- tsx

## Project Structure

```text
DealFinderApi/
│
├── src/
│   ├── server.ts
│   └── data/
│       └── deals.ts
│
├── package.json
├── package-lock.json
├── tsconfig.json
├── README.md
└── LICENSE
```

> The exact structure may vary slightly if the sample deal data is kept directly in `server.ts`.

## Quick Start

Clone the repository:

```bash
git clone https://github.com/BarkinAlper/DealFinderApi.git
cd DealFinderApi
```

Install dependencies:

```bash
npm install
```

Start the API:

```bash
npm run dev

## API Endpoints

### Get all deals

```http
GET /api/deals
```

Returns a list of deal summaries.

Example response:

```json
[
  {
    "id": "1",
    "title": "Weekend Yoga Package",
    "price": 2500,
    "imageUrl": "https://picsum.photos/seed/yoga1/800/500",
    "cause": "Wellness"
  }
]
```

### Search deals

```http
GET /api/deals?searchTerm=yoga
```

Filters deals using the supplied search term.

The current implementation can search fields such as:

```text
title
cause
```

### Get deal detail

```http
GET /api/deals/:id
```

Example:

```http
GET /api/deals/1
```

Example response:

```json
{
  "id": "1",
  "title": "Weekend Yoga Package",
  "price": 2500,
  "imageUrl": "https://picsum.photos/seed/yoga1/800/500",
  "images": [
    "https://picsum.photos/seed/yoga1/800/500",
    "https://picsum.photos/seed/yoga2/800/500",
    "https://picsum.photos/seed/yoga3/800/500"
  ],
  "cause": "Wellness",
  "description": "A weekend yoga package including group sessions, guided exercises and relaxation activities.",
  "url": "https://example.com/deals/1",
  "user": {
    "name": "Sarah Miller",
    "avatarUrl": "https://picsum.photos/seed/sarah/100/100"
  }
}
```

If the requested deal does not exist, the API returns:

```http
404 Not Found
```

## Data Model

The backend stores a complete deal model internally.

```ts
type Deal = {
  id: string;
  title: string;
  price: number;

  imageUrl: string;
  images: string[];

  cause: string;
  description: string;

  url: string;

  user?: {
    name: string;
    avatarUrl: string;
  };
};
```

The list/search endpoints return only the fields required by the client list screen:

```ts
type DealSummary = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  cause: string;
};
```

The detail endpoint returns the complete deal information.

This keeps list responses smaller while allowing the detail screen to request richer data only when needed.

## Installation

Clone the repository:

```bash
git clone https://github.com/BarkinAlper/DealFinderApi.git
cd DealFinderApi
```

Install dependencies:

```bash
npm install
```

If the project is being created from scratch, the main dependencies are:

```bash
npm install express cors
npm install -D typescript tsx @types/node @types/express @types/cors
```

## Development

The recommended development script is:

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts"
  }
}
```

Start the API:

```bash
npm run dev
```

By default, the API is expected to run on:

```text
http://localhost:3000
```

## Local Network Access

To allow a physical phone running DealFinder to access the API, the server should listen on all network interfaces:

```ts
app.listen(PORT, '0.0.0.0', () => {
  console.log(`DealFinder API running on port ${PORT}`);
});
```

Then use the computer's local IP address from the React Native app:

```env
EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:3000
```

Example:

```env
EXPO_PUBLIC_API_URL=http://192.168.1.20:3000
```

Do not use `localhost` from a physical mobile device because `localhost` would refer to the device itself.

## Windows Firewall

If the API works on the computer but is unreachable from another device on the same network, Windows Firewall may be blocking the port.

Example command:

```powershell
netsh advfirewall firewall add rule name="DealFinder API 3000" dir=in action=allow protocol=TCP localport=3000
```

You can verify that the server is listening with:

```powershell
netstat -ano | findstr :3000
```

A typical result should include:

```text
0.0.0.0:3000
```

with a `LISTENING` state.

## CORS

The project includes CORS support:

```ts
import cors from 'cors';

app.use(cors());
```

CORS is especially relevant when DealFinder is run in a web browser.

Native React Native requests are not subject to browser CORS rules in the same way.

## Relationship with DealFinder

The API is designed to support the DealFinder client application.

```text
DealFinder
   ↓
dealsApi.ts
   ↓
HTTP / Fetch
   ↓
DealFinderApi
   ↓
Express routes
   ↓
Deal data
```

Typical requests are:

```text
GET /api/deals
GET /api/deals?searchTerm=...
GET /api/deals/:id
```

## Development Notes

This project is intentionally small and focuses on the REST API concepts required by the DealFinder learning application.

For a larger production application, possible next steps include:

- persistent database storage
- request validation
- centralized error handling
- authentication and authorization
- logging
- API versioning
- automated tests
- environment-based configuration
- Docker support

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
