import { useState, useEffect } from "react";
import CustomizedTable from "./CustomizedTable";
import Total from "../../components/Total";
import PeopleIcon from "@mui/icons-material/People";

import Search from "../../components/Search";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container } from "@mui/system";
import {
  Alert,
  AlertTitle,
  Card,
  CardContent,
  Snackbar,
  Stack,
} from "@mui/material";
import useSubuserData from "../../api/useSubuserData";
import AddRoleModal from "./AddRoleModal";
import AddUserModal from "./AddUserModal";
import AddRoleOptionModal from "./AddRoleOptionModal";
import { addSubuserFailure } from "../../features/subuserSlice";
import AddRoleSubOptionModal from "./AddRoleSubOptionModal";
import useRoleData from "../../api/useRoleData";

const header = [
  {
    name: "Id",
    prop: "id",
    type: "number",
  },
  {
    name: "Name",
    prop: "full_name",
    type: "string",
    form: true,
  },
  {
    name: "Email",
    prop: "email",
    type: "string",
    form: true,
  },
  {
    name: "User Role",
    prop: "user_role",
    type: "string",
  },
  {
    name: "Password",
    prop: "password",
    type: "string",
    hidden: true,
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
  {
    name: "Mobile",
    prop: "mobile",
    type: "number",
    form: true,
  },
];

export default function Users() {

  // Modal Toggle 
  const [openOptionModal, setOpenOptionModal] = useState(false);

  const handleOptionModalOpen = () => {
    setOpenOptionModal(true);
  };
  const handleOptionModalClose = () => {
    setOpenOptionModal(false);
  };

  const [openSubOptionModal, setOpenSubOptionModal] = useState(false);

  const handleSubOptionModalOpen = () => {
    setOpenSubOptionModal(true);
  };
  const handleSubOptionModalClose = () => {
    setOpenSubOptionModal(false);
  };

  const subuserData = useSelector((state) => state.subuser);
  const roles = useSelector((state)=> state.role)
  const {
    getSubusers,
    deleteSubuser,
    updateSubuserLiveStatus,
    updateSubuserRole,
  } = useSubuserData();

const { getAllRoles } = useRoleData()

  const dispatch = useDispatch();
  const [snakbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    getSubusers();
    getAllRoles();
  }, []);



  useEffect(() => {
    if (subuserData.status === 1) {
      setSnackbarOpen(false);
    } else {
      setSnackbarOpen(true);
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 4000);
      setTimeout(() => {
        dispatch(addSubuserFailure({ msg: "", status: 1 }));
      }, 4500);
    }
  }, [subuserData]);


  //table state

  const [editFormData, setEditFormData] = useState({
    user_id: "",
  });
  const [editingField, setEditingField] = useState("");

  const [editIdx, setEditIdx] = useState(-1);

  const [roleData, setRoleData] = useState(roles.roles);

  //search state
  const [query, setQuery] = useState("");
  const [columnQuery, setColumnQuery] = useState("user_name");

  //form state
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    mobile: null,
  });

  //table functions
  const handleRemove = (i) => {
    const formData = {
      user_id: i,
    };
    deleteSubuser(formData);
  };

  const startEditing = (i) => {
    setEditIdx(i);
    setEditFormData({
      user_id: i.toString(),
    });
  };

  const stopEditing = () => {
    Object.keys(editFormData).map((field) => {
      if (field === "user_role") {
        const submitEdit = (({ user_id, user_role }) => ({
          user_id,
          user_role,
        }))(editFormData);

        updateSubuserRole(submitEdit);
      } else if (field === "is_active") {
        const submitEdit = (({ user_id }) => ({ user_id }))(editFormData);
        submitEdit.liveStatusUser = editFormData.is_active;
        updateSubuserLiveStatus(submitEdit);
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snakbarOpen}
        key={{ vertical: "top", horizontal: "right" }}
      >
        {subuserData.status === 200 ? (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            <strong>{subuserData.snackError}</strong>
          </Alert>
        ) : (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>{subuserData.snackError}</strong>
          </Alert>
        )}
      </Snackbar>
      <Box
        display="flex"
        alignItems="center"
        sx={{ flexDirection: { xs: "column", md: "row" } }}
        justifyContent="space-between"
      >
        <Box>
          <Total
            Icon={PeopleIcon}
            name="users"
            count={subuserData?.users?.length}
          />
        </Box>
        <Box 
        mt={2}
        display="flex" alignItems="center">
         
          <Stack spacing={1} alignItems="center">
            <AddRoleModal setRoleData={setRoleData} roleData={roleData} />
            <AddRoleOptionModal open={openOptionModal} handleModalOpen={handleOptionModalOpen} handleModalClose={handleOptionModalClose} />
            <AddRoleSubOptionModal  open={openSubOptionModal} handleModalOpen={handleSubOptionModalOpen} handleModalClose={handleSubOptionModalClose} />
          </Stack>

          <AddUserModal roleData={roleData} />
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
        {subuserData.loading ? (
          <h2>Loading...</h2>
        ) : subuserData.error ? (
          <h2>{subuserData.error}</h2>
        ) : (
          <CustomizedTable
            handleRemove={handleRemove}
            startEditing={startEditing}
            editIdx={editIdx}
            stopEditing={stopEditing}
            handleChange={handleChange}
            data={
              query
                ? subuserData.users?.filter((x) =>
                    x[columnQuery]
                      .toString()
                      .toLowerCase()
                      .includes(lowerCaseQuery)
                  )
                : 
                subuserData.users
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
