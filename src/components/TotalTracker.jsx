import { TransactionContext } from "../context/TransactionsContext"
import { use } from "react"

export default function TotalTracker(){
    const {totalSum} = use(TransactionContext)

    return(
        <div className="bg-blue-400 p-2">
            <h2 className="text-2xl">Saldo:</h2>
            <p className="text-xl">{totalSum} €</p>
        </div>
    )
}
