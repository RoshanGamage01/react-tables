import { DefaultTable } from "./components"
import AdvanceTable from "./components/AdvanceTable/AdvanceTable"

export default function App() {
    return (
        <>
            <section className="p-5 h-screen">
                <DefaultTable tableDataSet={{data: [{"id": 1, "name": "test", "mail" : "mail@m.com"}]}} />
                <AdvanceTable 
                    tableDataSet={{
                        data: [{"id": 1, "name": "test", "mail" : "mail@m.com"}, {"id": 1, "name": "test", "mail" : "mail@m.com", "$bg": "#3f51b5"}, {"$skip": 1,"name": "test" , "mail" : "mail@m.com", "$color": "red"}],
                        dataCount: 1,
                        currentPaginationIndex: 1,
                        dataPerPage: 10
                    }}
                    counter={true}
                    isCheckBoxEnabled={true}
                    checkBoxEmiter={(e: string[]) => {console.log(e)}}
                    actionButtons={{delete: {active: true, action: () => {}}, edit: {active: true, action: () => {}}}}
                />
            </section>   
        </>
    )
}