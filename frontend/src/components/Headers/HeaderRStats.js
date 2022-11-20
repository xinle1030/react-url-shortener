import React from "react";

// components

import CardStats from "components/Cards/CardStats.js";

export default function HeaderDStats() {
  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-6/12 px-4">
              <strong>
                  <a className="link-title-style"
                    href="https://github.com/xinle1030/react-url-shortener/blob/main/frontend/src/views/admin/Dashboard.js"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    somelink
                  </a>
                  </strong>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-6/12 px-4">
                <CardStats
                  statSubtitle="CLICKS"
                  statTitle="123"
                  // statDescripiron="Since last month"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-6/12 px-4">
                <CardStats
                  statSubtitle="TOP COUNTRY"
                  statTitle="country"
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
