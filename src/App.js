import { Suspense, useEffect } from "react";
import React from "react";
import { BrowserRouter, Route, Routes, useRoutes } from "react-router-dom";
import ForgetPassword from "./components/ForgetPassword";
import Auth from "./components/Auth/Auth";
import PageLoader from "./components/PageLoader";
import { useTranslation } from "react-i18next";
import Home from "./components/Home/Home";
const RedirectTemplate = React.lazy(() =>
  import("./components/Templates/RedirectTemplate")
);

function App() {

  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path=""
            element={
              <Suspense fallback={<PageLoader />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="editor"
            element={
              <Suspense fallback={<PageLoader />}>
                <RedirectTemplate />
              </Suspense>
            }
          />
          <Route
            path="login"
            element={
              <Suspense fallback={<p className="text-center">Loading....</p>}>
                <Auth />
              </Suspense>
            }
          />
          <Route
            path="forget-password"
            element={
              <Suspense fallback={<p className="text-center">Loading.....</p>}>
                <ForgetPassword />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
