import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useRoleData from "../../api/useRoleData";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RoleCard = ({ selectedOption, handleDelete }) => {
  return (
    <Stack spacing={1}>
      {selectedOption.map((option, index) => (
        <Accordion
          key={index}
          sx={{
            border: "2px solid #f44336",
          }}
        >
          <AccordionSummary
            sx={{
              paddingBottom: "0px",
              display: "flex",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ExpandMoreIcon
                  fontSize="large"
                  style={{
                    marginRight: "10px",
                  }}
                />
                <Typography variant="h5"> {`${index + 1}. ${option.role_options_name}`}</Typography>
              </Box>
              <IconButton
                color="error"
                aria-label="delete"
                onClick={handleDelete(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <h4>Sub-Options:</h4>
            <CardItem
              handleDelete={handleDelete}
              roleSubOptions={option.role_sub_options}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );
};

const CardItem = ({ roleSubOptions }) => {
  return (
    <Stack spacing={0}>
      {roleSubOptions.map((subOption, index) => (
        <Card
          sx={{
            border: "1px solid #2196f3",
          }}
          key={index}
        >
          <CardContent
            sx={{
              display: "flex",
              paddingBottom: "0px",
            }}
          >
            <Box
              sx={{
                flexGrow: "2",
              }}
            >
              {`${index + 1}. ${subOption.role_sub_option_name}`}
            </Box>
          </CardContent>
          <CardActions
            sx={{
              paddingTop: "0px",
            }}
          >
            <Box sx={{ display: "flex", ml: 5 }}>
              <FormControlLabel
                label="View"
                control={<Checkbox color="primary" />}
              />
              <FormControlLabel
                label="Edit"
                control={<Checkbox color="primary" />}
              />
              <FormControlLabel
                label="Update"
                control={<Checkbox color="primary" />}
              />
              <FormControlLabel
                label="Delete"
                control={<Checkbox color="primary" />}
              />
            </Box>
          </CardActions>
        </Card>
      ))}
    </Stack>
  );
};

export default function RoleModal() {
  // Input / Selected form control

  const [open, setOpen] = useState(false);
  const [rolesDisplay, setRoleDisplay] = useState(false);
  const [newRole, setNewRole] = useState({});
  const [formData, setFormData] = useState("");
  const [suboption, setSuboption] = useState([]);
  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  // Redux
  let roleData = useSelector((state) => state.role);
  const { getOptions } = useRoleData();
  useEffect(() => {
    getOptions();
  }, [open]);

  const [selectedOption, setSelectedOption] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedOption(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const showRoles = () => {
    setRoleDisplay(!rolesDisplay);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormChange = (e) => {
    setFormData(e.target.value);
  };

  const { addRole } = useRoleData();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // setNewRole({
    //   ...newRole,
    //   role_name: formData,
    //   access: [
    //     {
    //       access_Id: 0,
    //       access_options: chipData,
    //     },
    //   ],
    // });
    addRole(newRole);
    setFormData("");
    setSuboption([]);
    setSelectedOption([]);
    handleClose();
  };
  // const [chipData, setChipData] = useState([]);

  const handleDelete = (OptionToDeleteIndex) => () => {
    setSelectedOption((items) =>
      items.filter((item, ind) => ind !== OptionToDeleteIndex)
    );
  };
  const addOption = () => {
    setSuboption([
      ...selectedOption,
      {
        access_options_name: suboption,
        isView: isView ? 1 : 0,
        isDelete: isDelete ? 1 : 0,
        isEdit: isEdit ? 1 : 0,
        isUpdate: isUpdate ? 1 : 0,
      },
    ]);
    setSuboption("");
    setIsDelete(false);
    setIsEdit(false);
    setIsUpdate(false);
    setIsView(false);
  };

  return (
    <Box
      mx={2}
      sx={{
        display: "inline-block",
      }}
    >
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        onClick={handleClickOpen}
        color="secondary"
      >
        Add Role
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="md">
        {!rolesDisplay ? (
          <Box component={FormControl}>
            <DialogTitle variant="h4"> Add new Role :</DialogTitle>

            <DialogContent>
              <DialogContentText>Submit role name</DialogContentText>
              <TextField
                required
                margin="normal"
                variant="standard"
                label="Role Name"
                value={formData}
                onChange={(e) => handleFormChange(e)}
                name="role_name"
                onKeyDown={(e) => {
                  e.key === "Enter" && showRoles();
                }}
                autoFocus
                fullWidth
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose} color="error" variant="outlined">
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  showRoles();
                }}
              >
                Add Role
              </Button>
            </DialogActions>
          </Box>
        ) : (
          <>
            <DialogTitle variant="h4"> Select Options to add :</DialogTitle>
            <DialogContent pb="0px">
              <Box component={FormControl} fullWidth my={1}>
                <InputLabel id="select-option-label">Select Option</InputLabel>
                <Select
                  required
                  multiple
                  fullWidth
                  margin="normal"
                  labelId="select-option-label"
                  label="Select Option"
                  value={selectedOption}
                  onChange={(e) => handleChange(e)}
                >
                  {roleData?.options.map((option) => (
                    <MenuItem key={option.id} value={option}>
                      {option.role_options_name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              {/* <Box display="flex" alignItems="end" mb={2}>
                <FormControlLabel
                  label="View"
                  control={
                    <Checkbox
                      checked={isView}
                      onChange={(e) => setIsView(e.target.checked)}
                    />
                  }
                />
                <FormControlLabel
                  label="Edit"
                  control={
                    <Checkbox
                      checked={isEdit}
                      onChange={(e) => setIsEdit(e.target.checked)}
                    />
                  }
                />
                <FormControlLabel
                  label="Update"
                  control={
                    <Checkbox
                      checked={isUpdate}
                      onChange={(e) => setIsUpdate(e.target.checked)}
                    />
                  }
                />
                <FormControlLabel
                  label="Delete"
                  control={
                    <Checkbox
                      checked={isDelete}
                      onChange={(e) => setIsDelete(e.target.checked)}
                    />
                  }
                />
                <IconButton
                  color="primary"
                  aria-label="add role"
                  onClick={() => {
                    addOption();
                  }}
                >
                  <AddBoxIcon
                    style={{
                      fontSize: "48px",
                    }}
                  />
                </IconButton>
              </Box> */}

              <RoleCard
                selectedOption={selectedOption}
                handleDelete={handleDelete}
              />
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button
                onClick={() => {
                  showRoles();
                }}
                color="error"
              >
                Go Back
              </Button>
              <Button
                variant="contained"
                onClick={(e) => {
                  handleFormSubmit(e);
                  setRoleDisplay(false);
                }}
              >
                Submit
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
