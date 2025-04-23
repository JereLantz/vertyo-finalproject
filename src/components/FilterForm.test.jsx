import { screen, render } from "@testing-library/react";
import FilterForm from "./FilterForm";
import { TransactionContext } from "../context/TransactionsContext";
import userEvent from "@testing-library/user-event";

describe("Filter form tests",()=>{
    test("Displays the saved filter", ()=>{
        const mockContext = {
            setFilter: vi.fn(),
            removeFilter: vi.fn(),
            currentFilter:{
                description: "at",
                income: "on",
                food: "on",
                expence: null,
                entertainment: "on",
                gambling: null,
                other: "on",
            },
        }

        render(
            <TransactionContext.Provider value={mockContext}>
                <FilterForm/>
            </TransactionContext.Provider>
        )

        const description = screen.getByRole("textbox")
        const income = screen.getByLabelText("Palkka", {exact:false})
        const food = screen.getByLabelText("Ruoka", {exact:false})
        const expence = screen.getByLabelText("Laskut", {exact:false})
        const entertainment = screen.getByLabelText("viihde", {exact:false})
        const gambling = screen.getByLabelText("Uhkapelit", {exact:false})
        const other = screen.getByLabelText("muu", {exact:false})

        expect(description).toHaveValue(mockContext.currentFilter.description)
        expect(income).toBeChecked()
        expect(food).toBeChecked()
        expect(expence).not.toBeChecked()
        expect(entertainment).toBeChecked()
        expect(gambling).not.toBeChecked()
        expect(other).toBeChecked()
    })

    test("correctly replaces the old filter with a new one", async()=>{
        const mockContext = {
            setFilter: vi.fn(),
            removeFilter: vi.fn(),
            currentFilter:{
                description: "",
                income: "on",
                food: "on",
                expence: null,
                entertainment: "on",
                gambling: null,
                other: "on",
            },
        }

        render(
            <TransactionContext.Provider value={mockContext}>
                <FilterForm closeForm={vi.fn()}/>
            </TransactionContext.Provider>
        )

        const description = screen.getByRole("textbox")
        const income = screen.getByLabelText("Palkka", {exact:false})
        //const food = screen.getByLabelText("Ruoka", {exact:false})
        //const expence = screen.getByLabelText("Laskut", {exact:false})
        //const entertainment = screen.getByLabelText("viihde", {exact:false})
        //const gambling = screen.getByLabelText("Uhkapelit", {exact:false})
        const other = screen.getByLabelText("muu", {exact:false})
        const subNewFilter = screen.getByText("Suodata", {exact:false})

        await userEvent.click(income)
        await userEvent.click(other)
        await userEvent.type(description,"a")
        await userEvent.click(subNewFilter)

        expect(mockContext.setFilter).toHaveBeenCalledWith({
            description: "a",
            income: null,
            food: "on",
            expence: null,
            entertainment: "on",
            gambling: null,
            other: null,
        })
    })

    test("Removes the filter", async()=>{
        const mockContext = {
            setFilter: vi.fn(),
            removeFilter: vi.fn(),
            currentFilter:{
                description: "at",
                income: "on",
                food: "on",
                expence: null,
                entertainment: "on",
                gambling: null,
                other: "on",
            },
        }

        render(
            <TransactionContext.Provider value={mockContext}>
                <FilterForm closeForm={vi.fn()}/>
            </TransactionContext.Provider>
        )

        const remFilterBtn = screen.getByText("Poista suodatus", {exact:false})
        await userEvent.click(remFilterBtn)

        expect(mockContext.removeFilter).toHaveBeenCalled()
    })
})
/*
describe("context tests", ()=>{
    test("Correctly filters the array",()=>{
        //TODO:
        const context = TransactionContext
        const mockContext = {
            setFilter: vi.fn(),
            removeFilter: vi.fn(),
        }
        context.currentFilter = {
            description: "a",
            income: "on",
            food: "on",
            expence: null,
            entertainment: "on",
            gambling: null,
            other: null,
        }

        context.transactions = [
            {
                id:0,
                description:"asd",
                amount:23,
                category:"ruoka"
            },
            {
                id:1,
                description:"zz",
                amount:-3,
                category:"muu"
            }
        ]

        render(
            <TransactionContext.Provider value={context}>
                <FilterForm closeForm={vi.fn()}/>
            </TransactionContext.Provider>
        )

        expect(context.filteredTransaction).toHaveLength(2)
    })
})
*/
