import AddNewTransaction from "./components/AddNewTransaction"
import Filter from "./components/Filter"
import TotalTracker from "./components/TotalTracker"
import TransactionsDisplay from "./components/TransactionsDisplay"

function App() {

  return (
    <>
      <h1 className="font-bold text-3xl m-3 p-3">Budget tracker</h1>
      <TotalTracker />
      <AddNewTransaction />
      <Filter />
      <TransactionsDisplay />
    </>
  )
}

export default App
