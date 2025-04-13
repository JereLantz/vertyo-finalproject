import { use, useActionState } from "react"
import { TransactionContext } from "../context/TransactionsContext"

export default function AddNewTransaction(){
    const {addNewTransaction} = use(TransactionContext)

    function addHobbyAction(_, formData){
        const errors = []
        const description = formData.get("description")
        const amount = formData.get("amount")

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

        const newTra = {
            id: Math.random(),
            description,
            amount,
        }
        console.log(errors)
        
        if(errors.length > 0){
            return {errors, enteredValues: {
                description,
                amount,
            }}
        }
        addNewTransaction(newTra)

        return {errors:null}
    }

    const [formState, formAction] = useActionState(addHobbyAction, {errors:null})

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
                {formState.errors && (
                    <div>
                        <ul className="text-red-500">
                            {formState.errors.map((err)=><li key={err}>{err}</li>)}
                        </ul>
                    </div>
                )}
                <button type="submit" className="rounded-xl py-1 px-2 my-2 bg-blue-400 hover:bg-blue-500">
                    Lisää uusi tapahtuma
                </button>
            </form>
        </div>
    )
}
