import "./countryDetails.css";

const CountryDetails = ({ data }) => {
  if (!data) {
    return (
      <p className="center-message">Please Search a Country By Its Name :)</p>
    );
  }

  const detailsStyle = {
    "--bg-img": `url( '${data.coatOfArms.png}')`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  };

  const languages = [];
  for (const key in data.languages) languages.push(data.languages[key]);

  const currencies = [];
  for (const key in data.currencies) currencies.push(data.currencies[key].name);
  return (
    <div className="data">
      <div className="image-div">
        <img
          className="data-image"
          src={data.flags.svg}
          alt={`${data.name.common}'s Flag`}
        />
      </div>
      <div className="info-div" style={detailsStyle}>
        <h2 className="country-name">{data.name.common}</h2>
        <p>Official Name: {data.name.official}</p>
        <p>{data.unMember ? "UN Member" : ""}</p>
        <p>Capital: {data.capital[0]}</p>
        <p>Region: {data.region}</p>
        <p>
          {currencies.length > 1 ? "Currencies: " : "Currency: "}
          {currencies.map((curr, i) => (
            <span key={i}>{curr}, </span>
          ))}
        </p>
        <p>
          {languages.length > 1 ? "Languages: " : "Language: "}
          {languages.map((curr, i) => (
            <span key={i}>{curr}, </span>
          ))}
        </p>
        <p>Area : {data.area} KMs</p>
        <p>Population: {data.population}</p>

        <p>
          Latitude & Lagitude : {data.capitalInfo.latlng[0]},{" "}
          {data.capitalInfo.latlng[1]}
        </p>
        <a href={data.maps.googleMaps}> View on Map</a>
      </div>
    </div>
  );
};

export default CountryDetails;
