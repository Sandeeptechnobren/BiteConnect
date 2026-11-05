// SEED — the people data agent replaces this (keep the exports and shapes).
// Student ids the demo user is already connected with / has received requests from / has sent requests to.
export const initialConnections = {
  connected: [],
  received: [],
  sent: [],
}

// Navbar notifications. type: 'request' | 'accepted' | 'college' | 'system'
// { id, type, studentId?, collegeSlug?, text, time: '2h', read: false }
export const initialNotifications = []
