import './App.css';
import '../Backend/api/server';
import requireAuth from './utility/requireAuth';
import getHostVans from './lib/getHostVans';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  redirect,
} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Layout from './components/Layout';
import Vans, { loader as vansPageLoader } from './pages/Vans/Vans';
import VansDetail, {
  loader as vansDetailPageLoader,
} from './pages/Vans/VansDetail';
import Dashboard from './pages/Host/Dashboard';
import Income from './pages/Host/Income';
import Reviews from './pages/Host/Reviews';
import HostLayout from './components/HostLayout';
import VansHost from './pages/Host/VansHost';
import VansHostDetail from './pages/Host/VansHostDetail';
import VansHostInfo from './pages/Host/VansHostInfo';
import VansHostPhotos from './pages/Host/VansHostPhotos';
import VansHostPricing from './pages/Host/VansHostPricing';
import NotFound from './components/NotFound';
import Error from './components/Error';
import Login, {
  action as loginAction,
  loader as loginLoader,
} from './pages/Login';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={<Error></Error>}>
        <Route index element={<Home />}></Route>
        <Route path="about" element={<About />}></Route>
        <Route
          path="login"
          element={<Login />}
          action={loginAction}
          loader={loginLoader}
        ></Route>
        <Route path="vans" element={<Vans />} loader={vansPageLoader}></Route>
        <Route
          path="vans/:id"
          element={<VansDetail />}
          loader={vansDetailPageLoader}
        ></Route>
        <Route path="host" element={<HostLayout />}>
          <Route
            index
            element={<Dashboard />}
            loader={async ({ request }) => await requireAuth(request)}
          />
          <Route
            path="income"
            element={<Income />}
            loader={async ({ request }) => await requireAuth(request)}
          />
          <Route
            path="reviews"
            element={<Reviews />}
            loader={async ({ request }) => await requireAuth(request)}
          />
          <Route
            path="vans"
            element={<VansHost />}
            loader={async ({ request }) => {
              const isLoggedIn = localStorage.getItem('loggedIn');
              const pathname = new URL(request.url).pathname;
              if (!isLoggedIn) {
                const response = redirect(
                  `/login?message=You must log in first.&redirectTo=${pathname}`
                );
                response.body = true;
                return response;
              }
              return getHostVans();
            }}
          />
          <Route
            path="vans/:id"
            element={<VansHostDetail />}
            loader={async ({ request, params }) => {
              await requireAuth(request);
              return getHostVans(params.id);
            }}
          >
            <Route
              index
              element={<VansHostInfo />}
              loader={async ({ request }) => await requireAuth(request)}
            ></Route>
            <Route
              path="pricing"
              element={<VansHostPricing />}
              loader={async ({ request }) => await requireAuth(request)}
            ></Route>
            <Route
              path="photos"
              element={<VansHostPhotos />}
              loader={async ({ request }) => await requireAuth(request)}
            ></Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
