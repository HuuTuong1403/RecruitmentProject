import { BiArrowBack } from 'react-icons/bi'
import { Fragment, useEffect } from 'react'
import { getAllQuestionDeletedAsync } from 'features/Employers/slices/thunks'
import { LoadingSuspense, NotFoundData, notification } from 'components'
import { selectedStatus, selectQuestions } from 'features/Employers/slices/selectors'
import { TableData } from 'features/Employers/components'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'
import { convertTime } from 'common/functions'
import { deleteQuestion, restoreQuestion } from 'features/Employers/api/employer.api'

const QuestionTrashPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { t } = useTranslation()
  const status = useSelector(selectedStatus)
  const questions = useSelector(selectQuestions)

  useTitle(`${t('Question & answer deleted')}`)

  useEffect(() => {
    dispatch(getAllQuestionDeletedAsync())
  }, [dispatch])

  const columns = [
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

  const handleRestoreQuestion = async (id) => {
    const result = await restoreQuestion({ id })
    if (result.status === 'success') {
      notification(t('Restore question & answer successfully'), 'success')
      dispatch(getAllQuestionDeletedAsync())
    } else {
      notification(result.message, 'error')
    }
  }

  const handleDeleteQuestion = async (id) => {
    const result = await deleteQuestion({ id })
    if (result.status === 204) {
      notification(t('Delete question & answer forever successfully'), 'success')
      dispatch(getAllQuestionDeletedAsync())
    } else {
      notification(t('Error! An error occurred. Please try again later'), 'error')
    }
  }

  return status ? (
    <LoadingSuspense height="80vh" />
  ) : (
    questions && (
      <Fragment>
        <div className={classes.headerBack}>
          <div>
            <BiArrowBack onClick={() => history.goBack()} />
          </div>
          <div>{t('Question & answer deleted')}</div>
        </div>
        {questions.length === 0 ? (
          <NotFoundData title={t('You have not deleted any questions yet')} />
        ) : (
          <Fragment>
            <TableData
              columns={columns}
              dataSource={questions.map((question, index) => {
                const { _id, skills, answers, ...data } = question

                return {
                  key: _id,
                  ...data,
                  index: index + 1,
                  skillString: skills.join(', '),
                  answersNum: answers.length,
                }
              })}
              titleList={t('List question & answer deleted')}
              titlePopover={{
                restore: {
                  title: 'Confirm restore this question & answer',
                  subTitle: 'Do you want to restore question & answer',
                },
                delete: {
                  title: 'Confirm delete forever this question & answer',
                  subTitle: 'Do you want to delete forever this question & answer',
                },
              }}
              onRestore={handleRestoreQuestion}
              onDelete={handleDeleteQuestion}
              isTrash
              isUseAction
            />
          </Fragment>
        )}
      </Fragment>
    )
  )
}

export default QuestionTrashPage
