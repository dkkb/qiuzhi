import ReactDOM from "react-dom/client";
import App from "./App";
import {ReportCallback} from "web-vitals";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {RouteConfig} from "./RootConfig.ts";
import ErrorPage from "./ErrorPage.tsx";
import {Toaster} from "sonner";
import {NavSidebar} from "./Sidebar/NavSidebar.tsx";

import "./index.css";
import {ArticleContainer} from "./ArticleContainer/ArticleContainer.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <Toaster/>
                <App/>
            </>
        ),
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Navigate to={RouteConfig.LOCAL_TODAY}/>,
            },
            {
                path: RouteConfig.LOCAL,
                element: <NavSidebar/>,
                children: [
                    {
                        path: RouteConfig.LOCAL_TODAY,
                        element: <ArticleContainer/>,
                    },
                    {
                        path: RouteConfig.LOCAL_ALL,
                        element: <ArticleContainer/>,
                    },
                    {
                        path: RouteConfig.LOCAL_STARRED,
                        element: <ArticleContainer/>,
                    },
                    {
                        path: RouteConfig.LOCAL_FEED,
                        element: <ArticleContainer/>,
                    },
                ],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <RouterProvider router={router}/>
);

const reportWebVitals = (onPerfEntry?: ReportCallback) => {
    if (onPerfEntry) {
        import("web-vitals").then(({onCLS, onFID, onFCP, onLCP, onTTFB}) => {
            onCLS(onPerfEntry);
            onFID(onPerfEntry);
            onFCP(onPerfEntry);
            onLCP(onPerfEntry);
            onTTFB(onPerfEntry);
        });
    }
};
reportWebVitals();
