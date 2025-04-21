import AddNewTransaction from "./components/AddNewTransaction"
import DeleteConfirmation from "./components/DeleteConfirmation"
import DownloadDataCSV from "./components/DownloadDataCSV"
import Filter from "./components/Filter"
import Modal from "./components/Modal"
import TotalTracker from "./components/TotalTracker"
import TransactionsDisplay from "./components/TransactionsDisplay"
import Visualize from "./components/Visualize"
import TransactionContextProvider from "./context/TransactionsContext"

function App() {
    return (
        <div className="m-2">
            <TransactionContextProvider>
                <Modal>
                    <DeleteConfirmation />
                </Modal>
                <h1 className="font-bold text-3xl m-3 p-3">Budget tracker</h1>
                <div className="border mb-3">
                    <TotalTracker />
                    <AddNewTransaction />
                </div>
                <DownloadDataCSV/>
                <Filter />
                <Visualize />
                <TransactionsDisplay />
            </TransactionContextProvider>
        </div>
    )
}

export default App
