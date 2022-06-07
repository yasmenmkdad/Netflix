import axios from "axios";
import {
  createMovieFailure,
  createMovieStart,
  createMovieSuccess,
  deleteMovieFailure,
  deleteMovieStart,
  deleteMovieSuccess,
  getMoviesFailure,
  getMoviesStart,
  getMoviesSuccess,
  updateMovieFailure,
  updateMovieStart,
  updateMovieSuccess,
} from "./MovieActions";

export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart());
  try {
    const res = await axios.get("/movies", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getMoviesSuccess(res.data));
  } catch (err) {
    dispatch(getMoviesFailure());
  }
};
///////////////////////////////////////////////////////

//create
export const createMovie = async (movie, dispatch) => {
  dispatch(createMovieStart());
  try {
    const res = await axios.post("/movies", movie, {
      headers: {
        "Content-Type": "multipart/form-data",
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        // token:
        //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODJiNjI4YzIzNGI0MWE1ODcwNGVkMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NDUzODkwNiwiZXhwIjoxNjU0OTcwOTA2fQ.DnMbAaEizveXtiDA8lU9s02ABUpCBxstqcvWhCaxxno",
      },
    });
    console.log("Hello");
    console.log(res);
    dispatch(createMovieSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(createMovieFailure());
  }
};

//delete
export const deleteMovie = async (id, dispatch) => {
  dispatch(deleteMovieStart());
  try {
    await axios.delete("/movies/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        // token:
        //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODJiNjI4YzIzNGI0MWE1ODcwNGVkMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NDUzODkwNiwiZXhwIjoxNjU0OTcwOTA2fQ.DnMbAaEizveXtiDA8lU9s02ABUpCBxstqcvWhCaxxno",
      },
    });
    dispatch(deleteMovieSuccess(id));
  } catch (err) {
    dispatch(deleteMovieFailure());
  }
};

//Update
export const UpdateMovie = async (id, movie, dispatch) => {
  dispatch(updateMovieStart());
  console.log("Update", id, movie);
  try {
    const res = await axios.put("/movies/" + id, movie, {
      headers: {
        "Content-Type": "multipart/form-data",
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        // token:
        //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODJiNjI4YzIzNGI0MWE1ODcwNGVkMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NDUzODkwNiwiZXhwIjoxNjU0OTcwOTA2fQ.DnMbAaEizveXtiDA8lU9s02ABUpCBxstqcvWhCaxxno",
      },
    });
    console.log("Update success");

    dispatch(updateMovieSuccess(res.data));
  } catch (err) {
    console.log("Error Update");
    dispatch(updateMovieFailure());
  }
};

// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODJiNjI4YzIzNGI0MWE1ODcwNGVkMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NDUzODkwNiwiZXhwIjoxNjU0OTcwOTA2fQ.DnMbAaEizveXtiDA8lU9s02ABUpCBxstqcvWhCaxxno
