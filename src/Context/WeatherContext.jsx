import { createContext, useContext, useEffect, useState } from "react";
import { getWeatherDataForCity } from "../Api/Weather";

const WeatherContext = createContext(null);

// customhook for use weather context

export const useWeather = () => {
  return useContext(WeatherContext);
};

// weather provider

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState(null);
  const [showError, setShowError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchCity, setSearchCity] = useState("");
  const [current, setCurrent] = useState(null);

  // fetching weather data

  useEffect(() => {
    const fetchWeatherData = async (cityName) => {
      const res = await getWeatherDataForCity(cityName);
      if (!res?.location?.name) {
        setShowError(res);
        setCity(null);
        setLoading(false);
      } else {
        setCity(res);
        setLoading(false);
        setShowError(null);
      }
    };

    if (navigator.geolocation && searchCity === "") {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCurrent(`${pos.coords.latitude},${pos.coords.longitude}`);

          setLoading(false);
        },
        (error) => {
          setShowError(error);
          setLoading(false);
        }
      );
      if (current) {
        fetchWeatherData(current);
      }
    } else {
      fetchWeatherData(searchCity);
    }
  }, [searchCity, setShowError, setLoading, current]);

  return (
    <WeatherContext.Provider
      value={{
        city,
        showError,
        setShowError,
        loading,
        setLoading,
        searchCity,
        setSearchCity,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const ShowContent = ({
  cityName,
  state,
  temprature,
  sky,
  windSpeed,
  humadity,
  children,
}) => {
  const time = new Date();

  const currentTime = time.toLocaleDateString("utc", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return children ? (
    <h1 className="innerWeatherContentDemo childrenCon">{children}</h1>
  ) : (
    <>
      {" "}
      <div className="innerWeatherContentDemo">
        <h3 className="weatherOverview">
          focusing on the conditions in {cityName}, {state} on {currentTime}:{" "}
        </h3>
        <h2 className="curentCondition">Current condition:</h2>
        <ul className="curentConditionList">
          <li>
            <p>
              <b> Temperature:</b> Expect a pleasant day with temperature{" "}
              {temprature}.
            </p>
          </li>

          {temprature > 30 && (
            <li>
              <p>
                <b> Sky:</b> Mostly sunny with a few scattered clouds, offering
                ample sunshine throughout the day.
              </p>
            </li>
          )}

          <li>
            <p>
              <b>Wind: </b> In {cityName} currently wind speed is {windSpeed}{" "}
              km/h.
            </p>
          </li>
          <li>
            <p>
              <b> Humidity:</b> Moderate humidity levels, around {humadity}%,
              should keep things comfortable.
            </p>
          </li>
        </ul>
        <h2>Forcast:</h2>
        {temprature > 30 && (
          <>
            {" "}
            <h2 className="subheading">
              <b>Today:</b>
            </h2>
            <p>Expect a warm and sunny day with light winds and clear skies.</p>
          </>
        )}
        {/* <h2 className="subheading">
          <b>Tonight:</b>
        </h2>
        <p>
          The evening will be clear with a slight decrease in temperature,
          around 20°C.
        </p> */}
        {temprature > 30 && (
          <>
            <h2 className="subheading"> Tips for Staying Comfortable:</h2>
            <p>
              {" "}
              Sun Protection: Wear sunscreen and hats to protect yourself from
              the sun's rays. Hydration: Stay hydrated by drinking plenty of
              water throughout the day. Outdoor Activities: Enjoy the pleasant
              weather with outdoor activities like hiking, biking, or simply
              relaxing in the park.
            </p>
          </>
        )}
      </div>
    </>
  );
};
