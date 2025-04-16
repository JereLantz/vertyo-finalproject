/*
import CsvDownloader from "react-csv-downloader"
import { TransactionContext } from "../context/TransactionsContext"
import { use } from "react"

export default function DownloadDataCSV(){
    const {savedTransactions} =use(TransactionContext)

    return(
        <div>
        <CsvDownloader filename="transactionData" datas={savedTransactions}>
            <button className="m-2 rounded-xl p-2 bg-amber-100 hover:bg-amber-200">
                Lataa tapahtumat
            </button>
        </CsvDownloader>
        </div>
    )
}
*/

import { CSVLink } from "react-csv"
import { TransactionContext } from "../context/TransactionsContext"
import { use } from "react"

export default function Reactcsv(){
    const {savedTransactions} = use(TransactionContext)

    return(
        <>
        {savedTransactions.length == 0 ?(
            <button className="m-2 rounded-xl p-2 bg-amber-100 hover:bg-amber-200">
            Lataa tapahtumat
            </button>
        ):(
        <CSVLink data={savedTransactions} target="_blank" className="m-2 rounded-xl p-2 bg-amber-100 hover:bg-amber-200" filename="transactions.csv">
            Lataa tapahtumat
        </CSVLink>
        )}
        </>
    )
}
