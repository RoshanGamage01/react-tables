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
            inputType: "text",
            inputEvent: (id: string, key: string, value: string) => {
                console.log(id, key, value)
            },
        },
        {
            header: "Gender",
            key: "gender",
            directInput: true,
            inputType: "normal_select",
            normalSelectData: [{
                value: "male",
                lable: "Male"
            }, {
                value: "female",
                lable: "Female"
            }, {
                value: "other",
                lable: "Other"
            }],
            inputEvent: (id: string, key: string, value: string) => {
                console.log(id, key, value)
            },
        },
        {
            header: "Mail",
            key: "mail",
            directInput: true,
            inputType: "email",
            validations: {
                validationType: "custom",
                // regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                validationMethod: (data: any) => {
                    const [localPart, domain] = data.split("@");

                    if(!data.includes("@")){
                        return "Email should include '@' sign";
                    }

                    if (localPart.length === 0) {
                        return "Email must have a valid local part before '@'";
                    }

                    if (!domain || domain.length === 0) {
                        return "Email must have a domain part after '@'";
                    }

                    if (!domain.includes(".")) {
                        return "Domain must contain a '.' (dot)";
                    }

                    const domainParts = domain.split(".");

                    if (domainParts.length < 2 || domainParts[domainParts.length - 1].length < 2) {
                        return "Domain must have at least one part after the last '.' (dot)";
                    }

                    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    if (!emailRegex.test(data)) {
                        return "Email is not in a valid format";
                    }

                    return false
                }
            },
            inputEvent: (id: string, key: string, value: string) => {
                console.log(id, key, value)
            },
            
        },
    ]

    return (
        <>
            <section className="p-5 h-screen">
                <AdvanceTable 
                    tableFieldConfigs={tableFieldConfigs}
                    tableDataSet={{
                        data: [{
                            "_id": 1, 
                            "name": "Naruto Uzumaki", 
                            "mail" : "naruto@leaf.com",
                            "gender": "male",
                            "$checkbox": false
                        }, 
                        {
                            "_id": 2, 
                            "name": "Sasuke Uchiha", 
                            "gender": "male",
                            "mail" : "sasuke@leaf.com", 
                            "$bg": "#3f51b5"
                        }, 
                        {
                            "_id": 3, 
                            "$skip": 1,
                            "name": "Sakura Haruno" , 
                            "gender": "female",
                            "mail" : "sakura@leaf.com", 
                            "$color": "red"
                        }],
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