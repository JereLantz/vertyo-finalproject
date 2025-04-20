import { useEffect, useState } from "react";
import { createContext } from "react";

export const TransactionContext = createContext({
    savedTransactions:[],
    filteredTransactions: [],
    showDelModal: false,
    itemToDelete: {},
    currentFilter: {},
    setFilter: ()=>{}, 
    removeFilter: ()=>{}, 
    showDeleteConfirm: ()=>{},
    addNewTransaction: ()=>{},
    deleteTransaction: ()=>{},
    cancelDelete: ()=>{},
    updateTransaction: ()=>{},
})

let itemToDelete = null

export default function TransactionContextProvider({children}){
    const [transactions, setTransactions] = useState([])
    const [showDelModal, setShowDelModal] = useState(false)
    const [currentFilter, setCurrentFilter] = useState({
        description: "",
        income: "on",
        food: "on",
        expence: "on",
        entertainment: "on",
        gambling: "on",
        other: "on",
    })
    const [filteredTransactions, setFilteredTransactions] = useState([])

    useEffect(()=>{
        getAllTransactions()
    },[])

    useEffect(()=>{
        filterTransactions(currentFilter)
    },[transactions,currentFilter])

    function filterTransactions(filter){
        setFilteredTransactions(transactions.filter((transa)=>{
            console.log(transa)
            if(!filter){
                return true
            }
            if(transa.description.toLowerCase().includes(filter.description.toLowerCase()) && filter.description != ""){
                return true
            }
            if(filter.entertainment == "on" && transa.category == "viihde"){
                return true
            }
            if(filter.expence == "on" && transa.category == "laskut"){
                return true
            }
            if(filter.food == "on" && transa.category == "ruoka"){
                return true
            }
            if(filter.gambling == "on" && transa.category == "uhkapelit"){
                return true
            }
            if(filter.income == "on" && transa.category == "palkka"){
                return true
            }
            if(filter.other == "on" && transa.category == "muu"){
                return true
            }
            return false
        }))
        console.log(filteredTransactions)
    }

    async function getAllTransactions(){
        const response = await fetch("https://www.cc.puv.fi/~e2301755/reactfinal/back.php")
        if(!response.ok){
            console.log("Network error fetching data")
            return
        }
        const resData = await response.json()
        console.log(resData)
        setTransactions(resData)
    }

    async function addNewTransaction(newTransaction){
        if(newTransaction.amount < 0){
            newTransaction.type = "expense"
        }
        else{
            newTransaction.type = "income"
        }

        const response = await fetch("https://www.cc.puv.fi/~e2301755/reactfinal/back.php",{
            method: "POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(newTransaction)
        })
        
        if(!response.ok){
            console.log("error adding new transaction to the backend")
            return
        }
        const resData = await response.json()

        newTransaction.id = resData.id

        setTransactions((p)=>[...p,newTransaction])
    }

    async function updateTransaction(updatedTransaction){
        const response = await fetch("https://www.cc.puv.fi/~e2301755/reactfinal/back.php",{
            method:"PUT",
            body:JSON.stringify(updatedTransaction),
            headers:{
                'Content-Type':'application/json'
            }
        })
        if(!response.ok){
            console.log("failed to update the transaction")
            return {success:false}
        }

        setTransactions((p) => {
            const updatedArr = [...p]
            const updatedIndex = updatedArr.findIndex(ta=>ta.id === updatedTransaction.id)
            updatedArr[updatedIndex] = updatedTransaction
            return updatedArr
        })


        return {success:true}
    }

    function showDeleteConfirm(itemToDel){
        setShowDelModal(true)
        itemToDelete = itemToDel
    }

    function setFilter(filter){
        setCurrentFilter(filter)

    }

    function removeFilter(){
        setCurrentFilter({
            description: "",
            income: "on",
            food: "on",
            expence: "on",
            entertainment: "on",
            gambling: "on",
            other: "on",
        })
    }

    async function deleteTransaction(itemToDel){
        setShowDelModal(false)

        const response = await fetch("https://www.cc.puv.fi/~e2301755/reactfinal/back.php",{
            method:"DELETE",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({id:itemToDel.id})
        })

        if(!response.ok){
            console.log("error deleting transaction")
            return
        }

        setTransactions((p)=>p.filter(item=> item.id != itemToDel.id))
    }

    function cancelDelete(){
        setShowDelModal(false)
    }

    const ctxValue ={
        savedTransactions:transactions,
        filteredTransactions,
        showDelModal,
        itemToDelete,
        currentFilter,
        setFilter,
        removeFilter,
        showDeleteConfirm,
        addNewTransaction,
        deleteTransaction,
        cancelDelete,
        updateTransaction,
    }
    return(
        <TransactionContext.Provider value={ctxValue}>
        {children}
        </TransactionContext.Provider>
    )
}
