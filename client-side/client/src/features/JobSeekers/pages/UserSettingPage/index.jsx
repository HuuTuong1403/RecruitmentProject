import classes from "./style.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaChangePassSignIn } from "common/constants/schema";
import InputField from "custom-fields/InputField";
import { FiLock } from "react-icons/fi";
import ButtonField from "custom-fields/ButtonField";
import { ScrollTop } from "common/functions";

const UserSettingPage = () => {
  ScrollTop();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaChangePassSignIn),
  });

  const submitChangePassHandler = (data) => {
    console.log(data);
  };

  const handleResetChangePass = () => {
    reset({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  return (
    <div className={classes.userSetting}>
      <div className={classes.userSetting__wrapped}>
        <div className={classes["userSetting__wrapped--title"]}>
          Cài đặt tài khoản ứng viên
        </div>
        <div className={classes["userSetting__wrapped--subTitle1"]}>
          Thay đổi mật khẩu đăng nhập
        </div>
        <form
          className={classes["userSetting__wrapped--changePass"]}
          onSubmit={handleSubmit(submitChangePassHandler)}
        >
          <div>
            <div>
              <label>Nhập mật khẩu cũ:</label>
              <InputField
                type="password"
                placeholder="Vui lòng nhập mật khẩu hiện tại"
                {...register("oldPassword")}
                errors={errors?.oldPassword?.message}
                icon={<FiLock />}
              />
            </div>
            <div>
              <label>Nhập mật khẩu mới:</label>
              <InputField
                type="password"
                placeholder="Vui lòng nhập mật khẩu mới"
                {...register("newPassword")}
                errors={errors?.newPassword?.message}
                icon={<FiLock />}
              />
            </div>
            <div>
              <label>Nhập lại mật khẩu mới:</label>
              <InputField
                type="password"
                placeholder="Vui lòng nhập lại mật khẩu mới"
                {...register("confirmNewPassword")}
                errors={errors?.confirmNewPassword?.message}
                icon={<FiLock />}
              />
            </div>
            <div
              className={classes["userSetting__wrapped--changePass--actions"]}
            >
              <ButtonField
                type="submit"
                backgroundcolor="#0a426e"
                backgroundcolorhover="#324554"
                color="#fff"
              >
                Lưu
              </ButtonField>
              <ButtonField
                type="button"
                backgroundcolor="#dd4b39"
                backgroundcolorhover="#bf0000"
                color="#fff"
                onClick={handleResetChangePass}
              >
                Bỏ qua
              </ButtonField>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSettingPage;
