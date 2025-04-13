import { useState } from "react";
import { createContext } from "react";

export const TransactionContext = createContext({
    savedTransactions:[],
    totalSum: 0,
    showDelModal: false,
    itemToDelete: {},
    showDeleteConfirm: ()=>{},
    addNewTransaction: ()=>{},
    deleteTransaction: ()=>{},
    cancelDelete: ()=>{},
})

const dummyData = [
    {id:43432, description:"Palkka", amount:3434},
    {id:90584, description:"Ruoka", amount:-50},
    {id:239048, description:"sähkölasku", amount:-200},
    {id:8934, description:"Kahvi", amount:-300},
    {id:93285, description:"Lotto", amount:5},
]

let itemToDelete = null

export default function TransactionContextProvider({children}){
    const [transactions, setTransactions] = useState(dummyData)
    const [total, setTotal] = useState(transactions.reduce((acc,item)=> acc+item.amount,0))
    const [showDelModal, setShowDelModal] = useState(false)

    function addNewTransaction(newTransaction){
        newTransaction.id = Math.random()

        setTransactions((p)=>[newTransaction,...p])

        setTotal((p)=>p+Number(newTransaction.amount))
    }

    function showDeleteConfirm(itemToDel){
        setShowDelModal(true)
        itemToDelete = itemToDel
    }

    function deleteTransaction(itemToDel){
        setShowDelModal(false)

        setTransactions((p)=>p.filter(item=> item.id != itemToDel.id))

        setTotal(p=>p-(Number(itemToDel.amount)))
    }

    function cancelDelete(){
        setShowDelModal(false)
    }

    const ctxValue ={
        savedTransactions:transactions,
        totalSum: total,
        showDelModal,
        itemToDelete,
        showDeleteConfirm,
        addNewTransaction,
        deleteTransaction,
        cancelDelete,
    }
    return(
        <TransactionContext.Provider value={ctxValue}>
        {children}
        </TransactionContext.Provider>
    )
}
