# Bite Connect — College Discovery & Student Connection Platform

Frontend-only prototype: students discover colleges, explore courses, view student profiles and connect with each other.
All data is mock data; every interaction runs in the browser and persists to `localStorage`. No backend, no APIs, and no credentials ever leave the browser.

**Stack:** React 19 · Vite · Tailwind CSS v4 · React Router v7 · Framer Motion · lucide-react (JavaScript)

## Run
```bash
npm install
npm run dev      # http://localhost:5173 (5184 when started from the workspace launch config)
npm run build    # production build → dist/
```

## Demo flow
1. Open **Log in** and choose **Continue as demo user** (or sign up with any details; nothing is sent anywhere).
2. Search or filter colleges, open a college, browse its courses and students.
3. Click **Connect** on a student: the button becomes **Request Sent** (hover to cancel), and a toast confirms.
4. **Connections** shows My Connections / Received (Accept/Reject) / Sent (Cancel).
5. **Profile → Edit Profile** updates your name, photo (local preview), college, course, skills and more. Changes persist across reloads.
6. Profile menu → **Reset demo data** restores the seed state.

## Structure
```
src/
  context/AppContext.jsx   auth (mock), profile, connection state machine, notifications, toasts, all persisted
  data/                    colleges.js · students.js · courses.js · connections.js · selectors.js
  components/              Navbar, Footer, SearchBar, Modal, Toast, CollegeCard, CourseCard, StudentCard,
                           ConnectionButton, FilterSidebar, EditProfileModal, ImageWithFallback, home/*
  pages/                   Home, ExploreColleges, CollegeDetails, Courses, ExploreStudents, StudentProfile,
                           Connections, Search, Login, Signup, About, Contact, Legal, NotFound
  utils/                   storage (safe localStorage), format helpers
```
`CONTRACT.md` documents the design system, component APIs and data schemas.

## Images
- **College photos** are real, freely licensed photographs from Wikimedia Commons, hot-linked with author and licence credits (shown on each college page). Where no authentic photo was available, a generic campus image is clearly labelled **"Representative image"**.
- **Student portraits** are Unsplash photos used for fictional mock profiles.

## Deploying
SPA fallbacks are included: `vercel.json` (Vercel), `public/_redirects` (Netlify) and `public/.htaccess` (Apache/cPanel/Hostinger).
