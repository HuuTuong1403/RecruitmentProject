import AuthComponent from "features/Home/components/AuthComponent";
import { useForm } from "react-hook-form";
import classes from "./style.module.scss";
import InputField from "../../../../custom-fields/InputField";
import { schemaLogin } from "../../../../common/constants/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { FiLock, FiUser } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignInGuest = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaLogin),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <AuthComponent>
      <div className={classes.signin}>
        <div className={classes.signin__wrapped}>
          <div className={classes["signin__wrapped--content"]}>
            Hãy kết nối với chúng tôi để tìm được công việc bạn yêu thích phù
            hợp với kỹ năng và tiêu chí bạn quan tâm
          </div>
          <div className={classes["signin__wrapped--title"]}>Đăng nhập</div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={classes["signin__wrapped--form"]}
          >
            <InputField
              placeholder="Vui lòng nhập username/email/số điện thoại"
              {...register("username")}
              errors={errors.username?.message}
              icon={<FiUser />}
            />

            <InputField
              type="password"
              placeholder="Vui lòng nhập mật khẩu"
              {...register("password")}
              errors={errors.password?.message}
              icon={<FiLock />}
            />

            <div className={classes["signin__wrapped--form--link"]}>
              <Link to="/">Quên mật khẩu</Link>
            </div>

            <button type="submit">Đăng nhập</button>
          </form>

          <div className={classes["signin__wrapped--social"]}>
            <div className={classes["signin__wrapped--social--line"]}>
              <span>Hoặc có thể đăng nhập</span>
            </div>
            <div className={classes["signin__wrapped--social--google"]}>
              <button>
                <FaGoogle />
                <span> Đăng nhập bằng Google</span>
              </button>
            </div>
            <div className={classes["signin__wrapped--social--signup"]}>
              <span>Bạn chưa có tài khoản? </span>
              <Link to="/home/sign-up">Đăng ký</Link>
            </div>
          </div>
        </div>
      </div>
    </AuthComponent>
  );
};

export default SignInGuest;
