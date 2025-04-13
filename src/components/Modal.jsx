import { use, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { TransactionContext } from "../context/TransactionsContext";

export default function({children}){
    const {showDelModal, cancelDelete} = use(TransactionContext)
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
        <dialog ref={dialog} onClose={cancelDelete} className="backdrop:bg-stone-900/90 rounded-md shadow-md p-4">
        {showDelModal ? children : null}
        </dialog>,
        document.getElementById("modal")
    )
}
