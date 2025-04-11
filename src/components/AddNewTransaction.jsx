export default function AddNewTransaction(){
    const inputStyle = "border rounded mx-2"
    return(
        <div className="m-2">
            <form>
                <div className="my-1">
                <label htmlFor="newTaDesc" className="font-bold">Kuvaus:</label>
                <input name="description" id="newTaDesc" className={inputStyle}/>
                </div>
                <div className="my-1">
                <label htmlFor="newTaAmount" className="font-bold">Summa:</label>
                <input name="amount" id="newTaAmount" className={inputStyle}/>
                </div>
                <button type="submit" className="rounded-xl p-2 bg-blue-400 hover:bg-blue-500">
                    Lisää uusi tapahtuma
                </button>
            </form>
        </div>
    )
}
