import CardStats from "components/Cards/CardStats.js";
import PropTypes from "prop-types";

export default function HeaderDStats({
  totalClicks,
  topLink,
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

HeaderDStats.defaultProps = {
  totalClicks: 0,
  topLink: "",
  topCountry: ""
};

HeaderDStats.propTypes = {
  totalClicks: PropTypes.number,
  topLink: PropTypes.string,
  topCountry: PropTypes.string
};