import {
  saveApplication,
  deleteApplication,
  restoreApplication,
  announceApplication,
  announceEntryTest,
} from 'features/Employers/api/employer.api'
import {
  savedJobApplication,
  deletedJobAppication,
  restoredJobApplication,
  handleChangeCountStatus,
} from 'features/Employers/slices'
import { dateFormatPicker } from 'common/constants/dateFormat'
import { FaFileDownload, FaEye, FaSave, FaTrash } from 'react-icons/fa'
import { MdRestorePage, MdNotificationsActive } from 'react-icons/md'
import { Table, Tooltip } from 'antd'
import { useDispatch } from 'react-redux'
import { useState, Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { ButtonField, LabelField, PopoverField } from 'custom-fields'
import { ModalViewProfileApplication } from 'features/Employers/components'
import { ModalNotify, notification } from 'components'
import classes from './style.module.scss'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { selectEntryTests } from 'features/Employers/slices/selectors'
import { formatArrayForSelect } from 'common/functions'
import Select from 'react-select'

export const TableJobsApplication = ({
  jobsApplication,
  isDelete = false,
  isNotSaved = false,
  isSaved = false,
  selectProfileList,
  setSelectProfileList,
}) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [showModal, setShowModal] = useState(false)
  const [application, setApplication] = useState({})
  const [loading, setLoading] = useState({ application: false, entryTest: false })
  const [loadingSaved, setLoadingSaved] = useState(false)
  const [loadingDeleted, setLoadingDeleted] = useState(false)
  const [loadingRestore, setLoadingRetore] = useState(false)
  const [showModalEntryTest, setShowModalEntryTest] = useState(false)
  const [idEntryTest, setIdEntryTest] = useState('')

  const entryTests = formatArrayForSelect(useSelector(selectEntryTests), 'Entry Test', t, false)
  const onOpenModal = (application) => {
    setApplication(application)
    setShowModal(true)
  }

  const onCloseModal = () => {
    setShowModal(false)
  }

  //Save Application In Tabs Not Saved
  const handleClickSaveApplication = async (id) => {
    setLoadingSaved(true)
    const result = await saveApplication(id)

    if (result.status === 'success') {
      notification(`${t('Successfully saved profile')}`, 'success')
      dispatch(savedJobApplication(id))
      dispatch(
        handleChangeCountStatus({
          prevStatus: 'NotSaved',
          nextStatus: 'Saved',
        })
      )
      onCloseModal()
    } else {
      notification(`${t('Error! An error occurred. Please try again later')}`, 'error')
    }
    setLoadingSaved(false)
  }

  //Delete Application In Tabs Not Saved
  const handleClickDeleteApplication = async (id) => {
    setLoadingDeleted(true)
    const result = await deleteApplication(id)

    if (result.status === 'success') {
      notification(`${t('Successfully deleted profile')}`, 'success')
      dispatch(deletedJobAppication(id))
      dispatch(
        handleChangeCountStatus({
          prevStatus: 'NotSaved',
          nextStatus: 'Deleted',
        })
      )
      setShowModal(false)
    } else {
      notification(`${t('Error! An error occurred. Please try again later')}`, 'error')
    }
    setLoadingDeleted(false)
  }

  //Restore Application In Tabs Deleted
  const handleClickRestoreApplication = async (id) => {
    setLoadingRetore(true)
    const result = await restoreApplication(id)

    if (result.status === 'success') {
      notification(`${t('Successfully restored profile')}`, 'success')
      dispatch(restoredJobApplication(id))
      dispatch(
        handleChangeCountStatus({
          prevStatus: 'Deleted',
          nextStatus: 'NotSaved',
        })
      )
      setShowModal(false)
    } else {
      notification(`${t('Error! An error occurred. Please try again later')}`, 'error')
    }
    setLoadingRetore(false)
  }

  //Announce Application In Tabs Saved
  const handleClickAnnounceApplication = async () => {
    setLoading((prev) => ({ ...prev, application: true }))
    if (selectProfileList.length > 0) {
      const result = await announceApplication({ id: selectProfileList })
      if (result.status === 'success') {
        setSelectProfileList([])
        notification(`${t('Notification sent to selected candidate')}`, 'success')
      } else {
        notification(`${t('Error! An error occurred. Please try again later')}`, 'error')
      }
    } else {
      notification(`${t('Please select candidates to be notified')}`, 'error')
    }
    setLoading((prev) => ({ ...prev, application: false }))
  }

  const handleShowModalSelect = () => {
    if (selectProfileList.length > 0) {
      setShowModalEntryTest(true)
    } else {
      notification(`${t('Please select candidates to be notified')}`, 'error')
    }
  }

  const handleChangeSelect = (option) => {
    setIdEntryTest(option.value)
  }

  const handleClickAnnounceEntryTest = async () => {
    setLoading((prev) => ({ ...prev, entryTest: true }))
    if (idEntryTest) {
      const { company, jobTitle } = jobsApplication[0].job
      const emails = []
      const fullName = []

      selectProfileList.forEach((item) => {
        const data = jobsApplication.find((application) => application._id === item)
        if (data) {
          emails.push(data.jobSeeker.email)
          fullName.push(data.fullName)
        }
      })

      const _dataSend = {
        emails,
        companyName: company.companyName,
        jobTitle,
        logo: company.logo,
        url: `https://mst-recruit.web.app/entry-tests/join/${idEntryTest}`,
      }
      const result = await announceEntryTest(_dataSend)
      if (result.status === 'success') {
        notification(
          `${t('Send a notice to participate in the test entry for candidate')} ${
            fullName.length <= 5 ? fullName.join(', ') : ''
          } ${t('successfully')}`,
          'success'
        )
        setShowModalEntryTest(false)
        setSelectProfileList([])
      } else {
        notification(result.message, 'error')
      }
    } else {
      notification(t('Please select entry test to notification'), 'error')
    }
    setLoading((prev) => ({ ...prev, entryTest: false }))
  }

  const columns = [
    {
      title: `${t('Name of applicant')}`,
      dataIndex: 'fullName',
      key: 'fullName',
      sorter: (a, b) => a.fullName.length - b.fullName.length,
    },
    {
      title: `${t('Phone')}`,
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: `${t('Job Title')}`,
      dataIndex: 'jobTitle',
      key: 'jobTitle',
      sorter: (a, b) => a.jobTitle.length - b.jobTitle.length,
    },
    {
      title: `${t('Submission date')}`,
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => {
        var dateA = a.createdAt.split('/').reverse().join(),
          dateB = b.createdAt.split('/').reverse().join()
        return dateA < dateB ? -1 : dateA > dateB ? 1 : 0
      },
    },
    {
      title: `${t('Salary')}`,
      dataIndex: 'salary',
      key: 'salary',
    },
    {
      title: `${t('Status')}`,
      dataIndex: 'status',
      key: 'status',
      render: (text) => t(text),
    },
    {
      title: `${t('Action')}`,
      dataIndex: 'action',
      key: 'action',
      width: 100,
      align: 'center',
      render: (action) => {
        return (
          <div>
            <Tooltip title={t('View profile details')}>
              <FaEye
                onClick={() => onOpenModal(action.application)}
                className={classes.table__iconAction}
              />
            </Tooltip>
            <Tooltip title={t('Download CV')}>
              <a href={action.cvPath} target="_blank" rel="noreferrer">
                <FaFileDownload className={classes.table__iconAction} />
              </a>
            </Tooltip>
            <Tooltip placement="bottom" title={t('Save profile')}>
              {isNotSaved && (
                <PopoverField
                  title={t('Confirm to save this profile')}
                  subTitle={t('Do you want to save this profile?')}
                  loading={loadingSaved}
                  onClickOk={() => {
                    handleClickSaveApplication(action.id)
                  }}
                  titleCancel={t('Cancel')}
                  titleOk={t('Save')}
                  isSwap
                >
                  <FaSave className={classes.table__iconAction} />
                </PopoverField>
              )}
            </Tooltip>
            <Tooltip
              placement="bottom"
              title={isDelete ? t('Restore profile') : t('Delete profile')}
            >
              <PopoverField
                title={
                  isDelete
                    ? t('Confirm to restore this profile')
                    : t('Confirm to delete this profile')
                }
                subTitle={
                  isDelete
                    ? t('Do you want to restore this profile?')
                    : t('Do you want to delete this profile?')
                }
                isSwap={isDelete ? true : false}
                loading={isDelete ? loadingRestore : loadingDeleted}
                onClickOk={() => {
                  if (isDelete) {
                    handleClickRestoreApplication(action.id)
                  } else {
                    handleClickDeleteApplication(action.id)
                  }
                }}
                titleCancel={t('Cancel')}
                titleOk={isDelete ? t('Restore') : t('Delete')}
              >
                {isDelete ? (
                  <MdRestorePage className={classes.table__iconAction} />
                ) : (
                  isNotSaved && <FaTrash className={classes.table__iconAction} />
                )}
              </PopoverField>
            </Tooltip>
          </div>
        )
      },
    },
  ]

  const data = jobsApplication.map((jobItem) => {
    const { id, fullName, phone, createdAt, status, job, cvPath } = jobItem
    return {
      key: id,
      fullName: fullName,
      phone: phone,
      jobTitle: job.jobTitle,
      createdAt: moment(createdAt).format(dateFormatPicker),
      salary: `${
        job.salary.min
          ? `${job.salary.min} - ${job.salary.max} ${job.salary.type}`
          : t(job.salary.type)
      }`,
      status: status,
      action: {
        cvPath: cvPath,
        id: id,
        application: jobItem,
      },
    }
  })

  const rowSelect = {
    selectedRowKeys: selectProfileList,
    onSelectAll: (selected, selectedRows) => {
      if (!selected) {
        setSelectProfileList([])
      } else {
        setSelectProfileList(selectedRows.map((item) => item.key))
      }
    },
    onSelect: (record, isSelect) => {
      if (isSelect) {
        setSelectProfileList((prevState) => [...prevState, record.key])
      } else {
        setSelectProfileList((prevState) => prevState.filter((item) => item !== record.key))
      }
    },
  }

  return (
    <Fragment>
      <ModalViewProfileApplication
        showModal={showModal}
        onCloseModal={onCloseModal}
        application={application}
        isDelete={isDelete}
        isNotSaved={isNotSaved}
        isSaved={isSaved}
        loadingSaved={loadingSaved}
        loadingDeleted={loadingDeleted}
        loadingRestore={loadingRestore}
        onDelete={handleClickDeleteApplication}
        onSave={handleClickSaveApplication}
        onRestore={handleClickRestoreApplication}
      />
      {isSaved && (
        <div className={classes.table__actions}>
          {showModalEntryTest && (
            <ModalNotify
              showModal={showModalEntryTest}
              title={t('Select Entry test to notify')}
              loading={loading.entryTest}
              onClose={() => setShowModalEntryTest(false)}
              captionBtnClose={t('Cancel')}
              captionBtnOk={t('Send notification')}
              onOk={handleClickAnnounceEntryTest}
            >
              <LabelField label={t('choose-entryTest')} />
              <Select
                options={entryTests}
                placeholder={t('choose-entryTest')}
                onChange={handleChangeSelect}
              />
            </ModalNotify>
          )}

          <ButtonField
            backgroundcolor="#1e88e5"
            backgroundcolorhover="#1774c6"
            onClick={handleShowModalSelect}
          >
            <MdNotificationsActive className={classes['table__actions--icon']} />
            {t('Notice of participating in the entry test')}
          </ButtonField>

          <ButtonField
            backgroundcolor="#067951"
            backgroundcolorhover="#2baa7e"
            onClick={handleClickAnnounceApplication}
            loading={loading.application}
          >
            <MdNotificationsActive className={classes['table__actions--icon']} />
            {t('Pass notification')}
          </ButtonField>
        </div>
      )}
      <Table
        bordered
        scroll={{ x: 'max-content' }}
        rowSelection={isSaved && { type: 'checkbox', ...rowSelect }}
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 10,
        }}
        showSorterTooltip={false}
        style={{ cursor: 'pointer' }}
      />
    </Fragment>
  )
}
