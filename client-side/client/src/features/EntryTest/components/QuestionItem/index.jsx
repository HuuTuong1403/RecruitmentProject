import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'

export const Questionitem = ({
  question,
  index,
  onChange,
  scrollRef,
  type = 'start',
  answerContents = null,
}) => {
  const { t } = useTranslation()
  const { questionContent, score, answers, questionType, _id } = question
  const arrayAnswer = ['A', 'B', 'C', 'D', 'E', 'F']
  const styleDefault = type === 'result' ? { cursor: 'not-allowed' } : { cursor: 'pointer' }

  const handleChecked = (choice) => {
    let _index = answerContents.findIndex((item) => item.idQuestion === _id)
    const { selectedChoice } = answerContents[_index]
    if (questionType === 'Multi-choice') {
      if (selectedChoice.includes(choice)) {
        return true
      }
    } else {
      if (selectedChoice[0] === choice) {
        return true
      }
    }
    return false
  }

  const getCorrectAnswer = () => {
    const correctAns = answers.reduce((result, answer) => {
      if (answer.answer.isCorrect) {
        result.push(answer.choice)
      }
      return result
    }, [])

    return correctAns.join(', ')
  }

  return (
    <div className={classes.questionItem} ref={scrollRef}>
      <div
        style={type === 'result' ? { flex: '0 0 15%' } : {}}
        className={classes.questionItem__left}
      >
        <div className={classes.questionItem__left__title}>Câu hỏi {index + 1}</div>
        {answerContents ? (
          <div>
            Đạt điểm: {(answerContents[index] || {}).achievedScore || 0}/{score}
          </div>
        ) : (
          <div>Điểm: {score}</div>
        )}
        <div>Loại: {t(questionType)}</div>
        {answerContents && <div>Đáp án đúng: {getCorrectAnswer()}</div>}
      </div>

      <div
        style={type === 'result' ? { flex: '1 1 auto' } : {}}
        className={classes.questionItem__right}
      >
        <div className={classes.questionItem__right__content}>{questionContent}</div>
        <div className={classes.answerList}>
          {answers.map((answer, index) => {
            const { choice } = answer
            const { contentChoice } = answer.answer

            return (
              <label style={styleDefault} key={index} className={classes.answerItem}>
                <input
                  disabled={type === 'result'}
                  type={questionType === 'Single' ? 'radio' : 'checkbox'}
                  name={'answerChoice' + question._id}
                  className={classes.answerItem__input}
                  style={styleDefault}
                  onChange={(event) => {
                    onChange(event, question._id, choice, arrayAnswer[index], questionType)
                  }}
                  checked={answerContents && handleChecked(arrayAnswer[index])}
                />
                <div className={classes.answerItem__choice}>{arrayAnswer[index]}.</div>
                <div className={classes.answerItem__content}>{contentChoice}</div>
              </label>
            )
          })}
        </div>
      </div>
    </div>
  )
}
