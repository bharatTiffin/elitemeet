import { useLocation } from 'react-router-dom';
import SiteNavbar from './SiteNavbar';
import { getAuthenticatedUser } from '../../utils/authHelper';

// Routes that keep their own full-screen layout (no shared marketing navbar).
const HIDE_ON = ['/', '/login', '/dashboard', '/admin', '/tracker', '/LiveClass', '/recordedClass', '/crash-LiveClass', '/crash-recordedClass'];

/**
 * Sticky marketing navbar shown above public pages (purchase, policy, blog...).
 * Purely presentational: Login goes to the existing /login route and logged-in
 * users get a Dashboard link.
 */
export default function PublicNavbar({ landingPaths = [] }) {
  const { pathname } = useLocation();
  if (HIDE_ON.includes(pathname) || landingPaths.includes(pathname)) return null;

  let user = null;
  try {
    user = getAuthenticatedUser();
  } catch {
    user = null;
  }
  const dashboardHref = user ? (user.role === 'admin' ? '/admin' : '/dashboard') : undefined;

  return <SiteNavbar sticky dashboardHref={dashboardHref} ctaTo="/login" />;
}
