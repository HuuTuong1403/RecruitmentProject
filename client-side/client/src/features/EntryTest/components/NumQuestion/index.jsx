import { selectAnswerClient } from 'features/EntryTest/slices/selector'
import { useSelector } from 'react-redux'
import classes from './style.module.scss'

export const NumQuestion = ({ onScroll }) => {
  const answerClient = useSelector(selectAnswerClient)
  return answerClient.map((num, i) => {
    const choiceClient = num.selectedChoice.length >= 1 ? `. ${num.selectedChoice.join(', ')}` : ''
    return (
      <div key={i} className={classes.item} onClick={() => onScroll(i)}>
        {i + 1}
        {choiceClient}
      </div>
    )
  })
}
