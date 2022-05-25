import { Table, Tooltip } from 'antd'
import { pathEmployer } from 'common/constants/path'
import { notification } from 'components'
import { PopoverField } from 'custom-fields'
import { restoreQuestion, softDeleteQuestion } from 'features/Employers/api/employer.api'
import { getAllQuestionAsync } from 'features/Employers/slices/thunks'
import { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaEdit, FaTrash, FaTrashRestore } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import classes from './style.module.scss'

export const TableQuestionAnswer = ({ questions, isTrash = false }) => {
  const { t } = useTranslation()
  const history = useHistory()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const handeDeleteQuestion = async (id) => {
    setLoading(true)
    const result = await softDeleteQuestion({ id })
    if (result.status === 204) {
      notification(t('Move question & answer to trash successfully'), 'success')
      dispatch(getAllQuestionAsync())
    } else {
      notification(t('Error! An error occurred. Please try again later'), 'error')
    }
    setLoading(false)
  }

  const handleRestoreQuestion = async (id) => {
    const result = await restoreQuestion({ id })
    console.log(result)
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      render: (text) => <div style={{ textAlign: 'center' }}>{text}</div>,
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <div>
          {isTrash ? (
            <Fragment>
              <Fragment>
                <PopoverField
                  title={t('Confirm restore this question & answer')}
                  subTitle={t('Do you want to restore question & answer?')}
                  titleCancel={t('Cancel')}
                  titleOk={t('Restore')}
                  onClickOk={() => handleRestoreQuestion(record.key)}
                  isSwap
                >
                  <FaTrashRestore className={`${classes.icon} ${classes.icon__restore}`} />
                </PopoverField>

                <PopoverField
                  title={t('Confirm delete forever this question & answer')}
                  subTitle={t('Do you want to delete forever this question & answer?')}
                  titleCancel={t('Cancel')}
                  titleOk={t('Delete')}
                >
                  <FaTrash className={`${classes.icon} ${classes.icon__delete}`} />
                </PopoverField>
              </Fragment>
            </Fragment>
          ) : (
            <Fragment>
              <Tooltip title={t('Edit')}>
                <FaEdit
                  className={`${classes.icon} ${classes.icon__edit}`}
                  onClick={() => history.push(`${pathEmployer.createdQuestion}?key=${record.key}`)}
                />
              </Tooltip>

              <PopoverField
                title={t('Confirm delete question & answer')}
                subTitle={t('Do you want to delete this question & answer?')}
                titleCancel={t('Cancel')}
                titleOk={t('Delete')}
                loading={loading}
                onClickOk={() => handeDeleteQuestion(record.key)}
              >
                <FaTrash className={`${classes.icon} ${classes.icon__delete}`} />
              </PopoverField>
            </Fragment>
          )}
        </div>
      ),
    },
    {
      title: `${t('Question content')}`,
      dataIndex: 'questionContent',
      key: 'questionContent',
    },
    {
      title: `${t('Number of answers')}`,
      dataIndex: 'answersNum',
      key: 'answersNum',
      render: (text) => (
        <div style={{ textAlign: 'right' }}>
          {text} {t('answers')}
        </div>
      ),
    },
    {
      title: `${t('Score')}`,
      dataIndex: 'score',
      key: 'score',
      render: (text) => <div style={{ textAlign: 'right' }}>{text}</div>,
    },
    {
      title: `${t('Question answer time')}`,
      dataIndex: 'duration',
      key: 'duration',
      render: (text) => <div style={{ textAlign: 'right' }}>{text}s</div>,
    },
    {
      title: `${t('Question type')}`,
      dataIndex: 'questionType',
      key: 'questionType',
      render: (text) => <span>{t(text)}</span>,
    },
    {
      title: `${t('Question level')}`,
      dataIndex: 'level',
      key: 'level',
      render: (text) => <span>{t(text)}</span>,
    },
    {
      title: `${t('Skills for questions')}`,
      dataIndex: 'skillString',
      key: 'skillString',
    },
  ]

  const datas = questions.map((question, index) => {
    const { _id, skills, answers, ...data } = question

    return {
      key: _id,
      ...data,
      index: index + 1,
      skillString: skills.join(', '),
      answersNum: answers.length,
    }
  })

  return (
    <Fragment>
      <div className={classes.titleTable}>
        {t(isTrash ? 'List question & answer deleted' : 'List question & answer created')}
      </div>
      <Table
        bordered
        scroll={{ x: 'max-content' }}
        columns={columns}
        dataSource={datas}
        pagination={{
          pageSize: 10,
        }}
        showSorterTooltip={false}
        style={{ cursor: 'pointer' }}
      />
    </Fragment>
  )
}
