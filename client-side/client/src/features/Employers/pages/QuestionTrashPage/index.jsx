import { BiArrowBack } from 'react-icons/bi'
import { Fragment, useEffect } from 'react'
import { getAllQuestionDeletedAsync } from 'features/Employers/slices/thunks'
import { LoadingSuspense, NotFoundData } from 'components'
import { selectedStatus, selectQuestions } from 'features/Employers/slices/selectors'
import { TableQuestionAnswer } from 'features/Employers/components'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'

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
            <TableQuestionAnswer questions={questions} isTrash />
          </Fragment>
        )}
      </Fragment>
    )
  )
}

export default QuestionTrashPage
