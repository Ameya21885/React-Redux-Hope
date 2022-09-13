import { useState, useEffect } from "react";
import CustomizedTable from "../../components/CustomizedTable";
import Total from "../../components/Total";
import PeopleIcon from "@mui/icons-material/People";
import Search from "../../components/Search";
import useBannerData from "../../api/useBannerData"

import { Box, Card, CardContent, Container } from "@mui/material";
import { useSelector } from "react-redux";


export default function Banners() {
  const bannerData = useSelector((state) => state.banner);

  const {getBanners} = useBannerData()

  

  useEffect(() => {
    getBanners()
  }, [])
  

  //table state
  const [data, setData] = useState(bannerData.banners);
  const [editIdx, setEditIdx] = useState(-1);

  //search state
  const [query, setQuery] = useState("");
  const [columnQuery, setColumnQuery] = useState("notification_name");


  

  //table functions
  const handleRemove = (i) => {
    const formData = {
      notification_id: i,
    };
  };

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

  //table and form headers
  const header = [
    {
      name: "Id",
      prop: "id",
      type: "number",
    },
    {
      name: "Image",
      prop: "image_url",
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
    }
  ];

  const lowerCaseQuery = query.toLowerCase();

  return (
    <Container maxWidth={false}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Total
            Icon={PeopleIcon}
            name="Banners"
            count={bannerData?.banners?.length}
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
        {bannerData.loading ? (
          <h2>Loading...</h2>
        ) : bannerData.error ? (
          <h2>{bannerData.error}</h2>
        ) : (
          <CustomizedTable
            handleRemove={handleRemove}
            startEditing={startEditing}
            editIdx={editIdx}
            stopEditing={stopEditing}
            handleChange={handleChange}
            data={
              query
                ? bannerData.banners?.filter((x) =>
                    x[columnQuery]
                      .toString()
                      .toLowerCase()
                      .includes(lowerCaseQuery)
                  )
                : bannerData.banners
            }
            header={header}
          />
        )}
      </Box>
    </Container>
  );
}
