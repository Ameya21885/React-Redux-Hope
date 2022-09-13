import { useState, useEffect } from "react";
import CustomizedTable from "../../components/CustomizedTable";
import Total from "../../components/Total";
import PeopleIcon from "@mui/icons-material/People";

import CustomizedForm from "../../components/CustomizedForm";

import Search from "../../components/Search";
import { useSelector } from "react-redux";
import { Box, Container } from "@mui/system";
import { Card, CardContent } from "@mui/material";
import useCollegeData from "../../api/useCollegeData";
import useUniversityData from "../../api/useUniversityData";

export default function Colleges() {
  const universityData = useSelector((state) => state.university);
  const collegeData = useSelector((state) => state.college);
  const { getUniversities } = useUniversityData();
  const {
    getColleges,
    addCollege,
    deleteCollege,
    updateCollegeName,
    updateCollegeLiveStatus,
    updateCollegeUniversity,
  } = useCollegeData();

  useEffect(() => {
    getUniversities();
    getColleges();
    refreshFormData();
  }, []);

  //table state
  const [editIdx, setEditIdx] = useState(-1);
  const [editFormData, setEditFormData] = useState(null);
  const [editingField, setEditingField] = useState("");

  //search state
  const [query, setQuery] = useState("");
  const [columnQuery, setColumnQuery] = useState("college_name");

  //form state
  const [formData, setFormData] = useState({
    university_id: [],
    college_name: "",
  });

  const [formOpen, setFormOpen] = useState(false);

  //form functions
  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === "university_id") {
      setFormData({
        ...formData,
        [name]: e.target.type === "checkbox" ? e.target.checked : value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const submitForm = {
      college_name: formData.college_name,
      university_id: [...formData.university_id].join(","),
    };
    if(formData.college_name!=""&&submitForm.university_id!=""){
    addCollege(submitForm);
    handleFormClose();}
  };

  const refreshFormData = () => {
    setFormData({
      university_id: [],
      college_name: "",
    });
  };

  //options for form and table
  const header = [
    {
      name: "Id",
      prop: "id",
      type: "number",
      form: false,
    },
    {
      name: "University",
      prop: "university_id",
      type: "string",
      form: true,
      derived: true,
      labelProp: "university_name",
      parentData: universityData.universities,
      mapParent: (parentData, ids) =>
        ids
          ?.split(",")
          .map(
            (c) =>
              parentData.find((p) => p.id.toString() === c)?.university_name
          )
          .join(","),
      multiple: true,
    },
    {
      name: "College Name",
      prop: "college_name",
      type: "string",
      form: true,
    },
    {
      name: "Status",
      prop: "is_active",
      type: "select",

      options: [
        { name: "active", value: 1 },
        { name: "inactive", value: 0 },
      ],
      mapParent: (options, val) => {
        return options.find((chunk) => chunk.value === val).name;
      },
    },
  ];

  //table functions
  const handleRemove = (i) => {
    const formData = {
      college_id: i,
    };
    deleteCollege(formData);
  };

  const startEditing = (i) => {
    setEditIdx(i);
    setEditFormData({
      college_id: i.toString(),
      university_id: [],
    });
  };

  const stopEditing = () => {
    Object.keys(editFormData).map((field) => {
      if (field === "college_name") {
        const submitEdit = (({ college_id, college_name }) => ({
          college_id,
          college_name,
        }))(editFormData);
        updateCollegeName(submitEdit);
      } else if (field === "university_id") {
        const submitEdit = (({ college_id }) => ({ college_id }))(editFormData);
        submitEdit.university_ids = editFormData.university_id.join(",");
        if (submitEdit.university_ids) {
          updateCollegeUniversity(submitEdit);
        }
      } else if (field === "is_active") {
        const submitEdit = (({ college_id }) => ({ college_id }))(editFormData);
        submitEdit.liveStatusCollege = editFormData.is_active;
        updateCollegeLiveStatus(submitEdit);
      }
    });

    setEditFormData({});

    setEditIdx(null);
  };

  const handleChange = (e, name, i) => {
    const { value } = e.target;
    setEditingField(name);
    if (name === "university_id") {
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

  const lowerCaseQuery = query.toLowerCase();
  return (
    <Container maxWidth={false}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Total
            Icon={PeopleIcon}
            name="Colleges"
            count={collegeData?.colleges?.length}
          />
        </Box>
        <Box>
          <CustomizedForm
            heading="add a new college"
            formOpen={formOpen}
            formData={formData}
            handleFormChange={handleFormChange}
            handleFormSubmit={handleFormSubmit}
            handleFormOpen={handleFormOpen}
            handleFormClose={handleFormClose}
            header={header}
            parentData={universityData.universities}
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
        {collegeData.loading ? (
          <h2>Loading...</h2>
        ) : collegeData.error ? (
          <h2>{collegeData.error}</h2>
        ) : (
          <CustomizedTable
            handleRemove={handleRemove}
            startEditing={startEditing}
            editIdx={editIdx}
            stopEditing={stopEditing}
            handleChange={handleChange}
            data={
              query
                ? collegeData.colleges?.filter((x) =>
                    x[columnQuery]
                      .toString()
                      .toLowerCase()
                      .includes(lowerCaseQuery)
                  )
                : collegeData.colleges
            }
            parentData={universityData.universities}
            editingField={editingField}
            setEditingField={setEditingField}
            header={header}
            editFormData={editFormData}
          />
        )}
        {/* {console.log(collegeData.colleges)} */}
      </Box>
    </Container>
  );
}
