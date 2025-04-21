import { render, screen } from "@testing-library/react";
import TransactionsDisplay from "./TransactionsDisplay"
import userEvent from "@testing-library/user-event";
import { TransactionContext } from "../context/TransactionsContext";

describe("TransactionsDisplay component tests", ()=>{
    const mockData = [
        {
            id:0,
            description:"Testi1",
            amount:-69,
            category:"laskut",
        },
        {
            id:1,
            description:"Testi2",
            amount:-10,
            category:"ruoka",
        },
        {
            id:2,
            description:"Testi3",
            amount:-60,
            category:"viihde",
        },
        {
            id:3,
            description:"Testi4",
            amount:-89,
            category:"uhkapelit",
        },
        {
            id:4,
            description:"Testi5",
            amount:-3,
            category:"muu",
        },
        {
            id:5,
            description:"Testi6",
            amount:6969,
            category:"palkka",
        },
    ]

    const mockcontext = {
        filteredTransactions: mockData
    }

    test("Correctly render array of objects", ()=>{
        render(
            <TransactionContext.Provider value={mockcontext}>
                <TransactionsDisplay />
            </TransactionContext.Provider>
        )

        for(let i = 0; i < mockData.length; i++){
            const elemText = screen.getByText(mockData[i].description, {exact:false})
            const elemAmount = screen.getByText(mockData[i].amount,{exact:false})
            const elemCategory = screen.getByText(mockData[i].category)

            expect(elemText).toBeInTheDocument()
            expect(elemAmount).toBeInTheDocument()
            expect(elemCategory).toBeInTheDocument()
        }
    })
})
