import { useEffect, useState } from "react";

import "./serchbar.css";
import logo from "../src/logo.png";

import AllCountries from "./components/allCountries";
import CountryDetails from "./components/countryDetails";
import Loder from "./components/loader";
import Footer from "./components/footer";

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(true);
  const [country, setCountry] = useState("India");
  const [loding, setLoding] = useState(false);

  function setCountryHandeler(data) {
    console.log(data);
    setShowAll(false);
    setError(null);
    setCountry(data);
  }

  function handelAllCountries(flag) {
    console.log(flag);
    setShowAll(flag);
  }

  async function countryClick(countrie) {
    setCountry(countrie);
    setShowAll(false);
  }
  useEffect(() => {
    async function handelSearch() {
      try {
        setLoding(true);
        const res = await fetch(
          `https://restcountries.com/v3.1/name/${country}?fullText=true`
        );
        const result = await res.json();
        result.status = "success";
        if (result.message === "Not Found")
          setError(
            "Sorry, Country not found, Please check any spelling mistake."
          );
        setData(result[0]);
      } catch (e) {
        setError("Something went wrong, Please try again!");
      } finally {
        setLoding(false);
      }
    }
    handelSearch();
  }, [country]);

  return (
    <>
      <SearchBar
        setCountryHandeler={setCountryHandeler}
        handelAllCountries={handelAllCountries}
        AllCountriesState={showAll}
      />
      {loding ? (
        <Loder />
      ) : error ? (
        <p className="center-message">{error}</p>
      ) : !showAll ? (
        <CountryDetails data={data} />
      ) : (
        <AllCountries countryClick={countryClick} />
      )}
      <Footer />
    </>
  );
};

const SearchBar = ({
  setCountryHandeler,
  handelAllCountries,
  AllCountriesState,
}) => {
  const [query, setQuery] = useState("India");

  function handelQuery(e) {
    setQuery(e.target.value);
  }

  return (
    <div className="search-bar">
      <img src={logo} className="logo" alt="country rush logo" />
      <h1 className="search-heading">Country Rush</h1>
      <div>
        <input
          autoComplete="false"
          className="search-input"
          type="text"
          onChange={handelQuery}
          value={query}
          placeholder="country name"
        />
        <button
          className="search-button"
          type="button"
          onClick={() => setCountryHandeler(query)}
        >
          🔎
        </button>
      </div>
      {!AllCountriesState && (
        <button
          className="all-countries"
          onClick={() => handelAllCountries(true)}
        >
          All Countries
        </button>
      )}
    </div>
  );
};

export default App;
