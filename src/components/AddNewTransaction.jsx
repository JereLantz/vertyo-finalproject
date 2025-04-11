export default function AddNewTransaction(){
    return(
        <div>
            <form>
                <label htmlFor="newTaDesc">Kuvaus:</label>
                <input name="description" id="newTaDesc"/>
                <label htmlFor="newTaAmount">Summa:</label>
                <input name="amount" id="newTaAmount"/>
                <button type="submit">Lisää uusi tapahtuma</button>
            </form>
        </div>
    )
}
