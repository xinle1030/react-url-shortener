import React from "react";
import PropTypes from "prop-types";

// components

import CardStats from "components/Cards/CardStats.js";

export default function HeaderRStats({
  clicks,
  topCountry
}) {
  
  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-6/12 px-4">
                <CardStats
                  statSubtitle="CLICKS"
                  statTitle={clicks.toString()}
                  // statDescription="Since last month"
                  statIconName="far fa-chart-bar"  
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-6/12 px-4">
                <CardStats
                  statSubtitle="TOP COUNTRY"
                  statTitle={(topCountry && topCountry.length > 0) ? topCountry : "-"}
                  // statDescription="Since yesterday"
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

HeaderRStats.defaultProps = {
  clicks: 0,
  topCountry: ""
};

HeaderRStats.propTypes = {
  clicks: PropTypes.number,
  topCountry: PropTypes.string,
};
