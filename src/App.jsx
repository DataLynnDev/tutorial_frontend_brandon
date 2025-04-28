import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Lesson from "./pages/Lesson";
import AddTutorial from "./pages/AddTutorial";
import OptionLog from "./pages/OptionLog";
import MyCourses from "./pages/MyCourses";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<OptionLog />} />
        <Route path="/" element={<Main />} />
        <Route path="/my_courses" element={<MyCourses />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/lesson/:id" element={<Lesson />} />
        <Route path="/add_tutorial" element={<AddTutorial />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
