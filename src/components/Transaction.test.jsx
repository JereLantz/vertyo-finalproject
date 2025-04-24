import { render, screen } from "@testing-library/react";
import Transaction from "./Transaction"
import userEvent from "@testing-library/user-event";
import { TransactionContext } from "../context/TransactionsContext";

describe("Individual transaction tests", ()=>{
        const transaction = {
            id:"1",
            description:"testi1",
            amount:10,
            category:"viihde",
            type:"income",
        }

    test("Renders the item", ()=>{
        render(<Transaction transaction={transaction}/>)

        const elementDesc = screen.getByText("testi1")
        const elementAmount = screen.getByText("10",{exact:false})
        const elementCategory = screen.getByText("viihde",{exact:false})

        expect(elementDesc).toBeInTheDocument()
        expect(elementAmount).toBeInTheDocument()
        expect(elementCategory).toBeInTheDocument()
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

    test("Modifying works", async()=>{
        const mockValue = {
            updateTransaction: vi.fn(()=>({success:true})),
        }
        const transactionCopy = {...transaction}

        render(
            <TransactionContext value={mockValue}>
                <Transaction transaction={transactionCopy}/>
            </TransactionContext >
        )

        const modBtn = screen.getByText("Muokkaa")
        await userEvent.click(modBtn)

        const confirmBtn = screen.getByText("Vahvista")
        await userEvent.click(confirmBtn)

        expect(mockValue.updateTransaction).toHaveBeenCalledWith(transaction)
    })

    test("Opens the delete confirmation with the transaction that will be deleted", async()=>{
        const mockValue = {
            showDeleteConfirm: vi.fn(),
        }
        const transactionCopy = {...transaction}

        render(
            <TransactionContext value={mockValue}>
                <Transaction transaction={transactionCopy}/>
            </TransactionContext >
        )

        const delButton = screen.getByText("Poista")
        await userEvent.click(delButton)

        expect(mockValue.showDeleteConfirm).toHaveBeenCalledWith(transaction)
    })
})
