import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="page">
      <div class="d-flex align-items-center justify-content-center vh-100">
        <div class="text-center">
          <h1 class="display-1 fw-bold">404</h1>
          <p class="fs-3">
            {" "}
            <span class="text-danger">Opps!</span> Page not found.
          </p>
          <p class="lead">The page you’re looking for doesn’t exist.</p>
          <NavLink to="/tours">
            <button class="btn btn-outline-dark m-3">Go Home</button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
