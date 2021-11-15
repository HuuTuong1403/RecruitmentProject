import { Line } from "react-chartjs-2";

const options = {
  responsive: true,
  scales: {
    x: {
      display: true,
      title: {
        display: true,
      },
    },
    y: {
      beginAtZero: true,
      display: true,
      title: {
        display: true,
        text: "Value",
      },
    },
  },
};

const LineChartBasic = () => {
  const data = {};
  return <Line options={options} data={data} />;
};

export default LineChartBasic;
