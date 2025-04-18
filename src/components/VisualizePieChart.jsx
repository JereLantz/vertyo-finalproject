import { use } from "react";
import { PureComponent } from "react"
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import {TransactionContext} from "../context/TransactionsContext"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#ce4116']
const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

function calculateTotals(transactions){
    let categoryTotal = [
        {name: "ruoka", value:0},
        {name: "laskut", value:0},
        {name: "viihde", value:0},
        {name: "uhkapelit", value:0},
        {name: "muu", value:0},
    ]

    transactions.map((transa)=>{
        switch(transa.category){
            case "ruoka":
                categoryTotal[0].value += Math.abs(Number(transa.amount))
                break
            case "laskut":
                categoryTotal[1].value += Math.abs(Number(transa.amount))
                break
            case "viihde":
                categoryTotal[2].value += Math.abs(Number(transa.amount))
                break
            case "uhkapelit":
                categoryTotal[3].value += Math.abs(Number(transa.amount))
                break
            case "muu":
                categoryTotal[4].value += Math.abs(Number(transa.amount))
                break
        }
    })
    return categoryTotal
}

export default function VisualizePieChart(){
    const {filteredTransactions} = use(TransactionContext)

    const data = calculateTotals(filteredTransactions)

    console.log(data)
    return(
        <div style={{ width: '100%', height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
                <Pie data={data} cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel}
                outerRadius={80} fill="#8884d8" dataKey="value" >
                {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
        </div>
    )
}
