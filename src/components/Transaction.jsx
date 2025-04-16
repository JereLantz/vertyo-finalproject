import {TransactionContext} from "../context/TransactionsContext"
import { use, useState } from "react"

export default function Transaction({transaction}){
    const {showDeleteConfirm} = use(TransactionContext)
    const [modify, setModify] = useState(false)

    function handleDelete(itemToDelete){
        showDeleteConfirm(itemToDelete)
    }

    function handleModify(){
        setModify(true)
    }

    function handleCancelModify(){
        setModify(false)
    }

    return (
        <div className="flex m-2 p-3 border border-black">
        {modify ? (
            <>
                <form>
                    <input defaultValue={transaction.description} className="border rounded mr-2 px-1"/>
                    <select id="category" defaultValue={transaction.category} name="category" className="border rounded px-1 mr-2 p-0.5">
                        <option value="palkka">Palkka</option>
                        <option value="ruoka">Ruoka</option>
                        <option value="laskut">Laskut</option>
                        <option value="viihde">Viihde</option>
                        <option value="uhkapelit">Uhkapelit</option>
                        <option value="muu">Muu</option>
                    </select>
                    <input defaultValue={transaction.amount} className="border rounded mr-2 px-1"/>
                    <button onClick={handleCancelModify} className="py-2 px-1.5 mx-1 rounded-xl bg-stone-200 hover:bg-stone-300">
                        Peruuta
                    </button>
                    <button className="py-2 px-1.5 mx-1 rounded-xl bg-yellow-200 hover:bg-yellow-300">
                        Vahvista
                    </button>
                </form>
            </>
        ):(
            <>
                <p className="m-2">{transaction.description}</p>
                <p className="m-2">{transaction.category}</p>
                <p className="m-2">{transaction.amount}€</p>
                <button onClick={handleModify} className="py-2 px-1.5 mx-1 rounded-xl bg-yellow-200 hover:bg-yellow-300">
                    Muokkaa
                </button>
                <button onClick={()=> handleDelete(transaction)} className="py-2 px-1.5 mx-1 rounded-xl bg-red-300 hover:bg-red-400">
                    Poista
                </button>
            </>
        )}
        </div>
    )
}
