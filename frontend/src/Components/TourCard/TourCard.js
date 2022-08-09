import "./TourCard.css";
import { Link } from "react-router-dom";

const TourCard = ({ tour }) => {
  let duration;
  if (tour.tripduration > 3600) {
    duration = new Date(tour.tripduration * 1000).toISOString().slice(11, 19);
  } else {
    duration = new Date(tour.tripduration * 1000).toISOString().slice(14, 19);
  }

  return (
    <div className="col-lg-3 col-md-6 col-sm-6">
      <div className="card">
        <img
          className="card-img-top"
          src="https://images.unsplash.com/photo-1653501183272-091c8b887b59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1OTAwNDA3Mg&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
          alt="Card image cap"
        ></img>

        <div
          className="card-body d-flex align-items-center flex-column"
          style={{ height: "14rem" }}
        >
          <h5 className="card-title">{tour.name}</h5>
          <p className="card-text">
            <strong>Start Location: </strong>
            {tour["start station name"]}
            <br />
            <strong>End Location: </strong>
            {tour["end station name"]}
          </p>

          <p className="card-text">
            <strong>Duration: </strong>
            {tour.tripduration > 3600
              ? `${duration.slice(0, -3)} hours`
              : `${duration} minutes`}
          </p>

          <Link
            to={"/tours/" + tour._id}
            className="btn btn-outline-dark mt-auto"
          >
            Show tour details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
