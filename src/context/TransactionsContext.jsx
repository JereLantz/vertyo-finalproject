import { useState } from "react";
import { createContext } from "react";

export const TransactionContext = createContext({
    savedTransactions:[],
    addNewTransaction: ()=>{},
    deleteTransaction: ()=>{},
})

export default function TransactionContextProvider({children}){
    const [transactions, setTransactions] = useState([])

    function addNewTransaction(newTransaction){
        //TODO:
        console.log("add")
    }

    function deleteTransaction(id){
        //TODO:
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
