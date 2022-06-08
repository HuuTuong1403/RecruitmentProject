import { selectNumQues } from 'features/EntryTest/slices/selector'
import { useSelector } from 'react-redux'
import classes from './style.module.scss'

export const NumQuestion = ({ questions, onScroll }) => {
  const numQues = useSelector(selectNumQues)
  return numQues.map((num, i) => {
    const choiceClient = num.selectedChoice.length >= 1 ? `. ${num.selectedChoice.join(', ')}` : ''
    return (
      <div key={i} className={classes.item} onClick={() => onScroll(i)}>
        {i + 1}
        {choiceClient}
      </div>
    )
  })
}
