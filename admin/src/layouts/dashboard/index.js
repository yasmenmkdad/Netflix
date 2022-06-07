// @mui material components
import Grid from "@mui/material/Grid";

//  React components
import MDBox from "components/MDBox";

//  React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards";

import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";

//GetMovie
import { getMovies } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";

import { getLists } from "../../context/listContext/apiCalls";
import { ListContext } from "../../context/listContext/ListContext";

function Dashboard() {
  const [userStats, setUserStats] = useState({
    MonthName: [""],
    TotalUser: [0],
  });

  //Get Lists
  const { lists, dispatch: dispatchLists } = useContext(ListContext);
  useEffect(() => {
    getLists(dispatchLists);
  }, [dispatchLists]);

  //Get Movies
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);
  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  const MONTHS = useMemo(
    () => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Dec"],
    []
  );
  // Get Months and Total users
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("/users/stats", {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            // token:
            //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTZmYzQ2NDk0Mjc3MTYwNDg4MmMxNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYyNTgzMjMxMSwiZXhwIjoxNjI2MjY0MzExfQ.ATXV-1TTWIGyVBttTQSf0erRWjsgZ8jHQv1ZsUixbng",
          },
        });
        const statsList = res.data.sort(function (a, b) {
          return a._id - b._id;
        });
        statsList.map((item) => {
          console.log("item:", item);
          setUserStats((prev) => {
            return {
              MonthName: [...prev.MonthName, MONTHS[item._id - 1]],
              TotalUser: [...prev.TotalUser, item.total],
            };
          });
        });
      } catch (err) {
        console.log("error:", err);
      }
    };
    getStats();
  }, []);

  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get("/users?new=true", {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            // token:
            //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODJiNjI4YzIzNGI0MWE1ODcwNGVkMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NDUzODkwNiwiZXhwIjoxNjU0OTcwOTA2fQ.DnMbAaEizveXtiDA8lU9s02ABUpCBxstqcvWhCaxxno",
          },
        });
        setNewUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNewUsers();
  }, []);

  console.log(userStats);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="weekend"
                title="Total users"
                count={newUsers.length}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Users in This Month"
                count={userStats.TotalUser[userStats.TotalUser.length - 1]}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="warning"
                icon="movieIcon"
                title="Movies"
                count={movies.length}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard color="dark" icon="list" title="Lists" count={lists.length} />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={9} marginX={2}>
          <Grid container columns={12} alignItems="center" justifyContent="center">
            {/* <Grid item xs={2} md={6} lg={4}></Grid> */}

            <Grid item xs={12} md={10} lg={10}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="info"
                  title="Users"
                  description="Users has been logged last period"
                  date="just updated"
                  chart={userStats}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
