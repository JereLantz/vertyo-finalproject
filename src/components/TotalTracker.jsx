import { TransactionContext } from "../context/TransactionsContext"
import { use, useEffect, useState } from "react"

export default function TotalTracker(){
    const {filteredTransactions} = use(TransactionContext)
    const [total, setTotal] = useState(0)

    useEffect(()=>{
        setTotal(filteredTransactions.reduce((acc,item)=> acc+Number(item.amount),0))
    },[filteredTransactions])

    return(
        <div className="m-2 border bg-blue-400 p-2">
            <h2 className="text-2xl">Saldo:</h2>
            <p className="text-xl">{total.toFixed(2)} €</p>
        </div>
    )
}
