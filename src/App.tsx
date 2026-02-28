
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from "./pages/Home"
import FetchOld from "./pages/FetchOld"
import FetchRQ from "./pages/FetchRQ"
import {MainLayout} from "./components/Layouts/MainLayout"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import FetchRQById from "./pages/FetchRQById"
import FetchOldById from "./pages/FetchOldById"
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
          path: "/fetch-old",
          element: <FetchOld />
        },
        {
          path: "/fetch-old/:id",
          element: <FetchOldById />
        },
        {
          path: "/fetch-rq",
          element: <FetchRQ />
        },
        {
          path: "/fetch-rq/:id",
          element: <FetchRQById />
        }
      ]
    }
  ])
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  )
}

export default App