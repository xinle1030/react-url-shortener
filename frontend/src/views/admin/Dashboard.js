import React from "react";

// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";

export default function Dashboard() {
  return (
    <>
      <AdminNavbar title="Link Dashboard"/>
      {/* Header */}
      <HeaderStats />
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 xl:mb-0 px-4">
            <CardPageVisits />
          </div>
        </div>
      </div>
    </>
  );
}
