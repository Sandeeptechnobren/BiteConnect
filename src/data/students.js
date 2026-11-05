// Mock student profiles (fictional people). Portraits are Unsplash photos (mock people); image: null → UI shows initials.
// Student schema:
// {
//   id: 1, name, image: 'https://images.unsplash.com/...' | null, gender: 'male'|'female',
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

const COLLEGE_NAMES = {
  1: 'IIT (BHU), Varanasi',
  2: 'University of Allahabad, Prayagraj',
  3: 'Harish-Chandra PG College, Varanasi',
  4: 'VBSPU, Jaunpur',
  5: 'United Institute of Technology, Prayagraj',
  6: 'Amity University, Lucknow',
  7: 'Banaras Hindu University, Varanasi',
  8: 'MNNIT Allahabad, Prayagraj',
  9: 'University of Lucknow',
  10: 'IIIT Allahabad, Prayagraj',
  11: 'MMMUT, Gorakhpur',
  12: 'Integral University, Lucknow',
  13: 'Tilak Dhari PG College, Jaunpur',
  14: 'KNIT, Sultanpur',
  15: 'Mahatma Gandhi Kashi Vidyapith, Varanasi',
  16: 'IET Lucknow',
  17: 'Babu Banarasi Das University, Lucknow',
  18: 'Shambhunath Institute of Engineering & Technology, Prayagraj',
}

// courseId → [display name, duration in years, degreeType]
const COURSES = {
  cse: ['B.Tech Computer Science', 4, 'Undergraduate'],
  it: ['B.Tech Information Technology', 4, 'Undergraduate'],
  me: ['B.Tech Mechanical Engineering', 4, 'Undergraduate'],
  ce: ['B.Tech Civil Engineering', 4, 'Undergraduate'],
  ee: ['B.Tech Electrical Engineering', 4, 'Undergraduate'],
  ece: ['B.Tech Electronics & Communication', 4, 'Undergraduate'],
  bca: ['BCA', 3, 'Undergraduate'],
  bsc: ['B.Sc.', 3, 'Undergraduate'],
  mca: ['MCA', 2, 'Postgraduate'],
  mba: ['MBA', 2, 'Postgraduate'],
}

const YEAR_INDEX = { '1st Year': 1, '2nd Year': 2, '3rd Year': 3, 'Final Year': 0 }
const CURRENT_SESSION_START = 2026

const portrait = (id) => `https://images.unsplash.com/${id}?w=400&h=400&fit=crop&crop=faces&auto=format&q=80`

function person(p) {
  const [course, duration, degreeType] = COURSES[p.courseId]
  const yearNo = YEAR_INDEX[p.year] || duration // 'Final Year' → last year of the programme
  const start = CURRENT_SESSION_START - (yearNo - 1)
  const end = start + duration
  const handle = p.handle
  return {
    id: p.id,
    name: p.name,
    image: p.image ? portrait(p.image) : null,
    gender: p.gender,
    collegeId: p.collegeId,
    collegeName: COLLEGE_NAMES[p.collegeId],
    course,
    courseId: p.courseId,
    degreeType,
    year: p.year,
    semester: `Semester ${yearNo * 2 - 1}`,
    location: p.location,
    headline: p.headline,
    skills: p.skills,
    interests: p.interests,
    about: p.about,
    projects: p.projects,
    education: [
      { school: COLLEGE_NAMES[p.collegeId], degree: course, period: `${start} – ${end}` },
      ...(p.prev ? [{ school: p.prev[0], degree: p.prev[1], period: `${start - p.prev[2]} – ${start}` }] : []),
      { school: p.school, degree: 'Class XII', period: `${start - (p.prev ? p.prev[2] : 0) - 2} – ${start - (p.prev ? p.prev[2] : 0)}` },
    ],
    social: {
      linkedin: `https://www.linkedin.com/in/${handle}`,
      github: `https://github.com/${handle}`,
      portfolio: p.portfolio ?? null,
    },
    mutualConnections: p.mutual,
  }
}

export const students = [
  // ── 1 · IIT (BHU), Varanasi ─────────────────────────────
  person({
    id: 1, name: 'Aman Verma', gender: 'male', image: 'photo-1782323709687-43675cbddd46',
    collegeId: 1, courseId: 'me', year: '2nd Year', location: 'Kanpur, Uttar Pradesh',
    headline: 'Mechanical engineer building small robots',
    skills: ['SolidWorks', 'AutoCAD', 'Arduino', 'MATLAB', 'Python'],
    interests: ['Robotics', 'CAD', 'Automobiles'],
    about: 'Second-year mechanical student at IIT (BHU) and a member of the robotics club. I spend most evenings in the workshop turning CAD models into working prototypes.',
    projects: [
      { title: 'Line-Following Robot', description: 'A PID-controlled line follower built for the inter-college robotics event, finishing in the top five.', tech: ['Arduino', 'C++', 'IR Sensors'] },
      { title: 'Robotic Arm CAD Model', description: 'A 4-DOF robotic arm designed and stress-tested in SolidWorks before 3D printing.', tech: ['SolidWorks', 'ANSYS'] },
    ],
    school: 'Delhi Public School, Kanpur', handle: 'aman-verma-iitbhu', mutual: 7,
  }),
  person({
    id: 2, name: 'Siddharth Rao', gender: 'male', image: 'photo-1757744705465-ea08b0ddc38a',
    collegeId: 1, courseId: 'cse', year: 'Final Year', location: 'Hyderabad, Telangana',
    headline: 'Backend developer · competitive programmer',
    skills: ['C++', 'Java', 'Node.js', 'PostgreSQL', 'Docker', 'Data Structures'],
    interests: ['Competitive Programming', 'Open Source', 'System Design'],
    about: 'Final-year CSE student who enjoys designing APIs that stay fast under load. I have interned twice in backend teams and like mentoring juniors for coding contests.',
    projects: [
      { title: 'CampusEats API', description: 'A REST API for ordering from hostel canteens, with order queues and payment status tracking.', tech: ['Node.js', 'Express', 'PostgreSQL'] },
      { title: 'Contest Tracker', description: 'A dashboard that aggregates upcoming coding contests and sends reminders.', tech: ['React', 'Docker'] },
    ],
    school: 'Sri Chaitanya Junior College, Hyderabad', handle: 'siddharth-rao-dev', portfolio: 'https://siddharthrao.dev', mutual: 12,
  }),
  person({
    id: 3, name: 'Kavya Iyer', gender: 'female', image: null,
    collegeId: 1, courseId: 'ece', year: '3rd Year', location: 'Chennai, Tamil Nadu',
    headline: 'Embedded systems and VLSI enthusiast',
    skills: ['Verilog', 'MATLAB', 'Embedded C', 'Arduino', 'Python'],
    interests: ['VLSI', 'IoT', 'Classical Music'],
    about: 'Third-year ECE student interested in chip design and low-power embedded devices. Outside class I sing Carnatic music and help run the electronics society.',
    projects: [
      { title: 'Smart Energy Meter', description: 'An IoT meter that logs household consumption and flags unusual usage on a mobile dashboard.', tech: ['ESP32', 'Embedded C', 'Firebase'] },
    ],
    school: 'PSBB Senior Secondary School, Chennai', handle: 'kavya-iyer-ece', mutual: 5,
  }),
  person({
    id: 4, name: 'Harsh Agarwal', gender: 'male', image: null,
    collegeId: 1, courseId: 'ee', year: '1st Year', location: 'Agra, Uttar Pradesh',
    headline: 'First-year EE student curious about renewables',
    skills: ['Python', 'MATLAB', 'Excel'],
    interests: ['Renewable Energy', 'Electric Vehicles', 'Chess'],
    about: 'Just started my B.Tech in Electrical Engineering and already hooked on power electronics. I am looking to connect with seniors working on EV and solar projects.',
    projects: [
      { title: 'Solar Output Estimator', description: 'A Python script that estimates rooftop solar output from city weather data.', tech: ['Python', 'Pandas'] },
    ],
    school: "St. Peter's College, Agra", handle: 'harsh-agarwal-ee', mutual: 2,
  }),

  // ── 2 · University of Allahabad, Prayagraj ──────────────
  person({
    id: 5, name: 'Rahul Sharma', gender: 'male', image: 'photo-1589386417686-0d34b5903d23',
    collegeId: 2, courseId: 'cse', year: '3rd Year', location: 'Prayagraj, Uttar Pradesh',
    headline: 'Full-stack web developer exploring AI',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'MongoDB', 'Tailwind CSS'],
    interests: ['Web Development', 'AI', 'Startups'],
    about: 'Third-year Computer Science student at the University of Allahabad who loves building for the web. Lately I have been combining React front ends with small AI models to make study tools for classmates.',
    projects: [
      { title: 'NoteMate', description: 'An AI-assisted notes app that summarises lecture notes and generates quick revision questions.', tech: ['React', 'Node.js', 'OpenAI API'] },
      { title: 'Prayagraj Events', description: 'A city events board for students with filters, bookmarks and a simple admin panel.', tech: ['JavaScript', 'MongoDB', 'Express'] },
    ],
    school: 'Boys High School & College, Prayagraj', handle: 'rahul-sharma-dev', portfolio: 'https://rahulsharma.dev', mutual: 9,
  }),
  person({
    id: 6, name: 'Shreya Tripathi', gender: 'female', image: null,
    collegeId: 2, courseId: 'mca', year: 'Final Year', location: 'Pratapgarh, Uttar Pradesh',
    headline: 'MCA student · Java and Spring Boot developer',
    skills: ['Java', 'Spring Boot', 'MySQL', 'React', 'Git'],
    interests: ['Software Engineering', 'Teaching', 'Reading'],
    about: 'Final-year MCA student who likes clean backend code and well-tested services. I also tutor BCA juniors in Java on weekends.',
    projects: [
      { title: 'Library Management System', description: 'A Spring Boot application for issuing and tracking books, built for the department library.', tech: ['Java', 'Spring Boot', 'MySQL'] },
    ],
    school: 'Kendriya Vidyalaya, Pratapgarh', prev: ['University of Allahabad', 'BCA', 3], handle: 'shreya-tripathi', mutual: 6,
  }),
  person({
    id: 7, name: 'Ankit Yadav', gender: 'male', image: null,
    collegeId: 2, courseId: 'bsc', year: '2nd Year', location: 'Ballia, Uttar Pradesh',
    headline: 'Physics student who codes simulations',
    skills: ['Python', 'MATLAB', 'Excel', 'LaTeX'],
    interests: ['Physics', 'Astronomy', 'Data Science'],
    about: 'B.Sc. student with Physics and Maths who enjoys turning textbook problems into Python simulations. I am preparing for JAM and hope to pursue research.',
    projects: [
      { title: 'Projectile Motion Simulator', description: 'An interactive notebook that visualises projectile paths with air resistance.', tech: ['Python', 'NumPy', 'Matplotlib'] },
    ],
    school: 'GIC Ballia', handle: 'ankit-yadav-physics', mutual: 3,
  }),
  person({
    id: 8, name: 'Nidhi Srivastava', gender: 'female', image: null,
    collegeId: 2, courseId: 'mba', year: '1st Year', location: 'Lucknow, Uttar Pradesh',
    headline: 'MBA candidate focused on marketing',
    skills: ['Digital Marketing', 'Excel', 'Canva', 'Market Research'],
    interests: ['Branding', 'Consumer Behaviour', 'Public Speaking'],
    about: 'First-year MBA student with a background in commerce. I am interested in how small brands in UP can grow through digital marketing.',
    projects: [
      { title: 'Local Brand Audit', description: 'A study of social media presence for ten local sweet shops with growth recommendations.', tech: ['Excel', 'Canva', 'Google Forms'] },
    ],
    school: 'City Montessori School, Lucknow', prev: ['University of Lucknow', 'B.Com', 3], handle: 'nidhi-srivastava-mba', mutual: 4,
  }),

  // ── 3 · Harish-Chandra PG College, Varanasi ─────────────
  person({
    id: 9, name: 'Vikas Pandey', gender: 'male', image: null,
    collegeId: 3, courseId: 'bca', year: '3rd Year', location: 'Varanasi, Uttar Pradesh',
    headline: 'BCA student learning Android development',
    skills: ['Java', 'Kotlin', 'Android', 'Firebase', 'SQL'],
    interests: ['Mobile Apps', 'Cricket', 'Photography'],
    about: 'BCA student from Varanasi who builds Android apps for local shops. I want to work as a mobile developer after graduation.',
    projects: [
      { title: 'Ghat Guide', description: 'An Android app listing Varanasi ghats with timings for aarti and boat rides.', tech: ['Kotlin', 'Firebase'] },
    ],
    school: 'Central Hindu Boys School, Varanasi', handle: 'vikas-pandey-bca', mutual: 3,
  }),
  person({
    id: 10, name: 'Pooja Gupta', gender: 'female', image: null,
    collegeId: 3, courseId: 'bsc', year: '2nd Year', location: 'Mirzapur, Uttar Pradesh',
    headline: 'Chemistry student and science communicator',
    skills: ['Lab Techniques', 'Excel', 'Python', 'Research Writing'],
    interests: ['Chemistry', 'Science Writing', 'Environment'],
    about: 'B.Sc. Chemistry student who enjoys explaining science in simple Hindi. I run a small blog on everyday chemistry for school students.',
    projects: [
      { title: 'Ganga Water Quality Study', description: 'Sampled and compared pH and dissolved oxygen at five ghats over three months.', tech: ['Excel', 'Lab Analysis'] },
    ],
    school: 'Government Girls Inter College, Mirzapur', handle: 'pooja-gupta-chem', mutual: 1,
  }),
  person({
    id: 11, name: 'Abhishek Mishra', gender: 'male', image: null,
    collegeId: 3, courseId: 'mba', year: 'Final Year', location: 'Ghazipur, Uttar Pradesh',
    headline: 'Finance-focused MBA student',
    skills: ['Excel', 'Financial Modelling', 'Tally', 'Power BI'],
    interests: ['Stock Markets', 'Banking', 'Debate'],
    about: 'Final-year MBA student specialising in finance. I have interned with a cooperative bank and enjoy building financial models.',
    projects: [
      { title: 'MSME Credit Analysis', description: 'Analysed loan repayment trends of small businesses in Ghazipur district.', tech: ['Excel', 'Power BI'] },
    ],
    school: 'Ghazipur Public School', prev: ['Harish-Chandra PG College', 'B.Com', 3], handle: 'abhishek-mishra-finance', mutual: 5,
  }),

  // ── 4 · VBSPU, Jaunpur ──────────────────────────────────
  person({
    id: 12, name: 'Priya Singh', gender: 'female', image: 'photo-1767607740661-05e668190cdc',
    collegeId: 4, courseId: 'bca', year: 'Final Year', location: 'Jaunpur, Uttar Pradesh',
    headline: 'Aspiring data scientist · Python enthusiast',
    skills: ['Python', 'Pandas', 'SQL', 'Machine Learning', 'Excel'],
    interests: ['Data Science', 'Python', 'Visualisation'],
    about: 'Final-year BCA student at VBSPU, Jaunpur, passionate about finding stories in data. I am building a portfolio of small data projects and preparing for analyst roles.',
    projects: [
      { title: 'Jaunpur Rainfall Analysis', description: 'Analysed 20 years of district rainfall data and visualised seasonal trends.', tech: ['Python', 'Pandas', 'Matplotlib'] },
      { title: 'Student Result Predictor', description: 'A simple ML model that predicts semester results from attendance and assignment scores.', tech: ['Python', 'scikit-learn'] },
    ],
    school: 'Raja Shri Krishna Dutt Inter College, Jaunpur', handle: 'priya-singh-data', mutual: 8,
  }),
  person({
    id: 13, name: 'Saurabh Maurya', gender: 'male', image: null,
    collegeId: 4, courseId: 'mca', year: '1st Year', location: 'Jaunpur, Uttar Pradesh',
    headline: 'MCA student building web apps with PHP and React',
    skills: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'React'],
    interests: ['Web Development', 'Freelancing', 'Volleyball'],
    about: 'MCA student who has been freelancing on small business websites since BCA. I want to grow into a full-stack developer.',
    projects: [
      { title: 'Kirana Billing', description: 'A billing and stock web app for neighbourhood grocery stores.', tech: ['Laravel', 'MySQL'] },
    ],
    school: 'Tilak Dhari Inter College, Jaunpur', prev: ['VBSPU, Jaunpur', 'BCA', 3], handle: 'saurabh-maurya', mutual: 4,
  }),
  person({
    id: 14, name: 'Anjali Yadav', gender: 'female', image: null,
    collegeId: 4, courseId: 'mba', year: 'Final Year', location: 'Azamgarh, Uttar Pradesh',
    headline: 'HR and operations · MBA',
    skills: ['Excel', 'HR Analytics', 'Communication', 'Power BI'],
    interests: ['Human Resources', 'Leadership', 'Social Work'],
    about: 'Final-year MBA student specialising in HR. I enjoy organising campus events and want to work in people operations.',
    projects: [
      { title: 'Campus Placement Survey', description: 'Surveyed 200 students on placement readiness and presented findings to the cell.', tech: ['Google Forms', 'Excel', 'Power BI'] },
    ],
    school: 'Shibli National Inter College, Azamgarh', prev: ['VBSPU, Jaunpur', 'BBA', 3], handle: 'anjali-yadav-hr', mutual: 2,
  }),
  person({
    id: 15, name: 'Rohit Gupta', gender: 'male', image: null,
    collegeId: 4, courseId: 'bsc', year: '1st Year', location: 'Varanasi, Uttar Pradesh',
    headline: 'Maths student exploring statistics',
    skills: ['Python', 'Excel', 'Statistics'],
    interests: ['Mathematics', 'Data Science', 'Cricket'],
    about: 'First-year B.Sc. Maths student who wants to move into data science. I am currently learning Python and statistics online.',
    projects: [
      { title: 'Cricket Stats Notebook', description: 'Explored IPL batting averages with simple charts in Python.', tech: ['Python', 'Pandas'] },
    ],
    school: 'Sunbeam School, Varanasi', handle: 'rohit-gupta-maths', mutual: 0,
  }),

  // ── 5 · United Institute of Technology, Prayagraj ───────
  person({
    id: 16, name: 'Aditya Kesarwani', gender: 'male', image: null,
    collegeId: 5, courseId: 'cse', year: '3rd Year', location: 'Prayagraj, Uttar Pradesh',
    headline: 'Frontend developer with an eye for UI',
    skills: ['React', 'JavaScript', 'Figma', 'Tailwind CSS', 'Git'],
    interests: ['UI/UX Design', 'Web Development', 'Gaming'],
    about: 'Third-year CSE student who designs in Figma and then builds it in React. I contribute to open-source UI libraries when I can.',
    projects: [
      { title: 'Hostel Mess Feedback', description: 'A mobile-first feedback app for the hostel mess with weekly menu ratings.', tech: ['React', 'Tailwind CSS', 'Firebase'] },
    ],
    school: 'St. Joseph’s College, Prayagraj', handle: 'aditya-kesarwani', portfolio: 'https://adityak.design', mutual: 6,
  }),
  person({
    id: 17, name: 'Sneha Patel', gender: 'female', image: null,
    collegeId: 5, courseId: 'bca', year: '2nd Year', location: 'Surat, Gujarat',
    headline: 'BCA student learning cloud and DevOps',
    skills: ['Python', 'Linux', 'AWS', 'HTML', 'CSS'],
    interests: ['Cloud Computing', 'DevOps', 'Travel'],
    about: 'BCA student from Gujarat studying in Prayagraj. I am working toward an AWS certification and like automating boring tasks with scripts.',
    projects: [
      { title: 'Static Site on AWS', description: 'Hosted a college club website on S3 with CloudFront and a CI pipeline.', tech: ['AWS', 'GitHub Actions'] },
    ],
    school: 'Ryan International School, Surat', handle: 'sneha-patel-cloud', mutual: 2,
  }),
  person({
    id: 18, name: 'Mohit Kushwaha', gender: 'male', image: null,
    collegeId: 5, courseId: 'me', year: 'Final Year', location: 'Gorakhpur, Uttar Pradesh',
    headline: 'Mechanical engineer interested in manufacturing',
    skills: ['AutoCAD', 'SolidWorks', 'CATIA', 'Excel'],
    interests: ['Manufacturing', 'Automobiles', 'Lean Management'],
    about: 'Final-year mechanical student who completed an internship on a production line. I am keen on lean manufacturing and quality engineering roles.',
    projects: [
      { title: 'Go-Kart Chassis Design', description: 'Designed and analysed a go-kart chassis for a national student competition.', tech: ['SolidWorks', 'ANSYS'] },
    ],
    school: 'Kendriya Vidyalaya, Gorakhpur', handle: 'mohit-kushwaha-mech', mutual: 3,
  }),

  // ── 6 · Amity University, Lucknow ───────────────────────
  person({
    id: 19, name: 'Riya Kapoor', gender: 'female', image: 'photo-1624610806209-82a4cbb4339a',
    collegeId: 6, courseId: 'cse', year: '2nd Year', location: 'Delhi, Delhi',
    headline: 'CSE student into machine learning',
    skills: ['Python', 'TensorFlow', 'Machine Learning', 'C++', 'Git'],
    interests: ['AI', 'Hackathons', 'Dance'],
    about: 'Second-year CSE student at Amity Lucknow who loves hackathons. I am learning deep learning and building small computer vision projects.',
    projects: [
      { title: 'Plant Disease Detector', description: 'A CNN that identifies common leaf diseases from phone photos.', tech: ['Python', 'TensorFlow'] },
    ],
    school: 'Delhi Public School, R.K. Puram', handle: 'riya-kapoor-ml', mutual: 10,
  }),
  person({
    id: 20, name: 'Arjun Malhotra', gender: 'male', image: null,
    collegeId: 6, courseId: 'mba', year: '1st Year', location: 'Chandigarh, Punjab',
    headline: 'MBA student interested in product management',
    skills: ['Product Management', 'Excel', 'SQL', 'Figma'],
    interests: ['Product', 'Startups', 'Football'],
    about: 'Engineer-turned-MBA student exploring product management. I like talking to users and turning feedback into roadmaps.',
    projects: [
      { title: 'Campus Marketplace PRD', description: 'Wrote a product spec and ran user interviews for a second-hand book marketplace.', tech: ['Figma', 'Notion'] },
    ],
    school: 'St. John’s High School, Chandigarh', prev: ['Chandigarh University', 'B.Tech', 4], handle: 'arjun-malhotra-pm', mutual: 7,
  }),
  person({
    id: 21, name: 'Fatima Khan', gender: 'female', image: null,
    collegeId: 6, courseId: 'bca', year: '3rd Year', location: 'Lucknow, Uttar Pradesh',
    headline: 'BCA student and UI designer',
    skills: ['Figma', 'HTML', 'CSS', 'JavaScript', 'Adobe XD'],
    interests: ['UI/UX Design', 'Calligraphy', 'Accessibility'],
    about: 'Final-stage BCA student who designs accessible interfaces. I enjoy Urdu calligraphy and often bring that sense of detail to my design work.',
    projects: [
      { title: 'Clinic Booking Redesign', description: 'Redesigned a local clinic appointment flow, cutting booking steps from seven to three.', tech: ['Figma', 'HTML', 'CSS'] },
    ],
    school: 'Loreto Convent, Lucknow', handle: 'fatima-khan-design', portfolio: 'https://fatimakhan.design', mutual: 4,
  }),

  // ── 7 · Banaras Hindu University, Varanasi ──────────────
  person({
    id: 22, name: 'Deepak Chaurasia', gender: 'male', image: null,
    collegeId: 7, courseId: 'bsc', year: '3rd Year', location: 'Varanasi, Uttar Pradesh',
    headline: 'Botany student with a love for field research',
    skills: ['Research Writing', 'Excel', 'R', 'Lab Techniques'],
    interests: ['Biology', 'Environment', 'Photography'],
    about: 'Final-year B.Sc. student at BHU focused on plant sciences. I document local flora around the campus and hope to pursue an M.Sc. in ecology.',
    projects: [
      { title: 'BHU Campus Flora Survey', description: 'Catalogued over 120 plant species on campus with photographs and locations.', tech: ['R', 'Excel'] },
    ],
    school: 'Central Hindu School, Varanasi', handle: 'deepak-chaurasia', mutual: 2,
  }),
  person({
    id: 23, name: 'Megha Rai', gender: 'female', image: null,
    collegeId: 7, courseId: 'mca', year: 'Final Year', location: 'Mau, Uttar Pradesh',
    headline: 'MCA student · Python and Django developer',
    skills: ['Python', 'Django', 'PostgreSQL', 'REST APIs', 'Git'],
    interests: ['Backend Development', 'Open Source', 'Music'],
    about: 'Final-year MCA student who builds Django back ends. I recently completed an internship at a Bengaluru startup.',
    projects: [
      { title: 'Alumni Connect Portal', description: 'A Django portal linking department alumni with current students for mentorship.', tech: ['Django', 'PostgreSQL'] },
    ],
    school: 'St. Joseph’s School, Mau', prev: ['Banaras Hindu University', 'BCA', 3], handle: 'megha-rai-dev', mutual: 6,
  }),
  person({
    id: 24, name: 'Kunal Singh', gender: 'male', image: null,
    collegeId: 7, courseId: 'mba', year: '1st Year', location: 'Patna, Bihar',
    headline: 'MBA student interested in operations',
    skills: ['Excel', 'Supply Chain', 'Power BI', 'Communication'],
    interests: ['Operations', 'Logistics', 'Cricket'],
    about: 'First-year MBA student from Patna with a commerce background. I want to work on supply chain problems for Indian agriculture.',
    projects: [
      { title: 'Mandi Price Tracker', description: 'A dashboard comparing vegetable prices across Bihar mandis.', tech: ['Excel', 'Power BI'] },
    ],
    school: 'St. Michael’s High School, Patna', prev: ['Patna University', 'B.Com', 3], handle: 'kunal-singh-ops', mutual: 3,
  }),

  // ── 8 · MNNIT Allahabad, Prayagraj ──────────────────────
  person({
    id: 25, name: 'Nikhil Jain', gender: 'male', image: 'photo-1712425718137-491250cfde88',
    collegeId: 8, courseId: 'cse', year: '3rd Year', location: 'Jaipur, Rajasthan',
    headline: 'Software developer · open-source contributor',
    skills: ['Go', 'React', 'TypeScript', 'Docker', 'Kubernetes'],
    interests: ['Open Source', 'Distributed Systems', 'Music'],
    about: 'Third-year CSE student at MNNIT and a GSoC contributor. I enjoy working on developer tools and distributed systems.',
    projects: [
      { title: 'LogLens', description: 'A lightweight log viewer for Docker containers with search and filters.', tech: ['Go', 'React', 'Docker'] },
    ],
    school: 'Maharaja Sawai Man Singh Vidyalaya, Jaipur', handle: 'nikhil-jain-oss', portfolio: 'https://nikhiljain.dev', mutual: 11,
  }),
  person({
    id: 26, name: 'Shivani Dubey', gender: 'female', image: null,
    collegeId: 8, courseId: 'ee', year: '2nd Year', location: 'Jabalpur, Madhya Pradesh',
    headline: 'Electrical engineering student working on EV batteries',
    skills: ['MATLAB', 'Simulink', 'Python', 'Circuit Design'],
    interests: ['Electric Vehicles', 'Power Electronics', 'Badminton'],
    about: 'Second-year EE student with the institute’s EV team. I work on battery management simulations in MATLAB.',
    projects: [
      { title: 'BMS Simulation', description: 'Modelled cell balancing for a 48V battery pack in Simulink.', tech: ['MATLAB', 'Simulink'] },
    ],
    school: 'Christ Church Girls School, Jabalpur', handle: 'shivani-dubey-ee', mutual: 4,
  }),
  person({
    id: 27, name: 'Rajat Saxena', gender: 'male', image: null,
    collegeId: 8, courseId: 'ce', year: 'Final Year', location: 'Bareilly, Uttar Pradesh',
    headline: 'Civil engineer focused on structural design',
    skills: ['AutoCAD', 'STAAD Pro', 'Revit', 'Excel'],
    interests: ['Structural Engineering', 'Urban Planning', 'Travel'],
    about: 'Final-year civil engineering student interested in earthquake-resistant design. I interned with a state PWD division last summer.',
    projects: [
      { title: 'G+4 Hostel Block Design', description: 'Complete structural analysis and design of a hostel building in STAAD Pro.', tech: ['STAAD Pro', 'AutoCAD'] },
    ],
    school: 'Bishop Conrad School, Bareilly', handle: 'rajat-saxena-civil', mutual: 2,
  }),

  // ── 9 · University of Lucknow ───────────────────────────
  person({
    id: 28, name: 'Aisha Siddiqui', gender: 'female', image: null,
    collegeId: 9, courseId: 'bsc', year: '2nd Year', location: 'Lucknow, Uttar Pradesh',
    headline: 'Statistics student who loves data',
    skills: ['R', 'Python', 'Excel', 'Statistics'],
    interests: ['Data Science', 'Poetry', 'Public Health'],
    about: 'B.Sc. Statistics student at Lucknow University. I am interested in using data to understand public health trends in UP.',
    projects: [
      { title: 'Air Quality Trends in Lucknow', description: 'Analysed five years of AQI data to show seasonal pollution peaks.', tech: ['R', 'ggplot2'] },
    ],
    school: 'La Martiniere Girls’ College, Lucknow', handle: 'aisha-siddiqui', mutual: 5,
  }),
  person({
    id: 29, name: 'Varun Awasthi', gender: 'male', image: null,
    collegeId: 9, courseId: 'mba', year: 'Final Year', location: 'Unnao, Uttar Pradesh',
    headline: 'MBA marketing · content and brand strategy',
    skills: ['Digital Marketing', 'SEO', 'Canva', 'Google Analytics'],
    interests: ['Marketing', 'Content Creation', 'Films'],
    about: 'Final-year MBA student who runs a small YouTube channel on career tips. I like blending creativity with data in marketing.',
    projects: [
      { title: 'Café Launch Campaign', description: 'Planned and executed an Instagram launch campaign for a local café.', tech: ['Canva', 'Meta Ads'] },
    ],
    school: 'Saraswati Vidya Mandir, Unnao', prev: ['University of Lucknow', 'BBA', 3], handle: 'varun-awasthi', mutual: 3,
  }),

  // ── 10 · IIIT Allahabad, Prayagraj ──────────────────────
  person({
    id: 30, name: 'Ishita Bansal', gender: 'female', image: 'photo-1517487313006-d80558d7a5cb',
    collegeId: 10, courseId: 'it', year: '3rd Year', location: 'Ludhiana, Punjab',
    headline: 'IT student · machine learning research intern',
    skills: ['Python', 'PyTorch', 'Machine Learning', 'SQL', 'Git'],
    interests: ['AI', 'Research', 'Hackathons'],
    about: 'Third-year IT student at IIIT Allahabad working on NLP research. I enjoy hackathons and have won two at the national level.',
    projects: [
      { title: 'Hindi Sentiment Classifier', description: 'Fine-tuned a transformer model to classify sentiment in Hindi tweets.', tech: ['Python', 'PyTorch'] },
    ],
    school: 'Sacred Heart Convent School, Ludhiana', handle: 'ishita-bansal-ml', mutual: 9,
  }),
  person({
    id: 31, name: 'Prateek Tiwari', gender: 'male', image: null,
    collegeId: 10, courseId: 'ece', year: '2nd Year', location: 'Rewa, Madhya Pradesh',
    headline: 'ECE student building IoT devices',
    skills: ['Embedded C', 'Arduino', 'Python', 'PCB Design'],
    interests: ['IoT', 'Robotics', 'Drones'],
    about: 'Second-year ECE student who likes hardware hacking. I am part of the drone club and design small PCBs for our builds.',
    projects: [
      { title: 'Smart Irrigation Controller', description: 'Soil-moisture based irrigation controller with SMS alerts.', tech: ['Arduino', 'GSM Module'] },
    ],
    school: 'Kendriya Vidyalaya, Rewa', handle: 'prateek-tiwari-ece', mutual: 2,
  }),
  person({
    id: 32, name: 'Manish Kumar', gender: 'male', image: null,
    collegeId: 10, courseId: 'cse', year: 'Final Year', location: 'Gaya, Bihar',
    headline: 'Competitive programmer · SDE intern',
    skills: ['C++', 'Java', 'Data Structures', 'Spring Boot', 'MySQL'],
    interests: ['Competitive Programming', 'System Design', 'Chess'],
    about: 'Final-year CSE student from Bihar who started coding in college and fell in love with algorithms. I completed an SDE internship and run DSA sessions for juniors.',
    projects: [
      { title: 'Code Arena', description: 'An online judge for college contests with a sandboxed code runner.', tech: ['Java', 'Spring Boot', 'Docker'] },
    ],
    school: 'Nazareth Academy, Gaya', handle: 'manish-kumar-cp', mutual: 14,
  }),

  // ── 11 · MMMUT, Gorakhpur ───────────────────────────────
  person({
    id: 33, name: 'Ashish Tripathi', gender: 'male', image: null,
    collegeId: 11, courseId: 'ee', year: '3rd Year', location: 'Gorakhpur, Uttar Pradesh',
    headline: 'Electrical engineering · power systems',
    skills: ['MATLAB', 'AutoCAD Electrical', 'PLC', 'Excel'],
    interests: ['Power Systems', 'Automation', 'Volleyball'],
    about: 'Third-year EE student at MMMUT interested in industrial automation. I am learning PLC programming through a summer training.',
    projects: [
      { title: 'Substation Load Study', description: 'Studied load patterns at a 33kV substation and suggested balancing measures.', tech: ['MATLAB', 'Excel'] },
    ],
    school: 'St. Andrew’s Inter College, Gorakhpur', handle: 'ashish-tripathi-ee', mutual: 1,
  }),
  person({
    id: 34, name: 'Komal Verma', gender: 'female', image: null,
    collegeId: 11, courseId: 'me', year: '2nd Year', location: 'Deoria, Uttar Pradesh',
    headline: 'Mechanical engineering student and CAD learner',
    skills: ['AutoCAD', 'SolidWorks', 'MATLAB'],
    interests: ['Design', 'Thermal Engineering', 'Sketching'],
    about: 'One of a few women in my mechanical branch and proud of it. I enjoy CAD modelling and am exploring thermal engineering.',
    projects: [
      { title: 'Heat Exchanger Model', description: 'Modelled a shell-and-tube heat exchanger and compared design variants.', tech: ['SolidWorks', 'MATLAB'] },
    ],
    school: 'Kendriya Vidyalaya, Deoria', handle: 'komal-verma-mech', mutual: 2,
  }),

  // ── 12 · Integral University, Lucknow ───────────────────
  person({
    id: 35, name: 'Zaid Ansari', gender: 'male', image: 'photo-1649433658557-54cf58577c68',
    collegeId: 12, courseId: 'cse', year: '2nd Year', location: 'Lucknow, Uttar Pradesh',
    headline: 'CSE student · Flutter app developer',
    skills: ['Flutter', 'Dart', 'Firebase', 'Java', 'Git'],
    interests: ['Mobile Apps', 'Startups', 'Football'],
    about: 'Second-year CSE student building cross-platform apps with Flutter. I have published two small apps on the Play Store.',
    projects: [
      { title: 'Namaz Times', description: 'A Flutter app showing prayer times and nearby mosques with offline support.', tech: ['Flutter', 'Firebase'] },
    ],
    school: 'Colvin Taluqdars’ College, Lucknow', handle: 'zaid-ansari-flutter', mutual: 4,
  }),
  person({
    id: 36, name: 'Tanya Bajpai', gender: 'female', image: null,
    collegeId: 12, courseId: 'mca', year: '1st Year', location: 'Kanpur, Uttar Pradesh',
    headline: 'MCA student learning full-stack development',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    interests: ['Web Development', 'Blogging', 'Yoga'],
    about: 'First-year MCA student shifting from theory to building real projects. I write a weekly blog on what I learn.',
    projects: [
      { title: 'Expense Splitter', description: 'A MERN app for splitting trip expenses among friends.', tech: ['React', 'Node.js', 'MongoDB'] },
    ],
    school: 'Seth Anandram Jaipuria School, Kanpur', prev: ['CSJM University, Kanpur', 'BCA', 3], handle: 'tanya-bajpai', mutual: 3,
  }),

  // ── 13 · Tilak Dhari PG College, Jaunpur ────────────────
  person({
    id: 37, name: 'Amit Maurya', gender: 'male', image: null,
    collegeId: 13, courseId: 'bsc', year: '3rd Year', location: 'Jaunpur, Uttar Pradesh',
    headline: 'Maths student preparing for higher studies',
    skills: ['Mathematics', 'Python', 'Excel', 'LaTeX'],
    interests: ['Mathematics', 'Teaching', 'Kabaddi'],
    about: 'Final-year B.Sc. student at TD College, Jaunpur. I teach maths to school students in my village and am preparing for M.Sc. entrance exams.',
    projects: [
      { title: 'Maths Practice Sheets', description: 'Created and shared 50+ practice sheets for Class X students in Hindi.', tech: ['LaTeX'] },
    ],
    school: 'Mohammad Hasan Inter College, Jaunpur', handle: 'amit-maurya-maths', mutual: 6,
  }),
  person({
    id: 38, name: 'Sakshi Srivastava', gender: 'female', image: null,
    collegeId: 13, courseId: 'bca', year: '2nd Year', location: 'Jaunpur, Uttar Pradesh',
    headline: 'BCA student learning web design',
    skills: ['HTML', 'CSS', 'JavaScript', 'Figma'],
    interests: ['Web Design', 'Painting', 'Reading'],
    about: 'Second-year BCA student from Jaunpur who started with painting and moved into web design. I am building my first portfolio site.',
    projects: [
      { title: 'Jaunpur Heritage Site', description: 'A simple website about Jaunpur’s historic mosques and the Shahi Bridge.', tech: ['HTML', 'CSS', 'JavaScript'] },
    ],
    school: 'Kendriya Vidyalaya, Jaunpur', handle: 'sakshi-srivastava-web', mutual: 5,
  }),

  // ── 14 · KNIT, Sultanpur ────────────────────────────────
  person({
    id: 39, name: 'Gaurav Shukla', gender: 'male', image: 'photo-1598096969068-7f52cac10c83',
    collegeId: 14, courseId: 'it', year: '3rd Year', location: 'Sultanpur, Uttar Pradesh',
    headline: 'IT student · cloud and DevOps',
    skills: ['Linux', 'AWS', 'Docker', 'Python', 'Jenkins'],
    interests: ['DevOps', 'Trekking', 'Cloud Computing'],
    about: 'Third-year IT student at KNIT who enjoys automating deployments. I love trekking in the Himalayas during semester breaks.',
    projects: [
      { title: 'CI/CD for College Portal', description: 'Set up a Jenkins pipeline that tests and deploys the department portal automatically.', tech: ['Jenkins', 'Docker', 'AWS'] },
    ],
    school: 'Kendriya Vidyalaya, Sultanpur', handle: 'gaurav-shukla-devops', mutual: 4,
  }),
  person({
    id: 40, name: 'Neha Chaudhary', gender: 'female', image: null,
    collegeId: 14, courseId: 'ce', year: '2nd Year', location: 'Meerut, Uttar Pradesh',
    headline: 'Civil engineering student interested in green buildings',
    skills: ['AutoCAD', 'Revit', 'Excel', 'Surveying'],
    interests: ['Sustainable Design', 'Urban Planning', 'Sketching'],
    about: 'Second-year civil student curious about sustainable construction. I am learning Revit and BIM workflows.',
    projects: [
      { title: 'Rainwater Harvesting Plan', description: 'Designed a rooftop rainwater harvesting system for the college hostel.', tech: ['AutoCAD', 'Excel'] },
    ],
    school: 'Dewan Public School, Meerut', handle: 'neha-chaudhary-civil', mutual: 1,
  }),

  // ── 15 · Mahatma Gandhi Kashi Vidyapith, Varanasi ───────
  person({
    id: 41, name: 'Ravi Prakash', gender: 'male', image: null,
    collegeId: 15, courseId: 'mba', year: '1st Year', location: 'Chandauli, Uttar Pradesh',
    headline: 'MBA student with an interest in rural enterprise',
    skills: ['Excel', 'Business Analysis', 'Communication', 'Tally'],
    interests: ['Entrepreneurship', 'Agriculture', 'Social Impact'],
    about: 'First-year MBA student from a farming family in Chandauli. I want to help rural producers reach better markets.',
    projects: [
      { title: 'FPO Business Plan', description: 'Drafted a business plan for a farmer producer organisation selling black rice.', tech: ['Excel'] },
    ],
    school: 'GIC Chandauli', prev: ['Mahatma Gandhi Kashi Vidyapith', 'B.Com', 3], handle: 'ravi-prakash-mba', mutual: 2,
  }),
  person({
    id: 42, name: 'Simran Kaur', gender: 'female', image: null,
    collegeId: 15, courseId: 'bca', year: 'Final Year', location: 'Varanasi, Uttar Pradesh',
    headline: 'BCA student · Java and Android',
    skills: ['Java', 'Android', 'SQL', 'Firebase', 'Git'],
    interests: ['Mobile Apps', 'Music', 'Volunteering'],
    about: 'Final-year BCA student who enjoys building Android apps for social causes. I volunteer with a local NGO teaching computer basics.',
    projects: [
      { title: 'Blood Donor Finder', description: 'An Android app connecting blood donors in Varanasi with hospitals.', tech: ['Java', 'Firebase'] },
    ],
    school: 'Guru Nanak English School, Varanasi', handle: 'simran-kaur-android', mutual: 3,
  }),

  // ── 16 · IET Lucknow ────────────────────────────────────
  person({
    id: 43, name: 'Utkarsh Dwivedi', gender: 'male', image: 'photo-1712425718085-cdd2b2298669',
    collegeId: 16, courseId: 'cse', year: '2nd Year', location: 'Lucknow, Uttar Pradesh',
    headline: 'CSE student · web and blockchain',
    skills: ['JavaScript', 'React', 'Solidity', 'Node.js'],
    interests: ['Blockchain', 'Web Development', 'Gaming'],
    about: 'Second-year CSE student at IET Lucknow experimenting with web3. I also build React projects for college fests.',
    projects: [
      { title: 'Fest Ticketing', description: 'A ticketing site for the college tech fest with QR-based entry.', tech: ['React', 'Node.js'] },
    ],
    school: 'City Montessori School, Gomti Nagar', handle: 'utkarsh-dwivedi', mutual: 5,
  }),
  person({
    id: 44, name: 'Ritika Sinha', gender: 'female', image: null,
    collegeId: 16, courseId: 'ece', year: 'Final Year', location: 'Ranchi, Jharkhand',
    headline: 'ECE student heading into VLSI design',
    skills: ['Verilog', 'Cadence', 'MATLAB', 'Embedded C'],
    interests: ['VLSI', 'Signal Processing', 'Classical Dance'],
    about: 'Final-year ECE student who has secured a VLSI internship. I trained in Kathak for ten years and still perform at college events.',
    projects: [
      { title: '8-bit ALU Design', description: 'Designed and verified an 8-bit ALU in Verilog with full test benches.', tech: ['Verilog', 'ModelSim'] },
    ],
    school: 'DAV Public School, Ranchi', handle: 'ritika-sinha-vlsi', mutual: 4,
  }),

  // ── 17 · Babu Banarasi Das University, Lucknow ──────────
  person({
    id: 45, name: 'Yash Srivastava', gender: 'male', image: null,
    collegeId: 17, courseId: 'it', year: '1st Year', location: 'Ayodhya, Uttar Pradesh',
    headline: 'First-year IT student learning Python',
    skills: ['Python', 'HTML', 'CSS'],
    interests: ['Programming', 'Cricket', 'Cybersecurity'],
    about: 'First-year IT student who wrote his first program six months ago. I am curious about cybersecurity and ethical hacking.',
    projects: [
      { title: 'Password Strength Checker', description: 'A small Python tool that rates password strength and suggests improvements.', tech: ['Python'] },
    ],
    school: 'Kendriya Vidyalaya, Ayodhya', handle: 'yash-srivastava-it', mutual: 1,
  }),
  person({
    id: 46, name: 'Muskan Agrawal', gender: 'female', image: null,
    collegeId: 17, courseId: 'mba', year: 'Final Year', location: 'Bhopal, Madhya Pradesh',
    headline: 'MBA in business analytics',
    skills: ['SQL', 'Power BI', 'Excel', 'Python', 'Tableau'],
    interests: ['Business Analytics', 'Finance', 'Travel'],
    about: 'Final-year MBA student specialising in business analytics. I enjoy turning sales data into clear dashboards for decision makers.',
    projects: [
      { title: 'Retail Sales Dashboard', description: 'Built an interactive dashboard for a retail chain’s regional sales performance.', tech: ['Power BI', 'SQL'] },
    ],
    school: 'Carmel Convent School, Bhopal', prev: ['Barkatullah University, Bhopal', 'BBA', 3], handle: 'muskan-agrawal', mutual: 3,
  }),

  // ── 18 · Shambhunath Institute of Engineering & Technology, Prayagraj
  person({
    id: 47, name: 'Sumit Bind', gender: 'male', image: null,
    collegeId: 18, courseId: 'ece', year: '3rd Year', location: 'Bhadohi, Uttar Pradesh',
    headline: 'ECE student working on embedded projects',
    skills: ['Arduino', 'Embedded C', 'PCB Design', 'MATLAB'],
    interests: ['IoT', 'Electronics', 'Cricket'],
    about: 'Third-year ECE student from Bhadohi who enjoys repairing and building electronics. I want to work in embedded systems.',
    projects: [
      { title: 'Carpet Loom Counter', description: 'A sensor-based counter that tracks rows woven on a handloom.', tech: ['Arduino', 'Embedded C'] },
    ],
    school: 'Gyanpur Inter College, Bhadohi', handle: 'sumit-bind-ece', mutual: 2,
  }),
  person({
    id: 48, name: 'Divya Pal', gender: 'female', image: null,
    collegeId: 18, courseId: 'ce', year: 'Final Year', location: 'Kaushambi, Uttar Pradesh',
    headline: 'Civil engineering student · site planning',
    skills: ['AutoCAD', 'STAAD Pro', 'Surveying', 'Excel'],
    interests: ['Construction Management', 'Rural Infrastructure', 'Reading'],
    about: 'Final-year civil engineering student who interned on a rural road project. I am interested in construction management and planning.',
    projects: [
      { title: 'Village Road Estimate', description: 'Prepared a detailed cost estimate and drawings for a 2 km rural road.', tech: ['AutoCAD', 'Excel'] },
    ],
    school: 'Rajkiya Inter College, Kaushambi', handle: 'divya-pal-civil', mutual: 1,
  }),
]

// The logged-in demo user (editable via Edit Profile; persisted to localStorage).
export const demoUser = {
  id: 'me',
  name: 'Ananya Mishra',
  email: 'ananya.demo@biteconnect.app',
  image: portrait('photo-1741354035032-eff737bfd35c'),
  gender: 'female',
  collegeId: 1,
  collegeName: 'IIT (BHU), Varanasi',
  course: 'B.Tech Computer Science',
  courseId: 'cse',
  degreeType: 'Undergraduate',
  year: '2nd Year',
  semester: 'Semester 3',
  location: 'Jaunpur, Uttar Pradesh',
  headline: 'Aspiring full-stack developer',
  about: 'Second-year CSE student at IIT (BHU), originally from Jaunpur. I enjoy building web apps that solve small, real problems for students, and I am looking to connect with peers working on web and AI projects.',
  skills: ['JavaScript', 'React', 'Python', 'Node.js', 'Git'],
  interests: ['Web Development', 'AI', 'Open Source'],
  projects: [
    { title: 'Jaunpur Bus Timings', description: 'A mobile-friendly site listing roadways bus timings from Jaunpur to nearby cities.', tech: ['React', 'Tailwind CSS'] },
    { title: 'Study Buddy Bot', description: 'A Telegram bot that shares daily practice questions and tracks streaks for a study group.', tech: ['Python', 'Telegram API'] },
  ],
  education: [
    { school: 'IIT (BHU), Varanasi', degree: 'B.Tech Computer Science', period: '2025 – 2029' },
    { school: 'Kendriya Vidyalaya, Jaunpur', degree: 'Class XII', period: '2023 – 2025' },
  ],
  social: {
    linkedin: 'https://www.linkedin.com/in/ananya-mishra-dev',
    github: 'https://github.com/ananya-mishra-dev',
    portfolio: '',
  },
  mutualConnections: 0,
}
