import { SetStateAction, useCallback, useEffect, useState } from "react";
import AppAlert from "./components/alerts/AppAlert";
import AppButton from "./components/AppButton";
import AppCard from "./components/AppCard";
import AppNavbar from "./components/AppNavbar";
import Countries from "./models/Countries";
import Api from "./service/Api";

function App() {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<Countries[]>();
  const [selections, setSelections] = useState({
    Country: "",
    Region: "",
    Area: "",
    Independent: "",
  });

  const [order, setOrder] = useState("DESC");

  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    try {
      const countries = await Api.get();
      typeof countries != "string" ? setDataSource(countries) : null;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {}, [dataSource, order]);

  const sortTable = () => {
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
    const filteredName = dataSource?.filter((item) => {
      if (item.name.includes("Lithuania")) return true;
    });
    if (filteredName != undefined) {
      console.log(filteredName[0]?.area);
      const filtered = () =>
        dataSource?.filter((item) => {
          if (item.area <= filteredName[0]?.area) return true;
        });
      setDataSource(filtered);
      setSelections((stateItems) => ({ ...stateItems, Country: "Lithuania" }));
      console.log(dataSource);
    }
    console.log(dataSource);
  };

  const filterByOcenia = () => {
    const filtered = () =>
      dataSource?.filter((item) => {
        if (item.region.includes("Oceania")) return true;
      });
    setDataSource(filtered);
    setSelections((stateItems) => ({ ...stateItems, Region: "Oceania" }));

    console.log(dataSource);
  };

  const handleClear = () => {
    getCountries();
    setOrder("ASC");
    setSelections({
      Country: "",
      Region: "",
      Area: "",
      Independent: "",
    });
  };
  console.log(dataSource);
  console.log(selections);
  console.log(Object.values(selections));

  return (
    <div className="App">
      <AppNavbar />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <AppButton
          onClick={sortTable}
          className="text-xl normal-case"
          text={"Sort By " + order}
          color="success"
        />

        <AppButton
          onClick={filterByArea}
          className="text-xl normal-case"
          text={"Filter By Area"}
          color="success"
        />
        <AppButton
          onClick={filterByOcenia}
          className="text-xl normal-case"
          text={"Filter By Region"}
          color="success"
        />
        <AppButton
          onClick={handleClear}
          className="text-xl normal-case"
          text={"Clear Selections"}
          color="success"
        />
      </div>
      {dataSource?.length === 0 ? (
        <AppAlert
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
                key={"Card" + index}
                id={"Card" + index}
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
