import {
  Chip,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import { tableCellClasses } from "@mui/material/TableCell";
import styled from "@emotion/styled";

// root styles
const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  table: {},
};

// Styled table cell and row
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const EditingField = ({
  type,
  handleChange,
  prop,
  index,
  options,
  derived,
  editFormData,
  setEditingField,
  mapParent,
  parentData,
  labelProp,
  rowData,
  multiple,
}) => {
  if (derived) {
    return (
      <Select
        multiple={multiple ? true : false}
        value={editFormData[prop]}
        onChange={(e) => {
          setEditingField(prop);
          handleChange(e, prop, index);
        }}
        name={prop}
        fullWidth
      >
        {parentData.map((option, i) => (
          <MenuItem key={i} value={option.id}>
            {option[labelProp]}
          </MenuItem>
        ))}
      </Select>
    );
  }

  if (type === "select") {
    return (
      <Select
        value={editFormData[prop] }
        onChange={(e) => {
          handleChange(e, prop, index);
          setEditingField(prop);
        }}
      >
        {options.map((option, i) => (
          <MenuItem value={option.value} key={i}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    );
  } else {
    return (
      <TextField
        value={editFormData[prop]}
        onChange={(e) => {
          setEditingField(prop);
          handleChange(e, prop, index);
        }}
      />
    );
  }
};

const row = (
  x,
  i,
  header,
  handleRemove,
  startEditing,
  editIdx,
  stopEditing,
  handleChange,
  editFormData,
  editingField,
  setEditingField
) => {
  const currentlyEditing = editIdx === x.id;

  return (
    <StyledTableRow key={`tr-${i}`}>
      {header.map(
        (field, k) =>
          !field.hidden && (
            <StyledTableCell align={k === 0 ? "left" : "right"} key={`tc-${k}`}>
              {currentlyEditing ? (
                <EditingField
                  type={field.type}
                  handleChange={handleChange}
                  prop={field.prop}
                  index={i}
                  options={field?.options}
                  derived={field?.derived}
                  editFormData={editFormData}
                  editingField={editingField}
                  setEditingField={setEditingField}
                  parentData={field.parentData}
                  mapParent={field.mapParent}
                  labelProp={field?.labelProp}
                  rowData={x}
                  multiple={field?.multiple}
                />
              ) : field.derived ? (
                field.mapParent(field.parentData, x[field.prop])
              ) : field.type === "link" ? (
                x[field.prop] ? (
                  <a
                    href={
                      field.direct
                        ? x[field.prop]
                        : `${process.env.REACT_APP_API_URL}/${x[field.prop]}`
                    }
                    download
                  >
                    Link
                  </a>
                ) : (
                  "none"
                )
              ) : field.prop === "is_active" ? (
                x[field.prop] ? (
                  <Chip label="Active" color="success" variant="outlined"/>
                ) : (
                  <Chip label="Inactive" color="error" variant="outlined"/>
                )
              ) : x[field.prop] ? (
                x[field.prop]
              ) : (
                "none"
              )}
            </StyledTableCell>
          )
      )}
      <StyledTableCell align="right">
        {currentlyEditing ? (
          <IconButton color="success" onClick={() => stopEditing()}>
            <CheckIcon />
          </IconButton>
        ) : (
          <IconButton color="primary" onClick={() => startEditing(x.id)}>
            <EditIcon />
          </IconButton>
        )}
      </StyledTableCell>
      <StyledTableCell align="right">
        <IconButton color="error" onClick={() => {
          if(window.confirm("do you really wish to delete ")){
          handleRemove(x.id)}}}>
          <DeleteIcon />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default function CustomizedTable({
  data,
  header,
  handleRemove,
  startEditing,
  editIdx,
  stopEditing,
  handleChange,
  editFormData,
  editingField,
  setEditingField,
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={styles.table}>
        <TableHead>
          <StyledTableRow>
            {header.map(
              (x, i) =>
                !x?.hidden && (
                  <StyledTableCell
                    align={i === 0 ? "left" : "right"}
                    key={`thc-${i}`}
                  >
                    {x.name}
                  </StyledTableCell>
                )
            )}
            <StyledTableCell align="right">Edit</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {data.map((x, i) =>
            row(
              x,
              i,
              header,
              handleRemove,
              startEditing,
              editIdx,
              stopEditing,
              handleChange,
              editFormData,
              editingField,
              setEditingField
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
