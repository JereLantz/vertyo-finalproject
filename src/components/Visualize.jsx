import { useState } from "react";
import VisualizePieChart from "./VisualizePieChart"
import VisualizeTotalLine from "./VisualizeTotalLine";

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
                <div className="m-2">
                    <h3 className="text-xl font-bold">Menot</h3>
                    <VisualizePieChart />
                    <VisualizeTotalLine />
                </div>
            )}
        </div>
    )
}
