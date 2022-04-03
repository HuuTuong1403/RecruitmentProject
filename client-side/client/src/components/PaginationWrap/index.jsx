import { Fragment, useState } from 'react'
import { Pagination } from 'antd'
import { EventItem } from 'features/Events/components'
import { JobSearchItem, ReviewItem } from 'features/Jobs/components'

export const PaginationCus = ({ array, numEachPage = 5, ...args }) => {
  const [value, setValue] = useState({ min: 0, max: numEachPage })
  const {
    setShowModal,
    employer,
    isJob = false,
    isEvent = false,
    isReview = false,
    currentUser,
    companyName,
  } = args

  const handleChangePage = (val) => {
    setValue({
      min: (val - 1) * numEachPage,
      max: val * numEachPage,
    })
  }

  return (
    <Fragment>
      {array.slice(value.min, value.max).map((item) => {
        return (
          <Fragment key={item.slug ? item.slug : item._id}>
            {isJob && <JobSearchItem setShowModal={setShowModal} job={item} employer={employer} />}
            {isEvent && <EventItem event={item} />}
            {isReview && (
              <ReviewItem review={item} currentUser={currentUser} companyName={companyName} />
            )}
          </Fragment>
        )
      })}
      {array.length > numEachPage && (
        <Pagination
          style={{ marginTop: '10px' }}
          defaultCurrent={1}
          defaultPageSize={numEachPage}
          onChange={handleChangePage}
          total={array.length}
        />
      )}
    </Fragment>
  )
}
