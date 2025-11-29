# Karma Studios - Server

1. Copy `.env.example` to `.env` and fill values.
2. Install dependencies: `npm install`
3. Run dev: `npm run dev`
4. Server runs on PORT and exposes:
   - POST /api/auth/login
   - GET /api/tiles
   - POST /api/tiles (protected) [form-data: image,file]
   - PUT /api/tiles/:id (protected)
   - DELETE /api/tiles/:id (protected)
