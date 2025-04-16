export default function ErrorDisplay({title, children}){
    return(
        <div>
            <h2>{title}</h2>
            <p>
                {children}
            </p>
            <button>Sulje</button>
        </div>
    )
}
