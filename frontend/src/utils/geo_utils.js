const successCallBack = async (position) => {
  const { latitude, longitude } = position.coords;
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.REACT_APP_OPENCAGE_API_KEY}`
  );
  const userLocation = await response.json();
  return userLocation;
};

const failureCallBack = (error) => {
  console.log("Error ===>", error);
  return null;
};

export const getUserLocation = () => {
  if (window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(
      successCallBack,
      failureCallBack
    );
  }
};
