import { MdClose } from 'react-icons/md'
import classes from './style.module.scss'

export const ImageContainer = ({ src, alt, id, index, onDelete }) => {
  return (
    <div className={classes.imageItem}>
      <img alt={alt} src={src} />
      <MdClose onClick={() => onDelete(id, index)} className={classes.imageItem__delete} />
    </div>
  )
}
