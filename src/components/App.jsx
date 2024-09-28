import Home from "./Home.jsx";
import Body from "./Body.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AcceptMessage from "./AcceptMessage.jsx";
import Profile from "./Profile.jsx";
import Settings from "./Settings.jsx";
import Logout from "./Logout.jsx";
import SignupForm from "./SignupForm.jsx";
import Login from "./Login.jsx";
import Verify from "./Verify.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/dashboard" element={<Body />} />
          <Route path="/accepted" element={<AcceptMessage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<Verify/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
