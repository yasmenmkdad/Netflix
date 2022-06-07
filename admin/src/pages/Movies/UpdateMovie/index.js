// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

//  React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

//  React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars";
import DataTable from "examples/Tables/DataTable";

import MDInput from "components/MDInput";
import { useContext, useEffect, useState } from "react";
import { MovieContext } from "context/movieContext/MovieContext";
import MDButton from "components/MDButton";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useParams } from "react-router-dom";

import { createMovie, UpdateMovie } from "../../../context/movieContext/apiCalls";
import axios from "axios";
function UpdateMoviePage() {
  const [movie, setMovie] = useState("");
  const [image, setImg] = useState("");
  const [imgTitle, setImgTitle] = useState("");
  const [imgSm, setImgSm] = useState("");
  const [trailer, setTrailer] = useState("");
  const [video, setVideo] = useState("");
  const [uploaded, setUploaded] = useState(0);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [limit, setLimit] = useState("");
  const [isSeries, setIsSeries] = useState("");
  const [duration, setDuration] = useState("");

  const [movieUpdated, setMovieUpdated] = useState({
    image,
    title,
    desc,
    year,
    genre,
    limit,
    isSeries,
    duration,
    trailer,
    imgTitle,
    isSeries,
  });
  let body = {
    image: movieUpdated.image,
    title: movieUpdated.title,
    desc: movieUpdated.desc,
    year: movieUpdated.year,
    genre: movieUpdated.genre,
    limit: movieUpdated.limit,
    isSeries: movieUpdated.isSeries,
    duration: movieUpdated.duration,
    trailer: movieUpdated.trailer,
    imgTitle: movieUpdated.imgTitle,
    video: movieUpdated.video,
  };
  const params = useParams();
  const { dispatch } = useContext(MovieContext);
  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(`/movies/find/${params.movieId}`, {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            // token:
            //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODJiNjI4YzIzNGI0MWE1ODcwNGVkMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NDUzODkwNiwiZXhwIjoxNjU0OTcwOTA2fQ.DnMbAaEizveXtiDA8lU9s02ABUpCBxstqcvWhCaxxno",
          },
        });
        body = res.data;
        console.log(body);
        setMovieUpdated({ ...body });
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("image", image);
    // formData.append("title", title);
    // formData.append("desc", desc);
    // formData.append("year", year);
    // formData.append("imgTitle", imgTitle);
    // formData.append("imgSm", imgSm);
    // formData.append("trailer", trailer);
    // formData.append("genre", genre);
    // formData.append("duration", duration);
    // formData.append("video", video);
    // formData.append("uploaded", uploaded);
    // formData.append("limit", limit);
    // formData.append("isSeries", isSeries);
    // UpdateMovie(params.movieId, formData, dispatch);
    // console.log(2);
    UpdateMovie(params.movieId, movieUpdated, dispatch);

    alert("Updated");
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // const formData = new FormData();
  //   // formData.append("image", image);
  //   // formData.append("title", title);
  //   // formData.append("desc", desc);
  //   // formData.append("year", year);
  //   // formData.append("imgTitle", imgTitle);
  //   // formData.append("imgSm", imgSm);
  //   // formData.append("trailer", trailer);
  //   // formData.append("genre", genre);
  //   // formData.append("duration", duration);
  //   // formData.append("video", video);
  //   // formData.append("uploaded", uploaded);
  //   // formData.append("limit", limit);
  //   // formData.append("isSeries", isSeries);
  //   // UpdateMovie(params.movieId, formData, dispatch);
  //   console.log(2);
  //   UpdateMovie(params.movieId, movieUpdated, dispatch);
  //   // const m = {
  //   //   image: movieUpdated.image,
  //   //   title: title,
  //   //   desc: desc,
  //   //   year: year,
  //   //   imgTitle: imgTitle,
  //   //   imgSm: imgSm,
  //   //   trailer: trailer,
  //   //   genre: genre,
  //   //   duration: duration,
  //   //   video: video,
  //   //   uploaded: uploaded,
  //   //   limit: limit,
  //   //   isSeries: isSeries,
  //   // };
  //   // console.log("m", m);
  //   alert("Updated");
  // };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDTypography variant="h1" color="error">
        Update Movie
      </MDTypography>
      {/* <div className="addProductItem"> */}
      <MDBox
        // mx={2}
        mt={1}
        py={1}
        px={7}
        variant="gradient"
        bgColor="light"
        borderRadius="lg"
        coloredShadow="dark"
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <MDTypography variant="h4" color="inherit">
              Image
            </MDTypography>
          </Grid>
          <Grid item xs={8}>
            <MDInput
              type="file"
              id="image"
              name="image"
              // value={movieUpdated.image}
              onChange={(e) => {
                return setImg(e.target.files[0]);
              }}
            />
          </Grid>

          <Grid item xs={4}>
            <MDTypography variant="h4" color="inherit">
              Title image
            </MDTypography>
          </Grid>
          <Grid item xs={8}>
            <MDInput
              type="text"
              id="imgTitle"
              name="imgTitle"
              value={movieUpdated.imgTitle}
              onChange={(e) => {
                setMovieUpdated({ ...body, imgTitle: e.target.value });

                return setImgTitle(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={4}>
            <MDTypography variant="h4" color="inherit">
              Thumbnail image
            </MDTypography>
          </Grid>
          <Grid item xs={8}>
            <MDInput
              type="text"
              id="imgSm"
              name="imgSm"
              value={movieUpdated.imgSm}
              onChange={(e) => {
                return setImgSm(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={2}>
            <MDTypography variant="h4" color="inherit">
              Title
            </MDTypography>
          </Grid>
          <Grid item xs={4}>
            <MDInput
              type="text"
              placeholder="John Wick"
              name="title"
              value={movieUpdated.title}
              onChange={(e) => {
                setMovieUpdated({ ...body, title: e.target.value });

                return setTitle(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={2}>
            <MDTypography variant="h4" color="inherit">
              Description
            </MDTypography>
          </Grid>
          <Grid item xs={4}>
            <MDInput
              type="text"
              placeholder="description"
              name="desc"
              value={movieUpdated.desc}
              onChange={(e) => {
                setMovieUpdated({ ...body, desc: e.target.value });

                return setDesc(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={2}>
            <MDTypography variant="h4" color="inherit">
              Year
            </MDTypography>
          </Grid>
          <Grid item xs={4}>
            <MDInput
              type="text"
              placeholder="Year"
              name="year"
              value={movieUpdated.year}
              onChange={(e) => {
                setMovieUpdated({ ...body, year: e.target.value });

                return setYear(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={2}>
            <MDTypography variant="h4" color="inherit">
              Genre
            </MDTypography>
          </Grid>
          <Grid item xs={4}>
            <MDInput
              type="text"
              placeholder="Genre"
              name="genre"
              value={movieUpdated.genre}
              onChange={(e) => {
                setMovieUpdated({ ...body, genre: e.target.value });

                return setGenre(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={2}>
            <MDTypography variant="h4" color="inherit">
              Duration
            </MDTypography>
          </Grid>
          <Grid item xs={4}>
            <MDInput
              type="text"
              placeholder="Duration"
              name="duration"
              value={movieUpdated.duration}
              onChange={(e) => {
                setMovieUpdated({ ...body, duration: e.target.value });

                return setDuration(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={2}>
            <MDTypography variant="h4" color="inherit">
              Limit
            </MDTypography>
          </Grid>
          <Grid item xs={4}>
            <MDInput
              type="text"
              placeholder="limit"
              name="limit"
              value={movieUpdated.limit}
              onChange={(e) => {
                setMovieUpdated({ ...body, limit: e.target.value });

                return setLimit(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={4}>
            <MDTypography variant="h4" color="inherit">
              Is Series?
            </MDTypography>
          </Grid>
          <Grid item xs={8}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              {/* is Series */}
              <InputLabel id="isSeriesLabel">is Series?</InputLabel>
              <Select
                labelId="isSeriesLabel"
                name="isSeries"
                id="isSeries"
                value={movieUpdated.isSeries}
                onChange={(e) => {
                  setMovieUpdated({ ...body, isSeries: e.target.value });

                  return setIsSeries(e.target.value);
                }}
                label="Age"
              >
                <MenuItem value={"false"}>No</MenuItem>
                <MenuItem value={"true"}>Yes</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <MDTypography variant="h4" color="inherit">
              Trailer
            </MDTypography>
            <MDInput
              type="text"
              name="trailer"
              value={movieUpdated.trailer}
              onChange={(e) => {
                setMovieUpdated({ ...body, trailer: e.target.value });

                return setTrailer(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <MDTypography variant="h4" color="inherit">
              Video
            </MDTypography>
            <MDInput
              type="text"
              name="video"
              value={movieUpdated.video}
              onChange={(e) => {
                setMovieUpdated({ ...body, video: e.target.value });

                return setVideo(e.target.value);
              }}
            />
          </Grid>

          <Grid item marginX={50}>
            <MDButton onClick={handleSubmit}>Update</MDButton>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default UpdateMoviePage;
