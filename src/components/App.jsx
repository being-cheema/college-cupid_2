import Home from "./Home.jsx";
import Body from "./ForYou.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AcceptMessage from "./AcceptMessage.jsx";
import Profile from "./Profile.jsx";
import Settings from "./Settings.jsx";
import Logout from "./Logout.jsx";
import SignUpForm from "./SignUpForm.jsx";
import Login from "./Login.jsx";
import Verify from "./Verify.jsx";
import Dashboard from "./Dashboard.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/foryou" element={<Body />} />
          <Route path="/foryou/accepted" element={<AcceptMessage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<Verify/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
