import React from "react";
import { useState } from "react";
import Header from "../../Layout/Header";
import TradeMarketplace from "./TradeMarketplace";
import Accountant from "./Accountant";
import Details from "./Details";
import SimilarAssets from "./SimilarAssets";

export default function FractionalNft() {
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <div
            className={` bg-center  ${theme === "dark" ? "bg-black text-white bg-DarkBG" : "bg-white text-black bg-LightBG"
                }`}>
            <Header theme={theme} toggleTheme={toggleTheme} />

            <TradeMarketplace theme={theme} toggleTheme={toggleTheme}/>
            <Details theme={theme} toggleTheme={toggleTheme}/>
            <Accountant theme={theme} toggleTheme={toggleTheme}/>
            <SimilarAssets theme={theme} toggleTheme={toggleTheme}/>
            
        </div>
    );
}
