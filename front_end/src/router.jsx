import { createBrowserRouter } from "react-router-dom";
import App from "./App"
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyGames from "./pages/MyGames";
import AlonePage from "./pages/AlonePage";
import ThymePage from "./pages/ThymePage";
import AboutMe from "./pages/AboutMe";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "signup/",
                element: <SignupPage />
            },
            {
                path: "login/",
                element: <LoginPage />
            },
            {
                path: "mygames/",
                element: <MyGames />
            },
            {
                path: "alone/",
                element: <AlonePage />
            },
            {
                path: "thyme/",
                element: <ThymePage />
            },
            {
                path: "aboutme/",
                element: <AboutMe />
            }
        ]
    }
])

export default router;