import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import { useApp } from './context/AppContext'
import Home from './pages/Home'
import ExploreColleges from './pages/ExploreColleges'
import CollegeDetails from './pages/CollegeDetails'
import Courses from './pages/Courses'
import ExploreStudents from './pages/ExploreStudents'
import StudentProfile from './pages/StudentProfile'
import Connections from './pages/Connections'
import Search from './pages/Search'
import Login from './pages/Login'
import Signup from './pages/Signup'
import About from './pages/About'
import Contact from './pages/Contact'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'

// Logged-out users are sent to /login?redirect=<where they wanted to go>
function RequireAuth({ children }) {
  const { isAuthenticated } = useApp()
  const location = useLocation()
  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`} replace />
  }
  return children
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="colleges" element={<ExploreColleges />} />
        <Route path="colleges/:slug" element={<CollegeDetails />} />
        <Route path="courses" element={<Courses />} />
        <Route path="students" element={<ExploreStudents />} />
        <Route path="students/:id" element={<StudentProfile />} />
        <Route path="profile" element={<RequireAuth><StudentProfile self /></RequireAuth>} />
        <Route path="connections" element={<RequireAuth><Connections /></RequireAuth>} />
        <Route path="search" element={<Search />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Legal kind="privacy" />} />
        <Route path="terms" element={<Legal kind="terms" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      {/* Auth screens use their own full-bleed layout (no navbar/footer) */}
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Routes>
  )
}
