import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router";
import MainPage from "@/pages/MainPage.tsx";
import {routes} from "@/lib/constants/routes.ts";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route index path={routes.index} element={<MainPage/>}/>
    )
)


function App() {

    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}

export default App
