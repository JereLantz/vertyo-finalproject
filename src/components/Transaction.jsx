import {TransactionContext} from "../context/TransactionsContext"
import { use } from "react"

export default function Transaction({transaction}){
    const {showDeleteConfirm} = use(TransactionContext)

    function handleDelete(itemToDelete){
        showDeleteConfirm(itemToDelete)
    }

    return (
        <div className="flex m-2 p-3 border border-black">
        <p className="m-2">{transaction.description}</p>
        <p className="m-2">{transaction.amount}</p>
        <button onClick={()=> handleDelete(transaction)} className="py-2 px-1.5 mx-1 rounded-xl bg-red-300 hover:bg-red-400">Poista</button>
        </div>
    )
}
