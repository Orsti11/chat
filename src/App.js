import { BrowserRouter as Router} from "react-router-dom";
import AppRoutes from "./components/AppRoutes/AppRoutes";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <AppRoutes />
    </Router>
  );
}

export default App;
