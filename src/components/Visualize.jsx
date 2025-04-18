import { useState } from "react";
import VisualizeCharts from "./VisualizeCharts";

export default function Visualize(){
    const [showCharts, setShowCharts] = useState(false)

    function handleShowCharts(){
        setShowCharts((p)=> !p)
    }

    return(
        <div>
            <button onClick={handleShowCharts} className="rounded-2xl mx-2 p-2 bg-yellow-100 hover:bg-yellow-200">
                Visualisoi tapahtumia
            </button>
            {showCharts &&(
            <VisualizeCharts />
            )}
        </div>
    )
}
