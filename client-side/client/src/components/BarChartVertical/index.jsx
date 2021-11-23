import { Bar } from 'react-chartjs-2'
import { FaQuestionCircle } from 'react-icons/fa'
import { Tooltip } from 'antd'
import { useWindowSize } from 'common/hook/useWindowSize'
import classes from './style.module.scss'

const BarChartVertical = ({ labels, dataStatistic, labelY, labelDataSet, title, tooltip }) => {
  const [width] = useWindowSize()

  const options = {
    responsive: true,
    scales: {
      x: {
        display: false,
      },
      y: {
        min: 0,
        max: Math.max(dataStatistic) > 1 ? Math.max(dataStatistic) : 5,
        title: {
          display: width < 500 ? false : true,
          text: labelY,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  const data = {
    labels: labels,
    datasets: [
      {
        barPercentage: dataStatistic.length < 4 ? 0.2 : 0.5,
        label: labelDataSet,
        data: dataStatistic,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className={classes.barChart}>
      <div className={classes.barChart__title}>
        <div>{title}</div>
        <div>
          <Tooltip placement="topRight" title={tooltip}>
            <FaQuestionCircle />
          </Tooltip>
        </div>
      </div>
      <Bar data={data} options={options} />
    </div>
  )
}

export default BarChartVertical
