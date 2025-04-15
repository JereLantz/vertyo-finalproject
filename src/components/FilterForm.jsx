import { use, useActionState } from "react"
import { TransactionContext } from "../context/TransactionsContext"

export default function FilterForm(){
    const {currentFilter, setFilter, removeFilter} = use(TransactionContext)
    //console.log(currentFilter)

    function filterFormAction(_, formData){
        const description = formData.get("filterDesc")
        const expence = formData.get("filterExpense")
        const income = formData.get("filterIncome")

        //TODO: lisää hintahaarukan perusteella filtteröinti?
        const enteredValues = {
            description,
            expence,
            income,
        }

        setFilter(enteredValues)

        return {errors:null, enteredValues}
    }

    const [formState, formAction] = useActionState(filterFormAction, {errors:null, enteredValues:currentFilter})

    return(
        <div>
            <form action={formAction}>
                <label htmlFor="filterDesc">Kuvaus:</label>
                <input defaultValue={formState.enteredValues?.description} className="border rounded mx-1 px-1" id="filterDesc" name="filterDesc" placeholder="Kuvauksen perusteella"/>
                <div>
                    <label className="mr-1" htmlFor="filterIncome">Menot:</label>
                    <input defaultChecked={formState.enteredValues?.expence} id="filterExpense" name="filterExpense" type="checkbox" />
                    <br/>
                    <label className="mr-1" htmlFor="filterExpense">Tulot:</label>
                    <input defaultChecked={formState.enteredValues?.income} id="filterIncome" name="filterIncome" type="checkbox" />
                </div>
                <button type="submit" className="rounded-xl p-2 mr-2 bg-emerald-200 hover:bg-emerald-300">
                    Suodata
                </button>
                {currentFilter && (
                <button type="button" onClick={removeFilter} className="rounded-xl p-2 bg-stone-300 hover:bg-stone-400">
                    Poista suodatus
                </button>
                )}
            </form>
        </div>
    )
}
