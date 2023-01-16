import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../Components/Layout";
import { Home } from "../page/Home";
import { SetTimer } from "../page/SetTimer";
import { StopTimer } from "../page/StopTimer";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path={"setting"}
          element={
            <Layout>
              <SetTimer />
            </Layout>
          }
        />
        <Route
          path={"stop-timer"}
          element={
            <Layout>
              <StopTimer />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
