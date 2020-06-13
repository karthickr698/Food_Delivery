import Loader from "react-loader-spinner";

import React from "react";

function ISLoader() {
    return (
        <>
            <h2>Booking Now...</h2>
            <Loader type="Bars" color="#000000" height={280} width={280} />
        </>
    );
}

export default ISLoader;
