import { use, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { TransactionContext } from "../context/TransactionsContext";

export default function({children, onClose}){
    const {showDelModal} = use(TransactionContext)
    const dialog = useRef()

    useEffect(()=>{
        if(showDelModal){
            dialog.current.showModal()
        }
        else{
            dialog.current.close()
        }
    }, [showDelModal])

    return createPortal(
        <dialog ref={dialog} onClose={onClose}>
        {showDelModal ? children : null}
        </dialog>,
        document.getElementById("modal")
    )
}
