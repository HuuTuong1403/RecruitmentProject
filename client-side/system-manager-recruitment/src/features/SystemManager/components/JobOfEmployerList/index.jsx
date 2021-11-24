import { Fragment, useState } from 'react'
import { Pagination } from 'antd'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'
import JobOfEmployerItem from 'features/SystemManager/components/JobOfEmployerItem'
import NotFoundData from 'components/NotFoundData'

const JobOfEmployerList = ({ listRender, max, status = '' }) => {
  const { t } = useTranslation()
  const [value, setValue] = useState({ min: 0, max: max })

  const handleChangePage = (val) => {
    setValue({
      min: (val - 1) * max,
      max: val * max,
    })
  }

  return listRender.length === 0 ? (
    <NotFoundData
      title={`${t('There are currently no job postings')} ${t(status)}`.toUpperCase()}
    />
  ) : (
    <Fragment>
      <div className={classes.listItem}>
        {listRender.slice(value.min, value.max).map((job) => (
          <JobOfEmployerItem data={job} key={job.slug} statusJob={status} />
        ))}
      </div>
      <div className={classes.paginate}>
        <Pagination
          defaultCurrent={1}
          defaultPageSize={max}
          onChange={handleChangePage}
          total={listRender.length}
        />
      </div>
    </Fragment>
  )
}

export default JobOfEmployerList
