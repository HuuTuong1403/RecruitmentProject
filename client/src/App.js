import { ToastContainer } from "react-toastify";
import Header from "components/Header/Header";
import { withTranslation } from "react-i18next";
import Footer from "components/Footer/Footer"

function App() {

  return (
    <div>
      <Header />
      <div style={{height: "100vh"}}></div>
      <Footer />
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
