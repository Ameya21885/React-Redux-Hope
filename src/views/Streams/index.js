import { useState, useEffect } from "react";
import useStreamData from "../../api/useStreamData"
import useCourseData from "../../api/useCourseData"

import CustomizedTable from "../../components/CustomizedTable";
import Total from "../../components/Total";

import PeopleIcon from "@mui/icons-material/People";

import CustomizedForm from "../../components/CustomizedForm";

import Search from "../../components/Search";
import { useSelector } from "react-redux";
import { Box, Card, CardContent, Container } from "@mui/material";




export default function Streams() {
  
const {getStreams, addStream,deleteStream,updateStreamName,updateStreamCourse,updateStreamLiveStatus} = useStreamData();

const {getCourses} = useCourseData()

  const streamData = useSelector((state) => state.stream);
  const courseData = useSelector((state) => state.course);

  useEffect(() => {
    getStreams();
  }, []);
  //table state
  const [data, setData] = useState(streamData.streams);
  const [editIdx, setEditIdx] = useState(-1);
  const [editFormData, setEditFormData] = useState({
    stream_id: null,
  });
  const [editingField, setEditingField] = useState("");

  //search state
  const [query, setQuery] = useState("");
  const [columnQuery, setColumnQuery] = useState("stream_name");

  //form state
  const [formData, setFormData] = useState({
    course_id: null,
    stream_name: "",
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

    if(formData.stream_name!==""&&!formData.course_id){

    addStream(formData);

    handleFormClose();
    }
  };

  const refreshFormData = () => {
    setFormData({
      course_id: "",
      stream_name: "",
    });
  };

  useEffect(() => {
    getCourses();
    refreshFormData();
  }, []);

  //table functions

  const handleRemove = (i) => {
    const formData = {
      stream_id: i.toString(),
    };
    deleteStream(formData);
  };

  const startEditing = (i) => {
    setEditIdx(i);
    setEditFormData({
      stream_id: i.toString(),
      course_id: [],
    });
  };

  const stopEditing = () => {
    Object.keys(editFormData).map((field) => {
      if (field === "stream_name") {
        const submitEdit = (({ stream_id, stream_name }) => ({
          stream_id,
          stream_name,
        }))(editFormData);
        updateStreamName(submitEdit);
      } else if (field === "course_id") {
        const submitEdit = (({ stream_id }) => ({ stream_id }))(editFormData);
        submitEdit.streams_course = editFormData.course_id;
        if (submitEdit.streams_course) {
          updateStreamCourse(submitEdit);
        }
      } else if (field === "is_active") {
        const submitEdit = (({ stream_id }) => ({ stream_id }))(editFormData);
        submitEdit.liveStatusStream = editFormData.is_active;
        updateStreamLiveStatus(submitEdit);
      }
    });
    setEditFormData({});
    setEditIdx(null);
  };

  const handleChange = (e, name, i) => {
    const { value } = e.target;
    setEditingField(name);
    if (name === "course_id") {
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
      name: "ID",
      prop: "id",
      type: "number",
    },

    {
      name: "Stream Name",
      prop: "stream_name",
      type: "string",
      form: true,
    },
    {
      name: "Course",
      prop: "course_id",
      type: "string",
      derived: true,
      form: true,
      labelProp: "course_name",
      parentData: courseData.courses,
      mapParent: (parentData, id) =>
        parentData.find((p) => p.id === id)?.course_name,
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
            name="Streams"
            count={streamData?.streams?.length}
          />
        </Box>
        <Box>
          <CustomizedForm
            heading="add a new stream"
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
        {streamData.loading ? (
          <h2>Loading...</h2>
        ) : streamData.error ? (
          <h2>{streamData.error}</h2>
        ) : (
          <CustomizedTable
            handleRemove={handleRemove}
            startEditing={startEditing}
            editIdx={editIdx}
            stopEditing={stopEditing}
            handleChange={handleChange}
            data={
              query
                ? streamData.streams?.filter((x) =>
                    x[columnQuery]
                      .toString()
                      .toLowerCase()
                      .includes(lowerCaseQuery)
                  )
                : streamData.streams
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
