import { createSlice } from '@reduxjs/toolkit'
import { randomArray } from 'common/functions'
import { getEntryTestByIdAsync } from './thunks'

const initialState = {
  entryTest: null,
  numQues: [],
  status: false,
}

export const entryTestSlice = createSlice({
  name: 'entryTests',
  initialState,
  reducers: {
    handleChangeChoice: (state, action) => {
      const { type, idQues, isChecked, choiceClient } = action.payload
      const _index = state.numQues.findIndex((data) => data.idQuestion === idQues)
      if (type === 'Multi-choice') {
        if (_index >= 0) {
          if (state.numQues[_index].selectedChoice.length >= 1) {
            if (isChecked) {
              const oldChoice = state.numQues[_index].selectedChoice
              if (!oldChoice.includes(choiceClient)) {
                state.numQues[_index].selectedChoice = [...oldChoice, ...choiceClient]
              }
            } else {
              const oldChoice = state.numQues[_index].selectedChoice
              state.numQues[_index].selectedChoice = oldChoice.filter(
                (item) => item !== choiceClient
              )
            }
          } else {
            state.numQues[_index].selectedChoice = [...choiceClient]
          }
        } else {
          state.numQues.push({ idQuestion: idQues, selectedChoice: [...choiceClient] })
        }
      } else {
        if (_index >= 0) {
          state.numQues[_index].selectedChoice = [...choiceClient]
        } else {
          state.numQues.push({ idQuestion: idQues, selectedChoice: [...choiceClient] })
        }
      }
    },
  },
  extraReducers: {
    [getEntryTestByIdAsync.pending]: (state) => {
      state.status = true
    },
    [getEntryTestByIdAsync.fulfilled]: (state, action) => {
      state.status = false
      state.numQues = action.payload.questions.map((item) => ({
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
  },
})

export const { handleChangeChoice } = entryTestSlice.actions
export default entryTestSlice.reducer
