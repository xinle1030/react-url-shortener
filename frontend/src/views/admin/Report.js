import React from "react";

// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import HeaderRStats from "components/Headers/HeaderRStats.js";
import CardTable from "components/Cards/CardTable";
import CardLineChart from "components/Cards/CardLineChart";

export default function Report() {
  return (
    <>
      <AdminNavbar title="Report" />
      {/* Header */}
      <HeaderRStats />
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <div className="flex flex-wrap">
          <div className="w-full px-4">
            <CardTable />
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
