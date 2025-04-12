import AddNewTransaction from "./components/AddNewTransaction"
import Filter from "./components/Filter"
import TotalTracker from "./components/TotalTracker"
import TransactionsDisplay from "./components/TransactionsDisplay"
import TransactionContextProvider from "./context/TransactionsContext"

function App() {

  return (
    <>
      <TransactionContextProvider>
          <h1 className="font-bold text-3xl m-3 p-3">Budget tracker</h1>
          <TotalTracker />
          <AddNewTransaction />
          <Filter />
          <TransactionsDisplay />
      </TransactionContextProvider>
    </>
  )
}

export default App
