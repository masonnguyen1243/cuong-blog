import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public routes
import Home from "~/pages/Home";
import About from "~/pages/About";
import SignIn from "~/pages/SignIn";
import SignUp from "~/pages/SignUp";
import Dashboard from "~/pages/Dashboard";
import Project from "~/pages/Project";
import PublicLayout from "~/components/Layout/PublicLayout";

// Private routes
import PrivateLayout from "~/components/Layout/PrivateRoute";

// Others
import NotFound from "~/pages/404Page";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Project />} />
          </Route>

          {/* Private Routes */}
          <Route path="/dashboard" element={<PrivateLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Others */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
