// SEED — the colleges data agent replaces this with the full verified dataset.
// Schema (keep every field; use null where unknown):
// {
//   id: 1, slug: 'iit-bhu-varanasi', name, shortName,
//   image: 'https://upload.wikimedia.org/...',          // cover photo
//   imageCredit: { author, license, source },          // source = Commons file page URL
//   isAuthenticPhoto: true,                             // false → generic/representative image (UI shows a badge)
//   gallery: [{ src, caption, credit: { author, license, source } }],
//   logo: 'https://...' | null,
//   address, city, state, pincode,
//   type: 'Government' | 'Private',
//   category: 'Institute of National Importance' | 'Central University' | 'State University' | 'Affiliated College' | 'Private University' | ...,
//   established: 1919, website: 'https://...',
//   coordinates: { lat, lng },
//   description: '1–2 sentence card summary',
//   overview: 'paragraph', campus: 'paragraph',
//   facilities: ['Library', 'Hostel', ...], highlights: ['...'],
//   courses: ['cse', 'me', ...],                        // course category ids from data/courses.js
//   programs: [{ id, name, courseId, degree, degreeType: 'Undergraduate'|'Postgraduate', duration, eligibility, department }],
//   featured: true,
// }
export const colleges = [
  {
    id: 1,
    slug: 'iit-bhu-varanasi',
    name: 'Indian Institute of Technology (BHU), Varanasi',
    shortName: 'IIT (BHU)',
    image: null,
    imageCredit: null,
    isAuthenticPhoto: false,
    gallery: [],
    logo: null,
    address: 'Banaras Hindu University Campus, Lanka',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    pincode: '221005',
    type: 'Government',
    category: 'Institute of National Importance',
    established: 1919,
    website: 'https://www.iitbhu.ac.in',
    coordinates: { lat: 25.2621, lng: 82.9894 },
    description: 'One of India’s oldest engineering institutions, inside the BHU campus.',
    overview: '',
    campus: '',
    facilities: ['Library', 'Hostel', 'Laboratories'],
    highlights: [],
    courses: ['cse', 'me', 'ce', 'ee', 'ece'],
    programs: [
      { id: 'iitbhu-btech-cse', name: 'B.Tech Computer Science & Engineering', courseId: 'cse', degree: 'B.Tech', degreeType: 'Undergraduate', duration: '4 Years', eligibility: '10+2 with PCM and JEE (Advanced) rank', department: 'Department of Computer Science & Engineering' },
    ],
    featured: true,
  },
]
