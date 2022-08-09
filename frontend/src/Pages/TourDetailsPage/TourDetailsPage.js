import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { uniqueNamesGenerator, names } from "unique-names-generator";
import ToursDataService from "../../Services/tours";
import { MapContainer, TileLayer } from "react-leaflet";
import { SpinnerCircular } from "spinners-react";
import Routing from "./RoutingMachine";
import { AuthContext } from "../../Contexts/AuthContext";

import "./TourDetailsPage.css";

const TourDetailsPage = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [loading, setLoading] = useState(false);
  const [tour, setTour] = useState({});
  const [geoStartData, setStartGeoData] = useState({ lat: null, lng: null });
  const [geoEndData, setEndGeoData] = useState({ lat: null, lng: null });

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // package for setting random name
  const config = {
    dictionaries: [names],
  };
  const characterName = uniqueNamesGenerator(config);

  useEffect(() => {
    setLoading(true);
    getTour();
  }, []);

  let duration;
  if (tour.tripduration && tour.tripduration > 3600) {
    duration = new Date(tour.tripduration * 1000).toISOString().slice(11, 19);
  } else if (tour.tripduration && tour.tripduration < 3600) {
    duration = new Date(tour.tripduration * 1000).toISOString().slice(14, 19);
  }

  const getTour = async () => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await ToursDataService.getById(id, config);
      const data = await response.data.data.tour;

      setTour(data);
      setStartGeoData({
        lat: data["start station location"].coordinates[1],
        lng: data["start station location"].coordinates[0],
      });
      setEndGeoData({
        lat: data["end station location"].coordinates[1],
        lng: data["end station location"].coordinates[0],
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  return (
    <section>
      {loading && (
        <div className="loaderContainer">
          <SpinnerCircular
            size={78}
            thickness={143}
            speed={146}
            color="#f6be00"
            secondaryColor="#5b5b5b"
          />
        </div>
      )}
      {!loading && (
        <div className="container mapContainer px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 secondContainer">
            <div className="col-md-6 mt-2">
              {
                <MapContainer scrollWheelZoom={true}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <Routing
                    geoStartData={geoStartData}
                    geoEndData={geoEndData}
                  />
                </MapContainer>
              }
            </div>
            <div className="col-md-6 pt-4 ">
              <p className="box-title mt-2">
                <strong>Tour Information:</strong>
              </p>
              <p className="box-title mt-2">
                <strong>Start station name :</strong>
                {tour["start station name"]}
              </p>
              <p className="box-title mt-2">
                <strong>End station name: </strong>
                {tour["end station name"]}
              </p>
              <p className="box-title mt-2">
                <strong>Duration: </strong>
                {tour.tripduration > 3600
                  ? `${duration.slice(0, -3)} hours`
                  : `${duration} minutes`}
              </p>
              <p className="box-title mt-2">
                <strong>Tour Creator: </strong>
                {characterName}
              </p>
              <p className="box-title mt-2">
                <strong>Difficulty: </strong>
                {tour.tripduration < 3600
                  ? `easy`
                  : tour.tripduration < 3600 * 3
                  ? `easy`
                  : `medium`}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TourDetailsPage;
