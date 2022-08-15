import React, { useState, useEffect } from "react";
import ToursDataService from "../../Services/tours";
import CardContainer from "../../Components/CardContainer/CardContainer";
import SearchNotFound from "../../Components/SearchNotFound/SearchNotFound";
import Pagination from "../../Components/Pagination/Pagination";
import { SpinnerCircular } from "spinners-react";

import "./ToursPage.css";

const ToursPage = () => {
  const [tours, setTours] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchNameHelper, setSearchNameHelper] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchResult, setSearchResult] = useState(false);
  const [totalSearchNumber, setTotalSearchNumber] = useState(1);
  const [errorPage, setErrorPage] = useState(false);
  const [filteredSearch, setFilteredSearch] = useState(false);
  const [duration, setDuration] = useState("Filter By Duration");

  useEffect(() => {
    retrieveTours();
  }, []);

  useEffect(() => {
    sortByDuration();
  }, [duration]);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchNameHelper(searchName);
    setSearchName(searchName);
  };

  const pageSetter = (newPage) => {
    setPage(newPage);
    if (duration !== "Filter By Duration") {
      console.log("idee1");
      sortByDuration(newPage);
    } else if (searchNameHelper !== "") {
      console.log(searchNameHelper);
      console.log("ideee2");
      findByName(page);
    } else {
      console.log("ideee3");
      retrieveTours(page);
    }
  };

  const retrieveTours = async (page) => {
    setLoading(true);

    try {
      const response = await ToursDataService.getAll(page);

      setTours(response.data.data.tours);
      setSearchResult(false);
      setFilteredSearch(false);
      setTotalSearchNumber(response.data.totalNum);
      setDuration("Filter By Duration");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const find = async (query, page) => {
    setLoading(true);
    // setSearchResult(true);
    // setFilteredSearch(true);
    try {
      const response = await ToursDataService.searchByStartLocation(
        query,
        page
      );

      const data = response.data.data.data;
      console.log(data);
      if (data.length === 0) {
        setLoading(false);
        setErrorPage(true);
      } else {
        setTours(data);
        setLoading(false);
        setSearchResult(true);
        setTotalSearchNumber(response.data.totalNum);
        setFilteredSearch(true);
        setErrorPage(false);
        setDuration("Filter By Duration");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const findByName = (e) => {
    if (searchNameHelper !== "") {
      find(searchNameHelper, page);
      setSearchName("");
    }
  };

  const sortByDuration = async (page) => {
    if (duration === "Filter By Duration") {
      return;
    }
    setLoading(true);
    try {
      const response = await ToursDataService.sortByDuration(page, duration);
      const data = response.data.data.tours;
      console.log(data);
      if (data.length === 0) {
        setLoading(false);
        setErrorPage(true);
      } else {
        setTours(data);
        setLoading(false);
        setTotalSearchNumber(response.data.totalNum);
        setFilteredSearch(false);
        setErrorPage(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (e) => {
    setDuration(e.target.value);
  };

  return (
    <section className="mainSection">
      <div>
        {!filteredSearch && !loading && !searchResult && (
          <h2 className="title">All Tours</h2>
        )}
      </div>
      <div className="input-group">
        <div className="form-outline">
          <input
            type="text"
            className="form-control"
            placeholder="Search by start destination"
            value={searchName}
            onChange={onChangeSearchName}
            required
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
        {!errorPage && (
          <div className="form-outline">
            <select
              className="form-select form_custom"
              value={duration}
              onChange={handleOnChange}
            >
              <option value="Filter By Duration" disabled>
                Filter By Duration
              </option>
              <option value="shorter">Shorter</option>
              <option value="longer">Longer</option>
            </select>
          </div>
        )}
      </div>

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
      {!loading && !errorPage && <CardContainer tours={tours} />}
      {!errorPage && (
        <Pagination
          tours={tours}
          totalSearchNumber={totalSearchNumber}
          pageSetter={pageSetter}
        />
      )}
      {!loading && !searchResult && errorPage && <SearchNotFound />}
    </section>
  );
};

export default ToursPage;
