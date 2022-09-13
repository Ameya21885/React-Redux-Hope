import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS,ArcElement,Tooltip,Legend } from "chart.js";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useTheme } from "@emotion/react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  colors,
  Divider,
  Typography,
} from "@mui/material";

ChartJS.register(
  ArcElement,Tooltip,Legend
)
const Piechart = ({ percent, title }) => {
  const theme = useTheme();

  const data = {
    labels: ["Active", "InActive"],

    datasets: [
      { label:"User Activity",
        data: [Number(percent), 100 - Number(percent)],
        backgroundColor: [colors.indigo[500], colors.orange[600]],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white,
      }
    ],
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  const devices = [
    {
      title: "Active",
      value: Number(percent),
      icon: CheckCircleIcon,
      color: colors.indigo[500],
    },
    {
      title: "Inactive",
      value: 100 - percent,
      icon: CancelIcon,
      color: colors.orange[600],
    },
  ];

  return (
    <Card>
      <CardHeader title={title} />
      <Divider />
      <CardContent>
        <Box height={300} position="relative">
          <Doughnut data={data} options={options} />
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          {devices.map(({ color, icon: Icon, title, value }) => (
            <Box key={title} p={1} textAlign="center">
              <Icon color="action" />
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h6">
                {value}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Piechart;
