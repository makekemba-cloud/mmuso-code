Mmuso Code – Full‑Stack Portfolio & Admin Platform
A modern, full‑stack web application built with Vue 3, TypeScript, Tailwind CSS, Express.js, and MongoDB. It serves as the digital presence for Mmuso Code (a software development company) and includes a hidden admin panel for managing projects, viewing site activity logs, and tracking user events.

✨ Features
Landing Page – Hero, About, Expertise, Process, Projects, Why Us, Contact sections.

Contact Form – Sends emails via Resend (auto‑reply + admin notification).

Hidden Admin Panel – Secure login with JWT and role‑based access.

Admin Dashboard – Stats cards, visit charts, and recent activity.

Project CRUD – Create, edit, delete projects with image, tech stack, and live/github URLs.

Activity Log – View every API request with IP, method, page, status, and detailed metadata.

User Events – Track page views, clicks, form submissions, login attempts, and more.

IP Filtering – Hide specific IPs from logs (stored in localStorage) and filter by exact IP.

Responsive Design – Mobile‑first UI with Tailwind CSS.

Scroll Progress Bar – Visual indicator on the homepage.

GSAP Animations – Smooth scroll and entrance animations.

Vue Router – Client‑side routing with lazy loading.

🛠️ Tech Stack
Frontend
Vue 3 – Composition API, <script setup>

TypeScript – Type safety

Tailwind CSS – Utility‑first styling

GSAP – Animations

Font Awesome – Icons

Axios – HTTP client

Chart.js – Dashboard charts

Vite – Build tool and dev server

Backend
Node.js / Express – REST API

TypeScript – Type‑safe server code

MongoDB / Mongoose – NoSQL database

JWT – Authentication

bcryptjs – Password hashing

Resend – Email service

CORS – Cross‑origin resource sharing

Deployment
Vercel – Frontend (static) and Backend (serverless functions)

📁 Project Structure
text
mmuso-code/
├── api/                          # Backend (serverless functions)
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts             # MongoDB connection
│   │   ├── middleware/
│   │   │   ├── activityLogger.ts # Logs every request
│   │   │   └── auth.ts           # JWT + role guards
│   │   ├── models/
│   │   │   ├── ActivityLog.ts
│   │   │   ├── Project.ts
│   │   │   └── User.ts           # username, password (bcrypt), role
│   │   ├── routes/
│   │   │   ├── auth.ts           # Login, (optional) user creation
│   │   │   ├── projects.ts       # CRUD with role checks
│   │   │   ├── stats.ts          # Dashboard stats & paginated logs
│   │   │   └── contact.ts        # Email sending with Resend
│   │   └── index.ts              # Main Express app (exported for Vercel)
│   ├── package.json
│   └── tsconfig.json
├── src/                          # Frontend (Vue 3)
│   ├── assets/
│   ├── components/               # Reusable Vue components
│   │   ├── Nav.vue
│   │   ├── Footer.vue
│   │   ├── Hero.vue
│   │   ├── About.vue
│   │   ├── Expertise.vue
│   │   ├── Process.vue
│   │   ├── Projects.vue
│   │   ├── WhyUs.vue
│   │   ├── Contact.vue
│   │   └── ...
│   ├── views/                    # Page views
│   │   ├── Home.vue
│   │   ├── PrivacyPolicy.vue
│   │   ├── TermsConditions.vue
│   │   ├── RegistrationInfo.vue
│   │   └── admin/                # Admin panel views
│   │       ├── AdminLogin.vue
│   │       ├── AdminLayout.vue
│   │       ├── AdminDashboard.vue
│   │       ├── AdminProjects.vue
│   │       └── AdminActivity.vue
│   ├── router/
│   │   └── index.ts              # Vue Router routes + guard
│   ├── App.vue
│   └── main.ts
├── .env                          # Environment variables (frontend)
├── .env.local                    # (optional) overrides
├── vite.config.ts                # Vite config (proxy to /api)
├── tailwind.config.js
├── postcss.config.js
├── package.json                  # Frontend dependencies & scripts
└── vercel.json                   # Vercel deployment config
🚀 Getting Started
Prerequisites
Node.js 18+ and npm

MongoDB Atlas account (or local MongoDB)

Resend API key (for email)

1. Clone the repository
bash
git clone https://github.com/your-username/mmuso-code.git
cd mmuso-code
2. Install dependencies
Frontend (root):

bash
npm install
Backend (inside api/):

bash
cd api
npm install
3. Environment Variables
Create .env files for both frontend and backend.

Root .env (frontend – mostly not needed, but can add Vite variables):

env
VITE_APP_TITLE=Mmuso Code
api/.env (backend – required):

env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/mmusocode
JWT_SECRET=your_super_secret_key_generate_with_crypto
RESEND_API_KEY=re_xxxxx   # optional for contact form
PORT=3000
Generate JWT_SECRET with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

4. Create the first admin user
You can manually insert a user into the users collection via MongoDB Atlas (or Compass):

json
{
  "username": "admin",
  "password": "$2a$10$...hash...",  // use bcrypt to hash "admin123"
  "role": "admin"
}
Or run a one‑time script (see api/src/scripts/createAdmin.ts if you added one).

5. Run the development servers
Frontend (root):

bash
npm run dev
# Runs on http://localhost:5173
Backend (inside api/):

bash
npm run dev
# Runs on http://localhost:3000
Vite proxies /api requests to http://localhost:3000, so your frontend can call fetch('/api/...').

🔑 Admin Login
Visit /admin/login (e.g., http://localhost:5173/admin/login)

Enter the credentials of the admin user you created.

After login, you’ll be redirected to /admin/dashboard.

Hidden entry – click the + signs between “Vue 3 + TypeScript + Tailwind CSS” in the footer to quickly reach the login page.

📡 API Endpoints (Public)
Method	Endpoint	Description
GET	/api/projects	Fetch all projects (public)
POST	/api/contact	Submit contact form (email)
GET	/api/health	Health check
Protected Admin Endpoints (require JWT token)
Method	Endpoint	Access	Description
POST	/api/admin/auth/login	public	Login – returns token + user role
GET	/api/admin/stats/dashboard	admin	Total visits, unique IPs, projects
GET	/api/admin/stats/activities	admin	Paginated activity logs (with filters)
POST	/api/projects	admin/editor	Create a new project
PUT	/api/projects/:id	admin/editor	Update a project
DELETE	/api/projects/:id	admin	Delete a project
Role‑based: admin has full access, editor can create/update but not delete, viewer can only view.

🧪 Admin Panel Features
Dashboard – Shows total visits, unique visitors, projects count, and a 7‑day activity chart.

Projects – List, add, edit, and delete projects. Fields: title, description, image URL, tech stack, live URL.

Activity Log – View detailed API logs with method, page, status, IP, user agent, browser, device, country, etc. Supports:

Filtering by method, status code, page path, date range.

IP exact filter – show only logs from a specific IP.

Block list – hide IPs (toggle on/off) – stored locally in your browser.

Pagination and refresh.

🗂️ Database Collections (MongoDB)
users – Admin/editor/viewer accounts.

projects – Portfolio projects.

activitylogs – API request logs (IP, method, page, status, timestamps).

events – (if implemented) User frontend events (page views, clicks, etc.).

🚢 Deployment (Vercel)
The project is configured for Vercel:

Frontend – static site (Vite output) deployed as a Vercel project.

Backend – Express app exported from api/index.ts as a serverless function (Vercel automatically detects /api folder).

Steps:

Push your repository to GitHub.

Import the project on Vercel.

Set the environment variables in Vercel dashboard (same as above).

Deploy.

Ensure your vercel.json (if any) routes all non‑API requests to the frontend, and API requests to the serverless function.

🔐 Security Notes
Passwords are hashed with bcrypt (10 rounds) before storage.

JWT tokens expire in 1 day.

Admin routes are protected with both authentication and role middleware.

Activity logging records IPs and user agents for audit.

Blocking IPs is purely client‑side (UI filter) – the backend still logs everything; only the view is hidden.

🧩 Customization
Styling – Tailwind CSS, modify tailwind.config.js and src/style.css.

Theme – The primary color is #2563EB (blue‑600); search for it in components to change.

Sections – Edit the components in src/components/ to change content.

Projects – Use the admin panel to manage projects without touching code.

📄 License
This project is proprietary. All rights reserved © Mmuso Code (Pty) Ltd.

📬 Contact
Website: mmusocode.co.za

Email: info@mmusocode.co.za

Phone: +27 79 118 9866

Happy coding! 🚀

