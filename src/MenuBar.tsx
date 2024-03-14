export const MenuBar = () => {
    return (
        <div data-tauri-drag-region="header" className="title-bar">
            <div className="title-bar-button" id="title-bar-minimize">
                <img
                    src="https://api.iconify.design/mdi:window-minimize.svg"
                    alt="minimize"
                />
            </div>
            <div className="title-bar-button" id="title-bar-maximize">
                <img
                    src="https://api.iconify.design/mdi:window-maximize.svg"
                    alt="maximize"
                />
            </div>
            <div className="title-bar-button" id="title-bar-close">
                <img src="https://api.iconify.design/mdi:close.svg" alt="close"/>
            </div>
        </div>
    );
};
