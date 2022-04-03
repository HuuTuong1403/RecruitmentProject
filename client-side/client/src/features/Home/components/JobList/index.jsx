import { Link } from 'react-router-dom'
import { selectJobsHome } from 'features/Home/slices/selectors'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { JobItem } from 'features/Home/components'
import classes from './style.module.scss'
import Slider from 'react-slick'

export const JobList = () => {
  const { t } = useTranslation()
  const jobs = useSelector(selectJobsHome)

  return (
    <div className={classes.joblist}>
      <div className={classes.joblist__container}>
        <div className={classes['joblist__container-title']}>
          <div>{t('home-news-recruiment')}</div>
          <Link className={classes['joblist__container-title--all']} to="/jobs/search?type=all">
            {t('seeAll')}
          </Link>
        </div>
        <Slider style={{ width: '85%' }} {...settings}>
          {jobs.map((job, index) => {
            return index < 27 && <JobItem key={job._id} job={job} />
          })}
        </Slider>
      </div>
    </div>
  )
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  autoplay: true,
  pauseOnHover: true,
  rows: 3,
  responsive: [
    {
      breakpoint: 1240,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        rows: 3,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        rows: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}
