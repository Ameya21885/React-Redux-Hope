import { useState, useEffect } from "react";
import CustomizedTable from "../../components/CustomizedTable";
import Total from "../../components/Total";
import CustomizedForm from "../../components/CustomizedForm";
import Search from "../../components/Search";
import PeopleIcon from "@mui/icons-material/People";
import {
  Box,
  Card,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useSelector } from "react-redux";
import useVideoCategoryData from "../../api/useVideoCategoryData";
import useVideoData from "../../api/useVideoData";

export default function Videos() {
  const videoData = useSelector((state) => state.video);
  const videoCategoryData = useSelector((state) => state.videoCategory);

  const { getVideoCategories, addVideoCategory } = useVideoCategoryData();
  const { getVideos, addVideo } = useVideoData();

  //table state
  const [editIdx, setEditIdx] = useState(-1);

  //search state
  const [query, setQuery] = useState("");
  const [columnQuery, setColumnQuery] = useState("video_name");
  const [videoCategory, setVideoCategory] = useState(null);

  //form state
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [categoryFormData, setCategoryFormData] = useState({});

  useEffect(() => {
    getVideoCategories();
  }, []);

  //table functions
  const handleRemove = (i) => {
    const formData = {
      video_id: i,
    };
    // deleteUniversity(formData)
  };

  const startEditing = (i) => {
    setEditIdx(i);
  };

  const stopEditing = () => {
    setEditIdx(-1);
  };

  const handleChange = (e, name, i) => {
    const { value } = e.target;
    // setData([...data].map((row, j) => (j === i ? { ...row, [name]: value } : row)))
  };

  //form functions
  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  const handleCategoryFormChange = (e) => {
    const { name, value } = e.target;
    setCategoryFormData({
      ...categoryFormData,
      [name]: value,
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFormSubmit = (e) => {
    let submitForm = {};
    e.preventDefault();
    Object.keys(formData).forEach((key) => {
      if (key === "video_url") {
        submitForm.course_video = formData[key];
      } else {
        submitForm[key] = formData[key];
      }
    });
    addVideo(submitForm);
    handleFormClose();
  };

  const handleCategoryFormSubmit = (e) => {
    e.preventDefault();
    setVideoCategory(e.target.value);
    addVideoCategory(categoryFormData);
    refreshcategoryFormData();
    handleFormClose();
  };

  const refreshcategoryFormData = () => {
    setCategoryFormData({
      category_name: "",
    });
  };

  const refreshFormData = () => {
    setCategoryFormData({});
  };

  //table and form headers
  const header = [
    {
      name: "Id",
      prop: "id",
      type: "number",
    },
    {
      name: "Category",
      prop: "category_id",
      labelProp: "category_name",
      type: "string",
      derived: true,
      parentData: videoCategoryData.videoCategories,
      form: true,
      mapParent: (options, val) =>
        options.find((chunk) => chunk.id === val)?.category_name,
    },
    {
      name: "Video",
      prop: "video_url",
      type: "link",
      direct: true,
      form: true,
    },
    {
      name: "Start Time",
      prop: "start_time",
      type: "string",
      form: true,
    },
    {
      name: "End Time",
      prop: "end_time",
      type: "string",
      form: true,
    },
    {
      name: "Total Duration",
      prop: "total_duration",
      type: "string",
      form: true,
    },
    {
      name: "Author Name",
      prop: "author_name",
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
    },
  ];

  const categoryHeader = [
    {
      name: "Category",
      prop: "category_name",
      form: true,
    },
  ];

  const lowerCaseQuery = query.toLowerCase();

  return (
    <Container maxWidth={false}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Total
            Icon={PeopleIcon}
            name="Videos"
            count={videoData?.videos?.length}
          />
        </Box>
        <Box display="flex">
          <Box m={2}>
            <CustomizedForm
              heading="add a new category"
              message="New Category"
              formOpen={formOpen}
              formData={categoryFormData}
              handleFormChange={handleCategoryFormChange}
              handleFormSubmit={handleCategoryFormSubmit}
              handleFormOpen={handleFormOpen}
              handleFormClose={handleFormClose}
              header={categoryHeader}
            />
          </Box>
          <Box m={2}>
            <CustomizedForm
              heading="add a new video"
              message="New Video"
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
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box
              display="flex"
              width="100%"
              justifyContent="space-between"
              alignContent="flex-end"
            >
              <Box maxWidth={500} flex={4}>
                <Search
                  query={query}
                  columnQuery={columnQuery}
                  setQuery={setQuery}
                  setColumnQuery={setColumnQuery}
                />
              </Box>
              <FormControl variant="standard" sx={{
                display: 'flex',
                width: 200
              }}>
                <InputLabel id="label">Select Category</InputLabel>

                <Select
                  labelId="label"
                  value={videoCategory}
                  onChange={(e) => {
                    setVideoCategory(e.target.value);
                    getVideos({ category_id: e.target.value });
                  }}
                  fullWidth
                >
                  {videoCategoryData.videoCategories.map((category, index) => (
                    <MenuItem key={index} value={category.id}>
                      {category.category_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Box mt={3}>
        {videoCategory ? (
          videoData.loading ? (
            <h2>Loading...</h2>
          ) : videoData.error ? (
            <h2>{videoData.error}</h2>
          ) : (
            <CustomizedTable
              handleRemove={handleRemove}
              startEditing={startEditing}
              editIdx={editIdx}
              stopEditing={stopEditing}
              handleChange={handleChange}
              data={
                query
                  ? videoData.videos?.filter((x) =>
                      x[columnQuery]
                        .toString()
                        .toLowerCase()
                        .includes(lowerCaseQuery)
                    )
                  : videoData.videos
              }
              header={header}
            />
          )
        ) : (
          <h2>Select Category</h2>
        )}
      </Box>
    </Container>
  );
}
