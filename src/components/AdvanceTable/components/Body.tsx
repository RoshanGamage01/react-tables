import { ChangeEvent, useEffect, useState } from "react";
import { ActionButtons, TableField } from "../type";
import ActionButton from "./ActionButton";
import handleKeyDown from "../utils/keyboard_navigation";
import { handleMouseDown, handleMouseMove, handleMouseUp } from "../utils/mouse_select";
import handlePast from "../utils/handle_past";

interface Props {
    data: any[];
    headers: TableField[];
    isCounterEnabled?: boolean;
    isCheckBoxEnabled?: boolean;
    actionButtons?: ActionButtons;
    isMenueEnabled?: boolean;
    checkBoxEmitter?: (values: string[]) => void;
    checkedItems?: string[];
}

interface InputEvents {
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: any) => void;
    onKeyUp?: (event: any) => void;
    onMouseDown?: () => void;
    onMouseMove?: () => void;
    onMouseUp?: () => void;
    onPaste?: () => void;
}

export default function TBody(props: Props) {
    
    // Manage data in separate state instead of getting data dirrectly on props to avoid prop mutation. 
    // Means we can't change props data dirrectly. So when the senarios like input field or sorting, 
    // we have to manage data in separate state.
    const [data, setData] = useState<any[]>(props.data);
    const [checkedItems, setCheckedItems] = useState<string[]>(props.checkedItems ?? []);

    useEffect(() => {
        if (props.checkBoxEmitter !== undefined) {
            props.checkBoxEmitter(checkedItems);
        }
    }, [checkedItems, props])

// RENDER FUNCTIONS

    /**
     * This function generates rows for the table.
     * 
     * @returns
     */
    function generateRows() {
        if(data.length === 0) {
            return <tr
                className="bg-white dark:bg-slate-700  border-slate-300 cursor-pointer border-b border dark:border-slate-900 text-black dark:text-white hover:bg-slate-100 dark:hover:bg-slate-600"
            >
                <td 
                    colSpan={props.headers.length}
                    className="h-7 min-w-20  border-b text-slate-700 bg-white border-slate-300 dark:border-slate-900 text-[12px] whitespace-nowrap"
                >No data found</td>
            </tr>
        }else{

            return data.map((data: any, dataIndex: number) => {
                        return <tr
                            className="bg-white dark:bg-slate-700  border-slate-300 cursor-pointer border-b border dark:border-slate-900 text-black dark:text-white hover:bg-slate-100 dark:hover:bg-slate-600"
                        >
                            {/* RENDER LEADING CELLS */}
                            {
                                generateLeadingCells(data, dataIndex + 1)
                            }

                            {/* RENDER MAIN CELLS */}
                            {
                                props.headers.map((header: TableField, index: number) => {

                                    // If directInput is enabled
                                    if(header.directInput) return generateInputCell(
                                        data[header.key], 
                                        index,
                                        `${dataIndex}-${index}`,
                                        // Add event listeners
                                        {
                                            onChange: (event: ChangeEvent<HTMLInputElement>) => {
                                                setData((prevData: any[]) => {
                                                    return prevData.map((el: any) => {
                                                        if(el["_id"] === data["_id"]) {
                                                            el[header.key] = event.target.value;
                                                        }

                                                        return el;
                                                    })
                                                });
                                            },

                                            onKeyUp: (event: any) => {
                                                if (event.key === "Enter") {
                                                    if(header.inputEvent !== undefined) header.inputEvent(data._id, header.key, event.target.value);
                                                }
                                            },

                                            onKeyDown: (event: any) => {
                                                handleKeyDown(event, dataIndex, index);
                                            },

                                            onPaste: (event: any) => {
                                                handlePast(event, dataIndex, index);
                                            }

                                            // onMouseDown: () => handleMouseDown(dataIndex, index),
                                            // onMouseMove: () => handleMouseMove(dataIndex, index),
                                            // onMouseUp: () => handleMouseUp()
                                            
                                        }
                                    );

                                    // Base case
                                    return generateTextCell(data[header.key], index)
                                })
                            }

                            {/* RENDER TAILING CELLS */}
                            {
                                generateTrailingCells(data)
                            }
                        </tr>
                    })
        }
    }

    /**
     * This function generates a cell with only `text` data.
     * 
     * @param data 
     * @param key 
     * @returns 
     */
    function generateTextCell(data: any, key: number) {
        return <td
            key={key}
            className="px-4 py-1 h-7 min-w-20  border-b border-slate-300 dark:border-slate-900 text-[12px] whitespace-nowrap"
        >
            {
                data
            }
        </td>
    }

    /**
     * This function generates a cell with `input field`. So user can dirrectly update data withing table.
     * 
     * @param data
     * @param key
     * @param uniqueId // Unique id for each input field to identify the input fields and neighboring cells.
     * @returns
     */
    function generateInputCell(data: any, key: number, uniqueId: string, events?: InputEvents) {
        return <td
            key={key}
            className=" h-7 min-w-20  text-[12px] p-0 whitespace-nowrap"
        >
            <input
                type="text"
                id={uniqueId}
                value={data}
                {...events}
                className="w-full h-full rounded-none p-1 border border-slate-300 dark:border-slate-900 focus:outline-none focus:border-blue-800 dark:focus:border-blue-500"
            />
        </td>
    }

    /**
     * This function generates cells that should be rendered at the beginning of each row.
     * such as `checkbox`, `counter` etc.
     * 
     * @param data
     * @param counter
     * @returns
     */
    function generateLeadingCells(data: any, counter: number) {

        return <>
            {
                props.isCheckBoxEnabled && <td className="px-2 w-10">
                    <input
                        type="checkbox"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            checkBoxEmiter(event, data._id);
                        }}
                        className="disabled:opacity-40"
                        disabled={data["$checkbox"] !== undefined ? !data["$checkbox"] : false}
                    />
                </td>
            }

            {
                props.isCounterEnabled ? 
                    <td className="pl-3 py-2 h-7"> {
                        counter
                    } </td>
                    : ""
                }
            
        </>
    }

    /**
     * This function generates cells that should be rendered at the end of each row.
     * such as action `buttons`, `menue` etc.
     * 
     * @param data
     * @returns
     */
    function generateTrailingCells(data: any) {
        
        return <>
            {
                (props.actionButtons !== undefined &&
                Object.keys(props.actionButtons).length !== 0) && <td
                    className="flex items justify-end gap-3 px-4 py-1 h-7 min-w-20  dark:border-slate-900 text-[12px] whitespace-nowrap"
                >
                    {
                        Object.keys(props.actionButtons).map((action: string, index: number) => {
                            if(!props.actionButtons[action].active) return <></>

                            return <ActionButton
                                key={index}
                                action={action}
                                cb={props.actionButtons?.[action].action}
                                data={data}
                            />
                        })
                    }
                </td>
            }
            {
                props.isMenueEnabled && <td className="px-2 w-5 text-right"></td>
            }
        </>
    }


// UTILITY FUNCTIONS

    /**
     * When user clicks a checkbox,
     * Handle the checkbox change event by invoking the provided
     * callback function from props.
     *
     * @param {ChangeEvent<HTMLInputElement>} event
     * @param {string} value
     * @returns {void}
     */
    function checkBoxEmiter(
        event: ChangeEvent<HTMLInputElement>,
        value: string
    ): void {
        if (event.target.checked && !checkedItems.includes(value)) {
            setCheckedItems((prevItems: string[]) => [...prevItems, value]);
        } else {
            setCheckedItems((prevItems: string[]) =>
                prevItems.filter((item: string) => item !== value)
            );
        }

        return;
    }

    return (
        <tbody
            className="default-table-layout relative min-h-max rounded"
        >
            {
                generateRows()
            }
        </tbody>
    )
}