import * as ReactDOM from "react-dom";
import React, {StrictMode} from "react";

export default function App (){
  return (
    <div>Job Portal</div>
  )
}

ReactDOM.render(
    <StrictMode>
        <App />
    </StrictMode>,
    document.getElementById("root")
);