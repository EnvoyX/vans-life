import { Link, useLoaderData, Await } from 'react-router-dom';
import { Suspense } from 'react';

export default function VansHost() {
  const dataPromise = useLoaderData();
  const renderVansHost = (vans) => {
    const hostVansEls = vans.map((van) => (
      <Link to={`${van.id}`} key={van.id} className="host-van-link-wrapper">
        <div className="host-van-single" key={van.id}>
          <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
          <div className="host-van-info">
            <h3>{van.name}</h3>
            <p>${van.price}/day</p>
          </div>
        </div>
      </Link>
    ));
    return (
      <>
        <h1 className="host-vans-title text-2xl font-bold mt-5 mb-5">
          Your listed vans
        </h1>
        <div className="host-vans-list">
          <section>{hostVansEls}</section>
        </div>
      </>
    );
  };
  return (
    <section>
      <Suspense fallback={<h2>Loading vans host....</h2>}>
        <Await resolve={dataPromise.vansHost}>{renderVansHost}</Await>
      </Suspense>
    </section>
  );
}
