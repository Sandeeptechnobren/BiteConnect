# Bite Connect — build contract (read before writing code)

Frontend-only prototype. Vite + React 19 (JavaScript) + Tailwind CSS v4 + React Router v7 + Framer Motion + lucide-react.
No backend, no fetch to APIs, no new npm dependencies.

## Design system (src/index.css)
- Colours (Tailwind tokens): `primary` #2563EB (+ `primary-hover`, `primary-50/100/200/700`), `secondary` #0F172A (dark sections/footer),
  `background` #F8FAFC, `surface` #FFF, `ink` #111827 (text), `muted` #64748B (secondary text), `line` (borders), `success` #16A34A (+ `success-50`), `danger`.
- Font: Inter. Headings bold/extrabold, `tracking-tight`. Body `text-sm`/`text-base`.
- Utilities (USE THESE): `container-page`, `btn-primary`, `btn-secondary`, `btn-ghost`, `btn-dark`, `btn-success`, `btn-sm` (size modifier, combine e.g. `btn-primary btn-sm`),
  `card`, `card-hover`, `input`, `label`, `chip`, `chip-primary`, `eyebrow`, `skeleton`, `no-scrollbar`.
- Look: clean, premium EdTech — white cards, rounded-2xl, subtle shadows, generous whitespace, real photos. LinkedIn-like profiles,
  Airbnb-like college cards. NO heavy gradients, NO emoji, NO bouncy/excessive animation. Framer Motion only for subtle fades/slide-ins
  (respect reduced motion: use `useReducedMotion` or keep motion small). Vary section layouts — don't make every section the same card grid.
- Responsive: 375px → 1440px+, no horizontal overflow, touch targets ≥ 44px, sticky navbar is ~64px tall (`top-16` for sticky sub-bars).
- Accessibility: semantic headings, labels on inputs, `aria-label` on icon buttons, focus states, `alt` on images.
- Every button must DO something (navigate, filter, toast, open modal). No dead buttons/links.
- Wrap risky logic (storage, parsing, URL params) in try/catch; never let a page crash.

## Files & ownership (only edit files you own; everything else is import-only)
| Owner | Files |
|---|---|
| Lead (done) | `index.css`, `main.jsx`, `App.jsx` (routes), `context/AppContext.jsx`, `utils/*`, `data/courses.js`, `data/selectors.js`, `components/Layout.jsx`, `components/ImageWithFallback.jsx`, `components/CourseIcon.jsx` |
| Colleges data | `data/colleges.js` |
| People data | `data/students.js`, `data/connections.js` |
| Shell UI | `components/Navbar.jsx`, `Footer.jsx`, `Logo.jsx`, `SearchBar.jsx`, `Toast.jsx`, `Modal.jsx`; pages `Search.jsx`, `Login.jsx`, `Signup.jsx`, `Contact.jsx`, `Legal.jsx`, `NotFound.jsx` |
| Colleges UI | `components/CollegeCard.jsx`, `CourseCard.jsx`, `FilterSidebar.jsx`; pages `ExploreColleges.jsx`, `CollegeDetails.jsx`, `Courses.jsx` |
| Students UI | `components/StudentCard.jsx`, `ConnectionButton.jsx`, `EditProfileModal.jsx`; pages `ExploreStudents.jsx`, `StudentProfile.jsx`, `Connections.jsx` |
| Home & About | pages `Home.jsx`, `About.jsx`, plus any new files under `components/home/` |

You may create NEW helper files inside your own area (e.g. `components/colleges/…`, `components/students/…`, `components/home/…`, `components/shell/…`).

## Routes (App.jsx)
`/` Home · `/colleges` (query: `q`, `course`, `location`, `type`) · `/colleges/:slug` · `/courses` · `/students` (query: `q`, `college`, `course`)
· `/students/:id` · `/profile` (logged-in user, `<StudentProfile self />`) · `/connections` · `/search?q=` · `/login?redirect=` · `/signup`
· `/about` · `/contact` · `/privacy` (`<Legal kind="privacy"/>`) · `/terms` (`<Legal kind="terms"/>`) · `*` NotFound.
`/login` and `/signup` render WITHOUT the Layout (full-screen auth design). `/profile` and `/connections` redirect to login when logged out.

## Shared component APIs (implement exactly; others import them)
- `<ImageWithFallback src alt kind="college|avatar" name className imgClassName loading />` — size via className (e.g. `aspect-[4/3] w-full`, `size-12 rounded-full`).
- `<CourseIcon name={course.icon} className />`
- `<Logo variant="dark|light" showText={true} />` — Bite Connect mark + wordmark, links to `/`.
- `<SearchBar variant="navbar|hero|page" autoFocus onNavigate />` — suggestions dropdown over colleges/students/courses/locations; Enter → `/search?q=`.
- `<Modal open onClose title description size="sm|md|lg" variant="center|drawer-right|drawer-left" footer>` — portal, Esc/backdrop close, focus-trap-lite, body scroll lock, Framer Motion fade/slide.
- `<ToastViewport />` — renders `useApp().toasts` (bottom-right desktop, bottom-center mobile), icons per type, close button.
- `<CollegeCard college variant="default|compact" />` — photo (4:3), "Representative image" badge if `!college.isAuthenticPhoto`, name, City, State, type chip, course chips, description (clamp 2), "View College" → `/colleges/:slug`.
- `<CourseCard course count />` — icon, name, `count` colleges, Explore → `/colleges?course=<id>`.
- `<FilterSidebar filters onChange onReset />` — college filters (used by ExploreColleges; desktop sidebar + mobile drawer via Modal).
- `<StudentCard student variant="default|compact|row" showMutual />` — photo, name → `/students/:id`, college, course, year, skill chips, `<ConnectionButton>`.
- `<ConnectionButton studentId size="sm|md" fullWidth />` — states from `useApp().getStatus(id)`:
  none → "Connect" (primary) · sent → "Request Sent" (secondary, hover/click offers "Cancel request") · received → "Accept"/"Decline" ·
  connected → "Connected" (success). Logged out → toast + navigate to `/login?redirect=<current path>`.
- `<EditProfileModal open onClose />` — edits `useApp().user` via `updateProfile` (name, photo with local preview via FileReader→dataURL, college, course, year, about, skills, interests).

## State — `useApp()` from `context/AppContext.jsx`
`isAuthenticated, user, login({email}), signup(details), logout(), updateProfile(patch),`
`connections {connected, received, sent} (arrays of student ids), getStatus(id), sendRequest(id), cancelRequest(id), acceptRequest(id), rejectRequest(id), removeConnection(id),`
`notifications, unreadCount, markAllNotificationsRead(), toasts, toast(msg, {type}), dismissToast(id), resetDemo()`.
All persisted to localStorage already — do NOT write your own storage for these.

## Data — import from `data/*` and `data/selectors.js`
`colleges`, `students`, `demoUser`, `courses`, `degreeTypes`, `initialConnections`, `initialNotifications`.
Selectors: `getCollegeBySlug, getCollegeById, getStudentById, getCourseById, getStudentsByCollege, getCollegesByCourse, collegeCountForCourse,
getFeaturedColleges, getCities, getStates, getLocations, getAllSkills, getStudentYears, courseLabels(college, max)`.
Schemas are documented at the top of `data/colleges.js` and `data/students.js`. Data files are being filled in parallel — code defensively
(`college.gallery ?? []`, `student.projects ?? []`, missing image → ImageWithFallback handles it).

## Images
- College photos: real, freely-licensed photos from Wikimedia Commons (hot-linked from upload.wikimedia.org) with `imageCredit`.
  Show the credit (author · license, linked to source) on the College Details cover. If `isAuthenticPhoto === false`, label it
  "Representative image" — never imply a generic photo is the real campus.
- Student portraits: Unsplash portrait URLs (mock people). Always render through `ImageWithFallback`.

## Footer requirement
Footer bottom bar must include: "Created with love by Kinetic Software Solutions" linking to https://www.kineticsoftwaresolution.com/ (new tab, rel="noopener noreferrer").

## Verification
Run `npm run build` (from the website folder) before you finish — it must pass. Do NOT start a dev server (the lead runs it on port 5184).
Other agents are writing files at the same time; if the build fails ONLY because of someone else's file, note it in your report and move on.
