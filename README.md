Karma Studios - Fullstack MERN Starter

Structure:
- server/  -> Express + MongoDB + Cloudinary uploader
- client/  -> React + Vite + Tailwind

Steps to run:
1. Clone or extract this project.
2. Create .env in server/ from .env.example and fill values.
3. From /server: npm install && npm run dev
4. From /client: npm install && npm run dev
5. Open http://localhost:5173 for the frontend (Vite)

Notes:
- Admin credentials are read from env variables (ADMIN_EMAIL, ADMIN_PASSWORD)
- For image upload, configure Cloudinary credentials in server/.env
