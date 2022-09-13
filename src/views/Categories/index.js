import { useState, useEffect } from "react";
import useCategoryData from "../../api/useCategoryData";

import CustomizedTable from "../../components/CustomizedTable";
import Total from "../../components/Total";

import PeopleIcon from "@mui/icons-material/People";
import CustomizedForm from "../../components/CustomizedForm";

import Search from "../../components/Search";
import { useSelector } from "react-redux";


import { Box, Card, CardContent, Container } from "@mui/material";

const header = [
  {
    name: "Id",
    prop: "id",
    type: "number",
  },
  {
    name: "Category Name",
    prop: "category_name",
    type: "string",
    form: true,
  },
  {
    name: "Top Selling",
    prop: "top_selling",
    type: "number",
  },
  {
    name: "Image",
    prop: "img_url",
    type: "link",
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


export default function Categories() {

  const categoryData = useSelector((state) => state.category);
  const {   addCategory,getCategories } = useCategoryData();

  useEffect(() => {
    getCategories();
    refreshFormData();
  }, []);

  //table state
  const [editFormData, setEditFormData] = useState({
    category_id: null,
  });
  const [editingField, setEditingField] = useState("");

  const [editIdx, setEditIdx] = useState(-1);

  //search state
  const [query, setQuery] = useState("");
  const [columnQuery, setColumnQuery] = useState("category_name");

  //form state
  const [formData, setFormData] = useState({
    category_name: "",
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
    if(formData.category_name!==""){
    addCategory(formData);
    handleFormClose();}
  };

  const refreshFormData = () => {
    setFormData({
      category_name: "",
    });
  };



  //table functions
  const handleRemove = (i) => {
    alert("not removable");

    // const formData = {
    //     category_id: i
    // }
    // deleteCategory(formData)
  };

  const startEditing = (i) => {
    setEditIdx(i);
    setEditFormData({
      category_id: i.toString(),
    });
  };

  const stopEditing = () => {
    // Object.keys(editFormData).map((field) => {

    //     if (field === 'category_name') {
    //         const submitEdit = (({ category_id, category_name }) => ({ category_id, category_name }))(editFormData);
    //         updateCategoryName(submitEdit)
    //     }

    //     else if (field === 'is_active') {
    //         console.log('launch')
    //         const submitEdit = (({ category_id }) => ({ category_id }))(editFormData);
    //         submitEdit.liveStatusCategory = editFormData.is_active
    //         updateCategoryLiveStatus(submitEdit)

    //     }

    // })
    alert("not editable");

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
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Total
            Icon={PeopleIcon}
            name="categories"
            count={categoryData?.categories?.length}
          />
        </Box>
        <Box>
          <CustomizedForm
            heading="add a new Category"
            formOpen={formOpen}
            formData={formData}
            handleFormChange={(e) => handleFormChange(e)}
            handleFormSubmit={(e) => handleFormSubmit(e)}
            handleFormOpen={() => handleFormOpen()}
            handleFormClose={() => handleFormClose()}
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
                setQuery={() => setQuery()}
                setColumnQuery={() => setColumnQuery()}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Box mt={3}>
        {categoryData.loading ? (
          <h2>Loading...</h2>
        ) : categoryData.error ? (
          <h2>{categoryData.error}</h2>
        ) : (
          <CustomizedTable
            handleRemove={(e) => handleRemove(e)}
            startEditing={() => startEditing()}
            editIdx={editIdx}
            stopEditing={() => stopEditing()}
            handleChange={() => handleChange()}
            data={
              query
                ? categoryData.categories?.filter((x) =>
                    x[columnQuery]
                      .toString()
                      .toLowerCase()
                      .includes(lowerCaseQuery)
                  )
                : categoryData.categories
            }
            header={header}
            editingField={editingField}
            setEditingField={() => setEditingField()}
            editFormData={editFormData}
          />
        )}
      </Box>
    </Container>
  );
}
