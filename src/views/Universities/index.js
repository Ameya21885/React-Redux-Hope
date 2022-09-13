import React, { useState, useEffect } from "react";

import CustomizedTable from "../../components/CustomizedTable";
import Total from "../../components/Total";

import CustomizedForm from "../../components/CustomizedForm";

import PeopleIcon from "@mui/icons-material/People";

import Search from "../../components/Search";
import { useSelector } from "react-redux";
import { Box, Container } from "@mui/system";
import { Card, CardContent } from "@mui/material";
import useUniversityData from "../../api/useUniversityData";

const header = [
  {
    name: "Id",
    prop: "id",
    type: "number",
  },
  {
    name: "University Name",
    prop: "university_name",
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

export default function Universities() {
  const universityData = useSelector((state) => state.university);

  const {
    getUniversities,
    addUniversity,
    updateUniversityName,
    deleteUniversity,
    updateUniversityLiveStatus,
  } = useUniversityData();

  //table state
  const [editFormData, setEditFormData] = useState({
    university_id: null,
  });
  const [editingField, setEditingField] = useState("");

  const [editIdx, setEditIdx] = useState(-1);

  //search state
  const [query, setQuery] = useState("");
  const [columnQuery, setColumnQuery] = useState("university_name");

  //form state
  const [formData, setFormData] = useState({
    id: 0,
    college_name: "",
    is_active: 0,
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
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData,"  : submitted")
    if(formData.college_name===""){
    addUniversity(formData);
    handleFormClose();}
  };

  const refreshFormData = () => {
    setFormData({
      id: null,
      college_name: "",
      is_active: 0,
    });
  };

  useEffect(() => {
    getUniversities();
    refreshFormData();
  }, []);

  //table functions
  const handleRemove = (i) => {
    const formData = {
      university_id: i ,
    };
    console.log(formData)
    deleteUniversity(formData);
  };

  const startEditing = (i) => {
    setEditIdx(i);
    setEditFormData({
      university_id: i.toString(),
    });
  };

  const stopEditing = () => {
    Object.keys(editFormData).map((field) => {
      if (field === "university_name") {
        const submitEdit = (({ university_id, university_name }) => ({
          university_id,
          university_name,
        }))(editFormData);
        updateUniversityName(submitEdit);
      } else if (field === "is_active") {
        const submitEdit = (({ university_id }) => ({ university_id }))(
          editFormData
        );
        submitEdit.liveStatusUniversity = editFormData.is_active;
        updateUniversityLiveStatus(submitEdit);
      }
    });

    setEditFormData({});

    setEditIdx(null);
  };

  const handleChange = (e, name, i) => {
    const { value } = e.target;

    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const lowerCaseQuery = query.toLowerCase();

  return (
    <Container maxWidth={false}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Total
            Icon={PeopleIcon}
            name="universities"
            count={universityData?.universities?.length}
          />
        </Box>
        <Box>
          <CustomizedForm
            heading="Add a new University"
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
        {universityData.loading ? (
          <h2>Loading...</h2>
        ) : universityData.error ? (
          <h2>{universityData.error}</h2>
        ) : (
          <CustomizedTable
            handleRemove={handleRemove}
            startEditing={startEditing}
            editIdx={editIdx}
            stopEditing={stopEditing}
            handleChange={handleChange}
            data={
              query
                ? universityData.universities?.filter((x) =>
                    x[columnQuery]
                      .toString()
                      .toLowerCase()
                      .includes(lowerCaseQuery)
                  )
                : universityData.universities
            }
            header={header}
            editingField={editingField}
            setEditingField={setEditingField}
            editFormData={editFormData}
          />
        )}
      </Box>
    </Container>
  );
}
