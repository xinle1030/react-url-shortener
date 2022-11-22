import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import HeaderRStats from "components/Headers/HeaderRStats.js";
import CardTable from "components/Cards/CardTable";
import CardLineChart from "components/Cards/CardLineChart";

export default function Report() {
  const [linkTable, setLinkTable] = useState("");
  const [clicks, setClicks] = useState(0);
  const [topCountry, setTopCountry] = useState("");

  const location = useLocation();
  const urlId = location.state.urlId;

  const getAllMetric = async (metricIds) => {
    axios.defaults.baseURL = process.env.REACT_APP_BASE;

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

  const getMetricSummary = async (metricIds) => {
    axios.defaults.baseURL = process.env.REACT_APP_BASE;

    await axios
      .get(
        `/api/metrics/summary?${metricIds
          .map((n, index) => `metricIds[${index}]=${n}`)
          .join("&")}`
      )
      .then((res) => {
        setTopCountry(res.data.topCountry);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let ignore = false;

    const getAllMetricIds = async () => {
      axios.defaults.baseURL = process.env.REACT_APP_BASE;

      await axios.get(`/api/urls/${urlId}`).then((res) => {
        setClicks(res.data.clicks);
        const metricIds = res.data.metrics;
        getAllMetric(metricIds);
        getMetricSummary(metricIds);
      });
    };

    if (!ignore) {
      getAllMetricIds();
    }
    return () => {
      ignore = true;
    };
  }, [urlId]);

  return (
    <>
      <AdminNavbar title="Report" />
      {/* Header */}
      <HeaderRStats clicks={clicks} topCountry={topCountry}/>
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <div className="flex flex-wrap">
          <div className="w-full px-4">
            <CardTable linkTable={linkTable}/>
          </div>
        </div>
        <div className="flex flex-wrap mt-4">
          <div className="w-full px-4">
            <CardLineChart />
          </div>
        </div>
      </div>
    </>
  );
}
