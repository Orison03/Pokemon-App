import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomeView from "./pages/HomeView";
import ListView from "./pages/ListView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeView />,
  },
  {
    path: "/list-view",
    element: <ListView />,
  },
]);

export default function Home() {
  return <RouterProvider router={router} />;
}
