import { useEffect, useState } from "react";
import AppAlert from "./components/alerts/AppAlert";
import AppButton from "./components/buttons/AppButton";
import AppCard from "./components/cards/AppCard";
import AppNavbar from "./components/navbar/AppNavbar";
import LoadingSpinner from "./components/loadingSpinners/LoadingSpinner";
import AppPagination from "./components/paginations/AppPagination";
import Countries from "./models/Countries";
import Api from "./service/Api";

function App() {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<Countries[]>();
  const [countriesData, setCountriesData] = useState<Countries[]>();
  const [filterSelections] = useState({
    Country: "Lithuania",
    Region: "Oceania",
    Area: "",
    Independent: "",
  });
  const [selections, setSelections] = useState({
    Country: "-",
    Region: "-",
    Area: "-",
    Independent: "-",
  });
  const [order, setOrder] = useState("DESC");
  const [count, setCount] = useState(0);
  const PER_PAGE = 10;
  const [isActive, setIsActive] = useState(0);
  const [checkfilterByArea, setCheckfilterByArea] = useState(true);
  const [checkfilterByRegion, setCheckfilterByRegion] = useState(true);
  const [checkfilterByAreaAndRegion, setCheckfilterByAreaAndRegion] =
    useState(true);

  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    try {
      const countries = await Api.get();
      typeof countries != "string"
        ? [setDataSource(countries), setCountriesData(countries)]
        : null;
      setCount(Math.ceil(countries?.length / PER_PAGE));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {}, [dataSource, order]);

  const sortByCountry = () => {
    if (order === "ASC") {
      const sortedASC = dataSource?.sort((a, b) =>
        a.name.localeCompare(b.name, "en", {})
      );
      setDataSource(sortedASC);
      setOrder("DESC");
    } else if (order === "DESC") {
      const sortedDESC = dataSource?.sort((a, b) =>
        b.name.localeCompare(a.name, "en", {})
      );
      setDataSource(sortedDESC);
      setOrder("ASC");
    }
  };

  const filterByArea = () => {
    if (checkfilterByArea) {
      const filteredName = countriesData?.filter((item) => {
        if (item.name.includes(filterSelections.Country)) return true;
      });
      if (filteredName != undefined) {
        const filtered = () =>
          dataSource?.filter((item) => {
            if (item.area <= filteredName[0]?.area) return true;
          });
        setDataSource(filtered);
        setCount(0);
      }
      setSelections((stateItems) => ({ ...stateItems, Country: "Lithuania" }));
      setCheckfilterByArea(!checkfilterByArea);
    } else {
      setCheckfilterByArea(!checkfilterByArea);
      handleClear();
    }
  };

  const filterByOceania = () => {
    if (checkfilterByRegion) {
      const filtered = () =>
        dataSource?.filter((item) => {
          if (item.region.includes(filterSelections.Region)) return true;
        });
      setDataSource(filtered);
      setCount(0);
      setSelections((stateItems) => ({ ...stateItems, Region: "Oceania" }));
      setCheckfilterByRegion(!checkfilterByRegion);
    } else {
      setCheckfilterByRegion(!checkfilterByRegion);
      handleClear();
    }
  };

  const filterByAreaAndRegion = () => {
    if (checkfilterByAreaAndRegion) {
      if (checkfilterByArea) {
        const filteredName = countriesData?.filter((item) => {
          if (item.name.includes(filterSelections.Country)) return true;
        });
        if (filteredName != undefined) {
          const filtered = () =>
            dataSource?.filter((item) => {
              if (
                item.region.includes(filterSelections.Region) &&
                item.area <= filteredName[0]?.area
              )
                return true;
            });
          setDataSource(filtered);
          setCount(0);
          setSelections((stateItems) => ({
            ...stateItems,
            Country: "Lithuania",
            Region: "Oceania",
          }));
          setCheckfilterByAreaAndRegion(!checkfilterByAreaAndRegion);
        }
      }
    } else {
      setCheckfilterByAreaAndRegion(!checkfilterByAreaAndRegion);
      handleClear();
    }
  };

  const handleClear = () => {
    getCountries();
    setOrder("DESC");
    setSelections({
      Country: "",
      Region: "",
      Area: "",
      Independent: "",
    });
    setIsActive(0);
    setCount(0);
    setCheckfilterByArea(true);
    setCheckfilterByRegion(true);
    setCheckfilterByAreaAndRegion(true);
  };

  const handlePagination = async (event: { currentTarget: { id: string } }) => {
    const paginationStart = parseInt(event.currentTarget.id.split("#")[1]);
    setDataSource(
      countriesData?.slice(
        (paginationStart - 1) * PER_PAGE,
        paginationStart * PER_PAGE
      )
    ),
      setIsActive(paginationStart),
      setCheckfilterByArea(false),
      setCheckfilterByRegion(false),
      setCheckfilterByAreaAndRegion(false);
  };

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div className="App">
      <AppNavbar />
      {count === 0 ? null : (
        <>
          <AppAlert
            key={"showPagination"}
            text={"You can only navigate when no filter applied!"}
          />
          <AppPagination
            count={count}
            onClick={handlePagination}
            activeId={isActive}
          />
        </>
      )}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <AppButton
          onClick={sortByCountry}
          className="text-xl normal-case"
          text={"Sort By Name " + order}
          color="primary"
        />
        <AppButton
          disable={
            checkfilterByRegion && checkfilterByAreaAndRegion ? false : true
          }
          onClick={filterByArea}
          className="text-xl normal-case"
          text={
            !checkfilterByRegion &&
            !checkfilterByArea &&
            !checkfilterByAreaAndRegion
              ? "Not Usable"
              : checkfilterByArea
              ? "Filter By Area"
              : "Unfilter By Area"
          }
          color={checkfilterByArea ? "success" : "warning"}
        />
        <AppButton
          disable={
            checkfilterByArea && checkfilterByAreaAndRegion ? false : true
          }
          onClick={filterByOceania}
          className="text-xl normal-case"
          text={
            !checkfilterByRegion &&
            !checkfilterByArea &&
            !checkfilterByAreaAndRegion
              ? "Not Usable"
              : checkfilterByRegion
              ? "Filter By Region"
              : "Unfilter By Region"
          }
          color={checkfilterByRegion ? "success" : "warning"}
        />
        <AppButton
          disable={checkfilterByRegion && checkfilterByArea ? false : true}
          onClick={filterByAreaAndRegion}
          className="text-xl normal-case"
          text={
            !checkfilterByRegion &&
            !checkfilterByArea &&
            !checkfilterByAreaAndRegion
              ? "Not Usable"
              : checkfilterByAreaAndRegion
              ? "Filter By Area And Region"
              : "Unfilter By Area And Region"
          }
          color={checkfilterByAreaAndRegion ? "success" : "warning"}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <AppButton
          onClick={handleClear}
          className="text-xl normal-case"
          text={"Clear Selections"}
          color="error"
        />
      </div>
      {dataSource?.length === 0 ? (
        <AppAlert
          key={"appAlertTrue"}
          text={
            "There is no data to show, clear your selections! Current selections: Country: " +
            Object.values(selections)[0] +
            ", Region: " +
            Object.values(selections)[1] +
            ", Order: " +
            order
          }
        />
      ) : (
        [
          <AppAlert
            key={"appAlertFalse"}
            text={
              "Current selections: Country: " +
              Object.values(selections)[0] +
              ", Region: " +
              Object.values(selections)[1] +
              ", Order: " +
              order
            }
          />,
          dataSource?.map(
            (
              row: {
                name: string | undefined;
                region: string | undefined;
                area: number | undefined;
                independent: boolean | undefined;
              },
              index: number
            ) => (
              <AppCard
                key={"Card#" + index}
                id={"Card#" + index}
                name={row?.name}
                region={row?.region}
                area={row?.area}
                independent={row?.independent}
              />
            )
          ),
        ]
      )}
    </div>
  );
}
export default App;
