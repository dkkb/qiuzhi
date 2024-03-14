import {useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {emit, listen} from "@tauri-apps/api/event";
import {RouteConfig} from "./RootConfig.ts";
import "./styles/index.css";

function App() {
    const navigate = useNavigate();
    useEffect(() => {
        listen("go-to-settings", () => {
            console.log(
                "%c Line:34 🍒 go-to-setting",
                "color:#fca650",
                "go-to-setting"
            );
            navigate(RouteConfig.SETTINGS_GENERAL);
        }).then();

        listen("check_for_updates", async (e) => {
            console.log("check for updates", e)
            await emit("tauri://update");
        }).then();
    }, []);


    return (
        <>
            <div className="h-full max-h-full ">
                <Outlet/>
            </div>
        </>
    );
}

export default App;
