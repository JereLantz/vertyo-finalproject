import { useState } from "react";
import { createContext } from "react";

export const TransactionContext = createContext({
    savedTransactions:[],
    totalSum: 0,
    addNewTransaction: ()=>{},
    deleteTransaction: ()=>{},
})

const dummyData = [
    {id:43432, description:"Palkka", amount:3434},
    {id:90584, description:"Ruoka", amount:-50},
    {id:239048, description:"sähkölasku", amount:-200},
    {id:8934, description:"Kahvi", amount:-300},
    {id:93285, description:"Lotto", amount:5},
]

export default function TransactionContextProvider({children}){
    const [transactions, setTransactions] = useState(dummyData)
    const [total, setTotal] = useState(transactions.reduce((acc,item)=> acc+item.amount,0))

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
