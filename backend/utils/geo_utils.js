import dotenv from "dotenv";
dotenv.config({ path: "../config/.env" });

const successCallBack = async (position) => {
  const { latitude, longitude } = position.coords;
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.GEO_API_KEY}`
  );
  const userLocation = await response.json();
  setUserData(userLocation.results[0]);
};

const failureCallBack = (error) => {
  console.log("Error ===>", error);
};

export const getUserLocation = () => {
  if (window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(
      successCallBack,
      failureCallBack
    );
  }
};
