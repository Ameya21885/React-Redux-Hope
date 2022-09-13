import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale} from 'chart.js'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import axios from 'axios';
import { useTheme } from '@emotion/react';
import { Box, Button, Card, CardContent, CardHeader, colors, Divider } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement

)

const Latest = () => {
  const theme = useTheme();
  const [data, setData] = useState({
    values: [],
    labels: []
  })

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/yearwiseCountStudents`)
      .then(res => {
      
        setData({
          ...data,
          values: res.data.data.map(a => a.cnt),
          labels: res.data.data.map(a => a.year_id)
        })
      
      })

  }, [])

  const graphData = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        data: data.values,
        label: 'Year Wise Students',
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      }
    ],
    labels: data.labels
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: 
        {

          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ,
      y: 
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      
    },
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card
    >
      <CardHeader
        action={(
          <Button
            
            size="small"
            variant="text"
          >
            {data.values.length} Years
          </Button>
        )}
        title="Year Wise Students"
      />
      <Divider />
      <CardContent>
        <Box
          height={400}
          position="relative"
        >
          <Bar
            data={graphData}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        
      </Box>
    </Card>
  );
};


export default Latest;