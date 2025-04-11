import AddNewTransaction from "./components/AddNewTransaction"
import TotalTracker from "./components/TotalTracker"
import TransactionsDisplay from "./components/TransactionsDisplay"

function App() {

  return (
    <>
      <h1>Budget tracker</h1>
      <TotalTracker />
      <AddNewTransaction />
      <TransactionsDisplay />
    </>
  )
}

export default App
