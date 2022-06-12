import { dateFormatHourMinute } from 'common/constants/dateFormat'
import { convertTime } from 'common/functions'
import { useTitle } from 'common/hook/useTitle'
import { LoadingSuspense, notification } from 'components'
import { selectAnswerSheet, selectStatus } from 'features/EntryTest/slices/selector'
import { getAnswerSheetByIdAsync } from 'features/EntryTest/slices/thunks'
import moment from 'moment'
import { createRef, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import classes from './style.module.scss'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import { Questionitem } from 'features/EntryTest/components'
import { ButtonField } from 'custom-fields'

const ResultExamPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { id, idEntryTest } = useParams()
  const status = useSelector(selectStatus)
  const answerSheet = useSelector(selectAnswerSheet)
  const [loaded, setLoadded] = useState(false)
  const scrollQuesRef = useRef([])

  useTitle(`${t('Exam results')}: ${((answerSheet || {}).entryTest || {}).title || ''}`)

  useEffect(() => {
    if (id && idEntryTest) {
      dispatch(getAnswerSheetByIdAsync({ idEntryTest, idAnswerSheet: id }))
    }
  }, [dispatch, id, idEntryTest])

  // #region Create Ref For Question
  useEffect(() => {
    if (answerSheet) {
      if (!loaded) {
        scrollQuesRef.current = [...Array(answerSheet.entryTest.questions.length).keys()].map(
          (_, i) => scrollQuesRef.current[i] ?? createRef()
        )
        setLoadded(true)
      }
    }
  }, [answerSheet, loaded, dispatch])
  // #endregion

  const handlerScrollToQuestion = (index) => {
    scrollQuesRef.current[index].current.scrollIntoView({ behavior: 'smooth' })
  }

  const handleCheckResult = () => {
    notification(
      `Thank you for taking part in the entry test ${answerSheet.entryTest.title || ''}`,
      'success'
    )
    history.replace('/')
  }

  return status ? (
    <LoadingSuspense height="80vh" />
  ) : (
    answerSheet && (
      <div className={classes.resultPage}>
        <div style={{ width: '65%' }}>
          <div className={classes.card}>
            <div className={classes.resultPage__header}>
              {t('Exam results')}: {answerSheet.entryTest.title || ''}
            </div>

            <table className={classes.table}>
              <tbody>
                <tr>
                  <td>{t('Total right question')}</td>
                  <td>
                    {answerSheet.totalRightQuestion || 0}/
                    {answerSheet.entryTest.questions.length || 0}
                  </td>
                </tr>
                <tr>
                  <td>{t('Exam time')}</td>
                  <td>{convertTime(answerSheet.duration, t)}</td>
                </tr>
                <tr>
                  <td>{t('Number of points achieved')}</td>
                  <td>
                    {answerSheet.achievedFullScore || 0}/{answerSheet.entryTest.totalScore || 0}
                  </td>
                </tr>
                <tr>
                  <td>{t('Minimum score achieved')}</td>
                  <td>{answerSheet.entryTest.requiredPass || 0}</td>
                </tr>
                <tr>
                  <td>{t('Status')}</td>
                  <td
                    className={
                      answerSheet.achievedFullScore < answerSheet.entryTest.requiredPass
                        ? classes.notPass
                        : classes.pass
                    }
                  >
                    {answerSheet.achievedFullScore < answerSheet.entryTest.requiredPass
                      ? 'Không đạt'
                      : 'Đã đạt'}
                  </td>
                </tr>

                <tr>
                  <td>{t('Date finished')}</td>
                  <td>{moment(answerSheet.createdAt || '').format(dateFormatHourMinute)}</td>
                </tr>

                <tr>
                  <td>{t('Executor')}</td>
                  <td>{answerSheet.jobSeeker.fullname || ''}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={classes.card}>
            {answerSheet.entryTest.questions.map((question, index) => {
              const { _id } = question
              return (
                <Questionitem
                  key={_id}
                  scrollRef={scrollQuesRef.current[index]}
                  index={index}
                  question={question}
                  type="result"
                  answerContents={answerSheet.answerContents}
                />
              )
            })}
          </div>
        </div>

        <div className={classes.numQues}>
          {answerSheet.answerContents.map((item, index) => {
            const { idQuestion, selectedChoice, isCorrect } = item
            const choice = selectedChoice.length >= 1 ? `. ${selectedChoice.join(', ')}` : ''
            return (
              <div
                key={idQuestion}
                className={classes.numQues__item}
                onClick={() => handlerScrollToQuestion(index)}
              >
                <span className={classes.numQues__item__text}>
                  {index + 1}
                  {choice}
                </span>
                <div
                  className={`${classes.numQues__item__icon} ${
                    isCorrect === 0
                      ? classes['numQues__item__icon--inCorrect']
                      : classes['numQues__item__icon--correct']
                  }`}
                >
                  {isCorrect === 0 ? <FaTimesCircle /> : <FaCheckCircle />}
                </div>
              </div>
            )
          })}
          <div style={{ width: '100%' }}>
            <ButtonField
              backgroundcolor="#00c985"
              backgroundcolorhover="#34d49d"
              radius="4px"
              padding="6px 12px"
              width="auto"
              onClick={handleCheckResult}
            >
              {t('Finish checking results')}
            </ButtonField>
          </div>
        </div>
      </div>
    )
  )
}

export default ResultExamPage
