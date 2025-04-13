export default function Transaction({transaction}){
    return (
        <div className="flex m-2 p-3 border border-black">
        <p className="m-2">{transaction.description}</p>
        <p className="m-2">{transaction.amount}</p>
        <button className="py-2 px-1.5 mx-1 rounded-xl bg-red-300 hover:bg-red-400">Poista</button>
        </div>
    )
}
