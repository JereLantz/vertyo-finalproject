import Transaction from "./Transaction";
import {TransactionContext} from "../context/TransactionsContext"
import { use } from "react";
import Filter from "./Filter";

export default function TransactionsDisplay(){
    const {filteredTransactions, fetchingAll, fetchingAllError} = use(TransactionContext)

    return(
        <div>
        <div className="flex flex-row my-3">
            <h2 className="text-xl font-bold mx-2">Tapahtumat</h2>
        <Filter />
        </div>
        {filteredTransactions.length >0 && !fetchingAll && !fetchingAllError && (
            <div>
            {filteredTransactions.toReversed().map((transa)=><Transaction key={transa.id} transaction={transa}/>)}
            </div>)}
        {fetchingAll && !fetchingAllError && (
            <div className="m-2">
                <p>
                    Tapahtumia haetaan...
                </p>
            </div>
        )}
        {!fetchingAll && fetchingAllError && (
            <div className="m-2">
                <p>
                    Virhe tapahtumia haettaessa. Yritä myöhemmin uudestaan
                </p>
            </div>
        )}
        {!fetchingAll && !fetchingAllError && filteredTransactions.length == 0 &&(
            <div className="m-2">
                <p>
                    Tallennettuja tapahtumia ei löytynyt.
                </p>
            </div>
        )}
        </div>
    )
}
