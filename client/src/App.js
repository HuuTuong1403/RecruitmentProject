import "./App.css";
import { ToastContainer } from "react-toastify";
import notification from "components/Notification";

function App() {
  const handleSuccess = () => {
    notification("ok", "success");
  };
  const handleError = () => {
    notification("ok", "error");
  };

  return (
    <div>
      <button onClick={handleSuccess}>Success</button>
      <button onClick={handleError}>Error</button>
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

export default App;
