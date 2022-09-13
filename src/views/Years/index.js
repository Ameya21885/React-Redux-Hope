import { useState, useEffect } from "react";

import CustomizedTable from "../../components/CustomizedTable";
import Total from "../../components/Total";

import CustomizedForm from "../../components/CustomizedForm";
import { useSelector } from "react-redux";

import PeopleIcon from "@mui/icons-material/People";

import Search from "../../components/Search";

import { Box, Container } from "@mui/system";
import { Card, CardContent } from "@mui/material";
import useYearData from "../../api/useYearData";

const header = [
  {
    name: "Id",
    prop: "id",
    type: "number",
  },
  {
    name: "Year",
    prop: "year_name",
    type: "string",
    form: true,
  },
  {
    name: "Sequence",
    prop: "sequence",
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

export default function Years() {
  const yearData = useSelector((state) => state.year);

  const {
    getYears,
    addYear,
    deleteYear,
    updateYearName,
    updateYearLiveStatus,
    updateYearSequence,
  } = useYearData();

  //table state
  const [data, setData] = useState(yearData.years);
  const [editFormData, setEditFormData] = useState({
    university_id: null,
  });
  const [editingField, setEditingField] = useState("");

  const [editIdx, setEditIdx] = useState(-1);

  //search state
  const [query, setQuery] = useState("");
  const [columnQuery, setColumnQuery] = useState("year_name");

  //form state
  const [formData, setFormData] = useState({
    year_name: "",
    sequence: "",
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
    const submitForm = {
      year_name: formData.year_name,
      year_sequence: formData.sequence,
    };
    if(formData.year_name!==""&&formData.sequence!==""){
    addYear(submitForm);
    handleFormClose();}
  };

  const refreshFormData = () => {
    setFormData({
      year_name: "",
      sequence: "",
    });
  };

  useEffect(() => {
    getYears();
    refreshFormData();
  }, []);

  //table functions
  const handleRemove = (i) => {
    const formData = {
      year_id: i.toString(),
    };
    deleteYear(formData);
  };

  const startEditing = (i) => {
    setEditIdx(i);
    setEditFormData({
      year_id: i.toString(),
    });
  };

  const stopEditing = () => {
    Object.keys(editFormData).map((field) => {
      if (field === "year_name") {
        const submitEdit = (({ year_id, year_name }) => ({
          year_id,
          year_name,
        }))(editFormData);
        updateYearName(submitEdit);
      } else if (field === "sequence") {
        const submitEdit = (({ year_id }) => ({ year_id }))(editFormData);
        submitEdit.year_sequence = editFormData.sequence.toString();
        if (submitEdit.year_sequence) {
          updateYearSequence(submitEdit);
        }
      } else if (field === "is_active") {
        const submitEdit = (({ year_id }) => ({ year_id }))(editFormData);
        submitEdit.liveStatusYear = editFormData.is_active;
        updateYearLiveStatus(submitEdit);
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
            name="years"
            count={yearData?.years?.length}
          />
        </Box>
        <Box>
          <CustomizedForm
            heading="add a new year"
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
        {yearData.loading ? (
          <h2>Loading...</h2>
        ) : yearData.error ? (
          <h2>{yearData.error}</h2>
        ) : (
          <CustomizedTable
            handleRemove={handleRemove}
            startEditing={startEditing}
            editIdx={editIdx}
            stopEditing={stopEditing}
            handleChange={handleChange}
            data={
              query
                ? yearData.years?.filter((x) =>
                    x[columnQuery]
                      .toString()
                      .toLowerCase()
                      .includes(lowerCaseQuery)
                  )
                : yearData.years
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
