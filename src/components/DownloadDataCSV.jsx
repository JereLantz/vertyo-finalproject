import { CSVLink } from "react-csv"
import { TransactionContext } from "../context/TransactionsContext"
import { use } from "react"

export default function DownloadDataCSV(){
    const {savedTransactions} =use(TransactionContext)

    return(
        <CSVLink data={savedTransactions}>
            Lataa tapahtumat
        </CSVLink>
    )
}
