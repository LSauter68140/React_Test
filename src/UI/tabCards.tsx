import React, { useEffect, useState } from "react";
import { movies$, movieType } from "../api/movies";
import CardMovie from "./cardMovie";
import { makeStyles } from "@material-ui/core/styles";
import SelectMovieCategory from "./selectCategory";
import Pagination from "./pagination";
import { CircularProgress } from "@material-ui/core";

const useStyle = makeStyles({
  root: {
    width: "80%",
    margin: " 10px auto",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  select: {
    margin: "10px 0px 15px 35px",
  },
  loading: {
    margin: "50px auto",
    width: "max-content",
  },
});

type likeDataType = {
  id: string;
  like: boolean;
  dislike: boolean;
};
const TabCards = () => {
  const classes = useStyle();
  const [movieData, setMovieData] = useState<null | movieType[]>(null);
  const [movieDataFilter, setMovieDataFilter] = useState<null | movieType[]>(
    null
  );
  const [movieDataPagination, setMovieDataPagination] = useState<
    null | movieType[]
  >(null);
  const [category, setCategory] = useState<string[]>([]);
  const [allLikeData, setAllLikeData] = useState<likeDataType[]>([]);

  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

  !movieData &&
    movies$.then((resolve) => {
      setMovieData(resolve);
      const temp: likeDataType[] = [];
      resolve.forEach(({ id }) => {
        temp.push({ id: id, like: false, dislike: false });
      });
      setAllLikeData(temp);
    });

  const deleteItem = (idMovieToDelete: string) => {
    if (!movieData) {
      return;
    }
    setMovieData(movieData.filter(({ id }) => idMovieToDelete !== id));
    setAllLikeData(allLikeData.filter(({ id }) => id !== idMovieToDelete));
  };

  const getCategory = () => {
    if (!movieData) {
      return;
    }
    const getUniqueCat = [
      ...new Set(movieData.map(({ category }) => category)),
    ];
    setCategory(getUniqueCat);
  };

  // when we click on the like button
  const updateLikeState = (idMovie: string) => {
    setAllLikeData(
      allLikeData.map((movie) => {
        if (movie.id === idMovie) {
          if (movie.dislike) {
            updateDislikeCount(idMovie, -1);
            movie.dislike = false;
          }
          movie.like = !movie.like;
          updateLikeCount(idMovie, movie.like ? 1 : -1);
        }
        return movie;
      })
    );
  };
  // when we click on the dislike button
  const updateDislikeState = (idMovie: string) => {
    setAllLikeData(
      allLikeData.map((movie) => {
        if (movie.id === idMovie) {
          if (movie.like) {
            updateLikeCount(idMovie, -1);
            movie.like = false;
          }
          movie.dislike = !movie.dislike;
          updateDislikeCount(idMovie, movie.dislike ? 1 : -1);
        }
        return movie;
      })
    );
  };
  const updateLikeCount = (idMovieToUpdate: string, like: number) => {
    if (!movieData) {
      return;
    }
    setMovieData(
      movieData.map((movie) => {
        if (movie.id === idMovieToUpdate) {
          movie.likes += like;
        }
        return movie;
      })
    );
  };
  const updateDislikeCount = (idMovieToUpdate: string, dislike: number) => {
    if (!movieData) {
      return;
    }
    setMovieData(
      movieData.map((movie) => {
        if (movie.id === idMovieToUpdate) {
          movie.dislikes += dislike;
        }
        return movie;
      })
    );
  };
  const findLikeMovie = (idMovie: string) => {
    const isFind = allLikeData.find(({ id }) => id === idMovie);
    if (isFind !== undefined) {
      return isFind;
    } else {
      return { id: 0, like: false, dislike: false };
    }
  };

  // for the category selected
  useEffect(() => {
    // we update the filter data to display
    if (!movieData) {
      return;
    }
    getCategory();
    if (selectedCategories.length === 0) {
      setMovieDataFilter(movieData);
    } else {
      setMovieDataFilter(
        movieData.filter(({ category }) =>
          selectedCategories.includes(category)
        )
      );
      // we filter also the selected categories
      if (selectedCategories.every((cat) => !category.includes(cat))) {
        setSelectedCategories(
          selectedCategories.filter((cat) => category.includes(cat))
        );
      }
    }
  }, [selectedCategories, movieData]);

  // for the pagination
  useEffect(() => {
    if (!movieDataFilter) return;

    setMovieDataPagination(
      movieDataFilter.filter(
        (movie, index) =>
          index >= page * rowsPerPage &&
          index < page * rowsPerPage + rowsPerPage
      )
    );
  }, [page, rowsPerPage, movieDataFilter]);

  // delete the empty page
  useEffect(() => {
    if (!movieDataPagination) return;

    if (movieDataPagination && movieDataPagination.length === 0 && page > 0) {
      setPage(page - 1);
    }
  }, [movieDataPagination]);

  if (movieData == null) {
    return (
      <div className={classes.loading}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <>
      <section className={classes.select}>
        {" "}
        {category.length > 0 && (
          <SelectMovieCategory
            categories={category}
            setSelectedCat={setSelectedCategories}
            catSelected={selectedCategories}
          />
        )}
      </section>
      <section className={classes.root}>
        {" "}
        {movieDataPagination &&
          movieDataPagination.map((movie, index) => (
            <CardMovie
              movie={movie}
              deleteItem={deleteItem}
              key={index}
              likeState={{
                likeFunction: updateLikeState,
                disLikeFunction: updateDislikeState,
                likeStateValue: findLikeMovie(movie.id).like,
                dislikeStateValue: findLikeMovie(movie.id).dislike,
              }}
            />
          ))}
      </section>
      <section>
        {movieDataFilter && (
          <Pagination
            nbrElement={movieDataFilter.length}
            page={page}
            rowsPerPage={rowsPerPage}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
          />
        )}
      </section>
    </>
  );
};
export default TabCards;
