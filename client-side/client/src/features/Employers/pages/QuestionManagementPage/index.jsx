import { ButtonField } from 'custom-fields'
import { FaTrash } from 'react-icons/fa'
import { Fragment, useEffect } from 'react'
import { getAllQuestionAsync } from 'features/Employers/slices/thunks'
import { LoadingSuspense, NotFoundData, notification } from 'components'
import { MdAddCircleOutline } from 'react-icons/md'
import { pathEmployer } from 'common/constants/path'
import { selectedStatus, selectQuestions } from 'features/Employers/slices/selectors'
import { TableData } from 'features/Employers/components'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'
import { softDeleteQuestion } from 'features/Employers/api/employer.api'
import { convertTime } from 'common/functions'

const QuestionManagementPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { t } = useTranslation()
  const status = useSelector(selectedStatus)
  const questions = useSelector(selectQuestions)

  useTitle(t('Question & answer management'))

  useEffect(() => {
    dispatch(getAllQuestionAsync())
  }, [dispatch])

  const columns = [
    {
      title: `${t('Question content')}`,
      dataIndex: 'questionContent',
      key: 'questionContent',
      width: 300,
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
      title: `${t('Thuộc câu hỏi')}`,
      dataIndex: 'employerCreator',
      key: 'employerCreator',
      width: 220,
      render: (text, record) => {
        if (record.isPrivate) {
          return (
            <span>
              {text}
              <br /> <b>(Không công khai)</b>
            </span>
          )
        } else {
          return (
            <span>
              {text}
              <br /> <b>(Đã công khai)</b>
            </span>
          )
        }
      },
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
      render: (text) => <div style={{ textAlign: 'right' }}>{convertTime(text, t)}</div>,
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

  const handleEditQuestion = (id) => {
    history.push(`${pathEmployer.createdQuestion}?key=${id}`)
  }

  const handleMoveTrashQuestion = async (id) => {
    const result = await softDeleteQuestion({ id })
    if (result.status === 204) {
      notification(t('Move question & answer to trash successfully'), 'success')
      dispatch(getAllQuestionAsync())
    } else {
      notification(t('Error! An error occurred. Please try again later'), 'error')
    }
  }

  return status ? (
    <LoadingSuspense height="80vh" />
  ) : (
    questions && (
      <Fragment>
        <div className={classes.titleDashboard}>{t('Question & answer management')}</div>
        <div style={{ marginTop: '4px' }}>
          <ButtonField
            backgroundcolor="#007bff"
            backgroundcolorhover="#007bffad"
            radius="5px"
            width="15%"
            onClick={() => history.push(pathEmployer.createdQuestion)}
          >
            <MdAddCircleOutline style={{ marginRight: '2px' }} /> {t('Add question')}
          </ButtonField>
          <span style={{ marginLeft: '5px', marginRight: '5px' }}></span>
          <ButtonField
            backgroundcolor="#dd4b39"
            backgroundcolorhover="#ff7875"
            radius="5px"
            width="10%"
            onClick={() => history.push(pathEmployer.trashQuestion)}
          >
            <FaTrash style={{ marginRight: '2px' }} /> {t('Trash')}
          </ButtonField>
        </div>
        {questions.length === 0 ? (
          <NotFoundData title={t('You have not created any questions yet')} />
        ) : (
          <Fragment>
            <TableData
              columns={columns}
              dataSource={questions.map((question, index) => {
                const { _id, skills, answers, employerCreator, ...data } = question

                let creator = ''
                if (employerCreator) {
                  creator = 'Từ công ty ' + employerCreator.companyName
                } else {
                  creator = 'Từ cộng đồng'
                }

                return {
                  key: _id,
                  ...data,
                  index: index + 1,
                  skillString: skills.join(', '),
                  answersNum: answers.length,
                  employerCreator: creator,
                }
              })}
              titleList={t('List question & answer created')}
              onEdit={handleEditQuestion}
              onMoveTrash={handleMoveTrashQuestion}
              titlePopover={{
                moveTrash: {
                  title: 'Confirm move this question & answer to trash',
                  subTitle: 'Do you want to move this question & answer to trash',
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

export default QuestionManagementPage
