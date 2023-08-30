import { useEffect, useState } from "react";

import "./allCountries.css";
import Loder from "./loader";

function AllCountries({ countryClick }) {
  const [countries, setCounties] = useState([]);
  const [error, setError] = useState(false);
  const [loding, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [localData, setLocalData] = useState([]);

  const handelFilter = (e) => {
    const query = e.target.value;
    if (query === "") setCounties(localData);
    setFilter(query);
  };

  useEffect(() => {
    setError(false);
    async function getCounties() {
      try {
        setLoading(true);
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags"
        );
        const data = await res.json();
        const items = await data
          .map((c) => {
            return { name: c.name.common, flag: c.flags.svg };
          })
          .sort((a, b) => (a.name > b.name ? 1 : -1));
        console.log("sorted array", items);
        setLocalData(items);
        setCounties(items);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getCounties();
  }, []);

  useEffect(() => {
    setCounties(() => {
      return localData.filter((cntr) => {
        return cntr.name.toLowerCase().includes(filter);
      });
    });
  }, [filter]);

  if (error)
    return <p className="center">Failed to load Data from server :(</p>;
  if (loding) return <Loder />;
  return (
    <>
      <div className="filter">
        <input
          
          type="text"
          value={filter}
          onChange={(e) => handelFilter(e)}
          placeholder="Type country name here to filter"
        />
      </div>
      <ul className="countries-container">
        {countries.map((curr) => {
          return (
            <li
              key={curr.name}
              className="countries-list"
              onClick={() => countryClick(curr.name.trim())}
            >
              {" "}
              <div className="coun-img-container">
                <img
                  className="counties-image"
                  src={curr.flag}
                  alt={curr.name}
                />
              </div>
              <p>{curr.name}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default AllCountries;
