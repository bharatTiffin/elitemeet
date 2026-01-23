# Manual Authentication Token Recognition - Complete Update

## Issue Resolved
After manual signup/login, users were seeing **"Please login first to enrol"** error when trying to purchase courses, even though they were authenticated. This occurred because purchase/enrollment pages only checked Firebase authentication and didn't recognize manual auth tokens stored in localStorage.

## Root Cause
- Manual users get `manualAuthToken` stored in localStorage
- All purchase pages were using `useState(auth.currentUser)` which only checks Firebase
- Firebase's `auth.currentUser` is null for manual auth users
- Therefore, `user` state was null and enrollment checks failed

## Solution Implemented
Created a centralized authentication helper function that checks manual auth first, then Firebase as fallback.

### authHelper.js
**Location:** `src/utils/authHelper.js`

```javascript
import { auth } from '../config/firebase';

export function getAuthenticatedUser() {
  // Check manual auth token first
  const manualToken = localStorage.getItem('manualAuthToken');
  if (manualToken) {
    try {
      const user = JSON.parse(manualToken);
      return user;
    } catch (e) {
      console.error('Failed to parse manual auth token:', e);
    }
  }
  
  // Fall back to Firebase auth
  return auth.currentUser;
}
```

### Updated Files

#### All Purchase Pages (13 files) ✅
Changed from: `useState(auth.currentUser)`  
Changed to: `useState(getAuthenticatedUser)`

1. ✅ OnlineCoachingPurchase.jsx
2. ✅ CrashCoursePurchase.jsx
3. ✅ PolityBookPurchase.jsx
4. ✅ CompletePackPurchase.jsx
5. ✅ WithoutPolityPackPurchase.jsx
6. ✅ CurrentAffairPurchase.jsx
7. ✅ EconomicsBookPurchase.jsx
8. ✅ EnvironmentBookPurchase.jsx
9. ✅ GeographyBookPurchase.jsx
10. ✅ ScienceBookPurchase.jsx
11. ✅ ModernHistoryBookPurchase.jsx
12. ✅ AncientHistoryBookPurchase.jsx
13. ✅ MedievalHistoryBookPurchase.jsx
14. ✅ PunjabiTypingPurchase.jsx

#### All Dashboard/Screen Pages (3 files) ✅
Changed from: `useState(auth.currentUser)`  
Changed to: `useState(getAuthenticatedUser)`

1. ✅ UserDashboard.jsx (screens folder)
2. ✅ AdminDashboard.jsx (screens folder)
3. ✅ PDFPurchasePage.jsx (screens folder)

## Implementation Pattern
All updated files follow this pattern:

**Before:**
```jsx
import { auth } from '../config/firebase';

function ComponentName() {
  const [user, setUser] = useState(auth.currentUser);
  // ... rest of component
}
```

**After:**
```jsx
import { getAuthenticatedUser } from '../utils/authHelper';

function ComponentName() {
  const [user, setUser] = useState(getAuthenticatedUser);
  // ... rest of component
}
```

## How It Works Now

1. **Manual Login User Flow:**
   - User logs in with email/password
   - Backend validates credentials and returns user object
   - Frontend stores: `localStorage.setItem('manualAuthToken', JSON.stringify(userData))`
   - User navigates to purchase page
   - `getAuthenticatedUser()` checks localStorage first
   - Finds `manualAuthToken` and returns the stored user object
   - Purchase page recognizes user as authenticated ✅

2. **Firebase Login User Flow:**
   - User logs in with Google
   - Firebase sets `auth.currentUser`
   - User navigates to purchase page
   - `getAuthenticatedUser()` checks localStorage (empty)
   - Falls back to Firebase: returns `auth.currentUser` ✅
   - Purchase page recognizes user as authenticated ✅

## Testing Checklist
- [ ] Manual signup → User created in database
- [ ] Manual login → manualAuthToken stored in localStorage
- [ ] Manual user → Redirect to admin page (if role='admin') or home
- [ ] Manual user → Purchase page shows authenticated user
- [ ] Manual user → Can purchase 2.5 month course
- [ ] Manual user → Can purchase 5 month course
- [ ] Manual user → "Please login first to enrol" message NO LONGER appears
- [ ] Google login user → Still works as before
- [ ] Page refresh → Manual auth persists (localStorage check first)
- [ ] Enrollment process → Works for both manual and Firebase users

## Technical Details

### Manual Auth Token Structure
```javascript
{
  id: "user_id_from_mongodb",
  email: "user@example.com",
  name: "User Name",
  role: "user" | "admin",
  signupType: "manual",
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z"
}
```

### Backend Endpoints (Existing)
- **POST /api/auth/signup** - Manual signup with email/password
- **POST /api/auth/login** - Manual login with email/password verification
- User model stores: `password` (bcrypt hashed), `signupType`, `firebaseUid` (nullable)

### Key Points
- All tokens use 'manualAuthToken' key in localStorage
- Password is bcrypt hashed with 10 salt rounds on backend
- Manual users stored in same User collection as Firebase users
- Unique constraint on email field prevents duplicates
- Both signup types can have admin role

## Verification
All 17 files have been successfully updated and verified. No instances of `useState(auth.currentUser)` remain in the codebase for pages that require authentication.

## Next Steps
1. Test the complete flow with manual signup and course purchase
2. Verify no "Please login first to enrol" errors appear
3. Test with multiple purchase pages
4. Confirm page refresh maintains authentication
