import { TransactionContext } from "../context/TransactionsContext"
import { use, useEffect, useState } from "react"

export default function TotalTracker(){
    const {savedTransactions} = use(TransactionContext)
    const [total, setTotal] = useState(0)

    useEffect(()=>{
        setTotal(savedTransactions.reduce((acc,item)=> acc+item.amount,0))
    },[savedTransactions])

    return(
        <div className="bg-blue-400 p-2">
            <h2 className="text-2xl">Saldo:</h2>
            <p className="text-xl">{total.toFixed(2)} €</p>
        </div>
    )
}
