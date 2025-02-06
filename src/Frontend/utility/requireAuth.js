import { redirect } from 'react-router-dom';

export default async function requireAuth() {
  const isLoggedIn = localStorage.getItem('loggedIn');

  if (!isLoggedIn) {
    const response = redirect('/login?message=You must log in first.');
    response.body = true; // It's silly, but it works
    return response;
  }
  return null;
}
