import { use, useActionState } from "react"
import { TransactionContext } from "../context/TransactionsContext"

export default function FilterForm(){
    const {currentFilter, setFilter, removeFilter} = use(TransactionContext)

    function filterFormAction(_, formData){
        const description = formData.get("filterDesc")
        const income = formData.get("filterIncome")
        const food = formData.get("filterFood")
        const expence = formData.get("filterExpense")
        const entertainment = formData.get("filterEntertainment")
        const gambling = formData.get("filterGambling")
        const other = formData.get("filterOther")

        //TODO: lisää hinnan perusteella filtteröinti?
        const enteredValues = {
            description,
            income,
            food,
            expence,
            entertainment,
            gambling,
            other,
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
                    <label className="mr-1" htmlFor="filterIncome">Palkka:</label>
                    <input defaultChecked={formState.enteredValues?.income} id="filterIncome" name="filterIncome" type="checkbox" />
                    <br/>
                    <label className="mr-1" htmlFor="filterFood">Ruoka:</label>
                    <input defaultChecked={formState.enteredValues?.income} id="filterFood" name="filterFood" type="checkbox" />
                    <br/>
                    <label className="mr-1" htmlFor="filterExpense">Laskut:</label>
                    <input defaultChecked={formState.enteredValues?.expence} id="filterExpense" name="filterExpense" type="checkbox" />
                    <br/>
                    <label className="mr-1" htmlFor="filterEntertainment">Viihde:</label>
                    <input defaultChecked={formState.enteredValues?.entertainment} id="filterEntertainment" name="filterEntertainment" type="checkbox" />
                    <br/>
                    <label className="mr-1" htmlFor="filterGambling">Uhkapelit:</label>
                    <input defaultChecked={formState.enteredValues?.gambling} id="filterGambling" name="filterGambling" type="checkbox" />
                    <br/>
                    <label className="mr-1" htmlFor="filterOther">Muu:</label>
                    <input defaultChecked={formState.enteredValues?.other} id="filterOther" name="filterOther" type="checkbox" />
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

