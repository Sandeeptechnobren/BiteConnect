// SEED — the people data agent replaces this with the full dataset (keep the exports and schema).
// Student schema:
// {
//   id: 1, name, image: 'https://images.unsplash.com/...', gender: 'male'|'female',
//   collegeId: 1, collegeName: 'IIT (BHU), Varanasi',
//   course: 'B.Tech Computer Science', courseId: 'cse', degreeType: 'Undergraduate'|'Postgraduate',
//   year: '1st Year'|'2nd Year'|'3rd Year'|'Final Year', semester: 'Semester 5',
//   location: 'Varanasi, Uttar Pradesh', headline: 'short one-liner',
//   skills: [], interests: [], about: '',
//   projects: [{ title, description, tech: [] }],
//   education: [{ school, degree, period }],
//   social: { linkedin, github, portfolio },   // mock URLs
//   mutualConnections: 3,
// }
export const students = [
  {
    id: 1,
    name: 'Rahul Sharma',
    image: null,
    gender: 'male',
    collegeId: 1,
    collegeName: 'IIT (BHU), Varanasi',
    course: 'B.Tech Computer Science',
    courseId: 'cse',
    degreeType: 'Undergraduate',
    year: '3rd Year',
    semester: 'Semester 5',
    location: 'Varanasi, Uttar Pradesh',
    headline: 'Web developer exploring AI',
    skills: ['React', 'JavaScript', 'Python'],
    interests: ['AI', 'Web Development'],
    about: 'Third-year CSE student who enjoys building web apps.',
    projects: [],
    education: [],
    social: { linkedin: 'https://www.linkedin.com/', github: 'https://github.com/', portfolio: null },
    mutualConnections: 4,
  },
]

// The logged-in demo user (editable via Edit Profile; persisted to localStorage).
export const demoUser = {
  id: 'me',
  name: 'Ananya Mishra',
  email: 'ananya.demo@biteconnect.app',
  image: null,
  collegeId: 1,
  collegeName: 'IIT (BHU), Varanasi',
  course: 'B.Tech Computer Science',
  courseId: 'cse',
  year: '2nd Year',
  semester: 'Semester 3',
  location: 'Jaunpur, Uttar Pradesh',
  headline: 'Aspiring full-stack developer',
  about: '',
  skills: ['JavaScript', 'React'],
  interests: ['Web Development'],
  projects: [],
  education: [],
  social: { linkedin: '', github: '', portfolio: '' },
}
