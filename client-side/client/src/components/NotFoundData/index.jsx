import classes from "./style.module.scss";

const NotFoundData = (props) => {
  const { title } = props;

  return (
    <div className={classes.notFoundData}>
      <div className={classes.notFoundData__wrapped}>
        <div className={classes["notFoundData__wrapped--notify"]}>{title}</div>
      </div>
    </div>
  );
};

export default NotFoundData;
