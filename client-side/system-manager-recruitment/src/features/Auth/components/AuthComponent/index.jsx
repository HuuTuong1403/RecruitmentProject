import classes from "./style.module.scss";

const AuthComponent = ({ title, children }) => {
  return (
    <div className={classes.auth}>
      <div className={classes.auth__wrapped}>
        <div className={classes.auth__container}>
          <div className={classes["auth__container--title"]}>
            System Management Portal
          </div>
          <div className={classes["auth__container--content"]}>{title}</div>
          <div className={classes["auth__container--form"]}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
