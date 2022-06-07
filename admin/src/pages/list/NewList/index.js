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
import { createList } from "../../../context/listContext/apiCalls";
import { ListContext } from "context/listContext/ListContext";
import MDButton from "components/MDButton";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
// import { useHistory } from "react-router-dom";

import { createMovie, getMovies } from "../../../context/movieContext/apiCalls";
import { MovieContext } from "../../../context/movieContext/MovieContext";

function NewList() {
  const [list, setList] = useState(null);
  // const history = useHistory()

  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);

  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createList(list, dispatch);
    // history.push("/lists")
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDTypography variant="h1" color="error">
        New List
      </MDTypography>
      <MDBox
        mt={1}
        py={1}
        px={7}
        variant="gradient"
        bgColor="light"
        borderRadius="lg"
        coloredShadow="dark"
      >
        <Grid container spacing={2} rowSpacing={4}>
          <Grid item xs={2}>
            <MDTypography variant="h4" color="inherit">
              Title
            </MDTypography>
          </Grid>
          <Grid item xs={4}>
            <MDInput type="text" placeholder="Title List" name="title" onChange={handleChange} />
          </Grid>

          <Grid item xs={2}>
            <MDTypography variant="h4" color="inherit">
              Type
            </MDTypography>
          </Grid>
          <Grid item xs={4}>
            <MDInput type="text" placeholder="Type List" name="type" onChange={handleChange} />
          </Grid>

          <Grid item xs={2}>
            <MDTypography variant="h4" color="inherit">
              Genre
            </MDTypography>
          </Grid>
          <Grid item xs={4}>
            <MDInput type="text" placeholder="Genre" name="genre" onChange={handleChange} />
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
            <MDButton onClick={handleSubmit}>Create</MDButton>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default NewList;
