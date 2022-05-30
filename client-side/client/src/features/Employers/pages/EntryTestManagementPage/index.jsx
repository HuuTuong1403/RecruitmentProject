import { dateFormatPicker } from 'common/constants/dateFormat'
import { pathEmployer } from 'common/constants/path'
import { convertTime } from 'common/functions'
import { useTitle } from 'common/hook/useTitle'
import { LoadingSuspense, NotFoundData, notification } from 'components'
import { ButtonField } from 'custom-fields'
import { softDeleteEntryTest } from 'features/Employers/api/employer.api'
import { TableData } from 'features/Employers/components'
import { selectedStatus, selectEntryTests } from 'features/Employers/slices/selectors'
import { getAllEntryTestAsync } from 'features/Employers/slices/thunks'
import moment from 'moment'
import { Fragment, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FaTrash } from 'react-icons/fa'
import { MdAddCircleOutline } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import classes from './style.module.scss'

const EntryTestManagementPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { t } = useTranslation()
  const status = useSelector(selectedStatus)
  const entryTests = useSelector(selectEntryTests)

  useTitle(t('Entry test management'))

  useEffect(() => {
    dispatch(getAllEntryTestAsync())
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

  const handleEditEntryTest = (id) => {
    history.push(`${pathEmployer.createdEntryTest}?key=${id}`)
  }

  const handleMoveTrashEntryTest = async (id) => {
    const result = await softDeleteEntryTest({ id })
    if (result.status === 204) {
      notification(t('Move entry test to trash successfully'), 'success')
      dispatch(getAllEntryTestAsync())
    } else {
      notification(t('Error! An error occurred. Please try again later'), 'error')
    }
  }

  return status ? (
    <LoadingSuspense height="80vh" />
  ) : (
    entryTests && (
      <Fragment>
        <div className={classes.titleDashboard}>{t('Entry test management')}</div>
        <div style={{ marginTop: '4px' }}>
          <ButtonField
            backgroundcolor="#007bff"
            backgroundcolorhover="#007bffad"
            radius="5px"
            width="15%"
            onClick={() => history.push(pathEmployer.createdEntryTest)}
          >
            <MdAddCircleOutline style={{ marginRight: '2px' }} /> {t('Add entry test')}
          </ButtonField>
          <span style={{ marginLeft: '5px', marginRight: '5px' }}></span>
          <ButtonField
            backgroundcolor="#dd4b39"
            backgroundcolorhover="#ff7875"
            radius="5px"
            width="10%"
            onClick={() => history.push(pathEmployer.trashEntryTest)}
          >
            <FaTrash style={{ marginRight: '2px' }} /> {t('Trash')}
          </ButtonField>
        </div>
        {entryTests.length === 0 ? (
          <NotFoundData title={t('You have not created any entry test yet')} />
        ) : (
          <Fragment>
            <TableData
              titleList={t('List entry test created')}
              columns={columns}
              dataSource={entryTests.map((entryTest, index) => {
                const { _id, questions, skills, createdAt, ...data } = entryTest

                return {
                  key: _id,
                  ...data,
                  index: index + 1,
                  skillString: skills.join(', '),
                  createdAt: moment(createdAt).format(dateFormatPicker),
                }
              })}
              onEdit={handleEditEntryTest}
              onMoveTrash={handleMoveTrashEntryTest}
              titlePopover={{
                moveTrash: {
                  title: 'Confirm move this entry test to trash',
                  subTitle: 'Do you want to move this entry test to trash',
                },
              }}
              isUseAction
            />
          </Fragment>
        )}
      </Fragment>
    )
  )
}
export default EntryTestManagementPage
