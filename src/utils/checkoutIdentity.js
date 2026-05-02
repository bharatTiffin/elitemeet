export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());

export function collectCheckoutIdentity(defaultValues = {}) {
  const initialName = String(defaultValues.name || '').trim();
  const initialEmail = String(defaultValues.email || '').trim();

  const enteredName = window.prompt('Enter your full name for order confirmation:', initialName);
  if (enteredName === null) {
    return null;
  }

  const userName = enteredName.trim();
  if (!userName) {
    alert('Name is required to continue payment.');
    return null;
  }

  const enteredEmail = window.prompt(
    'Enter your email ID. eBooks will be sent to this email ID, make sure it is correct.',
    initialEmail
  );
  if (enteredEmail === null) {
    return null;
  }

  const userEmail = enteredEmail.trim().toLowerCase();
  if (!isValidEmail(userEmail)) {
    alert('Please enter a valid email ID to continue payment.');
    return null;
  }

  return { userName, userEmail, fullName: userName, email: userEmail };
}
