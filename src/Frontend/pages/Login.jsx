import { useLoaderData, useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Native from web
export function loader({ request }) {
  // console.log(new URL(request.url).searchParams.get('message'));
  return new URL(request.url).searchParams.get('message');
}

export default function Login() {
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });
  const message = useLoaderData();
  // with React-Router
  // const [searchParams, setSearchParams] = useSearchParams();
  // const message = searchParams.get('message');
  // console.log(message);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(loginFormData);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  return (
    <div className="login-container">
      <h1 className="mb-5 text-3xl font-bold">Sign in to your account</h1>
      {message && (
        <h3 className="mb-2 text-lg font-bold text-red-500">{message}</h3>
      )}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email address"
          value={loginFormData.email}
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={loginFormData.password}
        />
        <button>Log in</button>
      </form>
    </div>
  );
}
