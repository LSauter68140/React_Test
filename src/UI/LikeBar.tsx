import React from "react";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const LineProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 5,
      margin: "5px 10px 10px",
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: "#539d9d",
    },
  })
)(LinearProgress);

const LikeBar = ({ likes, dislikes }: { likes: number; dislikes: number }) => {
  const barValue = (likes / (likes + dislikes)) * 100;

  return <LineProgress variant="determinate" value={barValue} />;
};

export default LikeBar;
