// Student ids the demo user is already connected with / has received requests from / has sent requests to.
export const initialConnections = {
  connected: [2, 19, 25, 30, 35, 39],
  received: [5, 12, 43, 32],
  sent: [1, 22],
}

// Navbar notifications. type: 'request' | 'accepted' | 'college' | 'system'
// { id, type, studentId?, collegeSlug?, text, time: '2h', read: false }
export const initialNotifications = [
  { id: 'n1', type: 'request', studentId: 5, text: 'Rahul Sharma sent you a connection request', time: '5m', read: false },
  { id: 'n2', type: 'request', studentId: 12, text: 'Priya Singh sent you a connection request', time: '2h', read: false },
  { id: 'n3', type: 'accepted', studentId: 30, text: 'Ishita Bansal accepted your connection request', time: '5h', read: false },
  { id: 'n4', type: 'request', studentId: 43, text: 'Utkarsh Dwivedi sent you a connection request', time: '1d', read: false },
  { id: 'n5', type: 'college', collegeSlug: 'university-of-allahabad', text: 'Admissions for MCA 2027 open at University of Allahabad', time: '1d', read: true },
  { id: 'n6', type: 'request', studentId: 32, text: 'Manish Kumar sent you a connection request', time: '2d', read: true },
  { id: 'n7', type: 'system', text: 'Welcome to Bite Connect! Complete your profile to get better connection suggestions.', time: '3d', read: true },
]
