import { useState } from "react";
import Card, { LinkCard } from "../Components/Card";
import Input from "../Components/Input";
import { useWeather } from "../Context/WeatherContext";
import DateTime from "./DateTime";
import cleanWeather from "../assets/images/clearWeather.jpg";
import hazeWeather from "../assets/images/hazeWeather.jpg";
import cloudyWeather from "../assets/images/cloudyWeather.jpg";
import rainiWeather from "../assets/images/rainiWeather.jpg";
import locationImg from "../assets/images/location.jpg";
import { ShowContent } from "../Context/WeatherContext";

let bgImage = undefined;

function Weather() {
  const {
    city,
    showError,
    setShowError,
    loading,
    setLoading,
    searchCity,
    setSearchCity,
  } = useWeather();
  const [openMenu, setOpenMenu] = useState(false);
  const [showContents, setShowContents] = useState(undefined);
  switch (city?.current?.condition?.text.toLocaleLowerCase()) {
    case "OVERCAST".toLocaleLowerCase():
      bgImage = cloudyWeather;
      break;
    case "Light rain shower".toLocaleLowerCase():
      bgImage = rainiWeather;
      break;
    case "Light rain".toLocaleLowerCase():
      bgImage = rainiWeather;
      break;
    case "mist".toLocaleLowerCase():
      bgImage = hazeWeather;
      break;
    case "Partly cloudy".toLocaleLowerCase():
      bgImage = cleanWeather;
      break;
    case "clear".toLocaleLowerCase():
      bgImage = cleanWeather;
      break;
    case "sunny".toLocaleLowerCase():
      bgImage = cleanWeather;
      break;
    default:
      bgImage = locationImg;
      break;
  }

  // console.log(showError);
  // console.log(loading);
  // console.log(city);
  // weatherContentBox1.backgroundImage = `https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fsunny-weather&psig=AOvVaw2lQSu9u2lRGN25-XQAfUCo&ust=1742552253903000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPjy35-3mIwDFQAAAAAdAAAAABAE`;
  return (
    <>
      <div className="weatherCardContainer ">
        <div className="innerWeatherCardContainer flex gap32">
          <div
            className={`weatherMenuContainer  flexGrow1  ${
              openMenu ? "menuActive" : ""
            }`}
          >
            <LinkCard
              className={
                "weathermenu flex flexDirectionCol itemsCenter justifyBetween"
              }
            >
              <div className=" box1 imgContainer 1">
                <img src={city?.current.condition.icon} alt="weather" />
              </div>
              <div className=" box2 linkContainer  ">
                <ul className="flex gap32 flexDirectionCol ">
                  {/* <li
                    onClick={() =>
                      setShowContents(
                        <ShowContent> No Content or default</ShowContent>
                      )
                    }
                  >
                    🏠 Home
                  </li> */}
                  <li
                    onClick={() =>
                      setShowContents(
                        <ShowContent
                          cityName={city.location.name}
                          state={city.location.region}
                          temprature={city.current.temp_c}
                          sky={city.current.condition.text}
                          windSpeed={city.current.wind_kph}
                          humadity={city.current.humidity}
                        />
                      )
                    }
                  >
                    ✍️ Blogs
                  </li>
                  <li
                    onClick={() =>
                      setShowContents(
                        <ShowContent>Map: No Content</ShowContent>
                      )
                    }
                  >
                    {" "}
                    🌏 Map
                  </li>
                  <li
                    onClick={() =>
                      setShowContents(
                        <ShowContent> Photos: No Content </ShowContent>
                      )
                    }
                  >
                    {" "}
                    🙎‍♂️ Photos
                  </li>
                  <li
                    onClick={() =>
                      setShowContents(
                        <ShowContent> Videos: No Content</ShowContent>
                      )
                    }
                  >
                    {" "}
                    📸 Videos
                  </li>
                  <li
                    onClick={() =>
                      setShowContents(
                        <ShowContent>
                          {" "}
                          Email: <br />
                          sethiyapradeep455@gmail.com
                        </ShowContent>
                      )
                    }
                  >
                    {" "}
                    📞 Phone
                  </li>
                </ul>
              </div>
              <div className=" box3 logoutContainer red ">
                {" "}
                <b>➡️ Log out</b>
              </div>
            </LinkCard>
          </div>
          <div className="weatherContentContainer flexGrow22 flex flexDirectionCol gap32">
            <div>
              {" "}
              <Card className={"weatherHeader flex itemsCenter "}>
                <div className=" box1 flexGrow1  cityName">
                  <b>
                    {loading
                      ? loading
                      : showError
                      ? showError.error?.message || showError.message
                      : !city
                      ? ""
                      : city.location.name + ", " + city.location.country}
                  </b>
                </div>

                <div className=" box2 flexGrow1f weatherInputContainer">
                  <Input
                    className={"weatherInput"}
                    placeholder={"Search city!"}
                    autoFocus={"autofocus"}
                    value={searchCity}
                    onChange={(e) => {
                      setSearchCity(e.target.value);
                      setShowContents("");
                    }}
                    times={
                      <span
                        onClick={() => (setSearchCity(""), setShowContents(""))}
                        className="itag"
                      >
                        &times;
                      </span>
                    }
                  />
                </div>

                <div className=" box3 flexGrow1">
                  <div>
                    <b className="itag bellIcon">🔔</b>
                    <b
                      onClick={() => setOpenMenu(!openMenu)}
                      className="itag menuIcon"
                    >
                      {openMenu ? (
                        <b className="red">&times;</b>
                      ) : (
                        <b>&#9776;</b>
                      )}
                    </b>
                  </div>
                </div>
              </Card>
            </div>
            <div className="weatherContent flexGrow1 flex gap32">
              <div
                className={`weatherContentDemo ${
                  showContents ? "showContents" : ""
                }`}
              >
                <b
                  style={{
                    cursor: "pointer",
                    fontSize: "40px",
                    position: "sticky",
                    top: 0,
                  }}
                  onClick={() => setShowContents("")}
                >
                  &times;
                </b>
                {showContents}
              </div>
              <div
                style={{
                  backgroundSize: "cover",
                  backgroundImage: `url(${bgImage})`,
                }}
                className="box1 flexGrow9  "
              >
                <div className="layerBox1 flex  flexDirectionCol justifyBetween">
                  {/* conditions for show info in page */}

                  {loading ? (
                    <div className=" widthFull heightFull flexAll font48">
                      {loading}
                    </div>
                  ) : showError ? (
                    <div className="errorBox1">
                      <span>
                        {showError.error?.message || showError.message}{" "}
                      </span>{" "}
                    </div>
                  ) : !city ? (
                    <h1 style={{ textAlign: "center" }}> Loading...</h1>
                  ) : (
                    <>
                      <div className="textEnd ">
                        <img src={city?.current.condition.icon} alt="img" />
                        <h2>
                          {city.location.name}
                          <br /> {city.location.country.toUpperCase()}
                        </h2>
                      </div>
                      <div className=" temp1 flex itemsEnd justifyCenter ">
                        <span>{city.current.temp_c}°</span>
                        <b>C</b>
                      </div>
                    </>
                  )}
                  <div className=" box3  flex justifyBetween">
                    <DateTime></DateTime>
                  </div>
                </div>
              </div>
              <div className="box2 flexGrow1 flex flexDirectionCol overFlowHidden">
                {loading ? (
                  <div className=" widthFull heightFull flexAll font48">
                    {loading}
                  </div>
                ) : showError ? (
                  <div className="errorBox1">
                    <span>{showError.error?.message || showError.message}</span>
                  </div>
                ) : !city ? (
                  <h1 style={{ textAlign: "center" }}> Loading...</h1>
                ) : (
                  <>
                    <div
                      style={{
                        backgroundSize: "cover",
                        width: "100%",
                        backgroundImage: `url(${bgImage})`,
                      }}
                      className="flexGrow2 flex justifyCenter   "
                    >
                      {/* <img src={city.current.condition.icon} alt="img" /> */}
                    </div>
                    <div className=" cityNameContainer textCenter">
                      <span>
                        {city.location.name},{city.location.country}{" "}
                      </span>{" "}
                      <img src={city.current.condition.icon} alt="imh" />
                    </div>
                    <div className=" box3 flexGrow1   flex flexDirectionCol justifyAround">
                      <hr />
                      <p>
                        <b>Tempreture </b> <span>{city.current.temp_c}°C</span>
                      </p>
                      <p>
                        <b>Humidity </b> <span>{city.current.humidity}%</span>
                      </p>
                      <p>
                        <b>Visibility </b> <span>{city.current.vis_km} km</span>
                      </p>
                      <p>
                        <b>Wind speed </b>{" "}
                        <span>{city.current.wind_kph} km</span>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Weather;
