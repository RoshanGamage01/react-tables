import { useCallback, useEffect, useState } from "react";
import Props from "./AdvanceTableProps";
import Theader from "./components/Headers";
import TBody from "./components/Body";

export default function AdvanceTable(props: Readonly<Props>) {
  const [data, setData] = useState<any[]>(props.tableDataSet.data);
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);

  useEffect(() => {
    setData(props.tableDataSet.data);
  }, [props.tableDataSet.data]);

  const sortData = useCallback((sortedParams: string) => {
    console.log(sortedParams)
  }, [data]);

  return <div className="rounded table-fixed relative">
    <table className="w-full  border-slate-300 dark:border-slate-500 text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-auto relative">
      {/* TABLE HEADER */}
      <Theader
        headers={props.tableFieldConfigs}
        isCounterEnabled={props.counter}
        isCheckBoxEnabled={props.isCheckBoxEnabled}
        isActionButtonsEnabled={props.actionButtons !== undefined}
        isMenueEnabled={true}
        onSort={(sortedParams: string) => {
          sortData(sortedParams);
        }}
        onCheckAll={() => setIsCheckAll(!isCheckAll)}
      />

        {/* TABLE BODY */}
      <TBody 
        data={data}
        headers={props.tableFieldConfigs}
        isCounterEnabled={props.counter}
        isCheckBoxEnabled={props.isCheckBoxEnabled}
        checkBoxEmitter={props.checkBoxEmiter}
        actionButtons={props.actionButtons}
        isMenueEnabled={true}
        isCheckAll={isCheckAll}
      />
    </table>

    {/* PAGINATION HERE */}
  </div>
}