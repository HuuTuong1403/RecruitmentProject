import { ToastContainer } from "react-toastify";
import { withTranslation } from "react-i18next";
import Routers from './routers'

function App() {
  return (
    <div>
      <Routers />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        theme="colored"
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default withTranslation()(App);
