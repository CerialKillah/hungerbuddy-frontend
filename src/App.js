import { Route,Routes,BrowserRouter as Router } from "react-router-dom";

import CategoryInterface from "./admin/category/CategoryInterface";
import BranchInterface from "./admin/branch/BranchInterface";
import CategoryDisplay from "./admin/category/CategoryDisplay";
import BranchDisplay from "./admin/branch/BranchDisplay";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<CategoryInterface/>} path="/categoryinterface"/>
          <Route element={<BranchInterface/>} path="/branchinterface"/>
          <Route element={<CategoryDisplay/>} path="/categorydisplay"/>
          <Route element={<BranchDisplay/>} path="/branchdisplay"/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
