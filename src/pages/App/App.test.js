import App from "./App"
import React from "react";
import ReactDOM from "react-dom/client";


test("basic smoke test", ()=>{
    const div = ReactDOM.createRoot(document.createElement('div'));
    div.render(<App />);
    div.unmount();
})