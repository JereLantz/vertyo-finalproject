import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddNewTransaction from "./AddNewTransaction"
import { TransactionContext } from "../context/TransactionsContext";

describe("AddNewTransaction tests",()=>{
    const mockContext = {
        addNewTransaction: vi.fn(()=>{return{success:true}})
    }

    const mockContextFail = {
        addNewTransaction: vi.fn(()=>{return{success:false}})
    }

    test("Correctly creates a new transaction and passes it to the context",async()=>{
        render(
            <TransactionContext.Provider value={mockContext}>
                <AddNewTransaction />
            </TransactionContext.Provider>
        )

        const inputs = screen.getAllByRole("textbox")
        const select = screen.getByRole("combobox")
        const subBtn = screen.getByRole("button")

        await userEvent.type(inputs[0], "Testi1")
        await userEvent.type(inputs[1], "-420")
        await userEvent.selectOptions(select, "laskut")

        await userEvent.click(subBtn)

        expect(mockContext.addNewTransaction).toHaveBeenCalledWith({
            description:"Testi1",
            amount:-420,
            category:"laskut"
        })
    })

    test("Displays errors with bad inputs",async()=>{
        render(
            <TransactionContext.Provider value={mockContext}>
                <AddNewTransaction />
            </TransactionContext.Provider>
        )

        const inputs = screen.getAllByRole("textbox")
        const select = screen.getByRole("combobox")
        const subBtn = screen.getByRole("button")

        await userEvent.type(inputs[0], "a")
        await userEvent.type(inputs[1], "a")
        await userEvent.selectOptions(select, "laskut")

        await userEvent.click(subBtn)

        const errorList = screen.getAllByRole("listitem")

        expect(errorList).toHaveLength(2)
    })

    test("Display error when network request fails",async()=>{
        render(
            <TransactionContext.Provider value={mockContextFail}>
                <AddNewTransaction />
            </TransactionContext.Provider>
        )

        const inputs = screen.getAllByRole("textbox")
        const select = screen.getByRole("combobox")
        const subBtn = screen.getByRole("button")

        await userEvent.type(inputs[0], "Testi1")
        await userEvent.type(inputs[1], "-420")
        await userEvent.selectOptions(select, "laskut")

        await userEvent.click(subBtn)

        const errorList = screen.getAllByRole("listitem")
        const error = screen.getByText("Network error", {exact:false})

        expect(mockContext.addNewTransaction).toHaveBeenCalledWith({
            description:"Testi1",
            amount:-420,
            category:"laskut"
        })
        expect(errorList).toHaveLength(1)
        expect(error).toBeInTheDocument()
    })
})
