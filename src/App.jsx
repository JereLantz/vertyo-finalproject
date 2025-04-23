import { useState } from "react"
import AddNewTransaction from "./components/AddNewTransaction"
import DeleteConfirmation from "./components/DeleteConfirmation"
import DownloadDataCSV from "./components/DownloadDataCSV"
import Filter from "./components/Filter"
import Modal from "./components/Modal"
import TotalTracker from "./components/TotalTracker"
import TransactionsDisplay from "./components/TransactionsDisplay"
import Visualize from "./components/Visualize"
import TransactionContextProvider from "./context/TransactionsContext"
import FilterForm from "./components/FilterForm"

function App() {
    const [visible, setVisible] = useState("")

    function handleToggleNewTransa(){
        setVisible(p=>{
            if(p == "new"){
                return ""
            }
            else{
                return "new"
            }
        })
    }

    function handleToggleVisualize(){
        setVisible(p=>{
            if(p == "visual"){
                return ""
            }
            else{
                return "visual"
            }
        })
    }

    function handleToggleFilter(){
        setVisible(p=>{
            if(p == "filter"){
                return ""
            }
            else{
                return "filter"
            }
        })
    }

    return (
        <div className="m-2">
            <TransactionContextProvider>
                <Modal>
                    <DeleteConfirmation />
                </Modal>
                <h1 className="font-bold text-3xl m-3 p-3">Budget tracker</h1>
                <nav className="ml-2">
                    <button onClick={handleToggleNewTransa} className="border mr-2 hover:cursor-pointer rounded-2xl p-2 bg-yellow-100 hover:bg-yellow-200">
                        Lisää uusi
                    </button>

                    <button onClick={handleToggleFilter} className="border mr-2 hover:cursor-pointer rounded-2xl p-2 bg-yellow-100 hover:bg-yellow-200">
                        Suodata
                    </button>

                    <button onClick={handleToggleVisualize} className="border mr-2 hover:cursor-pointer rounded-2xl p-2 bg-yellow-100 hover:bg-yellow-200">
                        Visualisoi
                    </button>
                    <DownloadDataCSV/>
                </nav>
                {visible == "new" && <AddNewTransaction />}
                {visible === "filter" && <FilterForm closeForm={handleToggleFilter}/>}
                {visible == "visual" &&<Visualize />}

                <TotalTracker />
                <TransactionsDisplay />
            </TransactionContextProvider>
        </div>
    )
}

export default App
