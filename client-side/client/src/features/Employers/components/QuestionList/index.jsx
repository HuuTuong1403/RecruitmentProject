import {
  FaCheckCircle,
  FaCheckSquare,
  FaLevelUpAlt,
  FaListOl,
  FaLock,
  FaLockOpen,
  FaPlusCircle,
  FaRandom,
  FaStar,
  FaStopwatch,
  FaTrash,
  FaUser,
} from 'react-icons/fa'
import { ButtonField } from 'custom-fields'
import { convertTime } from 'common/functions'
import { Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'

export const QuestionList = ({
  questions,
  selectQuestions,
  onSelectQuestion,
  onSetQuestion,
  isSelectList = false,
  onDeleteQuestion,
}) => {
  const { t } = useTranslation()

  return (
    <div className={classes.questionList}>
      {questions.map((question, index) => {
        const {
          _id,
          questionType,
          questionContent,
          answers,
          duration,
          score,
          level,
          isRandom,
          skills,
          employerCreator,
          isPrivate,
        } = question

        const checkQuestion = questionContent.includes('?')
        const isSelected = (selectQuestions || []).some((item) => item._id === _id)
        const durationConvert = convertTime(duration, t)
        const skillString = skills.join(', ')
        const creator = !!employerCreator ? employerCreator.companyName : 'Community'

        const tagItem = [
          {
            icon: <FaStopwatch className={classes.tagList__item__icon} />,
            titleTooltip: `${t('Question answer time')}: ${durationConvert}`,
            content: durationConvert,
            isShow: true,
          },
          {
            icon: <FaStar className={classes.tagList__item__icon} />,
            titleTooltip: `${t('Score')}: ${score}`,
            content: score,
            isShow: true,
          },
          {
            icon: <FaLevelUpAlt className={classes.tagList__item__icon} />,
            titleTooltip: `${t('Level')}: ${t(level)}`,
            content: t(level),
            isShow: true,
          },
          {
            icon: <FaRandom className={classes.tagList__item__icon} />,
            titleTooltip: '',
            content: t('Random answer'),
            isShow: isRandom,
          },
          {
            icon: <FaListOl className={classes.tagList__item__icon} />,
            titleTooltip: `${t('Skill')}: ${skillString}`,
            content: skillString,
            isShow: true,
          },
          {
            icon: <FaUser className={classes.tagList__item__icon} />,
            titleTooltip: `${t('Created by')}: ${t(creator)}`,
            content: t(creator),
            isShow: true,
          },
          {
            icon: isPrivate ? (
              <FaLock className={classes.tagList__item__icon} />
            ) : (
              <FaLockOpen className={classes.tagList__item__icon} />
            ),
            titleTooltip: isPrivate ? t('Question not public') : t('Question publiced'),
            content: isPrivate ? t('Not public') : t('Publiced'),
            isShow: true,
          },
        ]

        return (
          <div key={_id} className={classes.questionList__questionItem}>
            <div className={classes.questionList__questionItem__header}>
              <div className={classes.questionList__questionItem__header__left}>
                {questionType === 'Single' ? (
                  <FaCheckCircle className={classes.icon} />
                ) : (
                  <FaCheckSquare className={classes.icon} />
                )}{' '}
                {t(questionType)}
              </div>
              <div className={classes.questionList__questionItem__header__right}>
                {onSelectQuestion && (
                  <ButtonField
                    backgroundcolor="#0a426e"
                    backgroundcolorhover="#324554"
                    radius="4px"
                    padding="4px"
                    disabled={isSelected}
                    width="30%"
                    onClick={isSelected ? null : () => onSelectQuestion(question)}
                  >
                    <FaPlusCircle className={classes.actionData__icon} />{' '}
                    {isSelected ? t('Đã thêm') : t('Thêm vào')}
                  </ButtonField>
                )}

                {isSelectList && (
                  <ButtonField
                    backgroundcolor="#dd4b39"
                    backgroundcolorhover="#ff7875"
                    radius="4px"
                    padding="4px"
                    width="30%"
                    onClick={() => {
                      onDeleteQuestion(_id)
                    }}
                  >
                    <FaTrash className={classes.actionData__icon} />
                    {t('Delete')}
                  </ButtonField>
                )}
              </div>
            </div>

            <div className={classes.questionList__questionItem__body}>
              <div className={classes.questionList__questionItem__content}>
                <span>Q{index + 1}.</span> {questionContent} {checkQuestion ? '' : '?'}
              </div>

              <div className={classes.labelWithLine}>
                <label>{t('Answer')}</label>
              </div>

              <div className={classes.answerList}>
                {answers.map((data) => {
                  const { answer, choice } = data
                  const { contentChoice, isCorrect } = answer

                  return (
                    <div key={choice} className={classes.answerList__answerItem}>
                      <span
                        className={`${classes.answerList__answerItem__isCorrect} ${
                          isCorrect
                            ? classes['answerList__answerItem__isCorrect--correct']
                            : classes['answerList__answerItem__isCorrect--notCorrect']
                        }`}
                      ></span>
                      <span className={classes.answerList__answerItem}>{choice}.</span>{' '}
                      {contentChoice}
                    </div>
                  )
                })}
              </div>

              <div className={classes.labelWithLine}>
                <label>{t('Other information')}</label>
              </div>

              <div className={classes.tagList}>
                {tagItem.map((tag, index) => (
                  <TagItem key={index} title={tag.titleTooltip} isShow={tag.isShow}>
                    {tag.icon}
                    {tag.content}
                  </TagItem>
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const TagItem = ({ title, children, isShow }) => {
  return (
    isShow && (
      <Tooltip title={title}>
        <div className={classes.tagList__item}>{children}</div>
      </Tooltip>
    )
  )
}
