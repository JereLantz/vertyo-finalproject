import {TransactionContext} from "../context/TransactionsContext"
import { use, useActionState, useState } from "react"

export default function Transaction({transaction}){
    const {showDeleteConfirm, updateTransaction} = use(TransactionContext)
    const [modify, setModify] = useState(false)

    async function handleUpdateAction(_, formData){
        const errors = []

        const newDesc = formData.get("description")
        const newCategory = formData.get("category")
        const newAmountString = formData.get("amount")

        const newAmount = Number(newAmountString)

        //const updatedTransaction = current.values
        const transactionUpdated = {...transaction}
        transactionUpdated.description = newDesc
        transactionUpdated.category = newCategory
        transactionUpdated.amount = newAmount

        if(newDesc.trim().length < 3){
            errors.push("Anna kuvaus tapahtumalle. Vähintään 3 merkkiä")
            transactionUpdated.description = transaction.description
        }

        if(!newAmount){
            errors.push("Syötä vain numeroita määrä kenttään.")
            transactionUpdated.amount = transaction.amount
        }

        if(!newCategory || !newCategory.trim()){
            errors.push("Tapahtumalla tulisi olla kategoria")
            transactionUpdated.category = transaction.category
        }

        if(errors.length > 0){
            return {errors, values:transactionUpdated}
        }

        if(newAmount >= 0){
            transactionUpdated.type = "income"
        }
        else{
            transactionUpdated.type = "expense"
        }
        const res = await updateTransaction(transactionUpdated)

        if(!res.success){
            errors.push("Virhe tapahtuman päivityksessä")
        }

        if(errors.length > 0){
            return {errors, values:transactionUpdated}
        }

        setModify(false)
        return {errors:null, values:transactionUpdated}
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
                    <input disabled={isPending} name="description" defaultValue={formState.values.description} className="border rounded mr-2 px-1"/>
                    <select id="category" disabled={isPending} defaultValue={formState.values.category} name="category" className="border rounded px-1 mr-2 p-0.5">
                        <option value="palkka">Palkka</option>
                        <option value="ruoka">Ruoka</option>
                        <option value="laskut">Laskut</option>
                        <option value="viihde">Viihde</option>
                        <option value="uhkapelit">Uhkapelit</option>
                        <option value="muu">Muu</option>
                    </select>
                    <input disabled={isPending} name="amount"defaultValue={formState.values.amount} className="border rounded mr-2 px-1"/>
                    {isPending && <span className="m-2">Päivitetään...</span>}
                    <button disabled={isPending} type={"button"} onClick={handleCancelModify} className="border hover:cursor-pointer py-2 px-1.5 mx-1 rounded-xl bg-stone-200 hover:bg-stone-300">
                        Peruuta
                    </button>
                    <button disabled={isPending} type="submit" className="border hover:cursor-pointer py-2 px-1.5 mx-1 rounded-xl bg-yellow-200 hover:bg-yellow-300">
                        Vahvista
                    </button>
                </form>

                {formState.errors && (
                <div>
                    <ul className="text-red-400">
                        {formState.errors.map((error)=> <li key={error}>{error}</li>)}
                    </ul>
                </div>
                )}
            </>
        ):(
            <>
                <p className="m-2 pr-8">{transaction.description}</p>
                <p className="m-2 pr-8">{transaction.category}</p>
                <p className="m-2 pr-8">{transaction.amount}€</p>
                <button onClick={handleModify} className="border hover:cursor-pointer py-2 px-1.5 mx-1 rounded-xl bg-yellow-200 hover:bg-yellow-300">
                    Muokkaa
                </button>
                <button onClick={()=> handleDelete(transaction)} className="border hover:cursor-pointer py-2 px-1.5 mx-1 rounded-xl bg-red-300 hover:bg-red-400">
                    Poista
                </button>
            </>
        )}
        </div>
    )
}
