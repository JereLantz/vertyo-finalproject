import { use, useActionState } from "react"
import { TransactionContext } from "../context/TransactionsContext"

export default function AddNewTransaction(){
    const {addNewTransaction} = use(TransactionContext)

    async function addNewTransactionAction(_, formData){
        const errors = []
        const description = formData.get("description")
        const amount = formData.get("amount")
        const category = formData.get("category")

        if(description.trim().length < 3){
            errors.push("Anna tapahtumalle kuvaus. Vähintään 3 merkkiä.")
        }

        if(description.trim().length > 31){
            errors.push("Pidäthän kuvauksen lyhyenä. Maksimi pituus 30 merkkiä.")
        }

        const amountNum = Number(amount)
        if(!amountNum){
            errors.push("Syötä summakenttää vain numeroja.")
        }

        if(!category){
            errors.push("Tapahtumalla tulisi olla luokka")
        }

        const newTra = {
            description,
            amount:amountNum,
            category,
        }
        
        if(errors.length > 0){
            return {errors, enteredValues: newTra}
        }
        const response = await addNewTransaction(newTra)

        if(!response.success){
            errors.push("Network error. Please check your connection and try again later")
            return {errors, enteredValues: newTra}
        }

        return {errors:null}
    }

    const [formState, formAction, pending] = useActionState(addNewTransactionAction, {errors:null})

    const inputStyle = "border rounded mx-2"
    return(
        <div className="m-2">
            <form action={formAction}>
                <div className="my-1">
                    <label htmlFor="newTaDesc" className="font-bold">Kuvaus:</label>
                    <input name="description" id="newTaDesc" className={inputStyle} defaultValue={formState.enteredValues?.description}/>
                </div>
                <div className="my-1">
                    <label htmlFor="newTaAmount" className="font-bold">Summa:</label>
                    <input name="amount" id="newTaAmount" className={inputStyle} defaultValue={formState.enteredValues?.amount}/>
                </div>
                <div className="my-1">
                    <label htmlFor="newTaCategory" className="font-bold">Valitse kategoria: </label>
                    <br/>
                    <select id="newTaCategory" defaultValue={formState.enteredValues?.category} name="category" className="border rounded px-1">
                        <option value="palkka">Palkka</option>
                        <option value="ruoka">Ruoka</option>
                        <option value="laskut">Laskut</option>
                        <option value="viihde">Viihde</option>
                        <option value="uhkapelit">Uhkapelit</option>
                        <option value="muu">Muu</option>
                    </select>
                </div>
                {formState.errors && (
                    <div>
                        <ul className="text-red-500">
                            {formState.errors.map((err)=><li key={err}>{err}</li>)}
                        </ul>
                    </div>
                )}
                <button type="submit" disabled={pending} className="hover:cursor-pointer rounded-xl py-1 px-2 my-2 bg-blue-400 hover:bg-blue-500">
                    Lisää uusi tapahtuma
                </button>
            </form>
        </div>
    )
}
