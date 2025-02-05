import { NavLink, Link, Outlet, useLoaderData } from 'react-router-dom';
import getHostVans from '../../lib/getHostVans.js';
import requireAuth from '../../utility/requireAuth';

export async function loader({ params }) {
  await requireAuth();
  return getHostVans(params.id);
}

export default function VansHostDetail() {
  // const { id } = useParams();
  const currentVan = useLoaderData();
  const activeStyle = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#161616',
  };

  if (!currentVan) {
    return <h1>Loading...</h1>;
  }

  return (
    <section>
      <Link
        to=".."
        relative="path"
        className="back-button ml-10 mt-5 inline-block "
      >
        &larr; <span>Back to all vans</span>
      </Link>
      <div className="host-van-detail-layout-container">
        <div className="host-van-detail">
          <img src={currentVan.imageUrl} />
          <div className="host-van-detail-info-text">
            <i className={`van-type van-type-${currentVan.type}`}>
              {currentVan.type}
            </i>
            <h3>{currentVan.name}</h3>
            <h4>${currentVan.price}/day</h4>
          </div>
        </div>
        <nav className="host-van-detail-nav">
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : null)}
            to={`.`}
            end
          >
            Details
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : null)}
            to={`pricing`}
          >
            Pricing
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : null)}
            to={`photos`}
          >
            Photos
          </NavLink>
        </nav>
        <Outlet context={[currentVan]}></Outlet>
      </div>
    </section>
  );
}
