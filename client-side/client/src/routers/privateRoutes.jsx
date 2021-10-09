const { Route, Redirect } = require("react-router-dom");

const PrivateRoute = ({ component: Component, role, ...rest }) => {
  const isLoggedIn = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) => {
        return isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: `${
                role === "JobSeekers" ? "/home/sign-in" : "/employers/sign-in"
              }`,
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
