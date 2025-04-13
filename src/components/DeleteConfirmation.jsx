import { use } from "react"
import { TransactionContext } from "../context/TransactionsContext"

export default function DeleteConfirmation(){
    const {cancelDelete, itemToDelete, deleteTransaction} = use(TransactionContext)
    function onConfirm(){
        deleteTransaction(itemToDelete)
    }

    function onCancel(){
        cancelDelete()
    }

    return(
        <div>
            <h2>
                Haluatko varmasti poistaa tämän tapahtuman?
            </h2>
            <p>Kuvaus: {itemToDelete.description}</p>
            <p>Määrä: {itemToDelete.amount}</p>
            <button onClick={onConfirm}>
                Kyllä, poista
            </button>
            <button onClick={onCancel}>
                Ei, älä poista
            </button>
        </div>
    )
}
