import { useState, useEffect } from "react";
import CustomizedTable from "./NotificationTable";
import Total from "../../components/Total";
import PeopleIcon from "@mui/icons-material/People";
import axios from 'axios';
import CustomizedForm from "../../components/CustomizedForm";

import Search from "../../components/Search";
import { useSelector } from "react-redux";
import { Box, Container } from "@mui/system";
import { Card, CardContent } from "@mui/material";
import useNotificationData from "../../api/useNotificationData";
import useCollegeData from "../../api/useCollegeData";
import useUniversityData from "../../api/useUniversityData";

export default function Notifications() {
  const notificationData = useSelector((state) => state.notification);
  const collegeData = useSelector((state) => state.college);
  const universityData = useSelector((state) => state.university);
 const [refresh,setRefresh]=useState(false);
  const { getNotifications, addNotification } = useNotificationData();
  const { getColleges } = useCollegeData();
  const { getUniversities } = useUniversityData();

  //table state
  const [data, setData] = useState(notificationData.notifications);

  const [editIdx, setEditIdx] = useState(-1);

  //search state
  const [query, setQuery] = useState("");
  const [columnQuery, setColumnQuery] = useState("notification_name");

  //form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    college_id: null,
    university_id: [],
    image: "",
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
    const name = e.target.name;
    const value = name === "image" ? e.target.files[0] : e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if(formData.title!==""&&
      formData.description!== ""&&
      formData.college_id!=null&&
      !formData.university_id?.length > 0
      ){
        console.log(formData);
    addNotification(formData);
    handleFormClose();
      }
  };

  const refreshFormData = () => {
    setFormData({
      title: "",
      description: "",
      college_id: null,
      university_id: null,
      image: null,
    });
  };

  useEffect(() => {
    getUniversities();
    getColleges();
    getNotifications();
    refreshFormData();
  }, []);
  useEffect(() => {
    getUniversities();
    getColleges();
    getNotifications();
    refreshFormData();
    setRefresh(false);
  }, [refresh]);

  //table functions
  // const handleRemove = (i) => {
  //   const formData = {
  //     notification_id: i,
  //   };
    // deletenotification(formData)
  // };

  const startEditing = (i) => {
    setEditIdx(i);
  };

  const stopEditing = () => {
    setEditIdx(-1);
  };

  const handleChange = (e, name, i) => {
    const { value } = e.target;
    setData(
      [...data].map((row, j) => (j === i ? { ...row, [name]: value } : row))
    );
  };

  const parentUniversities = [{ id: 0, university_name: "All" }].concat([
    ...universityData.universities,
  ]);
  const parentColleges = [{ id: 0, college_name: "All" }].concat([
    ...collegeData.colleges,
  ]);
  //table and form headers
  const header = [
    {
      name: "Id",
      prop: "id",
      type: "number",
    },
    {
      name: "title",
      prop: "title",
      type: "string",
      form: true,
    },
    {
      name: "description",
      prop: "description",
      type: "string",
      form: true,
    },
    {
      name: "Image",
      prop: "image",
      type: "link",
      form: true,
    },
    {
      name: "University",
      prop: "university_id",
      type: "string",
      form: true,
      derived: true,
      labelProp: "university_name",
      parentData: parentUniversities,
      mapParent: (parent, ids) =>
        parent.find((p) => p.id === ids)?.university_name,
    },
    {
      name: "College",
      prop: "college_id",
      type: "string",
      form: true,
      derived: true,
      labelProp: "college_name",
      parentData: formData.university_id
        ? parentColleges.filter((college) =>
          college.university_id?.includes(formData.university_id)
        )
        : parentColleges,
      mapParent: (parent, ids) =>
        parent.find((p) => p.id === ids)?.college_name,
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

  const handleClick = (id, flag) => {
    const fd = new FormData();
    fd.append("notification_id",id);
    fd.append("flag",flag);
    for(const pair of fd.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);  
    }
    
    
    const BASE_URL = process.env.REACT_APP_API_URL;
    axios.put(`${BASE_URL}/disableNotification`,fd).then((data)=>{
      // for(const entry of fd.values()){
      //   console.log(entry);
      // }
      // console.log("successfully updated");
      // console.log(data);
      setRefresh(true);
    }).catch((err)=>{
      console.log(err);
    })
  }

  return (
    <Container maxWidth={false}>
    
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Total
            Icon={PeopleIcon}
            name="notifications"
            count={notificationData?.notifications?.length}
          />
        </Box>
        <Box>
          <CustomizedForm
            heading="add a new notification"
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
        {notificationData.loading ||
          collegeData.loading ||
          universityData.loading ? (
          <h2>Loading...</h2>
        ) : notificationData.error ? (
          <h2>{notificationData.error}</h2>
        ) : (
          <CustomizedTable
          notifications={notificationData}
          handleClick = {handleClick}
          />  
        )}
      </Box>
    </Container>
  );
}
