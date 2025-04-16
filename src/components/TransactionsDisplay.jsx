import Transaction from "./Transaction";
import {TransactionContext} from "../context/TransactionsContext"
import { use } from "react";

export default function TransactionsDisplay(){
    const {filteredTransactions} = use(TransactionContext)

    return(
        <div>
            <h2 className="text-xl font-bold mx-2">Tapahtumat</h2>
        {filteredTransactions.length >0 && (
            <div>
            {filteredTransactions.toReversed().map((transa)=><Transaction key={transa.id} transaction={transa}/>)}
            </div>)}
        </div>
    )
}
