import React from "react";
import { Formik, Field} from "formik";
import * as yup from "yup";
import KErrorMessage from "./KErrorMessage";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const validationSchema = yup.object({
  Name: yup.string().required("Name is Required!"),
  Select: yup.string().required("select is Required"),
   
});



const CustomField = ({
  name,
  type,
  value,
  prop,
  options,
  handleFormChange,
  derived,
  parentData,
  labelProp,
  multiple,
}) => {
 

  if (derived) {
    return (
      <> 
    <Formik 
     validationSchema={validationSchema}
     initialValues={{
       Name: "",
      
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >

   
      <FormControl variant="standard" fullWidth  >
{/*Streams course */}
        <InputLabel id="lable" name="Name">{name}</InputLabel>

         {/* <label>Stream Name:</label>
              <Field name1="Name" type="text" /> 
        <KErrorMessage name1="Name" /> */}

        <Select
          margin="dense"
          labelId="label"
          multiple={multiple}
          label={name}
          value={value}
          onChange={(e) => handleFormChange(e)}
          name={prop}
          fullWidth
          // name="Select"
        >
          {parentData.map((option, i) => (
            <MenuItem key={i} value={option.id}>
              {option[labelProp]}
            </MenuItem>
          ))}
        </Select>
       

      </FormControl>
      </Formik>
      </>
     
    );
  }
  switch (type) {
    case "link":
      return (
        <Box my={2}>
          <Button variant="contained" component="label">
            Upload File 
            <input
              label={name}
              name={prop}
              type="file"
              hidden
              onChange={(e) => handleFormChange(e)}
            />
          </Button>
        </Box>
      );

    case "select":
      return (
        <> 
         <TextField
          select
          margin="normal"
          name={prop}
          label={name}
          value={value}
          onChange={(e) => handleFormChange(e)}
          fullWidth
        >
          {options.map((option, i) => (
            <MenuItem key={i} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        </>
      );

    default:
      return (
        <> 
        {/* streams  Stream Name */}
         <TextField
          margin="normal"
          variant="standard"
          label={name}
          value={value}
          onChange={(e) => handleFormChange(e)}
          name={prop}
          fullWidth
        />
         {/* <label>Stream Name:</label> */}
              {/* <Field name="Name" type="text" />  */}
        {/* <KErrorMessage name="Name" /> */}
        </>
      );
  }
};

function CustomizedForm({
  formData,
  formOpen,
  heading,
  handleFormSubmit,
  header,
  handleFormChange,
  handleFormOpen,
  handleFormClose,
  message,
}) {
  return (
    <>
      <Button variant="contained" color="primary" onClick={handleFormOpen}>
        {message ? message : "Add new"}
      </Button>
      <Dialog
        spacing={2}
        open={formOpen}
        onClose={handleFormClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{heading}</DialogTitle>

        <DialogContent>
          {header.map(
            (field, index) =>
              field.form && (
                <CustomField
                  key={index}
                  name={field?.name}
                  type={field?.type}
                  value={formData[field?.prop]}
                  handleFormChange={handleFormChange}
                  prop={field?.prop}
                  options={field?.options}
                  derived={field?.derived}
                  parentData={field?.parentData}
                  labelProp={field?.labelProp}
                  multiple={field?.multiple}
                />
              )
          )}

          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button onClick={handleFormClose} color="primary">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              onClick={(e) => handleFormSubmit(e)}
              color="primary"
              size="small"
             
            >
              Submit
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CustomizedForm;
