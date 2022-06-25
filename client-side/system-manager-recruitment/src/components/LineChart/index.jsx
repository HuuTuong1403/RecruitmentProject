import { Line } from 'react-chartjs-2'
import { FaQuestionCircle } from 'react-icons/fa'
import { DatePicker, Tooltip } from 'antd'
import { useWindowSize } from 'common/hook/useWindowSize'
import classes from './style.module.scss'
import moment from 'moment'

export const LineChart = ({
  labels,
  dataStatistic,
  labelY,
  labelDataset,
  title,
  tooltip,
  year,
  onChangeYear,
}) => {
  const [width] = useWindowSize()

  const options = {
    responsive: true,
    scales: {
      x: {
        display: true,
      },
      y: {
        min: 0,
        title: {
          display: width < 500 ? false : true,
          text: labelY,
        },
        ticks: {
          callback: (value) => {
            if (parseInt(value) >= 1000) {
              return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'đ'
            } else {
              return value + 'đ'
            }
          },
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
        label: labelDataset + ` ${year}`,
        data: dataStatistic,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  }

  return (
    <div className={classes.lineChart}>
      <div className={classes.lineChart__title}>
        <div>{`${title} (${year})`}</div>
        <div>
          <DatePicker
            defaultValue={moment(year, 'yyyy')}
            style={{ marginRight: '8px' }}
            picker="year"
            onChange={onChangeYear}
          />
          <Tooltip placement="topRight" title={tooltip + ` ${year}`}>
            <FaQuestionCircle />
          </Tooltip>
        </div>
      </div>
      <Line data={data} options={options} />
    </div>
  )
}
