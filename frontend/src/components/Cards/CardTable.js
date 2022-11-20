import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

// components

export default function CardTable() {
  const [visitInfo, setVisitInfo] = useState([]);
  const location = useLocation();
  const urlId = location.state.urlId;

  const getAllVisitInfo = async (visitInfoIds) => {
    axios.defaults.baseURL = "http://localhost:3333";

    axios
      .get(
        `/visitInfos?${visitInfoIds
          .map((n, index) => `visitInfoIds[${index}]=${n}`)
          .join("&")}`
      )
      .then((res) => {
        setVisitInfo(JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function formatLinkTable(outputResult) {
    console.log(outputResult);
    if (outputResult && outputResult.length > 0) {
      const arr = JSON.parse(outputResult);

      const block = (
        <>
          <tbody>
            {arr.map((res, index) => (
              <tr key={index}>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{res.timestamp ? res.timestamp : "-"}</td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{res.country ? res.country : "-"}</td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{res.city ? res.city : "-"}</td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">[{res.location.coordinates[1]}, {res.location.coordinates[0]}]</td>
              </tr>
            ))}
          </tbody>
        </>
      );
      return block;
    } else {
      return "";
    }
  }

  useEffect(() => {
    let ignore = false;

    const getAllVisitInfoIds = async () => {
      axios.defaults.baseURL = "http://localhost:3333";
      await axios.get(`/api/${urlId}`).then((res) => {
        const visitInfoIds = res.data.visits;
        getAllVisitInfo(visitInfoIds);
      });
    };

    if (!ignore) {
      getAllVisitInfoIds();
    }
    return () => {
      ignore = true;
    };
  }, [urlId]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Link Report
                <h6>{urlId}</h6>
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                >
                  Timestamp
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                >
                  Country
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                >
                  City
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                >
                  Geolocation Coordinates
                </th>
              </tr>
            </thead>
            {/* <tbody> */}
            {formatLinkTable(visitInfo)}
          </table>
        </div>
      </div>
    </>
  );
}
