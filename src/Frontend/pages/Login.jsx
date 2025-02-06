import {
  Form,
  useLoaderData,
  useNavigation,
  redirect,
  useActionData,
} from 'react-router-dom';
import loginUser from '../lib/loginUser';

export function loader({ request }) {
  return new URL(request.url).searchParams.get('message');
}

export async function action({ request }) {
  const pathname =
    new URL(request.url).searchParams.get('redirectTo') || '/host';
  console.log(request);
  const formData = await request.formData();

  console.log(formData);
  const email = formData.get('email');

  const password = formData.get('password');
  console.log(email, password);

  try {
    const data = await loginUser({ email, password });
    console.log(data);
    localStorage.setItem('loggedIn', true);
    const response = redirect(pathname);
    response.body = true;
    return response;
  } catch (err) {
    console.log(err);
    return err.message;
  }
}

export default function Login() {
  const message = useLoaderData();
  const navigation = useNavigation();
  const errorMessage = useActionData();
  const isLoggedIn = localStorage.getItem('loggedIn');
  const loadingStyle = {
    backgroundColor: '#aaaaaa',
    textColor: '#ffffff',
    cursor: 'not-allowed',
  };
  console.log(navigation);
  return (
    <div className="login-container">
      <h1 className="mb-5 text-3xl font-bold">Sign in to your account</h1>
      {isLoggedIn
        ? null
        : message && (
            <h3 className="mb-2 text-lg font-bold text-red-500">{message}</h3>
          )}
      {errorMessage && (
        <h3 className="mb-2 text-lg font-bold text-red-500">{errorMessage}</h3>
      )}
      <Form method="POST" className="login-form" replace>
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button
          type="submit"
          disabled={navigation.state === 'submitting'}
          style={navigation.state === 'submitting' ? loadingStyle : null}
        >
          {navigation.state === 'submitting' ? 'Logging in...' : 'Login'}
        </button>
      </Form>
    </div>
  );
}
