import Transaction from "./Transaction";

export default function TransactionsDisplay(){
    return(
        <div>
            <h2 className="text-xl font-bold mx-2">Tapahtumat</h2>
            <div>
                <Transaction />
            </div>
        </div>
    )
}
