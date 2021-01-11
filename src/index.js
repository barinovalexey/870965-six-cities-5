import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const placeCards = [`Nice, cozy, warm big bed apartment`, `Canal View Prinsengracht`, `Wood and stone place`, `Beautiful &amp; luxurious apartment at great location`];

ReactDOM.render(
    <App
      placeCards = {placeCards}
    />,
    document.querySelector(`#root`)
);
