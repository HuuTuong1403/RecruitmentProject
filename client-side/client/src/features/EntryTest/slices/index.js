import { createSlice } from '@reduxjs/toolkit'
import { randomArray } from 'common/functions'
import { getAnswerSheetByIdAsync, getEntryTestByIdAsync } from './thunks'

const initialState = {
  entryTest: null,
  answerClient: [],
  answerContent: [],
  answerSheet: null,
  showModal: false,
  timneCountDown: null,
  status: false,
}

export const entryTestSlice = createSlice({
  name: 'entryTests',
  initialState,
  reducers: {
    handleChangeAnswerClient: (state, action) => {
      const { type, idQues, isChecked, choiceClient } = action.payload
      const _index = state.answerClient.findIndex((data) => data.idQuestion === idQues)
      if (type === 'Multi-choice') {
        if (_index >= 0) {
          if (state.answerClient[_index].selectedChoice.length >= 1) {
            if (isChecked) {
              const oldChoice = state.answerClient[_index].selectedChoice
              if (!oldChoice.includes(choiceClient)) {
                state.answerClient[_index].selectedChoice = [...oldChoice, ...choiceClient]
              }
            } else {
              const oldChoice = state.answerClient[_index].selectedChoice
              state.answerClient[_index].selectedChoice = oldChoice.filter(
                (item) => item !== choiceClient
              )
            }
          } else {
            state.answerClient[_index].selectedChoice = [...choiceClient]
          }
        } else {
          state.answerClient.push({ idQuestion: idQues, selectedChoice: [...choiceClient] })
        }
      } else {
        if (_index >= 0) {
          state.answerClient[_index].selectedChoice = [...choiceClient]
        } else {
          state.answerClient.push({ idQuestion: idQues, selectedChoice: [...choiceClient] })
        }
      }
    },
    handleChangeAnswerContent: (state, action) => {
      const { type, idQues, isChecked, choiceContent } = action.payload
      const _index = state.answerContent.findIndex((data) => data.idQuestion === idQues)
      if (type === 'Multi-choice') {
        if (_index >= 0) {
          if (state.answerContent[_index].selectedChoice.length >= 1) {
            if (isChecked) {
              const oldChoice = state.answerContent[_index].selectedChoice
              if (!oldChoice.includes(choiceContent)) {
                state.answerContent[_index].selectedChoice = [...oldChoice, ...choiceContent]
              }
            } else {
              const oldChoice = state.answerContent[_index].selectedChoice
              state.answerContent[_index].selectedChoice = oldChoice.filter(
                (item) => item !== choiceContent
              )
            }
          } else {
            state.answerContent[_index].selectedChoice = [...choiceContent]
          }
        } else {
          state.answerContent.push({ idQuestion: idQues, selectedChoice: [...choiceContent] })
        }
      } else {
        if (_index >= 0) {
          state.answerContent[_index].selectedChoice = [...choiceContent]
        } else {
          state.answerContent.push({ idQuestion: idQues, selectedChoice: [...choiceContent] })
        }
      }
    },
    handleModal: (state) => {
      state.showModal = !state.showModal
    },
    setTimeCountDown: (state, action) => {
      const { time } = action.payload
      state.timneCountDown = Date.now() + time * 1000
    },
    resetState: (state) => {
      state.showModal = false
      state.timneCountDown = null
      state.answerClient = state.entryTest.questions.map((item) => ({
        idQuestion: item._id,
        selectedChoice: [],
      }))
      state.answerContent = []
    },
  },
  extraReducers: {
    [getEntryTestByIdAsync.pending]: (state) => {
      state.status = true
    },
    [getEntryTestByIdAsync.fulfilled]: (state, action) => {
      state.status = false
      state.answerClient = action.payload.questions.map((item) => ({
        idQuestion: item._id,
        selectedChoice: [],
      }))
      const datas = action.payload
      datas.questions.forEach((data) => {
        if (data.isRandom) {
          const answerRandom = randomArray(data.answers)
          data.answers = answerRandom
        }
      })
      state.entryTest = datas
    },
    [getEntryTestByIdAsync.rejected]: (state) => {
      state.status = false
      state.entryTest = null
    },

    [getAnswerSheetByIdAsync.pending]: (state) => {
      state.status = true
    },
    [getAnswerSheetByIdAsync.fulfilled]: (state, action) => {
      state.answerSheet = action.payload
      state.status = false
    },
    [getAnswerSheetByIdAsync.rejected]: (state) => {
      state.answerSheet = null
      state.entryTest = null
    },
  },
})

export const {
  handleChangeAnswerClient,
  handleChangeAnswerContent,
  handleModal,
  setTimeCountDown,
  resetState,
} = entryTestSlice.actions
export default entryTestSlice.reducer
