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
        <>
            <TransactionContextProvider>
                <Modal>
                    <DeleteConfirmation />
                </Modal>
                <h1 className="font-bold text-3xl m-3 p-3">Budget tracker</h1>
                <TotalTracker />
                <AddNewTransaction />
                <DownloadDataCSV/>
                <Filter />
                <Visualize />
                <TransactionsDisplay />
            </TransactionContextProvider>
        </>
    )
}

export default App
