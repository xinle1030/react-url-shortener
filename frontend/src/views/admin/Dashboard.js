import React, { useState, useEffect } from "react";
import axios from "axios";

// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import HeaderDStats from "components/Headers/HeaderDStats.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardDoughnutChart from "components/Cards/CardDoughnutChart";

export default function Dashboard() {

  // axios.defaults.baseURL = "http://localhost:3333";
  axios.defaults.baseURL = "https://url-shortener-slink.herokuapp.com";

  const [totalClicks, setTotalClicks] = useState(0);
  const [topLink, setTopLink] = useState("");
  const [topCountry, setTopCountry] = useState("");
  const [countryCount, setCountryCount] = useState([]);

  const getUrlSummary = async () => {
    
    await axios.get("/api/urls/all/summary").then((res) => {
      let retData = res.data;
      setTotalClicks(retData.totalClicks);
      setTopLink(retData.topLink);
      setTopCountry(retData.topCountry);
      setCountryCount(retData.countryCount);
    });
  };

  useEffect(() => {
    getUrlSummary();
  }, []);

  return (
    <>
      <AdminNavbar title="Link Dashboard" />
      {/* Header */}
      <HeaderDStats
        totalClicks={totalClicks}
        topLink={topLink}
        topCountry={topCountry}
      />
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 xl:mb-0 px-4">
            <CardPageVisits />
          </div>
        </div>
        <div className="flex flex-wrap mt-4">
          <div className="w-full px-4">
            <CardDoughnutChart countryCount={countryCount} />
          </div>
        </div>
      </div>
    </>
  );
}
