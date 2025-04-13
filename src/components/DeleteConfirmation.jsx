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
            <h2 className="text-2xl font-bold">
                Haluatko varmasti poistaa tämän tapahtuman?
            </h2>
            <div>
                <span className="font-bold">Kuvaus: </span>
                <span>{itemToDelete.description}</span>
            </div>

            <div>
                <span className="font-bold">Määrä: </span>
                <span>{itemToDelete.amount}€</span>
            </div>
            <button onClick={onConfirm} className="px-2 py-1 my-2 mr-2 rounded-xl bg-red-300 hover:bg-red-400">
                Kyllä, poista
            </button>
            <button onClick={onCancel} className="px-2 py-1 my-2 mr-2 rounded-xl bg-stone-300 hover:bg-stone-400">
                Ei, älä poista
            </button>
        </div>
    )
}
