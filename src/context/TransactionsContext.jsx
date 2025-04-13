import { useState } from "react";
import { createContext } from "react";

export const TransactionContext = createContext({
    savedTransactions:[],
    totalSum: 0,
    addNewTransaction: ()=>{},
    deleteTransaction: ()=>{},
})

export default function TransactionContextProvider({children}){
    const [transactions, setTransactions] = useState([])
    const [total, setTotal] = useState(0)

    function addNewTransaction(newTransaction){
        newTransaction.id = Math.random()

        setTransactions((p)=>[newTransaction,...p])

        setTotal((p)=>p+Number(newTransaction.amount))
    }

    function deleteTransaction(itemToDel){
        setTransactions((p)=>p.filter(item=> item.id != itemToDel.id))

        setTotal(p=>p-(Number(itemToDel.amount)))
    }

    const ctxValue ={
        savedTransactions:transactions,
        totalSum: total,
        addNewTransaction,
        deleteTransaction,
    }
    return(
        <TransactionContext.Provider value={ctxValue}>
        {children}
        </TransactionContext.Provider>
    )
}
