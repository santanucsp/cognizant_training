import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import NavBar from "./components/Navigation/NavBar";
import CustomerPage from "./components/customers/CustomerPage";
import Statement from "./components/statements/Statement";

const App = () => (
  <BrowserRouter>
    <NavBar appTitle="BudgetTrackingApp" />
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<CustomerPage />} />
      <Route path="/:CRIN/statement/:accNum" element={<Statement />} />
    </Routes>
  </BrowserRouter>
);

export default App;