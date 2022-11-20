import React from "react";

// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import HeaderDStats from "components/Headers/HeaderDStats.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardLineChart from "components/Cards/CardLineChart";

export default function Dashboard() {

  return (
    <>
      <AdminNavbar title="Link Dashboard"/>
      {/* Header */}
      <HeaderDStats />
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 xl:mb-0 px-4">
            <CardPageVisits />
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
