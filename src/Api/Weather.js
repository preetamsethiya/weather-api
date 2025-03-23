// "https://api.weatherapi.com/v1/current.json?key=8c67d2a1e5af4f9ba6f21705251603 &q=London&aqi=no"

const BASE_URL =
  "https://api.weatherapi.com/v1/current.json?key=8c67d2a1e5af4f9ba6f21705251603";

export const getWeatherDataForCity = (city) => {
  return fetch(`${BASE_URL}&q=${city}&aqi=yes`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};
