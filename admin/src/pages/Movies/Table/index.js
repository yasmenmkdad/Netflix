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

// Data
import { MovieContext } from "context/movieContext/MovieContext";
import { useContext, useEffect } from "react";
import { deleteMovie, getMovies } from "context/movieContext/apiCalls";

import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { Icon } from "@mui/material";
import MDButton from "components/MDButton";
import { Link } from "react-router-dom";

function TableMovie() {
  const { movies, dispatch } = useContext(MovieContext);
  // console.log("dispatch movie",dispatch);

  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteMovie(id, dispatch);
    alert("deleted");
  };

  const MovieTitle = ({ image, name, genre, imagTitle }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar 
      src={imagTitle.includes("http") ? imagTitle : `http://localhost:4000/${image}`} 
      name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{genre}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const columns = [
    { Header: "title", accessor: "title", width: "20%", align: "left" },
    { Header: "desc", accessor: "desc", width: "30%", align: "left" },
    { Header: "year", accessor: "year", align: "center" },
    { Header: "genre", accessor: "genre", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];
  let rows = movies.map((item) => {
    // console.log("item",item);

    return {
      title: <MovieTitle      
      image={item.image}
      imagTitle={item.imgTitle}
      name={item.title}
      genre={item.genre} />,
      desc: (
        <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
          {item.desc}
        </MDTypography>
      ),
      year: (
        <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
          {item.year}
        </MDTypography>
      ),
      genre: (
        <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
          {item.genre}
        </MDTypography>
      ),
      action: (
        <MDBox lineHeight={1} textAlign="left">
          <Link to={"/movie/" + item._id} state={{ movie: item }}>
            <MDButton>
              <Icon color="info">edit</Icon>
            </MDButton>
          </Link>
          <MDButton onClick={() => handleDelete(item._id)}>
            <Icon color="error">deleteIcon</Icon>
          </MDButton>
        </MDBox>
      ),
    };
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="error"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Movies Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default TableMovie;
