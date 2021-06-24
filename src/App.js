import Link from "./components/Link";
//import LinkForm from "./components/LinkForm";

import "bootswatch/dist/superhero/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container p-4">
      <div className="row">
        <Link />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
