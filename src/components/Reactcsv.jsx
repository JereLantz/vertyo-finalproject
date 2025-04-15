import { CSVLink } from "react-csv"
import { TransactionContext } from "../context/TransactionsContext"
import { use } from "react"

export default function Reactcsv(){
    const {savedTransactions} =use(TransactionContext)

    return(
        <CSVLink data={savedTransactions}>
            Lataa tapahtumat reactcsv
        </CSVLink>
    )
}
