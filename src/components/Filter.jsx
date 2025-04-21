import { use, useEffect, useState } from "react";
import FilterForm from "./FilterForm";
import { TransactionContext } from "../context/TransactionsContext";

export default function Filter(){
    const [toggleFilterForm, setToggleFilterForm] = useState(false)
    const {currentFilter} = use(TransactionContext)
    let filterString = "Suodatus Päällä: "
    const [displayFilter, setDisplayFilter] = useState(filterString)

    useEffect(()=>{
        let filterCount = 0

        if(currentFilter.description.trim().length > 0){
            filterString += `Merkit:'${currentFilter.description}' `
            filterCount ++
        }
        if(currentFilter.income == "on"){
            filterString += "Tulot, "
            filterCount ++
        }
        if(currentFilter.food == "on"){
            filterString += "Ruoka, "
            filterCount ++
        }
        if(currentFilter.expence == "on"){
            filterString += "Laskut, "
            filterCount ++
        }
        if(currentFilter.entertainment== "on"){
            filterString += "Viihde, "
            filterCount ++
        }
        if(currentFilter.gambling == "on"){
            filterString += "Uhkapelit, "
            filterCount ++
        }
        if(currentFilter.other == "on"){
            filterString += "Muut"
            filterCount ++
        }

        if(filterCount == 6 && currentFilter.description.trim().length == 0){
            setDisplayFilter("")
        }
        else{
            setDisplayFilter(filterString)
        }
    },[currentFilter])

    function handleToggle(){
        setToggleFilterForm((p)=>!p)

    }
    return(
        <div className="mt-2">
            <button onClick={handleToggle} className="hover:cursor-pointer p-2 my-2 rounded-xl bg-amber-100 hover:bg-amber-200">
                Suodata tapahtumia
            </button>
            {displayFilter.length > 0 && (
            <span className="m-2 p-2 rounded-xl bg-emerald-200">
                {displayFilter}
            </span>
            )}
        {toggleFilterForm ?<FilterForm closeForm={setToggleFilterForm}/> : null }
        </div>
    )
}
