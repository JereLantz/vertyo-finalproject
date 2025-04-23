import { use, useEffect, useState } from "react";
import { TransactionContext } from "../context/TransactionsContext";

export default function Filter(){
    const {currentFilter} = use(TransactionContext)
    let filterString = ""
    const [displayFilter, setDisplayFilter] = useState(filterString)

    useEffect(()=>{
        let filterCount = 0

        if(currentFilter.description.trim().length > 0){
            filterString += `Sisältää merkit: "${currentFilter.description}", `
            filterCount ++
        }
        if(currentFilter.income == "on"){
            filterString += "Palkka, "
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
    return(
        <div>
            {displayFilter.length > 0 && (
                <>
            <span className="my-2 font-bold p-2 rounded-l-xl bg-emerald-200">
                Suodatus Päällä. Näytetään:
            </span>
            <span className="my-2 p-2 rounded-r-xl bg-emerald-200">
                {displayFilter}
            </span>
                </>
            )}
        </div>
    )
}
