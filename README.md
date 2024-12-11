# Booking test task
---
## How to startup project?
1. You need this dependencies:
- Node.js
- PostgreSQL
- Bun 
2. In root directory create .env file, here is example of this file: 
```bash
PORT='3000'
JWT_ACCESS_SECRET='secret'
JWT_ACCESS_EXPIRES='1d'
DATABASE_URL='postgresql://postgres:postgres@localhost:5432/booking_db?schema=public'
```
3. Install dependencies: `npm install` or `bun i`
4. Then u have to apply migration to your database so run `npx prisma migrate dev --name init` or `bunx prisma migrate dev --name init`
5. Then you can start project running:
    - `bun dev` 
    or
    - `npm run build:npm`
    - `npm run start:npm`

So now you can open swagger at http://localhost:3000/api-docs
***
## Implemented features 
    - JWT 