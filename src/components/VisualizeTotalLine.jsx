import { use } from "react"
import { TransactionContext } from "../context/TransactionsContext"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function calculateTotal(transactions){
    let currTotal = 0
    //NOTE: Jesus ristus kun oli vaikeeta kopioida array...
    let transactionsCopy = transactions.map(t =>({...t}))

    for(let i=0; i<transactionsCopy.length; i++){
        currTotal += Number(transactionsCopy[i].amount)
        transactionsCopy[i].amount = currTotal
    }

    return transactionsCopy
}

export default function VisualizeTotalLine(){
    const {filteredTransactions} = use(TransactionContext)

    const data = calculateTotal(filteredTransactions)

    return(
        <div style={{ width: '100%', height: 300 }} >
            <div>
                <h2 className="font-bold text-xl">
                    Saldon seuranta:
                </h2>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="description" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
