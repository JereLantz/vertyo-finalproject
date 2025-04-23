import { render, screen } from "@testing-library/react";
import TransactionsDisplay from "./TransactionsDisplay"
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
        fetchingAll: false,
        fetchingAllError: false,
        filteredTransactions: mockData,
        currentFilter:{
            description: "",
            income: "on",
            food: "on",
            expence: "on",
            entertainment: "on",
            gambling: "on",
            other: "on",
        },
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

    test("correctly display error message if fetching data fails", ()=>{
        const mockContextCopy = {...mockcontext}
        mockContextCopy.fetchingAllError = true

        render(
            <TransactionContext.Provider value={mockContextCopy}>
                <TransactionsDisplay />
            </TransactionContext.Provider>
        )

        const error = screen.getByText("Virhe tapahtumia haettaessa", {exact:false})

        expect(error).toBeInTheDocument()
    })

    test("Display message informing the user that no transactions were found", ()=>{
        const mockContextCopy = {...mockcontext}
        mockContextCopy.filteredTransactions = []
        mockContextCopy.fetchingAllError = false

        render(
            <TransactionContext.Provider value={mockContextCopy}>
                <TransactionsDisplay />
            </TransactionContext.Provider>
        )

        const notFoundMsg = screen.getByText("ei löytynyt", {exact:false})

        expect(notFoundMsg).toBeInTheDocument()
    })

    test("Displaying message when fetching data", ()=>{
        mockcontext.fetchingAll = true

        render(
            <TransactionContext.Provider value={mockcontext}>
                <TransactionsDisplay />
            </TransactionContext.Provider>
        )

        const fetchingMsg = screen.getByText("Tapahtumia haetaan...", {exact:false})

        expect(fetchingMsg).toBeInTheDocument()
    })
})
