import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Main from "./Entryfile/Main";
import { store } from "./Store/store";

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>
    , document.getElementById('app'));

if (module.hot) { // enables hot module replacement if plugin is installed
    module.hot.accept();
}