import "./TourCard.css";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import Routing from "../../Pages/TourDetailsPage/RoutingMachine";
import { Link } from "react-router-dom";

const TourCard = ({ tour }) => {
  const [geoStartData, setStartGeoData] = useState({ lat: null, lng: null });
  const [geoEndData, setEndGeoData] = useState({ lat: null, lng: null });
  console.log(tour);
  useEffect(() => {
    getTour();
  }, []);
  // Coordinates
  const getTour = async () => {
    try {
      setStartGeoData({
        lat: tour["start station location"].coordinates[1],
        lng: tour["start station location"].coordinates[0],
      });
      setEndGeoData({
        lat: tour["end station location"].coordinates[1],
        lng: tour["end station location"].coordinates[0],
      });
    } catch (error) {
      console.log(error);
    }
  };

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

  const { BaseLayer } = LayersControl;

  return (
    <div className="col-lg-3 col-md-6 col-sm-6">
      <div className="card">
        {/* <img
          className="card-img-top"
          src="https://images.unsplash.com/photo-1653501183272-091c8b887b59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1OTAwNDA3Mg&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
          alt="Card image cap"
        ></img> */}
        <div className="col-md-6 map_mainPage">
          {
            <MapContainer scrollWheelZoom={true}>
              <LayersControl>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Routing geoStartData={geoStartData} geoEndData={geoEndData} />
              </LayersControl>
            </MapContainer>
          }
        </div>

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
            <strong>Average Duration: </strong>
            {portionTime(tour.tripduration)}
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
