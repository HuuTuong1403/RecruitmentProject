import { useTranslation } from "react-i18next";
import classes from "./style.module.scss";

const EmployersUs = () => {
  const { t } = useTranslation();

  return (
    <div className={classes.employerUs}>
      <div className={classes.employerUs__wrapped}>
        <p className={classes["employerUs__wrapped--title"]}>
          {t("Our customer")}
        </p>
        <div className={classes["employerUs__wrapped--block"]}>
          <ul>
            {images.map((image, index) => (
              <li key={index}>
                <img src={image.src} alt="" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const images = [
  { src: "https://images.careerbuilder.vn/content/images/logo/1.png" },
  { src: "https://images.careerbuilder.vn/content/images/logo/5.png" },
  { src: "https://images.careerbuilder.vn/content/images/logo/13.png" },
  { src: "https://images.careerbuilder.vn/content/images/logo/15.png" },
  { src: "https://images.careerbuilder.vn/content/images/logo/20.png" },
  { src: "https://images.careerbuilder.vn/content/images/logo/12.png" },
  { src: "https://images.careerbuilder.vn/content/images/logo/18.png" },
  { src: "https://images.careerbuilder.vn/content/images/logo/22.png" },
];

export default EmployersUs;
