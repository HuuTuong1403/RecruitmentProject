import classes from "./style.module.scss";

const NotFoundSearch = () => {
  return (
    <div className={classes.notfound}>
      <div>
        <div>
          Hiện tại không có công việc nào phù hợp theo tiêu chí bạn đề xuất
        </div>
      </div>
    </div>
  );
};

export default NotFoundSearch;
