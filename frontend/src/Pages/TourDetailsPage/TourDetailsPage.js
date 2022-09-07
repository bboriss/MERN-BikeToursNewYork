import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { uniqueNamesGenerator, names } from "unique-names-generator";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import { SpinnerCircular } from "spinners-react";
import Routing from "./RoutingMachine";
import ToursDataService from "../../Services/tours";
import { AuthContext } from "../../Contexts/AuthContext";

import "./TourDetailsPage.css";

const TourDetailsPage = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [loading, setLoading] = useState(false);
  const [tour, setTour] = useState({});
  const [geoStartData, setStartGeoData] = useState({ lat: null, lng: null });
  const [geoEndData, setEndGeoData] = useState({ lat: null, lng: null });

  const portionTime = (duration) => {
    let hours = duration / 3600;
    let mins = (duration % 3600) / 60;
    let secs = (mins * 60) % 60;

    hours = Math.trunc(hours);
    mins = Math.trunc(mins);

    if (!hours && !mins && !secs) {
      return "None";
    }

    if (hours) {
      if (mins) {
        return secs
          ? `${hours} hr ${mins} min & ${secs} sec`
          : `${hours} hr & ${mins} min`;
      } else {
        return secs ? `${hours} hr & ${secs} sec` : `${hours} hr`;
      }
    } else {
      if (mins) {
        return secs ? `${mins} min & ${secs} sec` : `${mins} min`;
      } else {
        return secs ? `${secs} sec` : `None`;
      }
    }
  };

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

  const getTour = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      if (user) {
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
      } else if (!user) {
        navigate("/login/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { BaseLayer } = LayersControl;

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
            <div className="col-md-6 map">
              {
                <MapContainer scrollWheelZoom={true}>
                  <LayersControl>
                    <BaseLayer checked name="OpenStreetMap">
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Routing
                        geoStartData={geoStartData}
                        geoEndData={geoEndData}
                      />
                    </BaseLayer>
                  </LayersControl>
                </MapContainer>
              }
            </div>
            <div className="col-md-6 pt-4  info">
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
                {portionTime(tour.tripduration)}
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
