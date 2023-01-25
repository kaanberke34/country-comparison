import { useEffect, useState } from "react";
import AppButton from "./components/AppButton";
import AppCard from "./components/AppCard";
import AppNavbar from "./components/AppNavbar";
import Countries from "./models/Countries";
import Api from "./service/Api";
function App() {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<Countries[]>();
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
  console.log(dataSource);

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
      </div>

      {dataSource?.map(
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
      )}
    </div>
  );
}

export default App;
