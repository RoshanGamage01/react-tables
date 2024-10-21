import AdvanceTable from "./components/AdvanceTable/"
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { TableField } from "./components/AdvanceTable/type";

export default function App() {
    const tableFieldConfigs: TableField[] = [
        {
            header: "ID",
            key: "_id",
        },
        {
            header: "Name",
            key: "name",
            directInput: true,
            inputEvent: (id: string, key: string, value: string) => {
                console.log(id, key, value)
            }
        },
        {
            header: "Mail",
            key: "mail",
            directInput: true,
            inputEvent: (id: string, key: string, value: string) => {
                console.log(id, key, value)
            }
        },
    ]

    return (
        <>
            <section className="p-5 h-screen">
                <AdvanceTable 
                    tableFieldConfigs={tableFieldConfigs}
                    tableDataSet={{
                        data: [{"_id": 1, "name": "A", "mail" : "mail@m.com", "$checkbox": true}, {"_id": 2, "name": "B", "mail" : "mail@m.com", "$bg": "#3f51b5"}, {"_id": 3, "$skip": 1,"name": "C" , "mail" : "mail@m.com", "$color": "red"}],
                        dataCount: 1,
                        currentPaginationIndex: 1,
                        dataPerPage: 10
                    }}
                    counter={true}
                    isCheckBoxEnabled={true}
                    checkBoxEmiter={(e: string[]) => {console.log(e)}}
                    actionButtons={{
                        delete: {
                            active: true, 
                            action: (id: string) => {
                                console.log(id)
                            }
                        }, 
                        edit: {
                            active: true, 
                            action: (id: string) => {
                                console.log(id)
                            }
                        }
                    }}
                />
                
            </section>   
        </>
    )
}