import { useEffect, useState } from "react";
import { createContext } from "react";
import { dummyData } from "../dummyData";

export const TransactionContext = createContext({
    savedTransactions:[],
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
    const [showDelModal, setShowDelModal] = useState(false)
    const [currentFilter, setCurrentFilter] = useState(null)

    useEffect(()=>{
        async function getAllTransactions(){
            //TODO: Siirrä totalin laskeminen total komponenttiin.
            // Nämä http funktiot omaan http.js tiedostoon?
            const response = await fetch("https://www.cc.puv.fi/~e2301755/reactfinal/back.php")
            if(!response.ok){
                console.log("Network error fetching data")
                return
            }
            const resData = await response.json()
            console.log(resData)
        }
    getAllTransactions()
    },[])

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
