import Transaction from "./Transaction";
import {TransactionContext} from "../context/TransactionsContext"
import { use } from "react";

export default function TransactionsDisplay(){
    const {savedTransactions} = use(TransactionContext)

    return(
        <div>
            <h2 className="text-xl font-bold mx-2">Tapahtumat</h2>
        {savedTransactions.length >0 && (
            <div>
            {savedTransactions.toReversed().map((transa)=><Transaction key={transa.id} transaction={transa}/>)}
            </div>)}
        </div>
    )
}
