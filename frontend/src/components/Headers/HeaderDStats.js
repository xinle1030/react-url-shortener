import React, { useState, useEffect } from "react";
import axios from "axios";
import CardStats from "components/Cards/CardStats.js";

export default function HeaderDStats() {
  const [totalClicks, setTotalClicks] = useState(0);
  const [topLink, setTopLink] = useState("");
  const [topCountry, setTopCountry] = useState("");

  const callSummaryApi = () => {
    getUrlSummary();
    getMetricsSummary();
  }

  const getUrlSummary = async () => {
    axios.defaults.baseURL = process.env.REACT_APP_BASE;
    await axios
      .get("/api/urls/all/summary")
      .then((res) => {
        setTotalClicks(res.data.totalClicks);
        setTopLink(res.data.topLink);
        getMetricsSummary();
      });
  };

  const getMetricsSummary = async () => {
    axios.defaults.baseURL = process.env.REACT_APP_BASE;
    await axios
      .get("/api/metrics/all/summary")
      .then((res) => {
        setTopCountry(res.data.topCountry);
      });
  };

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      callSummaryApi();
    }
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <CardStats
                  statSubtitle="TOTAL CLICKS"
                  statTitle={totalClicks.toString()}
                  // statDescripiron="Since last month"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <CardStats
                  statSubtitle="TOP LINK(S)"
                  statTitle={(topLink.length > 0) ? topLink : "-"}
                  // statDescripiron="Since last week"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <CardStats
                  statSubtitle="TOP COUNTRY"
                  statTitle={(topCountry.length > 0) ? topCountry : "-"}
                  // statDescripiron="Since yesterday"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
