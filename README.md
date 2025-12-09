# **Livia's Braids – Salon Website & Management System**

A modern, responsive braids studio website with a complete admin dashboard for managing bookings, payments, transactions, and gallery images. Built using **React + TypeScript + Tailwind CSS + Node.js/Express + MySQL**.

## **Features**

### Public Website
* Responsive layout (mobile-first)
* Modern dark theme with smooth animations
* Services with detailed pricing
* Gallery with style numbers
* Contact/Booking form
* React Router pages (Home, Services, Gallery, About, Visit, Contact)

### Admin Dashboard
* Secure login system (JWT authentication)
* **Bookings Management**: View, edit, delete appointments
* **Payment Recording**: Record payments against bookings
* **Transaction History**: Track all income and expenses
* **Gallery Management**: Upload, delete, and manage gallery images
* **Financial Dashboard**: View income, expenses, and net profit

## **Tech Stack**

### Frontend
* React 19 (Vite)
* TypeScript
* Tailwind CSS
* React Router DOM

### Backend
* Node.js
* Express.js
* MySQL2
* JWT (JSON Web Tokens)
* bcryptjs (password hashing)
* Multer (file uploads)

## **Setup**

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DB_HOST=localhost
#DB_HOST=217.21.95.154
DB_USER=u395208679_liviasbraids
DB_PASSWORD=Liviasbraids@007
DB_NAME=u395208679_liviasbraids
JWT_SECRET=your-super-secret-jwt-key-change-this
PORT=5000
```

### 3. Initialize Database

```bash
npm run init-db
```

This will:
- Create all necessary database tables
- Create a default admin user:
  - **Username**: `admin`
  - **Password**: `admin123`
  - **⚠️ IMPORTANT**: Change this password after first login!

### 4. Start Development Servers

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
npm run dev:server
```

The frontend will run on `http://localhost:5173` and the backend on `http://localhost:5000`.

## **Build for Production**

```bash
npm run build
```

This creates a `dist` folder with the production-ready frontend.

## **Project Structure**

```
├── server/                 # Backend API
│   ├── config/            # Database configuration
│   ├── routes/            # API routes
│   ├── middleware/        # Authentication middleware
│   ├── database/          # Database schema and initialization
│   └── index.js           # Express server entry point
├── src/                   # Frontend React app
│   ├── components/        # Reusable components
│   ├── pages/             # Page components
│   │   └── admin/         # Admin dashboard pages
│   ├── contexts/          # React contexts (Auth)
│   ├── utils/             # Utility functions (API client)
│   └── data/              # Static data
├── public/                # Static assets
│   └── uploads/           # Uploaded gallery images
└── dist/                  # Production build (generated)
```

## **Hostinger SSH Deployment (Backend + Frontend)**

Follow these steps after connecting to your server over SSH. Commands assume you are inside `public_html`.

### 1) Prepare server
- Install Node.js (via nvm or Hostinger installer).
- Install PM2 globally:
  ```bash
  npm install -g pm2
  ```

### 2) Upload project files
- Upload these to `public_html/`:
  - `package.json`, `package-lock.json`
  - `server/` folder
  - `dist/` folder (built locally with `npm run build`)
  - `.env` (create/edit on server)
- Ensure `public/uploads/` exists (for images).

### 3) Create `.env` on server
Example:
```env
NODE_ENV=production
PORT=5000
DB_HOST=217.21.95.154        # or your DB host
DB_USER=u395208679_liviasbraids
DB_PASSWORD=Liviasbraids007  # update if changed
DB_NAME=u395208679_liviasbraids
JWT_SECRET=replace-with-strong-secret
VITE_API_URL=https://your-domain.com/api
```

### 4) Install dependencies (server)
From `public_html`:
```bash
npm install --production
```

### 5) Start backend with PM2
```bash
pm2 start server/index.js --name livias-braids
pm2 save
```

Common PM2 commands:
```bash
pm2 status
pm2 logs livias-braids --lines 100
pm2 restart livias-braids
pm2 stop livias-braids
```

### 6) Serve frontend
- Build locally: `npm run build`
- Upload the generated `dist/` folder to `public_html/dist/`
- Ensure your `.htaccess` (in `public_html`) proxies `/api` to Node and serves static assets. Example:
```
RewriteEngine On

# Serve static assets directly
RewriteCond %{REQUEST_FILENAME} -f
RewriteRule ^ - [L]

# Proxy API to Node
RewriteRule ^api/(.*)$ http://localhost:5000/api/$1 [P,L]

# React Router fallback to Node (serving dist/index.html)
RewriteRule ^(.*)$ http://localhost:5000/$1 [P,L]
```

### 7) Verify
- API health: `curl http://localhost:5000/api/health`
- Public: `https://your-domain.com/`
- Admin: `https://your-domain.com/admin/login`

### 8) Update flow (when deploying new build)
1. Locally: `npm run build`
2. Upload new `dist/` to `public_html/dist/` (replace existing)
3. If backend changes:
   ```bash
   npm install --production   # if deps changed
   pm2 restart livias-braids
   pm2 logs livias-braids --lines 50
   ```

### 9) Database init (one-time, optional from local)
If DB not initialized:
```bash
npm run init-db
```
Or run the SQL in `server/database/schema.sql` directly against MySQL.

## **API Endpoints**

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify token

### Bookings
- `GET /api/bookings` - Get all bookings (admin)
- `GET /api/bookings/:id` - Get single booking (admin)
- `POST /api/bookings` - Create booking (public)
- `PUT /api/bookings/:id` - Update booking (admin)
- `DELETE /api/bookings/:id` - Delete booking (admin)

### Payments
- `GET /api/payments` - Get all payments (admin)
- `GET /api/payments/booking/:bookingId` - Get payments for booking (admin)
- `POST /api/payments` - Create payment (admin)
- `PUT /api/payments/:id` - Update payment (admin)
- `DELETE /api/payments/:id` - Delete payment (admin)

### Transactions
- `GET /api/transactions` - Get all transactions (admin)
- `GET /api/transactions/summary` - Get financial summary (admin)
- `POST /api/transactions` - Create transaction (admin)
- `PUT /api/transactions/:id` - Update transaction (admin)
- `DELETE /api/transactions/:id` - Delete transaction (admin)

### Gallery
- `GET /api/gallery` - Get all gallery images (public)
- `POST /api/gallery` - Upload image (admin)
- `PUT /api/gallery/:id` - Update image order (admin)
- `DELETE /api/gallery/:id` - Delete image (admin)

## **Admin Dashboard**

Access the admin dashboard at `/admin/login`

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

**⚠️ Change the password immediately after first login!**

## **Deployment**

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions to Hostinger.

## **Security Notes**

1. **Change default admin password** immediately after setup
2. **Set a strong JWT_SECRET** in production
3. **Use HTTPS** in production
4. **Set proper file permissions** (755 for folders, 644 for files)
5. **Keep `.env` file secure** and never commit it to version control

## **Troubleshooting**

### Database Connection Issues
- Verify database credentials in `.env`
- Check if MySQL service is running
- Ensure database exists and user has proper permissions

### Port Already in Use
- Change `PORT` in `.env` file
- Or stop the process using the port

### Image Upload Issues
- Ensure `public/uploads` folder exists
- Check folder permissions (should be 755 or 777)

---

**Built with ❤️ for Livia's Braids**
