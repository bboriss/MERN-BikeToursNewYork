import TourCard from "../../Components/TourCard/TourCard";

const CardContainer = ({ tours }) => {
  return (
    <div className="container">
      <div className="row clearfix ">
        {tours.map((tour) => (
          <TourCard key={tour._id} tour={tour} />
        ))}
      </div>
    </div>
  );
};

export default CardContainer;
