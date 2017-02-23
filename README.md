# GATOMALO

Server for panamanian fiscal printers, written in NodeJS by [Roberto E. Zubieta][1].

## Summary
1. Install NodeJS (Minimum Version: 7.8.0)
2. `npm install` to download all dependencies
3. Fill `private.json` with your ZOHO books credentials. Use `private.sample.json` as example.
4. `npm run` to start the server

## Details
- Tested on NodeJS V7.8.0.
- The server entry point is in `bin/server.js`
- Written in Koa v2

## Testing
Includes some minimal unit tests for double-checking the output strings. They can be executed by running `npm test`

[1]: https://github.com/zubietaroberto
