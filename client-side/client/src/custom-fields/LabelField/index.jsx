import classes from "./style.module.scss";

const LabelField = ({ label, isCompulsory = false }) => {
  return (
    <label className={classes.labelTitle}>
      {label} {isCompulsory && <span>*</span>}
    </label>
  );
};

export default LabelField;
