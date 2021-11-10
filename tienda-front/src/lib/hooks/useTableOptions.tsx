import { Dispatch, SetStateAction, useState } from "react";

type DataTableOptionsProps = {
  initialPageSize?: number;
};

type DataTableOptionsState<T> = {
  totalRows: number;
  pageSize: number;
  pageIndex: number;

  rowClicked: T | null;
};

export type DataTableOptions<T> = {
  offset: number;
  limit: number;
  pageIndex: number;
  pageSize: number;
  totalRows: number;
  searchString: string;
  setSearchString: Dispatch<SetStateAction<string>>;
  rowClicked: T | null;

  setTotalRows: (newTotalRows: number) => void;
  resetPageIndex: () => void;
  setPageIndex: (newPageIndex: number) => void;
  setPageSize: (newPageSize: number) => void;
  setRowClicked: (value: T) => void;
};

const useTableOptions = <T,>({
  initialPageSize = 10,
}: DataTableOptionsProps): DataTableOptions<T> => {
  const [searchString, setSearchString] = useState("");
  const [state, setState] = useState<DataTableOptionsState<T>>({
    pageSize: initialPageSize,
    pageIndex: 0,
    totalRows: 0,
    rowClicked: null,
  });

  const setTotalRows = (newTotalRows: number) =>
    setState(old => ({ ...old, totalRows: newTotalRows }));

  const setPageIndex = (newPageIndex: number) =>
    setState(old => ({ ...old, pageIndex: newPageIndex }));

  const setPageSize = (newPageSize: number) => setState(old => ({ ...old, pageSize: newPageSize }));
  const setRowClicked = (value: T) => setState(old => ({ ...old, rowClicked: value }));

  const resetPageIndex = () => setState(old => ({ ...old, pageIndex: 0 }));

  return {
    offset: state.pageIndex * state.pageSize,
    limit: state.pageSize,
    pageIndex: state.pageIndex,
    pageSize: state.pageSize,
    totalRows: state.totalRows,
    rowClicked: state.rowClicked,

    setTotalRows,
    resetPageIndex,
    setPageIndex,
    setPageSize,
    searchString,
    setSearchString,
    setRowClicked,
  };
};

export default useTableOptions;
