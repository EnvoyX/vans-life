import { Form, useLoaderData, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import loginUser from '../lib/loginUser';

export function loader({ request }) {
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
  // const [loginFormData, setLoginFormData] = useState({
  //   email: '',
  //   password: '',
  // });
  const message = useLoaderData();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('loggedIn');
  const loadingStyle = {
    backgroundColor: '#161616',
    textColor: '#ffffff',
  };

  // with React-Router
  // const [searchParams, setSearchParams] = useSearchParams();
  // const message = searchParams.get('message');
  // console.log(message);

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

  // function handleChange(e) {
  //   const { name, value } = e.target;
  //   setLoginFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // }

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
      <Form method="POST" className="login-form">
        <input
          name="email"
          type="email"
          placeholder="Email address"
          value={'b@b.com'}
          // onChange={handleChange}
          // value={loginFormData.email}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={'p123'}
          // onChange={handleChange}
          // value={loginFormData.password}
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
