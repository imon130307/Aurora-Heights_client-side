import { Link } from "react-router-dom";

const Membership = () => {


  return (
    <div className="flex flex-col justify-center items-center gap-5 py-16">
        <div>
            <h2 className="font-extrabold text-3xl text-yellow-600">Our Membership Packages</h2>
        </div>
        <div>
        <div className="stats shadow">
      {/* //!-----Silver package--------- */}
      <Link to={`/checkout/${'silver-package'}`}>
      <div className="stat">
        <div className="stat-figure text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-8 w-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        </div>
        <div className="stat-value text-primary">Silver</div>
        <div className="stat-desc"><span className="font-bold text-red-600 text-xl">-</span>9% on all meals</div>
      </div>
      </Link>
      {/* //!-----Gold package--------- */}
      <Link to={`/checkout/${'gold-package'}`}>
      <div className="stat">
        <div className="stat-figure text-secondary">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-8 w-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        </div>
        <div className="stat-value text-secondary">Gold</div>
        <div className="stat-desc"><span className="font-bold text-red-600 text-xl">-</span>21% on all meals</div>
      </div>
      </Link>
      {/* //!-----Platinum package--------- */}
      <Link to={`/checkout/${'platinum-package'}`}>
      <div className="stat">
        <div className="stat-figure text-success">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-8 w-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
        </div>
        <div className="stat-value text-success">Platinum</div>
        <div className="stat-desc"><span className="font-bold text-red-600 text-xl">-</span>37% on all meals</div>
      </div>
      </Link>
    </div>
        </div>
    </div>
  );
};

export default Membership;
