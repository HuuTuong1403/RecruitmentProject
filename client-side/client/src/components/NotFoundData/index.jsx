import classes from "./style.module.scss";

const NotFoundData = ({ title }) => {
  return (
    <div className={classes.notFoundData}>
      <div className={classes.notFoundData__wrapped}>
        <div className={classes["notFoundData__wrapped--notify"]}>{title}</div>
      </div>
    </div>
  );
};

export default NotFoundData;
