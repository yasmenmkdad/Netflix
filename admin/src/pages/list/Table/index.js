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
import { ListContext } from "context/listContext/ListContext";
import { useContext, useEffect } from "react";
import { deleteList, getLists } from "context/listContext/apiCalls";

import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { Icon } from "@mui/material";
import MDButton from "components/MDButton";
import { Link } from "react-router-dom";

function TableLists() {
  const { lists, dispatch } = useContext(ListContext);

  useEffect(() => {
    getLists(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteList(id, dispatch);
    alert("deleted");
  };
  const columns = [
    { Header: "title", accessor: "title", width: "30%", align: "left" },
    { Header: "type", accessor: "type", width: "20%", align: "left" },
    { Header: "genre", accessor: "genre", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];
  let rows = lists.map((item) => {
    return {
      title:  (
        <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
          {item.title}
        </MDTypography>
      ),
      type: (
        <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
          {item.type}
        </MDTypography>
      ),
      genre: (
        <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
          {item.genre}
        </MDTypography>
      ),
      action: (
        <MDBox lineHeight={1} textAlign="left">
          <Link to={"/List/" + item._id} state={{ List: item}}>
            <MDButton>
              <Icon color="info">edit</Icon>
            </MDButton>
          </Link>
          <MDButton onClick={() => handleDelete(item._id)}>
            <Icon color="error">deleteIcon</Icon>
          </MDButton>
        </MDBox>
      )
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
                bgColor="dark"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Lists Table
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

export default TableLists;
