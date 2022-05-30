import { ButtonField, WrappedInput as InputField } from 'custom-fields'
import { Drawer } from 'antd'
import { FaSearch } from 'react-icons/fa'
import { getAllQuestion } from 'features/Employers/api/employer.api'
import { LoadingSuspense } from 'components'
import { QuestionList } from '..'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'
import Select from 'react-select'

export const DrawerAddQuestion = ({
  visible,
  onClose,
  selectedQuestion,
  onSelectQuestion,
  skills,
  selectedSkill,
  onChangeSkill,
}) => {
  const { t } = useTranslation()
  const searchRef = useRef(null)

  const [questionData, setQuestionData] = useState({ loading: false, questions: [] })

  const handleSearchQuestion = async () => {
    let questionContent = ''
    if (searchRef.current) {
      questionContent = searchRef.current.value
    }
    const skills = selectedSkill.map((item) => item.label).join(',')

    const payload = { questionContent, skills }
    setQuestionData({ loading: true, questions: [] })
    const result = await getAllQuestion(payload)
    if (result.status === 'success') {
      const datas = (result.data || {}).data || []
      setQuestionData({ loading: false, questions: datas })
    }
  }

  useEffect(() => {
    handleSearchQuestion()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Drawer onClose={onClose} visible={visible} width={768}>
      <div className={classes.drawerTitle}>Ngân hàng câu hỏi</div>
      <div className={classes.header}>
        <div>
          <InputField
            ref={searchRef}
            placeholder={'Tìm kiếm câu hỏi'}
            icon={<FaSearch />}
            style={{ borderRadius: '5px' }}
            onKeyUp={(event) => {
              if (event.keyCode === 13) {
                handleSearchQuestion()
              }
            }}
          />
        </div>
        <div>
          <Select
            isMulti
            placeholder={t('choose skills')}
            options={skills}
            value={selectedSkill}
            onChange={onChangeSkill}
            closeMenuOnSelect={false}
          />
        </div>
      </div>
      <div className={classes.action}>
        <ButtonField
          backgroundcolor="#324554"
          onClick={handleSearchQuestion}
          backgroundcolorhover="#333"
          width="25%"
          radius="5px"
          padding="6px"
          uppercase
        >
          {t('Search')}
        </ButtonField>
      </div>
      {questionData.loading ? (
        <LoadingSuspense height="80vh" />
      ) : (
        <QuestionList
          questions={questionData.questions}
          onSelectQuestion={onSelectQuestion}
          selectQuestions={selectedQuestion}
          onSetQuestion={setQuestionData}
        />
      )}
    </Drawer>
  )
}
