import { render, screen } from "@testing-library/react";
import TotalTracker from "./TotalTracker"
import { TransactionContext } from "../context/TransactionsContext";

describe("TotalTracker component tests", ()=>{
    const mockData = [
        {amount:4},
        {amount:4},
        {amount:4},
        {amount:4},
    ]
    const mockContext = {
        filteredTransactions: mockData,
    }

    test("Correctly calculates the sum and displays it on the screen",()=>{
        render(
            <TransactionContext.Provider value={mockContext}>
                <TotalTracker />
            </TransactionContext.Provider>
        )

        let expectedSumm = 0
        for(const item of mockData){
            expectedSumm += Number(item.amount)
        }

        const summDisplay = screen.getByText(expectedSumm, {exact:false})
        expect(summDisplay).toBeInTheDocument()
    })
})
