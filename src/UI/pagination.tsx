import React from "react";
import TablePagination from "@material-ui/core/TablePagination";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  root: {
    margin: "40px auto 0px",
    width: "max-content",
  },
});

export default function Pagination({
  nbrElement,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
}: {
  nbrElement: number;
  page: number;
  rowsPerPage: number;
  setPage: (a: number) => void;
  setRowsPerPage: (a: number) => void;
}) {
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const classes = useStyle();
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <TablePagination
        rowsPerPageOptions={[4, 8, 12]}
        count={nbrElement}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
          inputProps: { "aria-label": "rows per page" },
          native: true,
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}
