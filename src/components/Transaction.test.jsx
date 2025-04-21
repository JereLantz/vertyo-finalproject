import { render, screen } from "@testing-library/react";
import Transaction from "./Transaction"
import userEvent from "@testing-library/user-event";
import TransactionContextProvider, { TransactionContext } from "../context/TransactionsContext";

describe("Individual transaction tests", ()=>{
        const transaction = {
            id:"1",
            description:"testi1",
            amount:"10",
            category:"viihde",
        }

    test("Renders the description of an item", ()=>{
        render(<Transaction transaction={transaction}/>)

        const element = screen.getByText("testi1")
        expect(element).toBeInTheDocument()
    })

    test("Renders the amount of an item", ()=>{
        render(<Transaction transaction={transaction}/>)

        const element = screen.getByText("10",{exact:false})
        expect(element).toBeInTheDocument()
    })

    test("Renders the category of an item", ()=>{
        render(<Transaction transaction={transaction}/>)

        const element = screen.getByText("viihde",{exact:false})
        expect(element).toBeInTheDocument()
    })

    test("Switches to the modify form when 'muokkaa' button is pressed", async()=>{
        render(<Transaction transaction={transaction}/>)

        const modifyBtn = screen.getByText("Muokkaa")
        await userEvent.click(modifyBtn)

        const elements = screen.getAllByRole("textbox")
        const select = screen.getByRole("combobox")
        expect(elements).toHaveLength(2)
        expect(select).toBeInTheDocument()
    })

    test("When in modify form clicking cancel returns the original field", async()=>{
        render(<Transaction transaction={transaction}/>)

        const modifyBtn = screen.getByText("Muokkaa")
        await userEvent.click(modifyBtn)

        const cancelBtn = screen.getByText("Peruuta", {exact:false})
        await userEvent.click(cancelBtn)

        const textFields = screen.getAllByRole("paragraph")
        expect(textFields).toHaveLength(3)
    })

    /*
    test("After modifying, sending the network request", async()=>{
        //TODO:
        const mockValue = {
            updateTransaction: jest.fn(),
        }

        render(
            <TransactionContext value={mockValue}>
                <Transaction transaction={transaction}/>
            </TransactionContext >
        )
    })
    */
})
