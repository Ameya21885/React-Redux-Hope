import React, { useState, useEffect } from "react";

import Latest from "./Latest";
import Piechart from "./Piechart";
import Overview from "../../components/Overview";

import SchoolIcon from "@mui/icons-material/School";
import ClassIcon from "@mui/icons-material/Class";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import axios from "axios";
import { useTheme } from "@emotion/react";
import { Container } from "@mui/system";
import { Box, Grid } from "@mui/material";

export default function Dashboard() {
  const [numbers, setNumbers] = useState({});
  const [error, setError] = useState("");
  
  const theme = useTheme();
  const styles = {
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: "100%",
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3),
    },
  };

  useEffect(() => {
    let universityUrl = axios.get(
      `${process.env.REACT_APP_API_URL}/countUniversities`
    );
    let collegeUrl = axios.get(
      `${process.env.REACT_APP_API_URL}/countColleges`
    );
    let courseUrl = axios.get(`${process.env.REACT_APP_API_URL}/countCourses`);
    let studentUrl = axios.get(
      `${process.env.REACT_APP_API_URL}/countRegisteredStudents`
    );
    let activeUniUrl = axios.get(
      `${process.env.REACT_APP_API_URL}/activeUniversities`
    );

    Promise.all([
      universityUrl,
      collegeUrl,
      courseUrl,
      studentUrl,
      activeUniUrl,
    ])
      .then(([university, college, course, student, active]) => {
        setNumbers({
          universityCount: university.data.data,
          collegeCount: college.data.data,
          courseCount: course.data.data,
          studentCount: student.data.data,
          activeUniversityCount: active.data.data,
        });
      })
      .catch((error) => setError(error.message));
  }, []);

  return (
    <Box sx={styles.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Overview
              name="Universities"
              number={numbers.universityCount}
              icon={SchoolIcon}
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Overview
              name="Colleges"
              number={numbers.collegeCount}
              icon={ClassIcon}
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Overview
              name="Courses"
              number={numbers.courseCount}
              icon={AssignmentIcon}
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Overview
              name="Students"
              number={numbers.studentCount}
              icon={PeopleAltIcon}
            />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <Latest />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <Piechart
              percent={numbers.activeUniversityCount}
              title="Active Universities"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
