import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { movieType } from "../api/movies";
import LikeBar from "./LikeBar";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: "300px",
    width: "100%",
    float: "left",
    margin: "15px 10px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    margin: "auto",
    width: "max-content",
  },
});
type cardMovieType = {
  movie: movieType;
  deleteItem: (id: string) => void;
  likeState: {
    likeFunction: (id: string) => void;
    disLikeFunction: (id: string) => void;
    likeStateValue: boolean;
    dislikeStateValue: boolean;
  };
};
export default function CardMovie({
  movie,
  deleteItem,
  likeState,
}: cardMovieType) {
  const classes = useStyles();
  const { id, title, category, likes, dislikes } = movie;
  const {
    likeFunction,
    disLikeFunction,
    likeStateValue,
    dislikeStateValue,
  } = likeState;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          variant="h5"
          component="h2"
          color="textSecondary"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {category}
        </Typography>
      </CardContent>
      <Grid container spacing={2}>
        <Grid item xs={5} />
        <Grid item xs={6}>
          {" "}
          <LikeBar likes={likes} dislikes={dislikes} />
        </Grid>
      </Grid>
      <CardActions>
        <Grid container>
          <Grid item xs={4}>
            <Button size="small" onClick={() => deleteItem(id)}>
              Delete
            </Button>
          </Grid>
          <Grid item xs={8}>
            <div className={classes.button}>
              <Button
                size="small"
                style={{ color: likeStateValue ? "#1986be" : "inherit" }}
                onClick={() => {
                  likeFunction(id);
                }}
              >
                {" "}
                <ThumbUpAltIcon /> {likes}
              </Button>
              <Button
                size="small"
                style={{ color: dislikeStateValue ? "#b80202" : "inherit" }}
                onClick={() => {
                  disLikeFunction(id);
                }}
              >
                {" "}
                <ThumbDownIcon /> {dislikes}
              </Button>
            </div>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
