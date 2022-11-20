import React from "react";

// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import CardTable from "components/Cards/CardTable";

export default function Report() {
  return (
    <>
      <AdminNavbar title="Report"/>
      {/* Header */}
      <HeaderStats />
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <div className="flex flex-wrap">
          <div className="w-full px-4">
            <CardTable />
          </div>
        </div>
      </div>
    </>
  );
}
