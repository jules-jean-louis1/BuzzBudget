import Header from "./components/import/header.jsx";
import Footer from "./components/import/footer.jsx";
import ErrorPage from "./pages/error-page.jsx";
import Homepage from "./pages/Home/homepage.jsx";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
// Pages
import RegisterPage from "./pages/register-page.jsx";
import LoginPage from "./pages/login-page.jsx";
import AccountPage from "./pages/account-page.jsx";
import HistoryPage from "./pages/history-page.jsx";
import ProfilePage from "./pages/profile-page.jsx";
import AboutPage from "./pages/about-page.jsx";
import ContactPage from "./pages/contact-page.jsx";

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
        path: "/account/:userId",
        element: <AccountPage />,
      },
      {
        path: "/account/history/:userId",
        element: <HistoryPage />,
      },
      {
        path: "/profil/:userId",
        element: <ProfilePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
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
