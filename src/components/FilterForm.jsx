export default function FilterForm(){
    return(
        <div>
            <form>
                <label htmlFor="filterDesc">Kuvaus:</label>
                <input className="border rounded mx-1 px-1" id="filterDesc" name="filterDesc" placeholder="Kuvauksen perusteella"/>
                <div>
                    <label className="mr-1" htmlFor="filterIncome">Menot:</label>
                    <input id="filterIncome" name="filterIncome" type="checkbox" />
                    <br/>
                    <label className="mr-1" htmlFor="filterExpense">Tulot:</label>
                    <input id="filterExpense" name="filterExpense" type="checkbox" />
                </div>
                <button type="submit" className="rounded-xl p-2 bg-emerald-200 hover:bg-emerald-300">
                    Filteröi
                </button>
            </form>
        </div>
    )
}
