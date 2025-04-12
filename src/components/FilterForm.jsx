export default function FilterForm(){
    return(
        <div>
            <form>
                <label htmlFor="filterDesc">Kuvaus:</label>
                <input id="filterDesc" name="filterDesc" placeholder="Kuvauksen perusteella"/>
                <div>
                <label htmlFor="filterIncome">Menot:</label>
                <input id="filterIncome" name="filterIncome" type="checkbox" />
                <label htmlFor="filterExpense">Tulot:</label>
                <input id="filterExpense" name="filterExpense" type="checkbox" />
                </div>
                <button type="submit">Filteröi</button>
            </form>
        </div>
    )
}
