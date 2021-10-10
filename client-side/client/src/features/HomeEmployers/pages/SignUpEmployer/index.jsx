import { addInfoSignUp } from "features/HomeEmployers/slices";
import { fetchProvincesAsync } from "features/Home/slices/thunks";
import { Link } from "react-router-dom";
import { selectEmployerLocal } from "features/Employers/slices/selectors";
import { selectInfoSignUp } from "features/HomeEmployers/slices/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import AuthComponent from "components/AuthComponent";
import classes from "./style.module.scss";
import StepOneSignUp from "features/HomeEmployers/components/StepOneSignUp";
import StepThreeSignUp from "features/HomeEmployers/components/StepThreeSignUp";
import StepTwoSignUp from "features/HomeEmployers/components/StepTwoSignUp";

const SignUpEmployer = () => {
  useEffect(() => {
    const employer = selectEmployerLocal();
    if (employer) history.push("/employers");
  });
  const history = useHistory();
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const infoSignUp = useSelector(selectInfoSignUp);

  useTitle(`${t("Register for an employer account quickly")}`);
  useEffect(() => {
    dispatch(fetchProvincesAsync());
  }, [dispatch]);

  const onSubmitHandler = (data) => {
    if (infoSignUp) {
      if (
        infoSignUp.email === data.email &&
        infoSignUp.confirmEmail === data.confirmEmail &&
        infoSignUp.phone === data.phone
      ) {
        setStep((prevState) => (prevState += 1));
      } else {
        setStep((prevState) => (prevState += 1));
        dispatch(addInfoSignUp(data));
      }
    } else {
      setStep((prevState) => (prevState += 1));
      dispatch(addInfoSignUp(data));
    }
  };

  const onBackStep = () => setStep((prevState) => (prevState -= 1));

  const onNextStep = () => setStep((prevState) => (prevState += 1));

  return (
    <AuthComponent>
      <div className={classes.signup_emp}>
        <div className={classes.signup_emp__wrapped}>
          <div className={classes["signup_emp__wrapped--content"]}>
            {t("content-signup")}
          </div>
          {step === 1 && <StepOneSignUp onSubmit={onSubmitHandler} />}
          {step === 2 && (
            <StepTwoSignUp onBackStep={onBackStep} onNextStep={onNextStep} />
          )}
          {step === 3 && <StepThreeSignUp onBackStep={onBackStep} />}
          <div className={classes["signup_emp__wrapped--signin"]}>
            <span>{t("have-account")} </span>
            <Link to="/employers/sign-in">{t("signin")}</Link>
          </div>
        </div>
      </div>
    </AuthComponent>
  );
};

export default SignUpEmployer;
