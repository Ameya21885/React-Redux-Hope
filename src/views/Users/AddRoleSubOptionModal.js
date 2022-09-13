import * as React from "react";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import {
  Box,
  Card,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import useRoleData from "../../api/useRoleData";
import AddBoxIcon from "@mui/icons-material/AddBox";

const CardItem = ({ chipData, handleDelete }) => {
  return (
    <Stack spacing={1}>
      {chipData.map((item, index) => (
        <Card
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            padding: 1,
          }}
        >
          <Box
            sx={{
              flexGrow: "2",
            }}
          >
            {`${index + 1}. ${item}`}
          </Box>
          <IconButton
            color="error"
            aria-label="delete"
            onClick={handleDelete(index)}
          >
            <DeleteIcon />
          </IconButton>
        </Card>
      ))}
    </Stack>
  );
};

export default function AddRoleSubOptionModal({
  open,
  handleModalOpen,
  handleModalClose,
}) {
  // Redux
  let roleData = useSelector((state) => state.role);
  const { getOptions, addRoleSubOption } = useRoleData();
  React.useEffect(() => {
    getOptions();
  }, [open]);

  // Input / Selected form control
  const [selectedRoleOption, setSelectedRoleOption] = React.useState(1);
  const [subOptionValue, setSubOptionValue] = React.useState("");

  // Suboption Array | chip data
  const [chipData, setChipData] = React.useState([]);

  const addSubOption = (e) => {
    e?.preventDefault();
    setChipData([...chipData, subOptionValue]);
    setSubOptionValue("");
  };
  const suboptionDelete = (chipToDeleteIndex) => () => {
    setChipData((chips) =>
      chips.filter((chip, ind) => ind !== chipToDeleteIndex)
    );
  };
  // Form Submission and API call
  const handleFormSubmit = (e) => {
    e?.preventDefault();
    let itemString = chipData.toString();
    addRoleSubOption({
      roleSubOptionNames: itemString,
      roleOptionId: selectedRoleOption,
    });
    handleModalClose();
  };

  return (
    <Box
      mx={2}
      sx={{
        display: "inline-block",
      }}
    >
      <Button
        startIcon={<FactCheckIcon />}
        variant="contained"
        onClick={handleModalOpen}
        color="info"
      >
        Add Role SubOptions
      </Button>
      <Dialog
        open={open}
        onClose={handleModalClose}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle variant="h4"> Add Role Suboption :</DialogTitle>
        <DialogContent pb="0px">
          <DialogContentText>
            Select role option to add options:
          </DialogContentText>

          <TextField
            select
            fullWidth
            margin="normal"
            value={selectedRoleOption}
            label="Select Role"
            onChange={(e) => setSelectedRoleOption(e.target.value)}
          >
            {roleData?.options.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.role_options_name}
              </MenuItem>
            ))}
          </TextField>
          <Box
            component="form"
            onSubmit={(e) => addSubOption(e)}
            display="flex"
            alignItems="end"
            mb={2}
          >
            <TextField
              inputProps={{ inputMode: "text", pattern: "[a-zA-Z][a-zA-Z ]+" }}
              margin="normal"
              variant="standard"
              label="Role Sub-option name"
              value={subOptionValue}
              onChange={(e) => setSubOptionValue(e.target.value)}
              name="role_suboption_name"
              autoFocus
              required
            />
            <IconButton color="primary" aria-label="add role" type="submit">
              <AddBoxIcon
                style={{
                  fontSize: "48px",
                }}
              />
            </IconButton>
          </Box>

          <CardItem chipData={chipData} handleDelete={suboptionDelete} />
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              handleModalClose();
            }}
            color="error"
          >
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
