import { useState } from "react";
import { createContext } from "react";

export const TransactionContext = createContext({
    savedTransactions:[],
    addNewTransaction: ()=>{},
    deleteTransaction: ()=>{},
})

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

export default function TransactionContextProvider({children}){
    const [transactions, setTransactions] = useState([])

    function addNewTransaction(newTransaction){
        newTransaction.id = Math.random()

        setTransactions((p)=>[...p, newTransaction])
    }

    function deleteTransaction(id){
        //TODO:
        console.log("delete", id)
    }

    const ctxValue ={
        savedTransactions:transactions,
        addNewTransaction,
        deleteTransaction,
    }
    return(
        <TransactionContext.Provider value={ctxValue}>
        {children}
        </TransactionContext.Provider>
    )
}
