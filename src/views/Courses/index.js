import { useState, useEffect } from "react";

import CustomizedTable from "../../components/CustomizedTable";
import Total from "../../components/Total";
import CustomizedForm from "../../components/CustomizedForm";
import PeopleIcon from "@mui/icons-material/People";
import Search from "../../components/Search";
import { useSelector } from "react-redux";
import { Box, Container } from "@mui/system";
import { Card, CardContent } from "@mui/material";
import useCourseData from "../../api/useCourseData";
import useYearData from "../../api/useYearData";


export default function Courses() {

 const {getCourses,addCourse,deleteCourse,updateCourseLiveStatus,updateCourseName,updateCourseYear} = useCourseData()

 const {getYears} = useYearData()

  useEffect(() => {
    getYears();
    getCourses();
  }, []);
  const courseData = useSelector((state) => state.course);
  const yearData = useSelector((state) => state.year);
  
  //table state
  const [editIdx, setEditIdx] = useState(-1);
  const [editFormData, setEditFormData] = useState({
    course_id: null,
  });
  const [editingField, setEditingField] = useState("");

  //search state
  const [query, setQuery] = useState("");
  const [columnQuery, setColumnQuery] = useState("course_name");

  //form state
  const [formData, setFormData] = useState({
    year_ids: [],
    course_name: "",
  });
  const [formOpen, setFormOpen] = useState(false);

  //form functions

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    refreshFormData();
    setFormOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const submitForm = {
      ...formData,
      year_ids: formData.year_ids.join(","),
    };
    if(formData.course_name!==""&&formData.year_ids!==[]){
    addCourse(submitForm);

    handleFormClose();}
  };

  const refreshFormData = () => {
    setFormData({
      year_ids: [],
      course_name: "",
    });
  };

  useEffect(() => {
    refreshFormData();
  }, []);

  //table functions

  const handleRemove = (i) => {
    const deleteData = {
      course_id: i.toString(),
    };
    deleteCourse(deleteData);
  };

  const startEditing = (i) => {
    setEditIdx(i);
    setEditFormData({
      course_id: i.toString(),
      year_ids: [],
    });
  };

  const stopEditing = () => {
    Object.keys(editFormData).map((field) => {
      if (field === "course_name") {
        const submitEdit = (({ course_id, course_name }) => ({
          course_id,
          course_name,
        }))(editFormData);
        updateCourseName(submitEdit);
      } else if (field === "year_ids") {
        const submitEdit = {
          course_id: editFormData.course_id.toString(),
          courses_year: editFormData.year_ids.join(","),
        };

        if (submitEdit.courses_year) {
          updateCourseYear(submitEdit);
        }
      } else if (field === "is_active") {
        const submitEdit = {
          course_id: editFormData.course_id.toString(),
          liveStatusCourse: editFormData.is_active.toString(),
        };
        updateCourseLiveStatus(submitEdit);
      }
    });

    setEditFormData({});

    setEditIdx(null);
  };

  const handleChange = (e, name, i) => {
    const { value } = e.target;
    setEditingField(name);
    if (name === "year_ids") {
      setEditFormData({
        ...editFormData,
        [name]: e.target.type === "checkbox" ? e.target.checked : value,
      });
    } else {
      setEditFormData({
        ...editFormData,
        [name]: value,
      });
    }
  };
  const header = [
    {
      name: "Id",
      prop: "id",
      type: "number",
    },
    {
      name: "Year",
      prop: "year_ids",
      type: "string",
      labelProp: "year_name",
      derived: true,
      parentData: yearData.years,
      mapParent: (parentData, ids) =>
        ids
          ?.split(",")
          .map((c) => parentData.find((p) => p.id.toString() === c)?.year_name)
          .join(","),
      multiple: true,
      form: true,
    },
    {
      name: "Course Name",
      prop: "course_name",
      type: "string",
      form: true,
    },

    {
      name: "Is Active",
      prop: "is_active",
      type: "select",
      options: [
        { name: "active", value: 1 },
        { name: "inactive", value: 0 },
      ],
      mapParent: (options, val) =>
        options.find((chunk) => chunk.value === val).name,
    },
  ];

  const lowerCaseQuery = query.toLowerCase();
  return (
    <Container maxWidth={false}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Total
            Icon={PeopleIcon}
            name="Courses"
            count={courseData?.courses?.length}
          />
        </Box>
        <Box>
          <CustomizedForm
            heading="add a new course"
            formOpen={formOpen}
            formData={formData}
            handleFormChange={handleFormChange}
            handleFormSubmit={handleFormSubmit}
            handleFormOpen={handleFormOpen}
            handleFormClose={handleFormClose}
            header={header}
          />
        </Box>
      </Box>

      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <Search
                query={query}
                columnQuery={columnQuery}
                setQuery={setQuery}
                setColumnQuery={setColumnQuery}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Box mt={3}>
        {courseData.loading ? (
          <h2>Loading...</h2>
        ) : courseData.error ? (
          <h2>{courseData.error}</h2>
        ) : (
          <CustomizedTable
            handleRemove={handleRemove}
            startEditing={startEditing}
            editIdx={editIdx}
            stopEditing={stopEditing}
            handleChange={handleChange}
            data={
              query
                ? courseData.courses?.filter((x) =>
                    x[columnQuery]
                      .toString()
                      .toLowerCase()
                      .includes(lowerCaseQuery)
                  )
                : courseData.courses
            }
            editingField={editingField}
            setEditingField={setEditingField}
            header={header}
            editFormData={editFormData}
          />
        )}
      </Box>
    </Container>
  );
}
