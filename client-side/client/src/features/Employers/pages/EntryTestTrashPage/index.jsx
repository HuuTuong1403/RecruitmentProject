import { dateFormatPicker } from 'common/constants/dateFormat'
import { convertTime } from 'common/functions'
import { useTitle } from 'common/hook/useTitle'
import { LoadingSuspense, NotFoundData, notification } from 'components'
import { deleteEntryTest, restoreEntryTest } from 'features/Employers/api/employer.api'
import { TableData } from 'features/Employers/components'
import { selectEntryTests } from 'features/Employers/slices/selectors'
import { getAllEntryTestDeletedAsync } from 'features/Employers/slices/thunks'
import { selectedStatus } from 'features/JobSeekers/slices/selectors'
import moment from 'moment'
import { Fragment, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { BiArrowBack } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import classes from './style.module.scss'

const EntryTestTrashPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { t } = useTranslation()
  const status = useSelector(selectedStatus)
  const entryTestDeleted = useSelector(selectEntryTests)

  useTitle(t('Entry test deleted'))

  useEffect(() => {
    dispatch(getAllEntryTestDeletedAsync())
  }, [dispatch])

  const columns = [
    {
      title: t('Entry test title'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('Entry test description'),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t('Total question'),
      dataIndex: 'totalQuestion',
      key: 'totalQuestion',
      render: (text) => (
        <div style={{ textAlign: 'right' }}>
          {text} {t('questions')}
        </div>
      ),
    },
    {
      title: t('Minimum score passed'),
      dataIndex: 'requiredPass',
      key: 'requiredPass',
      render: (text) => (
        <div style={{ textAlign: 'right' }}>
          {text} {t('points')}
        </div>
      ),
    },
    {
      title: t('Total score'),
      dataIndex: 'totalScore',
      key: 'totalScore',
      render: (text) => (
        <div style={{ textAlign: 'right' }}>
          {text} {t('points')}
        </div>
      ),
    },
    {
      title: t('Exam time'),
      dataIndex: 'duration',
      key: 'duration',
      render: (text) => <span>{convertTime(text, t)}</span>,
    },
    {
      title: t('Entry test level'),
      dataIndex: 'difficultLevel',
      key: 'difficultLevel',
      render: (text) => <span>{t(text)}</span>,
    },
    {
      title: t('Date created'),
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ]

  const handleRestoreEntryTest = async (id) => {
    const result = await restoreEntryTest({ id })
    if (result.status === 'success') {
      notification(t('Restore entry test successfully'), 'success')
      dispatch(getAllEntryTestDeletedAsync())
    } else {
      notification(result.message, 'error')
    }
  }

  const handleDeleteEntryTest = async (id) => {
    const result = await deleteEntryTest({ id })
    if (result.status === 204) {
      notification(t('Delete entry test forever successfully'), 'success')
      dispatch(getAllEntryTestDeletedAsync())
    } else {
      notification(t('Error! An error occurred. Please try again later'), 'error')
    }
  }

  return status ? (
    <LoadingSuspense height="80vh" />
  ) : (
    entryTestDeleted && (
      <Fragment>
        <div className={classes.headerBack}>
          <div>
            <BiArrowBack onClick={() => history.goBack()} />
          </div>
          <div>{t('Entry test deleted')}</div>
        </div>
        {entryTestDeleted.length === 0 ? (
          <NotFoundData title={t('You have not deleted any entry test yet')} />
        ) : (
          <Fragment>
            <TableData
              titleList={t('List entry test deleted')}
              columns={columns}
              dataSource={entryTestDeleted.map((entryTest, index) => {
                const { _id, questions, skills, createdAt, ...data } = entryTest

                return {
                  key: _id,
                  ...data,
                  index: index + 1,
                  skillString: skills.join(', '),
                  createdAt: moment(createdAt).format(dateFormatPicker),
                }
              })}
              titlePopover={{
                restore: {
                  title: 'Confirm restore this entry test',
                  subTitle: 'Do you want to restore this entry test',
                },
                delete: {
                  title: 'Confirm delete forever this entry test',
                  subTitle: 'Do you want to delete forever this entry test',
                },
              }}
              onRestore={handleRestoreEntryTest}
              onDelete={handleDeleteEntryTest}
              isTrash
              isUseAction
            />
          </Fragment>
        )}
      </Fragment>
    )
  )
}

export default EntryTestTrashPage
