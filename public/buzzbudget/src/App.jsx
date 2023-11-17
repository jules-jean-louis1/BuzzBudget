import Header from "./components/import/header.jsx";
import Footer from "./components/import/footer.jsx";
import ErrorPage from "./pages/error-page.jsx";
import Homepage from "./pages/Home/homepage.jsx";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Homepage />,
      },   
      {
        path: '/budget',
        element: <div>Budget</div>,
      }
    ]
  },
]);

function Root() {
  return <>
  <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
}
function App() {
  
  return <RouterProvider router={router} />;
}

export default App
