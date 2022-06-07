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
import { useContext, useState } from "react";
import { MovieContext } from "context/movieContext/MovieContext";
import MDButton from "components/MDButton";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

// import storage from "../../../firebase";
import { createMovie } from "../../../context/movieContext/apiCalls";

function NewMovie() {
  const [movie, setMovie] = useState(null);
  const [image, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [year, setYear] = useState(null);
  const [genre, setGenre] = useState(null);
  const [limit, setLimit] = useState(null);
  const [isSeries, setIsSeries] = useState(null);
  const [duration, setDuration] = useState(null);

  const { dispatch } = useContext(MovieContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("year", year);
    formData.append("imgTitle", imgTitle);
    formData.append("imgSm", imgSm);
    formData.append("trailer", trailer);
    formData.append("genre", genre);
    formData.append("duration", duration);
    formData.append("video", video);
    formData.append("uploaded", uploaded);
    formData.append("limit", limit);
    formData.append("isSeries", isSeries);

    createMovie(formData, dispatch);
    alert("Added successfully");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDTypography variant="h1" color="error">
        New Movie
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
              onChange={(e) => {
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
              onChange={(e) => {
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
              onChange={(e) => {
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
              onChange={(e) => {
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
              onChange={(e) => {
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
              onChange={(e) => {
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
              onChange={(e) => {
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
                onChange={(e) => {
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
              onChange={(e) => {
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
              onChange={(e) => {
                return setVideo(e.target.value);
              }}
            />
          </Grid>

          <Grid item marginX={50}>
            <MDButton onClick={handleSubmit}>Create</MDButton>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default NewMovie;
