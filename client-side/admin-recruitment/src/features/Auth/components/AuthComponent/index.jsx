import classes from './style.module.scss'

const AuthComponent = (props) => {
  return (
    <div className={classes.auth}>
      <div className={classes.auth__wrapped}>
        <div className={classes.auth__container}>
          <div className={classes['auth__container--title']}>Administrator Portal</div>
          <div className={classes['auth__container--content']}>{props.title}</div>
          <div className={classes['auth__container--form']}>{props.children}</div>
        </div>
      </div>
    </div>
  )
}

export default AuthComponent
