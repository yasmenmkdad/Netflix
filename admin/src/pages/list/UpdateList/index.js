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
import { ListContext } from "context/listContext/ListContext";
import MDButton from "components/MDButton";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { createList, UpdateList } from "context/listContext/apiCalls";
import { useLocation } from "react-router-dom";

import { createMovie, getMovies } from "../../../context/movieContext/apiCalls";
import { MovieContext } from "../../../context/movieContext/MovieContext";
function UpdateListPage() {
  const location = useLocation();
  const [List, setList] = useState(location.state.List);

  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);

  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  const { dispatch } = useContext(ListContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...List, [e.target.name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // console.log("List", List);
    UpdateList(List, dispatch);
    alert("Updated");
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...List, [e.target.name]: value });
    console.log("List", List);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDTypography variant="h1" color="error">
        Updated List
      </MDTypography>
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
          <Grid item xs={2}>
            <MDTypography variant="h4" color="inherit">
              Title
            </MDTypography>
          </Grid>
          <Grid item xs={4}>
            <MDInput
              type="text"
              value={List?.title}
              placeholder="Title List"
              name="title"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={2}>
            <MDTypography variant="h4" color="inherit">
              Type
            </MDTypography>
          </Grid>
          <Grid item xs={4}>
            <MDInput
              type="text"
              value={List?.type}
              placeholder="Type List"
              name="type"
              onChange={handleChange}
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
              value={List?.genre}
              name="genre"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={2}>
            <MDTypography variant="h4" color="inherit">
              Content
            </MDTypography>
          </Grid>
          <Grid item xs={4}>
            <select multiple name="content" onChange={handleSelect} style={{ height: "280px" }}>
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </Grid>

          <Grid item marginX={50}>
            <MDButton onClick={handleUpdate}>Update</MDButton>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default UpdateListPage;
