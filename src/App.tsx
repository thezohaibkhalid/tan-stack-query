
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from "./pages/Home"
import FetchOld from "./pages/FetchOld"
import FetchRQ from "./pages/FetchRQ"
import {MainLayout} from "./components/Layouts/MainLayout"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
const App = () => {
  const queryClient = new QueryClient()
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />
        },{
          path: "/trad",
          element: <FetchOld />
        },
        {
          path: "/rq",
          element: <FetchRQ />
        }
      ]
    }
  ])
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App