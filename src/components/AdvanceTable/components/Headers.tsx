import { useState } from "react";
import { TableField } from "../type";
import { cn } from "../utils/class_name";

interface Props {
    headers: TableField[];
    isCounterEnabled?: boolean;
    isCheckBoxEnabled?: boolean;
    isActionButtonsEnabled?: boolean;
    isMenueEnabled?: boolean;

    onSort?: (sortedParams: string) => void;
    onCheckAll?: () => void;
}

export default function Theader(props: Readonly<Props>) {
    const [sortParams, setSortParams] = useState<string>("");

    // Event handlers
    function handleSort(name: string) {
        console.log
        if(sortParams === name) {
            setSortParams("");
            props.onSort && props.onSort("");
            return;
        }

        setSortParams(name);
        props.onSort && props.onSort(name);
    }

    function getRotationForColumn(name: string) {
        // const sortedColumn = sortParams.find((el: SortedParam) => el.key === name);
        // if (sortedColumn) {
        //     return sortedColumn.constraint === 'asc' ? 'rotate-0' : 'rotate-180';
        // }
        // return 'rotate-0';

        return sortParams === name ? 'rotate-180' : 'rotate-0';
    }

// RENDER FUNCTIONS
    function generateTitles() {
        if(props.headers.length === 0) {
            return ""
        }

        return props.headers.map((th: TableField, index: number) => {
            return (
                <th 
                    key={index} 
                    scope="col" 
                    className={cn(` px-4 py-2 text-[10px]`, th.className)}
                >
                    <div 
                        className="flex gap-2"
                    >
                        {th.header} 
                        {
                            th.enableSort && <div
                                className={`cursor-pointer `}
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()

                                    handleSort(th.key);
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={`w-4 h-4 ${getRotationForColumn(th.header)}`}><path d="m6 9 6 6 6-6"/></svg>
                            </div>
                        }
                    </div>
                </th>
            )
        })
    }

    function generateLeadingTitles() {
        if(props.isCheckBoxEnabled || props.isCounterEnabled) {
            return <>
                {
                    props.isCheckBoxEnabled && <th className="px-2 w-10">
                        <input
                            type="checkbox"
                            onChange={() => {
                                props.onCheckAll && props.onCheckAll()
                            }}
                        />
                    </th>
                }

                {props.isCounterEnabled ? <th className="pl-3 py-3 w-10">#</th> : ""}
            </>
        }
    }

    function generateTrailingTitles() {
        return <>
            {
                props.isActionButtonsEnabled && <th className="px-2 text-right">Actions</th>
            }
            {
                props.isMenueEnabled && <th className="px-2 w-5 text-right">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                </th>
            }
        </>
    }

    return <thead className="text-xs text-slate-50 uppercase bg-slate-500 dark:bg-slate-900 dark:text-slate-300">
        <tr className="border-slate-300 dark:border-slate-900">
            {
                generateLeadingTitles()
            }
            {
                generateTitles()
            }
            {
                generateTrailingTitles()
            }
        </tr>
    </thead>
}