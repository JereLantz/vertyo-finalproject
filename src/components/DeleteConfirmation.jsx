export default function DeleteConfirmation({transaction}){
    function onConfirm(){
        return true
    }

    function onCancel(){
        return false
    }
    return(
        <div>
            <h2>
                Oletko varma?
            </h2>
            <p>
                Haluatko varmasti poistaa tämän tapahtuman?
            </p>

            <p>Kuvaus: {transaction.description}</p>
            <p>Määrä: {transaction.amount}</p>
            <button onClick={onConfirm}>
                Kyllä, poista
            </button>
            <button onClick={onCancel}>
                Ei, älä poista
            </button>
        </div>
    )
}
