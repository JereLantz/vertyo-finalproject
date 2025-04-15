import { useState } from "react";
import { createContext } from "react";
import { dummyData } from "../dummyData";

export const TransactionContext = createContext({
    savedTransactions:[],
    totalSum: 0,
    showDelModal: false,
    itemToDelete: {},
    currentFilter: {},
    setFilter: ()=>{}, 
    removeFilter: ()=>{}, 
    showDeleteConfirm: ()=>{},
    addNewTransaction: ()=>{},
    deleteTransaction: ()=>{},
    cancelDelete: ()=>{},
})

let itemToDelete = null

export default function TransactionContextProvider({children}){
    const [transactions, setTransactions] = useState(dummyData)
    const [total, setTotal] = useState(transactions.reduce((acc,item)=> acc+item.amount,0))
    const [showDelModal, setShowDelModal] = useState(false)
    const [currentFilter, setCurrentFilter] = useState(null)

    function addNewTransaction(newTransaction){
        newTransaction.id = Math.random()

        setTransactions((p)=>[newTransaction,...p])

        setTotal((p)=>p+newTransaction.amount)
    }

    function showDeleteConfirm(itemToDel){
        setShowDelModal(true)
        itemToDelete = itemToDel
    }

    function setFilter(filter){
        setCurrentFilter(filter)
    }

    function removeFilter(){
        setCurrentFilter(null)
    }

    function deleteTransaction(itemToDel){
        setShowDelModal(false)

        setTransactions((p)=>p.filter(item=> item.id != itemToDel.id))

        setTotal(p=>p-itemToDel.amount)
    }

    function cancelDelete(){
        setShowDelModal(false)
    }

    const ctxValue ={
        savedTransactions:transactions,
        totalSum: total,
        showDelModal,
        itemToDelete,
        currentFilter,
        setFilter,
        removeFilter,
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
