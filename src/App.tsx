import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
// import EditPage from "./pages/EditPage";
// import ListPage from "./pages/ListPage";
// import RequireAuth from "./components/RequireAuth";
import React from "react";
import { Suspense } from "react";
const EditPage=React.lazy(()=>import('./pages/EditPage'))
const ListPage=React.lazy(()=>import('./pages/ListPage'))
const RequireAuth=React.lazy(()=>import('./components/RequireAuth'))

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Suspense fallback={<div>loading...</div>}><RequireAuth /></Suspense>}>
          <Route index element={<Suspense fallback={<div>loading...</div>}><EditPage /></Suspense>} />
          <Route path="list" element={<Suspense fallback={<div>loading...</div>}><ListPage /></Suspense>} />
        </Route>
      </Routes>
    </Router>
  );
}
