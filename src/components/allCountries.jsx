import { useEffect, useState } from "react";

import "./allCountries.css";
import Loder from "./loader";

function AllCountries({ countryClick }) {
  const [countries, setCounties] = useState([]);
  const [error, setError] = useState(false);
  const [loding, setLoading] = useState(false);
  useEffect(() => {
    setError(false);
    async function getCounties() {
      try {
        setLoading(true);
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags"
        );
        const data = await res.json();
        const iteams = await data.map((c) => {
          return { name: c.name.common, flag: c.flags.svg };
        });
        setCounties(iteams);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getCounties();
  }, []);

  if (error)
    return <p className="center">Failed to load Data from server :(</p>;
  if (loding) return <Loder />;
  return (
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
              <img className="counties-image" src={curr.flag} alt={curr.name} />
            </div>
            <p>{curr.name}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default AllCountries;
