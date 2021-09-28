import * as yup from "yup";

export const schemaLogin = yup
  .object({
    username: yup.string().required("Tên đăng nhập không được trống"),
    password: yup
      .string()
      .required("Mật khẩu không được trống")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "Mật khẩu phải có ít nhất 8 kí tự, chữ thường, chữ hoa và số"
      ),
  })
  .required();
