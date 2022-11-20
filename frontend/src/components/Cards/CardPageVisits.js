import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// components

export default function CardPageVisits() {
  const [allUrls, setAllUrls] = useState("");

  const getAllUrls = () => {
    axios.defaults.baseURL = "http://localhost:3333";
    axios.get("/api/all").then((res) => setAllUrls(JSON.stringify(res.data)));
  };

  function formatUrlTable(outputResult) {
    if (outputResult !== "") {
      const text = JSON.parse(outputResult);
      console.log(text);
      const block = (
        <>
          <tbody>
            {text.map((res, index) => (
              <tr>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left link-box">
                  <strong>
                  <a className="link-style"
                    href={res.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {res.shortUrl}
                  </a>
                  </strong>

                  <div>
                    <i className="fas fa-arrow-right text-emerald-500 mr-4"></i>
                    <a
                      href={res.origUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {res.origUrl}
                    </a>
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {(res.title) ? res.title : '-'}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {res.clicks}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left link-box">
                  <strong>
                  <Link className="report-link-style" to="/">View Reports</Link>
                  </strong>
                </td>
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

    if (!ignore) getAllUrls();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                All Links
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Url(s)
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Title Tag
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Number of Clicks
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Reports
                </th>
              </tr>
            </thead>
            {/* <tbody> */}
            {formatUrlTable(allUrls)}
            {/* <tr>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  /argon/
                  <div>
                  <i className="fas fa-arrow-right text-emerald-500 mr-4"></i>
                  original url here
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                -
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                number of clicks here
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  location here
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  timestamp here
                </td>
              </tr> */}
            {/* </tbody> */}
          </table>
        </div>
      </div>
    </>
  );
}
