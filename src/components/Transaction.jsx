export default function Transaction(){
    return (
        <div className="flex m-2 p-3 border border-black">
        <p className="m-2">Kuvaus</p>
        <p className="m-2">Määrä</p>
        <button className="py-2 px-1.5 mx-1 rounded-xl bg-red-300 hover:bg-red-400">Poista</button>
        </div>
    )
}
