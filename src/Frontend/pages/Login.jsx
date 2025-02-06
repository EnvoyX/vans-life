import { Form, useLoaderData, useNavigate, redirect } from 'react-router-dom';
import { useState } from 'react';
import loginUser from '../lib/loginUser';

export function loader({ request }) {
  const isLoggedIn = localStorage.getItem('loggedIn');
  if (isLoggedIn) {
    const response = redirect('/');
    response.body = true;
    return response;
  }
  return new URL(request.url).searchParams.get('message');
}

export async function action({ request }) {
  console.log(request);
  const formData = await request.formData();

  console.log(formData);
  const email = formData.get('email');

  const password = formData.get('password');
  console.log(email, password);

  const data = await loginUser({ email, password });
  console.log(data);
  localStorage.setItem('loggedIn', true);
  return null;
}

export default function Login() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const message = useLoaderData();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('loggedIn');
  const loadingStyle = {
    backgroundColor: '#161616',
    textColor: '#ffffff',
  };

  if (isLoggedIn) {
    navigate('/host');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    setError(null);
    console.log(loginFormData);
    try {
      const response = await loginUser(loginFormData).then((data) => data);
      console.log(response);
      setStatus('idle');
      navigate('/host');
    } catch (error) {
      setError(error);
      console.log('An error has occured');
      console.log(error);
    } finally {
      setStatus('idle');
    }
  }

  // Use "b@b.com" as the username and
  //  *    "p123" as the password.

  return (
    <div className="login-container">
      <h1 className="mb-5 text-3xl font-bold">Sign in to your account</h1>
      {isLoggedIn
        ? null
        : message && (
            <h3 className="mb-2 text-lg font-bold text-red-500">{message}</h3>
          )}
      {error && (
        <h3 className="mb-2 text-lg font-bold text-red-500">{error.message}</h3>
      )}
      <Form method="POST" className="login-form" replace>
        <input
          name="email"
          type="email"
          placeholder="Email address"
          value={'b@b.com'}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={'p123'}
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          style={status === 'submitting' ? loadingStyle : null}
        >
          {status === 'submitting' ? 'Logging in...' : 'Login'}
        </button>
      </Form>
    </div>
  );
}
