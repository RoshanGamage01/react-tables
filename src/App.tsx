import { DefaultTable } from "./components"
import AdvanceTable from "./components/AdvanceTable/AdvanceTable"

export default function App() {
    return (
        <>
            <section className="p-5 h-screen">
                <DefaultTable tableDataSet={{data: [{"id": 1, "name": "test", "mail" : "mail@m.com"}]}} />
                <AdvanceTable 
                    tableDataSet={{
                        data: [{"id": 1, "name": "test", "mail" : "mail@m.com"}],
                        dataCount: 1,
                        currentPaginationIndex: 1,
                        dataPerPage: 10
                    }}
                    
                    
                />
            </section>   
        </>
    )
}