import * as React from "react";
import Button from "@mui/material/Button";

import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import useSubuserData from "../../api/useSubuserData";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useSelector } from "react-redux";
import useRoleData from "../../api/useRoleData";

const formUserDetails = [
  {
    name: "Name",
    prop: "full_name",
    type: "string",
  },
  {
    name: "Email",
    prop: "email",
    type: "string",
  },

  {
    name: "Password",
    prop: "password",
    type: "string",
  },

  {
    name: "Mobile",
    prop: "mobile",
    type: "number",
  },
];

export default function AddUserModal() {
  let roleData = useSelector((state)=> state.role)
  const {getAllRoles} = useRoleData();
  const { addSubuser } = useSubuserData();

  React.useEffect(() => {
   getAllRoles()
  }, [])
  

  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    full_name: "",
    email: "",
    password: "",
    mobile: null,
  });
  const [selectedRole, setSelectedRole] = React.useState("");


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    addSubuser({ user_role: selectedRole, ...formData });

    setFormData({
      full_name: "",
      email: "",
      password: "",
      mobile: null,
    });
    setSelectedRole("");
    handleClose();
  };

  return (
    <Box
      mx={2}
      sx={{
        display: "inline-block",
      }}
    >
      <Button
        startIcon={<PersonAddIcon />}
        variant="contained"
        color="success"
        onClick={handleClickOpen}
      >
        Add a new user
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="md">
        <DialogTitle variant="h4"> Add new User :</DialogTitle>

        <DialogContent>
          <DialogContentText>Submit user details</DialogContentText>
          <TextField
            select
            fullWidth
            margin="normal"
            value={selectedRole}
            label="Select Role"
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            {roleData?.roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.role_name}
              </MenuItem>
            ))}
          </TextField>
          {formUserDetails.map((item, index) => (
            <TextField
              key={index}
              margin="normal"
              variant="standard"
              label={item.name}
              value={item.value}
              onChange={(e) => handleFormChange(e)}
              name={item.prop}
              fullWidth
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error" variant="outlined">
            Cancel
          </Button>
          <Button variant="contained" onClick={(e) => handleFormSubmit(e)}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
