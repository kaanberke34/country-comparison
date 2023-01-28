import { Pagination } from "react-daisyui";
import PaginationButton from "../buttons/PaginationButton";
interface IAppPaginationProps {
  count: number;
  onClick: (event: { currentTarget: { id: string } }) => {};
  activeId: number;
}
function AppPagination(props: IAppPaginationProps) {
  const { count, onClick, activeId } = props;
  return (
    <Pagination style={{ width: "100%", overflow: "scroll" }}>
      {Array.from(Array(count), (e, i) => {
        return (
          <PaginationButton
            activeId={activeId}
            key={"paginationButtonKey#" + i}
            id={"paginationButtonID#" + (i + 1)}
            onClick={onClick}
            text={(i + 1).toString()}
          />
        );
      })}
    </Pagination>
  );
}

export default AppPagination;
