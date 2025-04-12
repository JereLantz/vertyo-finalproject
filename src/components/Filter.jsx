import { useState } from "react";
import FilterForm from "./FilterForm";

export default function Filter(){
    const [toggleFilterForm, setToggleFilterForm] = useState(false)

    function handleToggle(){
        setToggleFilterForm((p)=>!p)
    }
    return(
        <div className="m-2">
            <button onClick={handleToggle} className="p-2 my-2 rounded-xl bg-amber-100 hover:bg-amber-200">
                Filteröi tapahtumia
            </button>
        {toggleFilterForm ?<FilterForm /> : null }
        </div>
    )
}
