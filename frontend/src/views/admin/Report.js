import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import HeaderRStats from "components/Headers/HeaderRStats.js";
import CardTable from "components/Cards/CardTable";
import CardDoughnutChart from "components/Cards/CardDoughnutChart";

export default function Report() {
  // axios.defaults.baseURL = "http://localhost:3333";
  axios.defaults.baseURL = "https://url-shortener-slink.herokuapp.com";

  const [linkTable, setLinkTable] = useState("");
  const [clicks, setClicks] = useState(0);
  const [topCountry, setTopCountry] = useState("");
  const [countryCount, setCountryCount] = useState([]);

  const location = useLocation();
  const urlId = location.state.urlId;

  const getAllMetric = async (metricIds) => {

    await axios
      .get(
        `/api/metrics?${metricIds
          .map((n, index) => `metricIds[${index}]=${n}`)
          .join("&")}`
      )
      .then((res) => {
        setLinkTable(JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {

    const getMetricSummary = async () => {

      await axios
        .get(`/api/urls/${urlId}/summary`)
        .then((res) => {
          let retData = res.data;
          setClicks(retData.clicks);
          setTopCountry(retData.topCountry);
          setCountryCount(retData.countryCount);
          getAllMetric(retData.metricIds);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getMetricSummary();
  }, [urlId]);

  return (
    <>
      <AdminNavbar title="Report" />
      {/* Header */}
      <HeaderRStats clicks={clicks} topCountry={topCountry} />
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <div className="flex flex-wrap">
          <div className="w-full px-4">
            <CardTable linkTable={linkTable} />
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
