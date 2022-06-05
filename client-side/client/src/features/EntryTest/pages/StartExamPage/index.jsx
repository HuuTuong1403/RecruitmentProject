import { createRef, useRef, useState } from 'react'
import { getEntryTestByIdAsync } from 'features/EntryTest/slices/thunks'
import { LoadingSuspense } from 'components'
import { selectEntryTest, selectStatus } from 'features/EntryTest/slices/selector'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'
import Countdown from 'react-countdown'
import { NumQuestion } from 'features/EntryTest/components'
import { handleChangeChoice } from 'features/EntryTest/slices'

const StartExamPage = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const dispatch = useDispatch()
  const entryTestData = useSelector(selectEntryTest)
  const status = useSelector(selectStatus)
  const scrollQuesRef = useRef([])
  const [loaded, setLoadded] = useState(false)
  const arrayAnswer = ['A', 'B', 'C', 'D', 'E', 'F']
  const answerContent = []

  useTitle(entryTestData?.title ?? '')

  useEffect(() => {
    if (!entryTestData) {
      dispatch(getEntryTestByIdAsync({ id }))
    }
  }, [dispatch, entryTestData, id])

  // #region Create Ref For Question
  useEffect(() => {
    if (entryTestData) {
      if (!loaded) {
        scrollQuesRef.current = [...Array(entryTestData.questions.length).keys()].map(
          (_, i) => scrollQuesRef.current[i] ?? createRef()
        )
        setLoadded(true)
      }
    }
  }, [entryTestData, loaded])
  // #endregion

  // #region Renderer Custom Time Countdown
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <div>Ok</div>
    } else {
      return (
        <div className={classes.startExam__numQues__timeCount__countdown}>
          Thời gian còn lại:{' '}
          <span style={seconds < 10 ? { color: 'red' } : {}}>
            {minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}
          </span>
        </div>
      )
    }
  }
  // #endregion

  const handlerScrollToQuestion = (index) => {
    scrollQuesRef.current[index].current.scrollIntoView({ behavior: 'smooth' })
  }

  // #region Handler When Click Input Radio Or Checkbox
  const handlerChangeAnswerQuestion = (e, idQues, choiceAnswer, choiceClient, type) => {
    dispatch(handleChangeChoice({ type, idQues, isChecked: e.target.checked, choiceClient }))
    const _index = answerContent.findIndex((data) => data.idQuestion === idQues)
    if (type === 'Multi-choice') {
      if (_index >= 0) {
        if (answerContent[_index].selectedChoice.length >= 1) {
          if (e.target.checked) {
            const oldChoice = answerContent[_index].selectedChoice
            if (!oldChoice.includes(choiceAnswer)) {
              answerContent[_index].selectedChoice = [...oldChoice, ...choiceAnswer]
            }
          } else {
            const oldChoice = answerContent[_index].selectedChoice
            answerContent[_index].selectedChoice = oldChoice.filter((item) => item !== choiceAnswer)
          }
        } else {
          answerContent[_index].selectedChoice = [...choiceAnswer]
        }
      } else {
        answerContent.push({ idQuestion: idQues, selectedChoice: [...choiceAnswer] })
      }
    } else {
      if (_index >= 0) {
        answerContent[_index].selectedChoice = [...choiceAnswer]
      } else {
        answerContent.push({ idQuestion: idQues, selectedChoice: [...choiceAnswer] })
      }
    }
  }
  // #endregion

  return status ? (
    <LoadingSuspense height="80vh" />
  ) : (
    entryTestData && (
      <div className={classes.startExam}>
        <div className={classes.startExam__numQues}>
          <div className={classes.startExam__numQues__wrap}>
            <NumQuestion onScroll={handlerScrollToQuestion} questions={entryTestData.questions} />
          </div>

          <div className={classes.startExam__numQues__timeCount}>
            <Countdown date={Date.now() + entryTestData.duration * 1000} renderer={renderer} />
          </div>
        </div>

        <div className={classes.startExam__title}>Bài thi: {entryTestData.title}</div>

        <div className={classes.startExam__questionList}>
          <div>
            {entryTestData.questions.map((question, i) => {
              const { _id, questionContent, score, answers, questionType } = question
              return (
                <div
                  key={_id}
                  className={classes.startExam__questionItem}
                  ref={scrollQuesRef.current[i]}
                >
                  <div className={classes.startExam__questionItem__left}>
                    <div className={classes.startExam__questionItem__left__title}>
                      Câu hỏi {i + 1}
                    </div>
                    <div>Điểm: {score}</div>
                    <div>Loại: {t(questionType)}</div>
                  </div>

                  <div className={classes.startExam__questionItem__right}>
                    <div className={classes.startExam__questionItem__right__content}>
                      {questionContent}
                    </div>
                    <div className={classes.startExam__answerList}>
                      {answers.map((answer, index) => {
                        const { choice } = answer
                        const { contentChoice } = answer.answer

                        return (
                          <label key={index} className={classes.startExam__answerItem}>
                            <input
                              type={questionType === 'Single' ? 'radio' : 'checkbox'}
                              name={'answerChoice' + question._id}
                              className={classes.startExam__answerItem__input}
                              onChange={(event) => {
                                handlerChangeAnswerQuestion(
                                  event,
                                  question._id,
                                  choice,
                                  arrayAnswer[index],
                                  questionType
                                )
                              }}
                            />
                            <div className={classes.startExam__answerItem__choice}>
                              {arrayAnswer[index]}.
                            </div>
                            <div className={classes.startExam__answerItem__content}>
                              {contentChoice}
                            </div>
                          </label>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  )
}

export default StartExamPage
