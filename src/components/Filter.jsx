import FilterForm from "./FilterForm";

export default function Filter(){
    return(
        <div className="m-2">
            <button className="p-2 my-2 rounded-xl bg-amber-100 hover:bg-amber-200">Lisää filttereitä</button>
            <FilterForm />
        </div>
    )
}
