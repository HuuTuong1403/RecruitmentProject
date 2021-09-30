import BannerHomeEmp from "features/HomeEmployers/components/BannerHome";
import EmployersUs from "features/HomeEmployers/components/EmployersUs";
import FeatureC from "features/HomeEmployers/components/FeatureC";
import Statistic from "features/HomeEmployers/components/Statistic";
import { Fragment } from "react";
import ScrollAnimation from "react-animate-on-scroll";

const HomeEmployer = () => {
  return (
    <Fragment>
      <BannerHomeEmp />
      <ScrollAnimation
        animateIn="animate__fadeInLeft"
        animateOut="animate__fadeOutLeft"
      >
        <FeatureC />
      </ScrollAnimation>
      <ScrollAnimation
        animateIn="animate__fadeInRight"
        animateOut="animate__fadeOutRight"
      >
        <Statistic />
      </ScrollAnimation>
      <ScrollAnimation
        animateIn="animate__fadeInLeft"
        animateOut="animate__fadeOutLeft"
      >
        <EmployersUs />
      </ScrollAnimation>
    </Fragment>
  );
};

export default HomeEmployer;
