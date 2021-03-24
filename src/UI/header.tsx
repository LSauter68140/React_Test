import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyle = makeStyles({
  header: {
    width: "100%",
    height: "190px",
    backgroundColor: "#4f4f4f",
    padding: "30px 25px 25px 80px ",
  },
  h2: {
    color: "#fff",
  },
  p: {
    color: "#d9d9d9",
    marginTop: "20px",
  },
  author: {
    textAlign: "right",
    color: "#989898",
  },
});

const Header = () => {
  const classes = useStyle();

  return (
    <header className={classes.header}>
      <Typography variant="h2" component="h2" className={classes.h2}>
        {" "}
        React Test{" "}
      </Typography>
      <Typography variant="subtitle1" className={classes.p}>
        Display different Movies with filter function
      </Typography>
      <Typography variant="subtitle2" className={classes.author}>
        Sauter Loïc
      </Typography>
    </header>
  );
};
export default Header;
