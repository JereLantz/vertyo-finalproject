import VisualizePieChart from "./VisualizePieChart"
import VisualizeTotalLine from "./VisualizeTotalLine";

export default function Visualize(){
    return(
        <div className="m-2 border p-2">
            <h3 className="text-xl font-bold">Menot</h3>
            <VisualizePieChart />
            <VisualizeTotalLine />
        </div>
    )
}
