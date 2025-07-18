import { Routes, Route } from "react-router-dom";
import Dashboard from "./layouts/dashboard/Dashboard";
import Home from "./pages/home/Home";

import BookDetails from "./pages/bookDetails/BookDetails";
function App() {
  return (
    <>
      <Routes>
        <Route element={<Dashboard />}>
          <Route path="/" element={<Home />} />
          <Route path="/:slug" element={<BookDetails />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
