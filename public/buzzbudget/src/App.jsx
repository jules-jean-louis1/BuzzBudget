import Header from "./components/import/header.jsx";
import Footer from "./components/import/footer.jsx";
import ErrorPage from "./pages/error-page.jsx";
import Homepage from "./pages/Home/homepage.jsx";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import RegisterPage from "./pages/register-page.jsx";
import LoginPage from "./pages/login-page.jsx";
import BudgetPage from "./pages/account-page.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/budgets/:userId",
        element: <BudgetPage />,
      },
    ],
  },
]);

function Root() {
  return (
    <>
      <Header />
      <main className="h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
function App() {
  return <RouterProvider router={router} />;
}

export default App;
