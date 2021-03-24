import React from "react";
import { makeStyles, Theme } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";

const UseStyles = makeStyles((theme: Theme) => ({
  footer: {
    width: "100%",
    backgroundColor: "#f2f2f2",
    borderTop: `1px solid #393939`,
    padding: "10px 0",
    textAlign: "center",
  },
  linkContent: {
    margin: "auto",
    width: "max-content",
  },
  footerCtn: {
    display: "block",
    width: "max-content",
    margin: "30px 10px 10px",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.secondary,
    transition: "all .3s",
    "&:hover": {
      color: theme.palette.text.primary,
      transition: "all .3s",
    },
  },
}));

const footerLink = [
  { title: <GitHubIcon />, path: "https://github.com/LSauter68140" },
];

const Footer = () => {
  const classes = UseStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.linkContent}>
        {footerLink.map(({ title, path }) => (
          <a href={path} target="_blank" className={classes.link}>
            {title}
          </a>
        ))}
      </div>
      <div>
        ©2021 - All rights reserved <br /> Test for Particeep
      </div>
    </footer>
  );
};

export default Footer;
