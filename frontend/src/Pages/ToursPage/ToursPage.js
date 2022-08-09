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

  useEffect(() => {
    retrieveTours();
  }, []);

  useEffect(() => {
    if (!searchResult) {
      retrieveTours(page);
    }
    if (searchResult) {
      findByName(page);
    }
  }, [page]);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchNameHelper(searchName);
    setSearchName(searchName);
  };

  const pageSetter = (newPage) => {
    setPage(newPage);
  };

  const retrieveTours = async (page) => {
    setLoading(true);

    try {
      const response = await ToursDataService.getAll(page);

      setTours(response.data.data.tours);
      setSearchResult(false);
      setTotalSearchNumber(response.data.totalNum);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const find = async (query, page) => {
    setLoading(true);

    try {
      const response = await ToursDataService.findByStartLocation(query, page);
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const findByName = (page) => {
    if (searchNameHelper !== "") {
      find(searchNameHelper, page);
      setSearchName("");
    }
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
