// Colleges dataset — facts from official sites / Wikipedia; photos from Wikimedia Commons (credited per image).
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
    slug: "iit-bhu-varanasi",
    name: "Indian Institute of Technology (BHU), Varanasi",
    shortName: "IIT (BHU)",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Dept_of_Electrical_Engineering_IIT-BHU.jpg/1280px-Dept_of_Electrical_Engineering_IIT-BHU.jpg",
    imageCredit: {
      author: "Kuber Patel, Rosehub",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Dept_of_Electrical_Engineering_IIT-BHU.jpg"
    },
    isAuthenticPhoto: true,
    gallery: [
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/IIT_BHU_Varanasi.jpg/1280px-IIT_BHU_Varanasi.jpg",
        caption: "Panorama of the main institute building",
        credit: {
          author: "Rosehubwiki",
          license: "CC BY 4.0",
          source: "https://commons.wikimedia.org/wiki/File:IIT_BHU_Varanasi.jpg"
        }
      },
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Dept_of_Chemical_Engineering_iit_bhu.jpg/1280px-Dept_of_Chemical_Engineering_iit_bhu.jpg",
        caption: "Department of Chemical Engineering & Technology",
        credit: {
          author: "Kuber Patel, Rosehub",
          license: "CC BY-SA 4.0",
          source: "https://commons.wikimedia.org/wiki/File:Dept_of_Chemical_Engineering_iit_bhu.jpg"
        }
      },
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/IIT_BHU_Gymkhana.jpg/1280px-IIT_BHU_Gymkhana.jpg",
        caption: "Gymkhana building at night",
        credit: {
          author: "Kuber Patel, Rosehub",
          license: "CC BY-SA 4.0",
          source: "https://commons.wikimedia.org/wiki/File:IIT_BHU_Gymkhana.jpg"
        }
      }
    ],
    logo: null,
    address: "Banaras Hindu University Campus, Lanka",
    city: "Varanasi",
    state: "Uttar Pradesh",
    pincode: "221005",
    type: "Government",
    category: "Institute of National Importance",
    established: 1919,
    website: "https://www.iitbhu.ac.in",
    coordinates: {
      lat: 25.2621,
      lng: 82.9894
    },
    description: "One of India’s oldest engineering institutions, located inside the Banaras Hindu University campus in Varanasi.",
    overview: "IIT (BHU) traces its origins to the Banaras Engineering College (BENCO), founded in 1919 within Banaras Hindu University. It later became the Institute of Technology, BHU, and was converted into an Indian Institute of Technology in 2012, when it was declared an Institute of National Importance. Undergraduate admission to its B.Tech and integrated dual degree programmes is through JEE (Advanced), and the institute also runs M.Tech and PhD programmes across engineering, science and humanities departments.",
    campus: "The institute shares the large, tree-lined BHU campus in the Lanka area of southern Varanasi. Its academic departments occupy heritage buildings in the Indo-Gothic style alongside newer lecture-hall and laboratory complexes, and students live in institute hostels within the campus. Students also have access to shared BHU amenities, including the Sayaji Rao Gaekwad Central Library, sports grounds and the university hospital.",
    facilities: [
      "Central and departmental libraries",
      "Hostels",
      "Research laboratories",
      "Computer centre",
      "Gymkhana and student clubs",
      "Sports grounds and stadium",
      "Health centre (BHU hospital access)",
      "Wi-Fi campus",
      "Training and placement cell"
    ],
    highlights: [
      "Institute of National Importance (IIT status since 2012)",
      "Origins in Banaras Engineering College, founded 1919",
      "Admission through JEE (Advanced)",
      "Located within the Banaras Hindu University campus"
    ],
    courses: [
      "cse",
      "me",
      "ce",
      "ee",
      "ece"
    ],
    programs: [
      {
        id: "iitbhu-btech-cse",
        courseId: "cse",
        name: "B.Tech Computer Science & Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE (Advanced) rank",
        department: "Department of Computer Science & Engineering"
      },
      {
        id: "iitbhu-btech-me",
        courseId: "me",
        name: "B.Tech Mechanical Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE (Advanced) rank",
        department: "Department of Mechanical Engineering"
      },
      {
        id: "iitbhu-btech-ce",
        courseId: "ce",
        name: "B.Tech Civil Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE (Advanced) rank",
        department: "Department of Civil Engineering"
      },
      {
        id: "iitbhu-btech-ee",
        courseId: "ee",
        name: "B.Tech Electrical Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE (Advanced) rank",
        department: "Department of Electrical Engineering"
      },
      {
        id: "iitbhu-btech-ece",
        courseId: "ece",
        name: "B.Tech Electronics Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE (Advanced) rank",
        department: "Department of Electronics Engineering"
      }
    ],
    featured: true
  },
  {
    id: 2,
    slug: "university-of-allahabad",
    name: "University of Allahabad, Prayagraj",
    shortName: "Allahabad University",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Main_Building_of_Allahabad_University_-_Allahabad_-_Uttar_Pradesh_-_India_-_02_%2812566337194%29.jpg/1280px-Main_Building_of_Allahabad_University_-_Allahabad_-_Uttar_Pradesh_-_India_-_02_%2812566337194%29.jpg",
    imageCredit: {
      author: "Adam Jones from Kelowna, BC, Canada",
      license: "CC BY-SA 2.0",
      source: "https://commons.wikimedia.org/wiki/File:Main_Building_of_Allahabad_University_-_Allahabad_-_Uttar_Pradesh_-_India_-_02_(12566337194).jpg"
    },
    isAuthenticPhoto: true,
    gallery: [
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Allahabad_University_1.jpg/1280px-Allahabad_University_1.jpg",
        caption: "Main building illuminated at night",
        credit: {
          author: "Rangan Datta Wiki",
          license: "CC BY-SA 4.0",
          source: "https://commons.wikimedia.org/wiki/File:Allahabad_University_1.jpg"
        }
      }
    ],
    logo: null,
    address: "Senate House Campus, University Road, Old Katra",
    city: "Prayagraj",
    state: "Uttar Pradesh",
    pincode: "211002",
    type: "Government",
    category: "Central University",
    established: 1887,
    website: "https://www.allduniv.ac.in",
    coordinates: {
      lat: 25.4637,
      lng: 81.8577
    },
    description: "One of India’s oldest modern universities, founded in 1887 and a Central University since 2005.",
    overview: "The University of Allahabad was established in 1887 and is among the oldest modern universities in India. It was granted the status of a Central University by an Act of Parliament in 2005. It offers undergraduate, postgraduate and doctoral programmes across arts, science, commerce, law and technology; engineering degrees are offered through the J.K. Institute of Applied Physics & Technology, and computer applications and management through its professional studies institutes.",
    campus: "The university is spread across several campuses in central Prayagraj, including the Senate House campus and the Science Faculty campus. Its historic buildings, such as the domed Vizianagaram Hall and the Muir Central College building, are notable examples of Indo-Saracenic architecture. Residential halls, a central library and faculty buildings are located within walking distance of each other.",
    facilities: [
      "Central library",
      "Residential halls and hostels",
      "Science laboratories",
      "Computer centre",
      "Auditorium",
      "Sports grounds",
      "Health centre",
      "Wi-Fi campus"
    ],
    highlights: [
      "Established in 1887",
      "Central University since 2005",
      "Historic Indo-Saracenic campus buildings",
      "Admissions through CUET"
    ],
    courses: [
      "cse",
      "ece",
      "bca",
      "bsc",
      "mca",
      "mba"
    ],
    programs: [
      {
        id: "au-btech-cse",
        courseId: "cse",
        name: "B.Tech Computer Science & Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main / university counselling",
        department: "J.K. Institute of Applied Physics & Technology"
      },
      {
        id: "au-btech-ece",
        courseId: "ece",
        name: "B.Tech Electronics & Communication Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main / university counselling",
        department: "J.K. Institute of Applied Physics & Technology"
      },
      {
        id: "au-bca-bca",
        courseId: "bca",
        name: "Bachelor of Computer Applications",
        degree: "BCA",
        degreeType: "Undergraduate",
        duration: "3 Years",
        eligibility: "10+2 (any stream) with Mathematics",
        department: "Department of Computer Applications"
      },
      {
        id: "au-bsc-bsc",
        courseId: "bsc",
        name: "B.Sc. (Physical / Biological Sciences)",
        degree: "B.Sc.",
        degreeType: "Undergraduate",
        duration: "3 Years",
        eligibility: "10+2 with Science and CUET-UG",
        department: "Faculty of Science"
      },
      {
        id: "au-mca-mca",
        courseId: "mca",
        name: "Master of Computer Applications",
        degree: "MCA",
        degreeType: "Postgraduate",
        duration: "2 Years",
        eligibility: "Graduation with Mathematics at 10+2 or graduation level, with entrance test (NIMCET / CUET-PG / university test)",
        department: "Department of Computer Applications"
      },
      {
        id: "au-mba-mba",
        courseId: "mba",
        name: "Master of Business Administration",
        degree: "MBA",
        degreeType: "Postgraduate",
        duration: "2 Years",
        eligibility: "Graduation with 50% marks and CAT / CUET-PG / university entrance test",
        department: "Department of Business Administration"
      }
    ],
    featured: true
  },
  {
    id: 3,
    slug: "harish-chandra-pg-college-varanasi",
    name: "Harish-Chandra Postgraduate College, Varanasi",
    shortName: "Harish-Chandra PG College",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/The_main_gate_of_Harish_Chandra_Post_Graduate_College.jpg/1280px-The_main_gate_of_Harish_Chandra_Post_Graduate_College.jpg",
    imageCredit: {
      author: "Shiwamind",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:The_main_gate_of_Harish_Chandra_Post_Graduate_College.jpg"
    },
    isAuthenticPhoto: true,
    gallery: [],
    logo: null,
    address: "Maidagin",
    city: "Varanasi",
    state: "Uttar Pradesh",
    pincode: "221001",
    type: "Government",
    category: "Affiliated College (Government-aided)",
    established: 1866,
    website: null,
    coordinates: {
      lat: 25.3176,
      lng: 83.0089
    },
    description: "A long-established government-aided college in the old city of Varanasi, associated with Bharatendu Harishchandra.",
    overview: "Harish-Chandra Postgraduate College is a government-aided college in Varanasi whose origins go back to 1866, and the institution is associated with the Hindi writer Bharatendu Harishchandra. It is affiliated to Mahatma Gandhi Kashi Vidyapith and offers undergraduate and postgraduate programmes in arts, science and commerce.",
    campus: "The college is located in the densely built Maidagin area of central Varanasi. Its campus is entered through a distinctive red gateway inscribed with the college name, and the academic buildings are arranged around an inner courtyard.",
    facilities: [
      "Library",
      "Science laboratories",
      "Computer lab",
      "Classrooms",
      "Sports facilities",
      "NCC / NSS units"
    ],
    highlights: [
      "Origins dating to 1866",
      "Associated with Bharatendu Harishchandra",
      "Affiliated to Mahatma Gandhi Kashi Vidyapith"
    ],
    courses: [
      "bsc"
    ],
    programs: [
      {
        id: "hcpg-bsc-bsc",
        courseId: "bsc",
        name: "B.Sc. (Physical / Biological Sciences)",
        degree: "B.Sc.",
        degreeType: "Undergraduate",
        duration: "3 Years",
        eligibility: "10+2 with Science (PCM / PCB)",
        department: "Faculty of Science"
      }
    ],
    featured: true
  },
  {
    id: 4,
    slug: "vbspu-jaunpur",
    name: "Veer Bahadur Singh Purvanchal University, Jaunpur",
    shortName: "VBSPU",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/99/Purvanchalmain.jpg",
    imageCredit: {
      author: "Raebareli Area",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Purvanchalmain.jpg"
    },
    isAuthenticPhoto: true,
    gallery: [
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Research_Institute_In_Purvanchal.jpg",
        caption: "Prof. Rajendra Singh (Rajju Bhaiya) Institute of Physical Sciences",
        credit: {
          author: "Raebareli Area",
          license: "CC BY-SA 4.0",
          source: "https://commons.wikimedia.org/wiki/File:Research_Institute_In_Purvanchal.jpg"
        }
      }
    ],
    logo: null,
    address: "Jaunpur–Shahganj Road",
    city: "Jaunpur",
    state: "Uttar Pradesh",
    pincode: "222003",
    type: "Government",
    category: "State University",
    established: 1987,
    website: "https://vbspu.ac.in",
    coordinates: {
      lat: 25.7615,
      lng: 82.638
    },
    description: "The state university of Jaunpur, established in 1987, with engineering, science and management institutes on its main campus.",
    overview: "Veer Bahadur Singh Purvanchal University was established in 1987 by the Government of Uttar Pradesh and is named after former Chief Minister Veer Bahadur Singh. It is an affiliating university for a large number of colleges in eastern Uttar Pradesh. Its main campus houses university departments and institutes for engineering and technology, applied and physical sciences, computer applications and business management.",
    campus: "The main campus lies on the Jaunpur–Shahganj road on the outskirts of Jaunpur city and is entered through a large red ceremonial gateway. It contains departmental buildings, the engineering institute, a central library, an auditorium, hostels and sports grounds.",
    facilities: [
      "Central library",
      "Hostels",
      "Engineering laboratories",
      "Computer centre",
      "Auditorium",
      "Sports grounds",
      "Health centre",
      "Training and placement cell"
    ],
    highlights: [
      "Established in 1987",
      "State university of Uttar Pradesh",
      "Affiliating university for eastern UP colleges",
      "Engineering institute on the main campus"
    ],
    courses: [
      "cse",
      "it",
      "me",
      "ee",
      "ece",
      "bca",
      "bsc",
      "mca",
      "mba"
    ],
    programs: [
      {
        id: "vbspu-btech-cse",
        courseId: "cse",
        name: "B.Tech Computer Science & Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main / state counselling",
        department: "Department of Computer Science & Engineering"
      },
      {
        id: "vbspu-btech-it",
        courseId: "it",
        name: "B.Tech Information Technology",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main / state counselling",
        department: "Department of Information Technology"
      },
      {
        id: "vbspu-btech-me",
        courseId: "me",
        name: "B.Tech Mechanical Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main / state counselling",
        department: "Department of Mechanical Engineering"
      },
      {
        id: "vbspu-btech-ee",
        courseId: "ee",
        name: "B.Tech Electrical Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main / state counselling",
        department: "Department of Electrical Engineering"
      },
      {
        id: "vbspu-btech-ece",
        courseId: "ece",
        name: "B.Tech Electronics & Communication Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main / state counselling",
        department: "Department of Electronics & Communication Engineering"
      },
      {
        id: "vbspu-bca-bca",
        courseId: "bca",
        name: "Bachelor of Computer Applications",
        degree: "BCA",
        degreeType: "Undergraduate",
        duration: "3 Years",
        eligibility: "10+2 (any stream) with Mathematics",
        department: "Department of Computer Applications"
      },
      {
        id: "vbspu-bsc-bsc",
        courseId: "bsc",
        name: "B.Sc. (Physical / Biological Sciences)",
        degree: "B.Sc.",
        degreeType: "Undergraduate",
        duration: "3 Years",
        eligibility: "10+2 with Science (PCM / PCB)",
        department: "Faculty of Science"
      },
      {
        id: "vbspu-mca-mca",
        courseId: "mca",
        name: "Master of Computer Applications",
        degree: "MCA",
        degreeType: "Postgraduate",
        duration: "2 Years",
        eligibility: "Graduation with Mathematics at 10+2 or graduation level, with entrance test (NIMCET / CUET-PG / university test)",
        department: "Department of Computer Applications"
      },
      {
        id: "vbspu-mba-mba",
        courseId: "mba",
        name: "Master of Business Administration",
        degree: "MBA",
        degreeType: "Postgraduate",
        duration: "2 Years",
        eligibility: "Graduation with 50% marks and CAT / CUET-PG / university entrance test",
        department: "Department of Business Administration"
      }
    ],
    featured: true
  },
  {
    id: 5,
    slug: "united-institute-of-technology-prayagraj",
    name: "United Institute of Technology, Prayagraj",
    shortName: "UIT Prayagraj",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Guru_Nanak_Dev_University_Amritsar_library_at_night.JPG/1280px-Guru_Nanak_Dev_University_Amritsar_library_at_night.JPG",
    imageCredit: {
      author: "Gopal1035",
      license: "CC BY 2.5",
      source: "https://commons.wikimedia.org/wiki/File:Guru_Nanak_Dev_University_Amritsar_library_at_night.JPG"
    },
    isAuthenticPhoto: false,
    gallery: [],
    logo: null,
    address: "Naini",
    city: "Prayagraj",
    state: "Uttar Pradesh",
    pincode: "211010",
    type: "Private",
    category: "Affiliated College (AKTU)",
    established: null,
    website: "https://www.united.ac.in",
    coordinates: {
      lat: 25.396,
      lng: 81.875
    },
    description: "A private engineering and management college in the Naini area of Prayagraj, affiliated to Dr. A.P.J. Abdul Kalam Technical University.",
    overview: "United Institute of Technology is a private engineering college run by the United Group of Institutions in Prayagraj. It is affiliated to Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow, and offers B.Tech programmes in the core engineering branches along with postgraduate management studies.",
    campus: "The institute is located in the Naini industrial area on the southern side of Prayagraj, across the Yamuna from the city centre. The campus includes academic blocks, laboratories, a library and hostel accommodation.",
    facilities: [
      "Library",
      "Hostels",
      "Engineering laboratories",
      "Computer labs",
      "Seminar hall",
      "Sports facilities",
      "Transport",
      "Training and placement cell"
    ],
    highlights: [
      "Affiliated to AKTU, Lucknow",
      "Part of the United Group of Institutions",
      "Admission via JEE Main / UPTAC counselling"
    ],
    courses: [
      "cse",
      "it",
      "me",
      "ce",
      "ee",
      "ece",
      "mba"
    ],
    programs: [
      {
        id: "uit-btech-cse",
        courseId: "cse",
        name: "B.Tech Computer Science & Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main (UPTAC counselling)",
        department: "Department of Computer Science & Engineering"
      },
      {
        id: "uit-btech-it",
        courseId: "it",
        name: "B.Tech Information Technology",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main (UPTAC counselling)",
        department: "Department of Information Technology"
      },
      {
        id: "uit-btech-me",
        courseId: "me",
        name: "B.Tech Mechanical Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main (UPTAC counselling)",
        department: "Department of Mechanical Engineering"
      },
      {
        id: "uit-btech-ce",
        courseId: "ce",
        name: "B.Tech Civil Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main (UPTAC counselling)",
        department: "Department of Civil Engineering"
      },
      {
        id: "uit-btech-ee",
        courseId: "ee",
        name: "B.Tech Electrical Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main (UPTAC counselling)",
        department: "Department of Electrical Engineering"
      },
      {
        id: "uit-btech-ece",
        courseId: "ece",
        name: "B.Tech Electronics & Communication Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main (UPTAC counselling)",
        department: "Department of Electronics & Communication Engineering"
      },
      {
        id: "uit-mba-mba",
        courseId: "mba",
        name: "Master of Business Administration",
        degree: "MBA",
        degreeType: "Postgraduate",
        duration: "2 Years",
        eligibility: "Graduation with 50% marks and CAT / CUET-PG / university entrance test",
        department: "Department of Business Administration"
      }
    ],
    featured: true
  },
  {
    id: 6,
    slug: "amity-university-lucknow",
    name: "Amity University, Lucknow",
    shortName: "Amity Lucknow",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Amity_University_Lucknow_Campus.jpg",
    imageCredit: {
      author: "Mohit",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Amity_University_Lucknow_Campus.jpg"
    },
    isAuthenticPhoto: true,
    gallery: [
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/d/d9/AmityLko.jpg",
        caption: "Campus buildings seen from the approach road",
        credit: {
          author: "Monsterthinks",
          license: "CC BY-SA 3.0",
          source: "https://commons.wikimedia.org/wiki/File:AmityLko.jpg"
        }
      }
    ],
    logo: null,
    address: "Malhaur (near Railway Station), Gomti Nagar Extension",
    city: "Lucknow",
    state: "Uttar Pradesh",
    pincode: "226028",
    type: "Private",
    category: "Private University (campus of Amity University Uttar Pradesh)",
    established: 2004,
    website: "https://www.amity.edu/lucknow/",
    coordinates: {
      lat: 26.85,
      lng: 81.049
    },
    description: "The Lucknow campus of Amity University Uttar Pradesh, offering engineering, computing, science and management programmes.",
    overview: "Amity University, Lucknow is a campus of Amity University Uttar Pradesh, a private university run by the Ritnand Balved Education Foundation. It offers undergraduate and postgraduate programmes in engineering, computer applications, sciences, management, law and other disciplines, with admissions conducted by the university.",
    campus: "The campus is in the Malhaur area of Gomti Nagar Extension in east Lucknow. It is known for its large neoclassical-style buildings with columned facades, landscaped courtyards and separate academic, administrative and hostel blocks.",
    facilities: [
      "Library",
      "Hostels",
      "Laboratories",
      "Computer labs",
      "Auditorium",
      "Cafeteria",
      "Sports complex",
      "Wi-Fi campus",
      "Placement cell"
    ],
    highlights: [
      "Campus of Amity University Uttar Pradesh",
      "Located in Gomti Nagar Extension, Lucknow",
      "Programmes across engineering, management and sciences"
    ],
    courses: [
      "cse",
      "it",
      "me",
      "ce",
      "ece",
      "bca",
      "bsc",
      "mca",
      "mba"
    ],
    programs: [
      {
        id: "amity-btech-cse",
        courseId: "cse",
        name: "B.Tech Computer Science & Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main / university admission process",
        department: "Department of Computer Science & Engineering"
      },
      {
        id: "amity-btech-it",
        courseId: "it",
        name: "B.Tech Information Technology",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main / university admission process",
        department: "Department of Information Technology"
      },
      {
        id: "amity-btech-me",
        courseId: "me",
        name: "B.Tech Mechanical Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main / university admission process",
        department: "Department of Mechanical Engineering"
      },
      {
        id: "amity-btech-ce",
        courseId: "ce",
        name: "B.Tech Civil Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main / university admission process",
        department: "Department of Civil Engineering"
      },
      {
        id: "amity-btech-ece",
        courseId: "ece",
        name: "B.Tech Electronics & Communication Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main / university admission process",
        department: "Department of Electronics & Communication Engineering"
      },
      {
        id: "amity-bca-bca",
        courseId: "bca",
        name: "Bachelor of Computer Applications",
        degree: "BCA",
        degreeType: "Undergraduate",
        duration: "3 Years",
        eligibility: "10+2 (any stream) with Mathematics",
        department: "Department of Computer Applications"
      },
      {
        id: "amity-bsc-bsc",
        courseId: "bsc",
        name: "B.Sc. (Physical / Biological Sciences)",
        degree: "B.Sc.",
        degreeType: "Undergraduate",
        duration: "3 Years",
        eligibility: "10+2 with Science (PCM / PCB)",
        department: "Faculty of Science"
      },
      {
        id: "amity-mca-mca",
        courseId: "mca",
        name: "Master of Computer Applications",
        degree: "MCA",
        degreeType: "Postgraduate",
        duration: "2 Years",
        eligibility: "Graduation with Mathematics at 10+2 or graduation level, with entrance test (NIMCET / CUET-PG / university test)",
        department: "Department of Computer Applications"
      },
      {
        id: "amity-mba-mba",
        courseId: "mba",
        name: "Master of Business Administration",
        degree: "MBA",
        degreeType: "Postgraduate",
        duration: "2 Years",
        eligibility: "Graduation with 50% marks and CAT / CUET-PG / university entrance test",
        department: "Department of Business Administration"
      }
    ],
    featured: true
  },
  {
    id: 7,
    slug: "banaras-hindu-university",
    name: "Banaras Hindu University, Varanasi",
    shortName: "BHU",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/BHU_Main_Gate%2C_Banaras_Hindu_University.jpg/1280px-BHU_Main_Gate%2C_Banaras_Hindu_University.jpg",
    imageCredit: {
      author: "Kuber Patel, Rosehub",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:BHU_Main_Gate,_Banaras_Hindu_University.jpg"
    },
    isAuthenticPhoto: true,
    gallery: [
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/IIT_Varanasi_%28Central_Library_Entrance%29.jpg/1280px-IIT_Varanasi_%28Central_Library_Entrance%29.jpg",
        caption: "Entrance to the Sayaji Rao Gaekwad Central Library",
        credit: {
          author: "Ramneek",
          license: "CC BY-SA 4.0",
          source: "https://commons.wikimedia.org/wiki/File:IIT_Varanasi_(Central_Library_Entrance).jpg"
        }
      }
    ],
    logo: null,
    address: "Ajagara, Banaras Hindu University Campus",
    city: "Varanasi",
    state: "Uttar Pradesh",
    pincode: "221005",
    type: "Government",
    category: "Central University",
    established: 1916,
    website: "https://www.bhu.ac.in",
    coordinates: {
      lat: 25.2677,
      lng: 82.9913
    },
    description: "A large residential Central University founded in 1916 by Pt. Madan Mohan Malaviya, with one of the biggest campuses in Asia.",
    overview: "Banaras Hindu University was founded in 1916 by Pandit Madan Mohan Malaviya with the support of Annie Besant and others. It is a Central University with institutes and faculties spanning science, arts, social sciences, commerce, management, agriculture, medicine and law. Computer applications are taught through the DST Centre for Interdisciplinary Mathematical Sciences, and management through the Institute of Management Studies.",
    campus: "The main campus covers a large semicircular area in southern Varanasi near the Ganga and is entered through the landmark Malaviya gate (Singh Dwar). It contains the Shri Vishwanath temple, the Sayaji Rao Gaekwad Central Library, Sir Sunderlal Hospital, numerous hostels and wide tree-lined avenues. The Rajiv Gandhi South Campus is at Barkachha, Mirzapur.",
    facilities: [
      "Central library",
      "Hostels",
      "Research laboratories",
      "Hospital",
      "Auditoriums",
      "Sports stadium",
      "Wi-Fi campus",
      "Bank and post office",
      "Placement cell"
    ],
    highlights: [
      "Founded by Pt. Madan Mohan Malaviya in 1916",
      "Central University",
      "Large residential campus with its own hospital and temple",
      "Admissions through CUET"
    ],
    courses: [
      "bsc",
      "mca",
      "mba"
    ],
    programs: [
      {
        id: "bhu-bsc-bsc",
        courseId: "bsc",
        name: "B.Sc. (Physical / Biological Sciences)",
        degree: "B.Sc.",
        degreeType: "Undergraduate",
        duration: "3 Years",
        eligibility: "10+2 with Science and CUET-UG",
        department: "Faculty of Science"
      },
      {
        id: "bhu-mca-mca",
        courseId: "mca",
        name: "Master of Computer Applications",
        degree: "MCA",
        degreeType: "Postgraduate",
        duration: "2 Years",
        eligibility: "Graduation with Mathematics at 10+2 or graduation level, with entrance test (NIMCET / CUET-PG / university test)",
        department: "DST Centre for Interdisciplinary Mathematical Sciences"
      },
      {
        id: "bhu-mba-mba",
        courseId: "mba",
        name: "Master of Business Administration",
        degree: "MBA",
        degreeType: "Postgraduate",
        duration: "2 Years",
        eligibility: "Graduation with 50% marks and CAT / CUET-PG / university entrance test",
        department: "Institute of Management Studies"
      }
    ],
    featured: false
  },
  {
    id: 8,
    slug: "mnnit-allahabad",
    name: "Motilal Nehru National Institute of Technology, Prayagraj",
    shortName: "MNNIT Allahabad",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/83/MNNIT_Academic_building_new.jpg",
    imageCredit: {
      author: "Adityamohan93",
      license: "CC BY-SA 3.0",
      source: "https://commons.wikimedia.org/wiki/File:MNNIT_Academic_building_new.jpg"
    },
    isAuthenticPhoto: true,
    gallery: [],
    logo: null,
    address: "Teliarganj",
    city: "Prayagraj",
    state: "Uttar Pradesh",
    pincode: "211004",
    type: "Government",
    category: "Institute of National Importance",
    established: 1961,
    website: "https://www.mnnit.ac.in",
    coordinates: {
      lat: 25.492,
      lng: 81.8639
    },
    description: "A National Institute of Technology in Prayagraj, founded in 1961 as Motilal Nehru Regional Engineering College.",
    overview: "MNNIT Allahabad was established in 1961 as Motilal Nehru Regional Engineering College and became a National Institute of Technology in 2002. It is an Institute of National Importance under the NIT Act. It offers B.Tech programmes through JEE Main and JoSAA counselling, along with M.Tech, MCA, MBA and doctoral programmes.",
    campus: "The campus is in Teliarganj in the north of Prayagraj, close to the Ganga. It includes academic and departmental buildings, a central library, a computer centre, hostels for students and residential quarters for faculty, as well as sports facilities.",
    facilities: [
      "Central library",
      "Hostels",
      "Research laboratories",
      "Computer centre",
      "Auditorium",
      "Sports complex",
      "Health centre",
      "Wi-Fi campus",
      "Training and placement cell"
    ],
    highlights: [
      "Institute of National Importance",
      "Founded in 1961 as a Regional Engineering College",
      "National Institute of Technology since 2002",
      "Admission via JEE Main and JoSAA"
    ],
    courses: [
      "cse",
      "it",
      "me",
      "ce",
      "ee",
      "ece",
      "mca",
      "mba"
    ],
    programs: [
      {
        id: "mnnit-btech-cse",
        courseId: "cse",
        name: "B.Tech Computer Science & Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main (JoSAA counselling)",
        department: "Department of Computer Science & Engineering"
      },
      {
        id: "mnnit-btech-it",
        courseId: "it",
        name: "B.Tech Information Technology",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main (JoSAA counselling)",
        department: "Department of Information Technology"
      },
      {
        id: "mnnit-btech-me",
        courseId: "me",
        name: "B.Tech Mechanical Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main (JoSAA counselling)",
        department: "Department of Mechanical Engineering"
      },
      {
        id: "mnnit-btech-ce",
        courseId: "ce",
        name: "B.Tech Civil Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main (JoSAA counselling)",
        department: "Department of Civil Engineering"
      },
      {
        id: "mnnit-btech-ee",
        courseId: "ee",
        name: "B.Tech Electrical Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main (JoSAA counselling)",
        department: "Department of Electrical Engineering"
      },
      {
        id: "mnnit-btech-ece",
        courseId: "ece",
        name: "B.Tech Electronics & Communication Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main (JoSAA counselling)",
        department: "Department of Electronics & Communication Engineering"
      },
      {
        id: "mnnit-mca-mca",
        courseId: "mca",
        name: "Master of Computer Applications",
        degree: "MCA",
        degreeType: "Postgraduate",
        duration: "2 Years",
        eligibility: "Graduation with Mathematics and NIMCET",
        department: "Department of Computer Applications"
      },
      {
        id: "mnnit-mba-mba",
        courseId: "mba",
        name: "Master of Business Administration",
        degree: "MBA",
        degreeType: "Postgraduate",
        duration: "2 Years",
        eligibility: "Graduation with 60% marks and CAT / MAT",
        department: "Department of Business Administration"
      }
    ],
    featured: false
  },
  {
    id: 9,
    slug: "university-of-lucknow",
    name: "University of Lucknow",
    shortName: "Lucknow University",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Lucknowuniversity.jpg",
    imageCredit: {
      author: "Faizhaider at English Wikipedia",
      license: "Public domain",
      source: "https://commons.wikimedia.org/wiki/File:Lucknowuniversity.jpg"
    },
    isAuthenticPhoto: true,
    gallery: [],
    logo: null,
    address: "University Road, Badshah Bagh",
    city: "Lucknow",
    state: "Uttar Pradesh",
    pincode: "226007",
    type: "Government",
    category: "State University",
    established: 1920,
    website: "https://www.lkouniv.ac.in",
    coordinates: {
      lat: 26.865,
      lng: 80.937
    },
    description: "A state university founded in 1920 on the banks of the Gomti, with historic campus buildings and a separate engineering faculty.",
    overview: "The University of Lucknow was established in 1920 and incorporated Canning College into its structure. It is a teaching and affiliating state university offering programmes in arts, science, commerce, law, education and management. Its Faculty of Engineering & Technology, located on the New Campus, offers B.Tech programmes, and the university also offers BCA, MCA and MBA.",
    campus: "The main campus at Badshah Bagh lies on the banks of the Gomti in central Lucknow and features domed Indo-Saracenic buildings set around large lawns. A second, New Campus on Sitapur Road houses the engineering faculty and other departments.",
    facilities: [
      "Tagore Library",
      "Hostels",
      "Science laboratories",
      "Computer centre",
      "Auditorium",
      "Sports grounds",
      "Health centre",
      "Placement cell"
    ],
    highlights: [
      "Established in 1920",
      "State university of Uttar Pradesh",
      "Historic main campus on the Gomti river",
      "Engineering faculty on the New Campus"
    ],
    courses: [
      "cse",
      "bca",
      "bsc",
      "mca",
      "mba"
    ],
    programs: [
      {
        id: "lu-btech-cse",
        courseId: "cse",
        name: "B.Tech Computer Science & Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main / university entrance",
        department: "Faculty of Engineering & Technology"
      },
      {
        id: "lu-bca-bca",
        courseId: "bca",
        name: "Bachelor of Computer Applications",
        degree: "BCA",
        degreeType: "Undergraduate",
        duration: "3 Years",
        eligibility: "10+2 (any stream) with Mathematics",
        department: "Department of Computer Applications"
      },
      {
        id: "lu-bsc-bsc",
        courseId: "bsc",
        name: "B.Sc. (Physical / Biological Sciences)",
        degree: "B.Sc.",
        degreeType: "Undergraduate",
        duration: "3 Years",
        eligibility: "10+2 with Science (PCM / PCB)",
        department: "Faculty of Science"
      },
      {
        id: "lu-mca-mca",
        courseId: "mca",
        name: "Master of Computer Applications",
        degree: "MCA",
        degreeType: "Postgraduate",
        duration: "2 Years",
        eligibility: "Graduation with Mathematics at 10+2 or graduation level, with entrance test (NIMCET / CUET-PG / university test)",
        department: "Department of Computer Applications"
      },
      {
        id: "lu-mba-mba",
        courseId: "mba",
        name: "Master of Business Administration",
        degree: "MBA",
        degreeType: "Postgraduate",
        duration: "2 Years",
        eligibility: "Graduation with 50% marks and CAT / CUET-PG / university entrance test",
        department: "Department of Business Administration"
      }
    ],
    featured: false
  },
  {
    id: 10,
    slug: "iiit-allahabad",
    name: "Indian Institute of Information Technology, Allahabad",
    shortName: "IIIT Allahabad",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/WelcomeIIIT.jpg/1280px-WelcomeIIIT.jpg",
    imageCredit: {
      author: "ArsalanAhmad555",
      license: "CC BY-SA 3.0",
      source: "https://commons.wikimedia.org/wiki/File:WelcomeIIIT.jpg"
    },
    isAuthenticPhoto: true,
    gallery: [],
    logo: null,
    address: "Devghat, Jhalwa",
    city: "Prayagraj",
    state: "Uttar Pradesh",
    pincode: "211015",
    type: "Government",
    category: "Institute of National Importance",
    established: 1999,
    website: "https://www.iiita.ac.in",
    coordinates: {
      lat: 25.4304,
      lng: 81.7713
    },
    description: "A centrally funded institute focused on information technology, electronics and management, located at Jhalwa, Prayagraj.",
    overview: "IIIT Allahabad was established in 1999 by the Government of India as a centre of excellence in information technology and allied areas. It was later declared an Institute of National Importance. It offers B.Tech programmes in Information Technology and Electronics & Communication Engineering through JEE Main and JoSAA, along with M.Tech, MBA and PhD programmes.",
    campus: "The residential campus is at Devghat, Jhalwa, on the western side of Prayagraj. It contains academic and administrative buildings, computer centres, research laboratories, an auditorium, landscaped gardens and student hostels.",
    facilities: [
      "Library",
      "Hostels",
      "Computer centres",
      "Research laboratories",
      "Auditorium",
      "Sports facilities",
      "Health centre",
      "Wi-Fi campus",
      "Placement cell"
    ],
    highlights: [
      "Institute of National Importance",
      "Established in 1999",
      "Focus on IT and electronics",
      "Admission via JEE Main and JoSAA"
    ],
    courses: [
      "it",
      "ece",
      "mba"
    ],
    programs: [
      {
        id: "iiita-btech-it",
        courseId: "it",
        name: "B.Tech Information Technology",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main (JoSAA counselling)",
        department: "Department of Information Technology"
      },
      {
        id: "iiita-btech-ece",
        courseId: "ece",
        name: "B.Tech Electronics & Communication Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main (JoSAA counselling)",
        department: "Department of Electronics & Communication Engineering"
      },
      {
        id: "iiita-mba-mba",
        courseId: "mba",
        name: "Master of Business Administration",
        degree: "MBA",
        degreeType: "Postgraduate",
        duration: "2 Years",
        eligibility: "Graduation with 60% marks and CAT / MAT",
        department: "Department of Business Administration"
      }
    ],
    featured: false
  },
  {
    id: 11,
    slug: "mmmut-gorakhpur",
    name: "Madan Mohan Malaviya University of Technology, Gorakhpur",
    shortName: "MMMUT",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Madan_Mohan_Malaviya_University_of_Technology.jpg/1280px-Madan_Mohan_Malaviya_University_of_Technology.jpg",
    imageCredit: {
      author: "Shivansh Mishra10",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Madan_Mohan_Malaviya_University_of_Technology.jpg"
    },
    isAuthenticPhoto: true,
    gallery: [],
    logo: null,
    address: "Deoria Road",
    city: "Gorakhpur",
    state: "Uttar Pradesh",
    pincode: "273010",
    type: "Government",
    category: "State University",
    established: 1962,
    website: "https://www.mmmut.ac.in",
    coordinates: {
      lat: 26.7313,
      lng: 83.4335
    },
    description: "A state technical university in Gorakhpur, founded in 1962 as Madan Mohan Malaviya Engineering College.",
    overview: "MMMUT began in 1962 as Madan Mohan Malaviya Engineering College and was upgraded to a state technical university by the Government of Uttar Pradesh in 2013. It offers B.Tech programmes in core and computing branches, along with MCA, MBA, M.Tech and doctoral programmes.",
    campus: "The campus lies on Deoria Road on the eastern side of Gorakhpur. It includes departmental buildings, the administrative block with a statue of Pt. Madan Mohan Malaviya in front, workshops, laboratories, hostels and playing fields.",
    facilities: [
      "Central library",
      "Hostels",
      "Workshops and laboratories",
      "Computer centre",
      "Auditorium",
      "Sports grounds",
      "Health centre",
      "Training and placement cell"
    ],
    highlights: [
      "Founded in 1962 as an engineering college",
      "State technical university since 2013",
      "Named after Pt. Madan Mohan Malaviya"
    ],
    courses: [
      "cse",
      "it",
      "me",
      "ce",
      "ee",
      "ece",
      "mca",
      "mba"
    ],
    programs: [
      {
        id: "mmmut-btech-cse",
        courseId: "cse",
        name: "B.Tech Computer Science & Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main",
        department: "Department of Computer Science & Engineering"
      },
      {
        id: "mmmut-btech-it",
        courseId: "it",
        name: "B.Tech Information Technology",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main",
        department: "Department of Information Technology"
      },
      {
        id: "mmmut-btech-me",
        courseId: "me",
        name: "B.Tech Mechanical Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main",
        department: "Department of Mechanical Engineering"
      },
      {
        id: "mmmut-btech-ce",
        courseId: "ce",
        name: "B.Tech Civil Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main",
        department: "Department of Civil Engineering"
      },
      {
        id: "mmmut-btech-ee",
        courseId: "ee",
        name: "B.Tech Electrical Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main",
        department: "Department of Electrical Engineering"
      },
      {
        id: "mmmut-btech-ece",
        courseId: "ece",
        name: "B.Tech Electronics & Communication Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main",
        department: "Department of Electronics & Communication Engineering"
      },
      {
        id: "mmmut-mca-mca",
        courseId: "mca",
        name: "Master of Computer Applications",
        degree: "MCA",
        degreeType: "Postgraduate",
        duration: "2 Years",
        eligibility: "Graduation with Mathematics at 10+2 or graduation level, with entrance test (NIMCET / CUET-PG / university test)",
        department: "Department of Computer Applications"
      },
      {
        id: "mmmut-mba-mba",
        courseId: "mba",
        name: "Master of Business Administration",
        degree: "MBA",
        degreeType: "Postgraduate",
        duration: "2 Years",
        eligibility: "Graduation with 50% marks and CAT / CUET-PG / university entrance test",
        department: "Department of Business Administration"
      }
    ],
    featured: false
  },
  {
    id: 12,
    slug: "integral-university-lucknow",
    name: "Integral University, Lucknow",
    shortName: "Integral University",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Admin_Block_Integral_University.jpg/1280px-Admin_Block_Integral_University.jpg",
    imageCredit: {
      author: "Iumanager",
      license: "CC BY 3.0",
      source: "https://commons.wikimedia.org/wiki/File:Admin_Block_Integral_University.jpg"
    },
    isAuthenticPhoto: true,
    gallery: [],
    logo: null,
    address: "Kursi Road, Dasauli",
    city: "Lucknow",
    state: "Uttar Pradesh",
    pincode: "226026",
    type: "Private",
    category: "Private University",
    established: 2004,
    website: "https://www.iul.ac.in",
    coordinates: {
      lat: 26.9581,
      lng: 80.9993
    },
    description: "A private university on Kursi Road, Lucknow, offering engineering, computing, science, management and health-science programmes.",
    overview: "Integral University was established in 2004 under an Act of the Uttar Pradesh legislature, growing out of the earlier Integral Institute of Technology. It offers undergraduate, postgraduate and doctoral programmes in engineering, computer applications, sciences, management, pharmacy, medicine and other fields.",
    campus: "The campus is on Kursi Road in Dasauli, north of central Lucknow. It includes an administrative block, engineering and science blocks, a medical college and hospital, a central library, and separate hostels for students.",
    facilities: [
      "Central library",
      "Hostels",
      "Laboratories",
      "Computer labs",
      "Medical college and hospital",
      "Auditorium",
      "Sports facilities",
      "Cafeteria",
      "Placement cell"
    ],
    highlights: [
      "State private university established in 2004",
      "Medical college and hospital on campus",
      "Programmes across engineering, sciences and management"
    ],
    courses: [
      "cse",
      "it",
      "me",
      "ce",
      "ee",
      "ece",
      "bca",
      "bsc",
      "mca",
      "mba"
    ],
    programs: [
      {
        id: "iul-btech-cse",
        courseId: "cse",
        name: "B.Tech Computer Science & Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main / university entrance test",
        department: "Department of Computer Science & Engineering"
      },
      {
        id: "iul-btech-it",
        courseId: "it",
        name: "B.Tech Information Technology",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main / university entrance test",
        department: "Department of Information Technology"
      },
      {
        id: "iul-btech-me",
        courseId: "me",
        name: "B.Tech Mechanical Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main / university entrance test",
        department: "Department of Mechanical Engineering"
      },
      {
        id: "iul-btech-ce",
        courseId: "ce",
        name: "B.Tech Civil Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main / university entrance test",
        department: "Department of Civil Engineering"
      },
      {
        id: "iul-btech-ee",
        courseId: "ee",
        name: "B.Tech Electrical Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main / university entrance test",
        department: "Department of Electrical Engineering"
      },
      {
        id: "iul-btech-ece",
        courseId: "ece",
        name: "B.Tech Electronics & Communication Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main / university entrance test",
        department: "Department of Electronics & Communication Engineering"
      },
      {
        id: "iul-bca-bca",
        courseId: "bca",
        name: "Bachelor of Computer Applications",
        degree: "BCA",
        degreeType: "Undergraduate",
        duration: "3 Years",
        eligibility: "10+2 (any stream) with Mathematics",
        department: "Department of Computer Applications"
      },
      {
        id: "iul-bsc-bsc",
        courseId: "bsc",
        name: "B.Sc. (Physical / Biological Sciences)",
        degree: "B.Sc.",
        degreeType: "Undergraduate",
        duration: "3 Years",
        eligibility: "10+2 with Science (PCM / PCB)",
        department: "Faculty of Science"
      },
      {
        id: "iul-mca-mca",
        courseId: "mca",
        name: "Master of Computer Applications",
        degree: "MCA",
        degreeType: "Postgraduate",
        duration: "2 Years",
        eligibility: "Graduation with Mathematics at 10+2 or graduation level, with entrance test (NIMCET / CUET-PG / university test)",
        department: "Department of Computer Applications"
      },
      {
        id: "iul-mba-mba",
        courseId: "mba",
        name: "Master of Business Administration",
        degree: "MBA",
        degreeType: "Postgraduate",
        duration: "2 Years",
        eligibility: "Graduation with 50% marks and CAT / CUET-PG / university entrance test",
        department: "Department of Business Administration"
      }
    ],
    featured: false
  },
  {
    id: 13,
    slug: "tilak-dhari-pg-college-jaunpur",
    name: "Tilak Dhari Postgraduate College, Jaunpur",
    shortName: "T.D. PG College",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Library_reading_hall.jpg/1280px-Library_reading_hall.jpg",
    imageCredit: {
      author: "Deepak Singhanwal",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Library_reading_hall.jpg"
    },
    isAuthenticPhoto: false,
    gallery: [],
    logo: null,
    address: "Tilak Dhari College Road",
    city: "Jaunpur",
    state: "Uttar Pradesh",
    pincode: "222002",
    type: "Government",
    category: "Affiliated College (Government-aided)",
    established: null,
    website: null,
    coordinates: {
      lat: 25.7464,
      lng: 82.6837
    },
    description: "A well-known government-aided postgraduate college in Jaunpur city, affiliated to Veer Bahadur Singh Purvanchal University.",
    overview: "Tilak Dhari Postgraduate College is one of the oldest and largest colleges in Jaunpur. It is affiliated to Veer Bahadur Singh Purvanchal University and offers undergraduate and postgraduate programmes in arts, science, commerce, agriculture and education.",
    campus: "The college is located within Jaunpur city and has separate buildings for its faculties, science laboratories, a library and playing fields.",
    facilities: [
      "Library",
      "Science laboratories",
      "Computer lab",
      "Classrooms",
      "Sports ground",
      "NCC / NSS units"
    ],
    highlights: [
      "Affiliated to VBS Purvanchal University",
      "Among the oldest colleges in Jaunpur",
      "Undergraduate and postgraduate programmes"
    ],
    courses: [
      "bsc"
    ],
    programs: [
      {
        id: "tdc-bsc-bsc",
        courseId: "bsc",
        name: "B.Sc. (Physical / Biological Sciences)",
        degree: "B.Sc.",
        degreeType: "Undergraduate",
        duration: "3 Years",
        eligibility: "10+2 with Science (PCM / PCB)",
        department: "Faculty of Science"
      }
    ],
    featured: false
  },
  {
    id: 14,
    slug: "knit-sultanpur",
    name: "Kamla Nehru Institute of Technology, Sultanpur",
    shortName: "KNIT Sultanpur",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Institute_of_Engineering_%26_Technology%2C_Bhaddal.jpg/1280px-Institute_of_Engineering_%26_Technology%2C_Bhaddal.jpg",
    imageCredit: {
      author: "IET Bhaddal",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Institute_of_Engineering_%26_Technology,_Bhaddal.jpg"
    },
    isAuthenticPhoto: false,
    gallery: [],
    logo: null,
    address: "KNIT Campus",
    city: "Sultanpur",
    state: "Uttar Pradesh",
    pincode: "228118",
    type: "Government",
    category: "Government Engineering College (AKTU)",
    established: 1976,
    website: "https://knit.ac.in",
    coordinates: {
      lat: 26.262,
      lng: 82.084
    },
    description: "A government engineering institute in Sultanpur, founded in 1976 and affiliated to AKTU.",
    overview: "Kamla Nehru Institute of Technology was established in 1976 and is an autonomous government-aided engineering institute of the Government of Uttar Pradesh. It is affiliated to Dr. A.P.J. Abdul Kalam Technical University and offers B.Tech, M.Tech, MCA and MBA programmes.",
    campus: "The residential campus is in Sultanpur district and includes academic blocks, workshops, laboratories, a central library, hostels and sports grounds.",
    facilities: [
      "Central library",
      "Hostels",
      "Workshops and laboratories",
      "Computer centre",
      "Sports grounds",
      "Health centre",
      "Training and placement cell"
    ],
    highlights: [
      "Established in 1976",
      "Government-aided autonomous institute",
      "Affiliated to AKTU, Lucknow"
    ],
    courses: [
      "cse",
      "it",
      "me",
      "ce",
      "ee",
      "ece",
      "mca",
      "mba"
    ],
    programs: [
      {
        id: "knit-btech-cse",
        courseId: "cse",
        name: "B.Tech Computer Science & Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main (UPTAC counselling)",
        department: "Department of Computer Science & Engineering"
      },
      {
        id: "knit-btech-it",
        courseId: "it",
        name: "B.Tech Information Technology",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main (UPTAC counselling)",
        department: "Department of Information Technology"
      },
      {
        id: "knit-btech-me",
        courseId: "me",
        name: "B.Tech Mechanical Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main (UPTAC counselling)",
        department: "Department of Mechanical Engineering"
      },
      {
        id: "knit-btech-ce",
        courseId: "ce",
        name: "B.Tech Civil Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main (UPTAC counselling)",
        department: "Department of Civil Engineering"
      },
      {
        id: "knit-btech-ee",
        courseId: "ee",
        name: "B.Tech Electrical Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main (UPTAC counselling)",
        department: "Department of Electrical Engineering"
      },
      {
        id: "knit-btech-ece",
        courseId: "ece",
        name: "B.Tech Electronics & Communication Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main (UPTAC counselling)",
        department: "Department of Electronics & Communication Engineering"
      },
      {
        id: "knit-mca-mca",
        courseId: "mca",
        name: "Master of Computer Applications",
        degree: "MCA",
        degreeType: "Postgraduate",
        duration: "2 Years",
        eligibility: "Graduation with Mathematics at 10+2 or graduation level, with entrance test (NIMCET / CUET-PG / university test)",
        department: "Department of Computer Applications"
      },
      {
        id: "knit-mba-mba",
        courseId: "mba",
        name: "Master of Business Administration",
        degree: "MBA",
        degreeType: "Postgraduate",
        duration: "2 Years",
        eligibility: "Graduation with 50% marks and CAT / CUET-PG / university entrance test",
        department: "Department of Business Administration"
      }
    ],
    featured: false
  },
  {
    id: 15,
    slug: "mgkvp-varanasi",
    name: "Mahatma Gandhi Kashi Vidyapith, Varanasi",
    shortName: "MGKVP",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/GECI_-_Library_Reading_Room.jpg/1280px-GECI_-_Library_Reading_Room.jpg",
    imageCredit: {
      author: "Joaquim679 at en.wikipedia",
      license: "Public domain",
      source: "https://commons.wikimedia.org/wiki/File:GECI_-_Library_Reading_Room.jpg"
    },
    isAuthenticPhoto: false,
    gallery: [],
    logo: null,
    address: "Sigra",
    city: "Varanasi",
    state: "Uttar Pradesh",
    pincode: "221002",
    type: "Government",
    category: "State University",
    established: 1921,
    website: "https://www.mgkvp.ac.in",
    coordinates: {
      lat: 25.318,
      lng: 82.979
    },
    description: "A state university in Varanasi founded in 1921 during the non-cooperation movement.",
    overview: "Mahatma Gandhi Kashi Vidyapith was founded in 1921 as Kashi Vidyapith during the non-cooperation movement, as an institution run by Indians independent of colonial control. It is now a state university of Uttar Pradesh with teaching departments and a large number of affiliated colleges in the Varanasi region, offering programmes in arts, social sciences, commerce, science, computer applications and management.",
    campus: "The main campus is in the Sigra area of Varanasi. It houses teaching departments, a central library, hostels and sports facilities, and the university has additional campuses elsewhere in the region.",
    facilities: [
      "Central library",
      "Hostels",
      "Computer centre",
      "Laboratories",
      "Auditorium",
      "Sports grounds",
      "Health centre"
    ],
    highlights: [
      "Founded in 1921 during the non-cooperation movement",
      "State university of Uttar Pradesh",
      "Affiliating university for colleges in the Varanasi region"
    ],
    courses: [
      "bca",
      "bsc",
      "mca",
      "mba"
    ],
    programs: [
      {
        id: "mgkvp-bca-bca",
        courseId: "bca",
        name: "Bachelor of Computer Applications",
        degree: "BCA",
        degreeType: "Undergraduate",
        duration: "3 Years",
        eligibility: "10+2 (any stream) with Mathematics",
        department: "Department of Computer Applications"
      },
      {
        id: "mgkvp-bsc-bsc",
        courseId: "bsc",
        name: "B.Sc. (Physical / Biological Sciences)",
        degree: "B.Sc.",
        degreeType: "Undergraduate",
        duration: "3 Years",
        eligibility: "10+2 with Science (PCM / PCB)",
        department: "Faculty of Science"
      },
      {
        id: "mgkvp-mca-mca",
        courseId: "mca",
        name: "Master of Computer Applications",
        degree: "MCA",
        degreeType: "Postgraduate",
        duration: "2 Years",
        eligibility: "Graduation with Mathematics at 10+2 or graduation level, with entrance test (NIMCET / CUET-PG / university test)",
        department: "Department of Computer Applications"
      },
      {
        id: "mgkvp-mba-mba",
        courseId: "mba",
        name: "Master of Business Administration",
        degree: "MBA",
        degreeType: "Postgraduate",
        duration: "2 Years",
        eligibility: "Graduation with 50% marks and CAT / CUET-PG / university entrance test",
        department: "Department of Business Administration"
      }
    ],
    featured: false
  },
  {
    id: 16,
    slug: "iet-lucknow",
    name: "Institute of Engineering & Technology, Lucknow",
    shortName: "IET Lucknow",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0f/IET_college_Lucknow.jpg",
    imageCredit: {
      author: "Vujn at en.wikipedia",
      license: "Public domain",
      source: "https://commons.wikimedia.org/wiki/File:IET_college_Lucknow.jpg"
    },
    isAuthenticPhoto: true,
    gallery: [],
    logo: null,
    address: "Sitapur Road, Jankipuram",
    city: "Lucknow",
    state: "Uttar Pradesh",
    pincode: "226021",
    type: "Government",
    category: "Government Engineering College (constituent of AKTU)",
    established: 1984,
    website: "https://ietlucknow.ac.in",
    coordinates: {
      lat: 26.9149,
      lng: 80.9418
    },
    description: "A government engineering institute in Lucknow, established in 1984 and a constituent college of AKTU.",
    overview: "The Institute of Engineering & Technology, Lucknow was established in 1984 by the Government of Uttar Pradesh. It is a constituent, autonomous institute of Dr. A.P.J. Abdul Kalam Technical University and offers B.Tech, M.Tech, MCA, MBA and PhD programmes.",
    campus: "The campus is on Sitapur Road in Jankipuram, north Lucknow, adjoining the AKTU campus. It contains red-brick academic blocks, laboratories, a central library, hostels and sports facilities along a wide central avenue.",
    facilities: [
      "Central library",
      "Hostels",
      "Laboratories",
      "Computer centre",
      "Auditorium",
      "Sports grounds",
      "Health centre",
      "Training and placement cell"
    ],
    highlights: [
      "Established in 1984",
      "Constituent institute of AKTU",
      "Government-funded engineering institute"
    ],
    courses: [
      "cse",
      "it",
      "me",
      "ce",
      "ee",
      "ece",
      "mca",
      "mba"
    ],
    programs: [
      {
        id: "iet-btech-cse",
        courseId: "cse",
        name: "B.Tech Computer Science & Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main (UPTAC counselling)",
        department: "Department of Computer Science & Engineering"
      },
      {
        id: "iet-btech-it",
        courseId: "it",
        name: "B.Tech Information Technology",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main (UPTAC counselling)",
        department: "Department of Information Technology"
      },
      {
        id: "iet-btech-me",
        courseId: "me",
        name: "B.Tech Mechanical Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main (UPTAC counselling)",
        department: "Department of Mechanical Engineering"
      },
      {
        id: "iet-btech-ce",
        courseId: "ce",
        name: "B.Tech Civil Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main (UPTAC counselling)",
        department: "Department of Civil Engineering"
      },
      {
        id: "iet-btech-ee",
        courseId: "ee",
        name: "B.Tech Electrical Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main (UPTAC counselling)",
        department: "Department of Electrical Engineering"
      },
      {
        id: "iet-btech-ece",
        courseId: "ece",
        name: "B.Tech Electronics & Communication Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main (UPTAC counselling)",
        department: "Department of Electronics & Communication Engineering"
      },
      {
        id: "iet-mca-mca",
        courseId: "mca",
        name: "Master of Computer Applications",
        degree: "MCA",
        degreeType: "Postgraduate",
        duration: "2 Years",
        eligibility: "Graduation with Mathematics at 10+2 or graduation level, with entrance test (NIMCET / CUET-PG / university test)",
        department: "Department of Computer Applications"
      },
      {
        id: "iet-mba-mba",
        courseId: "mba",
        name: "Master of Business Administration",
        degree: "MBA",
        degreeType: "Postgraduate",
        duration: "2 Years",
        eligibility: "Graduation with 50% marks and CAT / CUET-PG / university entrance test",
        department: "Department of Business Administration"
      }
    ],
    featured: false
  },
  {
    id: 17,
    slug: "bbd-university-lucknow",
    name: "Babu Banarasi Das University, Lucknow",
    shortName: "BBD University",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Old_university_building%2C_Babu_Banarasi_Das_University%2C_Lucknow%2C_Uttar_Pradesh%2C_India_%282017%29.jpg",
    imageCredit: {
      author: "JokerDurden",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Old_university_building,_Babu_Banarasi_Das_University,_Lucknow,_Uttar_Pradesh,_India_(2017).jpg"
    },
    isAuthenticPhoto: true,
    gallery: [],
    logo: null,
    address: "BBD City, Faizabad Road",
    city: "Lucknow",
    state: "Uttar Pradesh",
    pincode: "226028",
    type: "Private",
    category: "Private University",
    established: 2010,
    website: "https://bbdu.ac.in",
    coordinates: {
      lat: 26.889,
      lng: 81.058
    },
    description: "A private university on Faizabad Road, Lucknow, part of the Babu Banarasi Das group of institutions.",
    overview: "Babu Banarasi Das University was established in 2010 under an Act of the Uttar Pradesh legislature and is run by the Babu Banarasi Das Educational Society. It offers undergraduate, postgraduate and doctoral programmes in engineering, computer applications, sciences, management, law, dental sciences and other fields.",
    campus: "The university is located at BBD City on Faizabad (Ayodhya) Road in east Lucknow, in a campus shared with other institutions of the BBD group. It includes red-brick academic blocks, laboratories, a library, hostels and a stadium.",
    facilities: [
      "Library",
      "Hostels",
      "Laboratories",
      "Computer labs",
      "Auditorium",
      "Stadium and sports facilities",
      "Cafeteria",
      "Transport",
      "Placement cell"
    ],
    highlights: [
      "State private university established in 2010",
      "Part of the BBD group of institutions",
      "Programmes across engineering, management and sciences"
    ],
    courses: [
      "cse",
      "it",
      "me",
      "ce",
      "ee",
      "ece",
      "bca",
      "bsc",
      "mca",
      "mba"
    ],
    programs: [
      {
        id: "bbdu-btech-cse",
        courseId: "cse",
        name: "B.Tech Computer Science & Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main / university entrance test",
        department: "Department of Computer Science & Engineering"
      },
      {
        id: "bbdu-btech-it",
        courseId: "it",
        name: "B.Tech Information Technology",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main / university entrance test",
        department: "Department of Information Technology"
      },
      {
        id: "bbdu-btech-me",
        courseId: "me",
        name: "B.Tech Mechanical Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main / university entrance test",
        department: "Department of Mechanical Engineering"
      },
      {
        id: "bbdu-btech-ce",
        courseId: "ce",
        name: "B.Tech Civil Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main / university entrance test",
        department: "Department of Civil Engineering"
      },
      {
        id: "bbdu-btech-ee",
        courseId: "ee",
        name: "B.Tech Electrical Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main / university entrance test",
        department: "Department of Electrical Engineering"
      },
      {
        id: "bbdu-btech-ece",
        courseId: "ece",
        name: "B.Tech Electronics & Communication Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main / university entrance test",
        department: "Department of Electronics & Communication Engineering"
      },
      {
        id: "bbdu-bca-bca",
        courseId: "bca",
        name: "Bachelor of Computer Applications",
        degree: "BCA",
        degreeType: "Undergraduate",
        duration: "3 Years",
        eligibility: "10+2 (any stream) with Mathematics",
        department: "Department of Computer Applications"
      },
      {
        id: "bbdu-bsc-bsc",
        courseId: "bsc",
        name: "B.Sc. (Physical / Biological Sciences)",
        degree: "B.Sc.",
        degreeType: "Undergraduate",
        duration: "3 Years",
        eligibility: "10+2 with Science (PCM / PCB)",
        department: "Faculty of Science"
      },
      {
        id: "bbdu-mca-mca",
        courseId: "mca",
        name: "Master of Computer Applications",
        degree: "MCA",
        degreeType: "Postgraduate",
        duration: "2 Years",
        eligibility: "Graduation with Mathematics at 10+2 or graduation level, with entrance test (NIMCET / CUET-PG / university test)",
        department: "Department of Computer Applications"
      },
      {
        id: "bbdu-mba-mba",
        courseId: "mba",
        name: "Master of Business Administration",
        degree: "MBA",
        degreeType: "Postgraduate",
        duration: "2 Years",
        eligibility: "Graduation with 50% marks and CAT / CUET-PG / university entrance test",
        department: "Department of Business Administration"
      }
    ],
    featured: false
  },
  {
    id: 18,
    slug: "shambhunath-institute-prayagraj",
    name: "Shambhunath Institute of Engineering & Technology, Prayagraj",
    shortName: "SIET Prayagraj",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/CMR_Institute_of_Technology_campus%2C_Whitefield%2C_Bangalore%2C_Karnataka%2C_India_%282014%29.jpg/1280px-CMR_Institute_of_Technology_campus%2C_Whitefield%2C_Bangalore%2C_Karnataka%2C_India_%282014%29.jpg",
    imageCredit: {
      author: "Cmrgi wiki",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:CMR_Institute_of_Technology_campus,_Whitefield,_Bangalore,_Karnataka,_India_(2014).jpg"
    },
    isAuthenticPhoto: false,
    gallery: [],
    logo: null,
    address: "Jhalwa",
    city: "Prayagraj",
    state: "Uttar Pradesh",
    pincode: "211015",
    type: "Private",
    category: "Affiliated College (AKTU)",
    established: null,
    website: null,
    coordinates: {
      lat: 25.435,
      lng: 81.779
    },
    description: "A private engineering and management college in Prayagraj affiliated to Dr. A.P.J. Abdul Kalam Technical University.",
    overview: "Shambhunath Institute of Engineering & Technology is a private engineering college in Prayagraj, part of the Shambhunath group of institutions. It is affiliated to Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow, and offers B.Tech programmes in the main engineering branches along with an MBA.",
    campus: "The college is located in the Jhalwa area on the western side of Prayagraj. The campus has academic blocks, laboratories, workshops, a library and hostel accommodation.",
    facilities: [
      "Library",
      "Hostels",
      "Engineering laboratories",
      "Workshops",
      "Computer labs",
      "Sports facilities",
      "Transport",
      "Training and placement cell"
    ],
    highlights: [
      "Affiliated to AKTU, Lucknow",
      "Admission via JEE Main / UPTAC counselling"
    ],
    courses: [
      "cse",
      "it",
      "me",
      "ce",
      "ee",
      "ece",
      "mba"
    ],
    programs: [
      {
        id: "siet-btech-cse",
        courseId: "cse",
        name: "B.Tech Computer Science & Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main (UPTAC counselling)",
        department: "Department of Computer Science & Engineering"
      },
      {
        id: "siet-btech-it",
        courseId: "it",
        name: "B.Tech Information Technology",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main (UPTAC counselling)",
        department: "Department of Information Technology"
      },
      {
        id: "siet-btech-me",
        courseId: "me",
        name: "B.Tech Mechanical Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main (UPTAC counselling)",
        department: "Department of Mechanical Engineering"
      },
      {
        id: "siet-btech-ce",
        courseId: "ce",
        name: "B.Tech Civil Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main (UPTAC counselling)",
        department: "Department of Civil Engineering"
      },
      {
        id: "siet-btech-ee",
        courseId: "ee",
        name: "B.Tech Electrical Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main (UPTAC counselling)",
        department: "Department of Electrical Engineering"
      },
      {
        id: "siet-btech-ece",
        courseId: "ece",
        name: "B.Tech Electronics & Communication Engineering",
        degree: "B.Tech",
        degreeType: "Undergraduate",
        duration: "4 Years",
        eligibility: "10+2 with Physics, Chemistry and Mathematics and JEE Main (UPTAC counselling)",
        department: "Department of Electronics & Communication Engineering"
      },
      {
        id: "siet-mba-mba",
        courseId: "mba",
        name: "Master of Business Administration",
        degree: "MBA",
        degreeType: "Postgraduate",
        duration: "2 Years",
        eligibility: "Graduation with 50% marks and CAT / CUET-PG / university entrance test",
        department: "Department of Business Administration"
      }
    ],
    featured: false
  }
]
