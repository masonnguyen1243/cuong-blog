import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "~/pages/Home";
import About from "~/pages/About";
import SignIn from "~/pages/SignIn";
import SignUp from "~/pages/SignUp";
import Dashboard from "~/pages/Dashboard";
import Project from "~/pages/Project";
import PublicLayout from "~/components/Layout/PublicLayout";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Project />} />
          </Route>

          {/* Others */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
