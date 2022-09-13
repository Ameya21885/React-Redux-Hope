import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Card, Divider, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import useRoleData from "../../api/useRoleData";

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

export default function AddRoleOptionModal({open,handleModalOpen,handleModalClose}) {

  const { addRoleOption, addRoleSubOption } = useRoleData();

  // Toggle to display various sections

 

  const [rolesDisplay, setRoleDisplay] = React.useState(false);

  const toggleShowRoles = () => {
    setRoleDisplay(!rolesDisplay);
  };

  // Input Fields
  const [optionValue, setOptionValue] = React.useState("");
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

  // UseEffect
  React.useEffect(() => {}, [open]);

  // Form Submission and API call
  const handleFormSubmit = (e) => {
    e?.preventDefault();
    let addRolePromise = addRoleOption(optionValue);
    let itemString = chipData.toString();
    addRolePromise.then((res) => {
      addRoleSubOption({
        roleSubOptionNames: itemString,
        roleOptionId: res,
      });
    });

    handleModalClose();
  };

  return (
    <div>
      {/* Dialog Button  */}
      <Button
        startIcon={<EditIcon />}
        variant="contained"
        onClick={handleModalOpen}
        color="warning"
      >
        Add Role Option
      </Button>

      {/* Dialog Screen */}
      <Dialog
        open={open}
        onClose={handleModalClose}
        fullWidth={true}
        maxWidth="md"
      >
        {!rolesDisplay ? (
          <>
            <DialogTitle>Add Role Option</DialogTitle>

            <DialogContent>
              {/* <DialogContentText>
                Enter the name of Role Option
              </DialogContentText> */}

              <TextField
                margin="normal"
                variant="standard"
                label="Role Option Name"
                value={optionValue}
                onChange={(e) => setOptionValue(e.target.value)}
                name="role_option_name"
                autoFocus
                fullWidth
                inputProps={{
                  inputMode: "text",
                  pattern: "[a-zA-Z][a-zA-Z ]+",
                }}
                required
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleModalClose}
                color="error"
                variant="outlined"
              >
                Cancel
              </Button>
              <Button variant="contained" onClick={() => toggleShowRoles()}>
                Add Sub-Options
              </Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle variant="h5"> Add Role Sub-Options :</DialogTitle>
            <DialogContent pb="0px">
              <Box
                onSubmit={(e) => addSubOption(e)}
                component="form"
                display="flex"
                alignItems="end"
                mb={2}
              >
                <TextField
                  margin="normal"
                  variant="standard"
                  label="Role Sub-option name"
                  value={subOptionValue}
                  onChange={(e) => setSubOptionValue(e.target.value)}
                  name="role_suboption_name"
                  autoFocus
                  inputProps={{
                    inputMode: "text",
                    pattern: "[a-zA-Z][a-zA-Z ]+",
                  }}
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
                onClick={() => {
                  toggleShowRoles();
                }}
                color="error"
              >
                Go Back
              </Button>
              <Button variant="contained" onClick={(e) => handleFormSubmit(e)}>
                Submit
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}
