import {TransactionContext} from "../context/TransactionsContext"
import { use, useActionState, useState } from "react"

export default function Transaction({transaction}){
    const {showDeleteConfirm, updateTransaction} = use(TransactionContext)
    const [modify, setModify] = useState(false)

    async function handleUpdateAction(current, formData){
        const errors = []

        const newDesc = formData.get("description")
        const newCategory = formData.get("category")
        const newAmountString = formData.get("amount")

        if(newDesc.trim().length < 3){
            errors.push("Anna kuvaus tapahtumalle. Vähintään 3 merkkiä")
        }

        const newAmount = Number(newAmountString)
        if(!newAmount){
            errors.push("Syötä vain numeroita määrä kenttään.")
        }

        if(!newCategory || !newCategory.trim()){
            errors.push("Tapahtumalla tulisi olla kategoria")
        }

        const updatedTransaction = current.values
        updatedTransaction.description = newDesc
        updatedTransaction.category = newCategory
        updatedTransaction.amount = newAmount

        const res = await updateTransaction(updatedTransaction)
        console.log(res)
        if(!res.success){
            errors.push("Virhe tapahtuman päivityksessä")
        }

        if(errors.length > 0){
            return {errors, values:updatedTransaction}
        }

        setModify(false)
        return {errors:null, values:updatedTransaction}
    }

    const [formState, updateAction, isPending] = useActionState(handleUpdateAction, {errors:null, values:transaction})

    function handleDelete(itemToDelete){
        showDeleteConfirm(itemToDelete)
    }

    function handleModify(){
        setModify(true)
    }

    function handleCancelModify(){
        setModify(false)
    }

    return (
        <div className="flex m-2 p-3 border border-black">
        {modify ? (
            <>
                <form action={updateAction}>
                    <input name="description" defaultValue={formState.values.description} className="border rounded mr-2 px-1"/>
                    <select id="category" defaultValue={formState.values.category} name="category" className="border rounded px-1 mr-2 p-0.5">
                        <option value="palkka">Palkka</option>
                        <option value="ruoka">Ruoka</option>
                        <option value="laskut">Laskut</option>
                        <option value="viihde">Viihde</option>
                        <option value="uhkapelit">Uhkapelit</option>
                        <option value="muu">Muu</option>
                    </select>
                    <input name="amount"defaultValue={formState.values.amount} className="border rounded mr-2 px-1"/>
                    <button disabled={isPending} onClick={handleCancelModify} className="py-2 px-1.5 mx-1 rounded-xl bg-stone-200 hover:bg-stone-300">
                        Peruuta
                    </button>
                    <button disabled={isPending} type="submit" className="py-2 px-1.5 mx-1 rounded-xl bg-yellow-200 hover:bg-yellow-300">
                        Vahvista
                    </button>
                </form>
            </>
        ):(
            <>
                <p className="m-2">{transaction.description}</p>
                <p className="m-2">{transaction.category}</p>
                <p className="m-2">{transaction.amount}€</p>
                <button onClick={handleModify} className="py-2 px-1.5 mx-1 rounded-xl bg-yellow-200 hover:bg-yellow-300">
                    Muokkaa
                </button>
                <button onClick={()=> handleDelete(transaction)} className="py-2 px-1.5 mx-1 rounded-xl bg-red-300 hover:bg-red-400">
                    Poista
                </button>
            </>
        )}
        </div>
    )
}
