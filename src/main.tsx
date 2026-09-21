import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createMemoryRouter, RouterProvider } from "react-router";
import "../style.css";
import Home from "./page/home";
import ServerCreate from "./page/serverCreate";
import ServerType from "./page/serverType";
import ServerTypeCreate from "./page/serverTypeCreate";

const router = createMemoryRouter([
    { path: "/", element: <Home /> },
    { path: "/serverCreate", element: <ServerCreate/> },
    { path: "/serverTypeCreate", element: <ServerTypeCreate/> },
    { path: "/serverType", element: <ServerType/> }
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);