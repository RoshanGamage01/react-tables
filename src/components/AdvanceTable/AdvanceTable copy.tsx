import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination";
import { ChangeEvent, forwardRef, ForwardRefRenderFunction, useEffect, useImperativeHandle, useState } from "react";
import Tooltip from "../Tooltip";
import baseURL from "../../../helpers/httpCommon";
import Props from "./AdvanceTableProps";
import { serverUrl } from "../../../api/request";
// import { initTWE, Dropdown, Ripple } from "tw-elements";

export interface ChildRef {
  getChildState: () => any[];
}

// initTWE({ Dropdown, Ripple });

/**
 * The AdvanceTable component is a component designed for reusability. It accepts data through
 * its props and displays this data in a table format, complete with pagination features.
 *
 * @param {Props} props - The properties passed to the component.
 * @returns {JSX.Element} - The rendered table element.
 */
const AdvanceTable: ForwardRefRenderFunction<any, Props> = (props, ref) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [ data, setData ] = useState<any[]>([]);
  // console.log(props.checkedItems);
  const toggleDropdown = () => {setDropdownVisible(!dropdownVisible)};
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [directInputCache, setDirectInputCache] = useState<string>("");
  const [dateInputOneCache, setDateInputOneCache] = useState<string>("");
  const [selectInputOneCache, setSelectInputOneCache] = useState<string>("");

  let rowClick: (id: string) => void = props.clickEvent || ((id: string) => { });

  useImperativeHandle(ref, () => ({
    getChildState: () => {
      return data;
    },
  }));
  
  const isImageUrl = (url: string | null): boolean => {
    try {
      if (!url) return false;
      const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg'];
      const lowercasedUrl = url.toLowerCase();
      return imageExtensions.some(ext => lowercasedUrl.endsWith(ext));
    } catch (_) {
      return false;
    }

  };

  let textBold: boolean = false;
  let textColor: string = "";
  let bgColor: string = "";
  let checkbox: boolean = true;
  let isFooterEnabled: boolean;

  const {
    data: datas = [],
    dataCount = 1,
    currentPaginationIndex = 1,
    dataPerPage = 1,
  } = props.tableDataSet ?? {};

  useEffect(() => {
    setData(datas);
  }, [props.tableDataSet])

  const ignoreValues = props.exclude ?? [];

  useEffect(() => {
    setCheckedItems(props.checkedItemList ?? []);
  }, [props.checkedItemList]);

  useEffect(() => {
    if (props.checkBoxEmiter !== undefined) {
      props.checkBoxEmiter(checkedItems);
    }
  }, [checkedItems]);

  const [isOpen, setIsOpen] = useState(false);

  /**
   * When user clicks a pagination Number,
   * Handle the page change event by invoking the provided
   * callback function from props.
   *
   * @param {number} pageIndex
   * @returns {void}
   */
  function handlePagechange(pageIndex: number): void {
    if (props.handlePagechange !== undefined) {
      props.handlePagechange(pageIndex);
    }
  }

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

  /**
   * Handle the checkbox change event for "Select All".
   *
   * @param {ChangeEvent<HTMLInputElement>} event
   * @returns {void}
   */
  function handleSelectAll(event: ChangeEvent<HTMLInputElement>): void {
    if (event.target.checked) {
      const allIds = data.map((item: any) => item._id);
      setCheckedItems(allIds);
    } else {
      if (checkedItems.length === data.length) {
        setCheckedItems([]);
      } else {
        setCheckedItems([]);
      }
    }
  }

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [modalImageUrl, setModalImageUrl] = useState<string>("");

  const ImageModal: React.FC<{
    onClose: () => void;
  }> = ({ onClose }) => {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div className="bg-white p-4 rounded-lg relative">
          <img src={modalImageUrl} alt="Image" />
          <button onClick={onClose} className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  /**
   * Generates empty cells for the table.
   *
   * @param {number} cellCount
   * @returns {JSX.Element[]}
   */
  function generateEmptyCells(cellCount: number): JSX.Element[] {
    let emptyCells: JSX.Element[] = [];

    for (let i = 0; i < cellCount; i++) {
      emptyCells.push(
        <td
          key={i}
          className="px-4 py-1 h-10 text-[12px] bg-white"
          style={{
            height: "20px !important",
            color: textColor,
            backgroundColor: bgColor,
          }}
        ></td>
      );
    }

    return emptyCells;
  }

  const getFontColor = (bgColor: string) => {
    const color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
    const r = parseInt(color.substring(0, 2), 16); // hexToR
    const g = parseInt(color.substring(2, 4), 16); // hexToG
    const b = parseInt(color.substring(4, 6), 16); // hexToB
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155 ? "black" : "";
  };

  const isRight = (align: string | null) => {
    return (align == 'right') ? true : false;
  }

  const isRightAlign = (key: string, keyArray: string[]) => {
    return keyArray.includes(key);
  }

  /**
   * Handle pasted data that is copied from an external source. 
   * Like Excel, Google Sheets, etc.
   * 
   * @param event event object that contains the pasted data
   * @param index row index
   * @param i cpolumn index
   * @returns void
   */
  const handlePast = (event: any, index: number, i: number) => {
    event.preventDefault();
    // @ts-ignore
    const clipboardData = event.clipboardData || window.clipboardData; 
    const pastedData = clipboardData.getData('Text');
    const rows = pastedData.split('\n').map((row: any) => row.split('\t'));
    

    for(let rowIndex in rows){
      const row = rows[rowIndex];
      for(let cellIndex in row) {
        const cell = row[cellIndex];
        
        // const targetId = `${index + parseInt(rowIndex)}-${i + parseInt(cellIndex)}`;
        // const targetElement = document.getElementById(targetId);

        const key = Object.keys(data[index + parseInt(rowIndex)])[i + parseInt(cellIndex)];
        if(props.exclude?.includes(key)) continue;
        if(key.includes('$')) continue;

        setData((prevData) => {
          return prevData.map((item, idx) => {
            if(idx === index + parseInt(rowIndex)){
              return {
                ...item,
                [key]: cell,
              }
            }

            return item;
          })
        })
      }
      
    }
  }

  /**
   * Add a new empty row to the table.
   * 
   * @returns void
   */
  const addNewEmptyRow = () => {
    const emptyRow: any = {};
    
    // Object.keys(data[0]).forEach((key: any) => {
    //   emptyRow[key] = '';
    // })

    for(let header of props.tableHeaders) {
      emptyRow[header.accessKey] = '';
    }

    emptyRow['$new'] = true;
    emptyRow['$uniqueId'] = Math.random().toString(36).substring(7);

    setData([emptyRow, ...data]);
  }

  const handleBulkSave = () => {
    const newRows = data.filter((item: any) => item['$new']);
    const updatedRows = data.filter((item: any) => item['$updated'] && !item['$new']);
    props.onBulkSave?.(newRows, updatedRows);
  }

  const deleteRow = (dataObject: any) => {
    setData(data.filter((item: any) => item['$uniqueId'] !== dataObject['$uniqueId']));
  }

  /**
   * Handle key down event for the direct input fields.
   * That allows the user to navigate through the table using arrow keys.
   * 
   * @param event event object that contains the keydown event
   * @param index row index
   * @param i column index
   * @returns void
   */
  const handleKeyDown = (event: any, index: number, i: number) => {
    const element = event.target as HTMLInputElement;
    const cursorPosition = element.selectionStart;

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || 
        (event.key === 'ArrowLeft' && cursorPosition === 0) || 
        (event.key === 'ArrowRight' && cursorPosition === element.value.length)) {

      let focus_node_id = '';

      if (event.key === 'ArrowRight') {
        focus_node_id = `${index}-${i+1}`;
      } else if (event.key === 'ArrowLeft') {
        focus_node_id = `${index}-${i-1}`;
      } else if (event.key === 'ArrowUp') {
        focus_node_id = `${index-1}-${i}`;
      } else if (event.key === 'ArrowDown') {
        focus_node_id = `${index+1}-${i}`;
      }

      const nextElement = document.getElementById(focus_node_id);

      if (nextElement) {
        nextElement.focus();
        event.preventDefault();
      }
    }
  }

  return (
    <>
      <div className="rounded table-fixed relative">
        {props.addbutton ?(
          <div
            className="top-1 left-full pl-1 absolute flex items-center gap-1"
          >
            <div 
              onClick={addNewEmptyRow}
              className=" w-5 h-5 rounded-full text-white flex items-center justify-center bg-slate-500 cursor-pointer"
            >
              <Tooltip
                text="Add New"
                position="BOTTOM"
                width="fit"
                
              >
                <div className="select-none"> + </div>
              </Tooltip>
            
            </div>

            { data.some((item: any) => item['$new'] || item['$updated'])
             && <div 
              onClick={() => {
                handleBulkSave();
              }}
              className="h-5 px-2 w-fit rounded-full text-white flex items-center justify-center bg-green-500 cursor-pointer"
            >
              <Tooltip
                text="Save Changes"
                position="BOTTOM"
                width="fit"
                
              >
              <div className="flex text-xs items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-3 h-3"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/></svg>
                Save
              </div>
              </Tooltip>
            
            </div>}
          </div>) : (
                ""
              )}
        <table className="w-full  border-slate-300 dark:border-slate-500 text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-auto relative">
          {/* Start Table Header */}
          <thead className="text-xs text-slate-50 uppercase bg-slate-500 dark:bg-slate-900 dark:text-slate-300">
            <tr className="  border-slate-300 dark:border-slate-900">
              {/* If checkboxes enabled */}
              {props.isCheckBoxEnabled ? (
                <th className="px-2 w-10">
                  <input
                    type="checkbox"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      // When user click on this checkbox, it will select all the checkboxes in the table.
                      let ids: string[] = [];

                      data.forEach((item: any) => {
                        if (item.$checkbox !== false) {
                          ids.push(item._id);
                        }
                      });

                      if (event.target.checked) {
                        setCheckedItems(ids);
                      }

                      if (!event.target.checked) {
                        setCheckedItems([]);
                      }
                    }}
                  />
                </th>
              ) : (
                ""
              )}

              {/* If counter enabled */}
              {props.counter ? <th className="pl-3 py-3">#</th> : ""}

              {
                props.tableHeaders.length === 0
                  ? ""
                  : props.tableHeaders.map((th: any, indx: number) => {
                    // if (ignoreValues.includes(th) || th.includes("$"))
                    //   return "";

                    return (
                      <th
                        // this is table head align right path
                        key={indx}
                        scope="col"
                        className={`w-${th.width} px-4 py-2  text-[10px] ${isRight(th.align) ? "text-right" : ""}`}
                      >
                        {th.name}
                      </th>
                    );
                  })
              }
              {/* <th scope="col" className={`w-10 px-6 py-3 `}></th> */}
            </tr>
          </thead>
          {/* End Table Header */}

          {/* Start Table Body */}
          <tbody
            className={`default-table-layout relative min-h-max ${data.length === 0 || !data ? "h-30" : ""
              } rounded`}
          >
            {/* The loader */}
            <div
              className={`${data.length === 0 || !data ? "flex" : "hidden"
                } absolute bg-black/30 dark:bg-slate-700/50 w-full h-full items-center justify-center`}
            >
              {/* No Data Found */}
              {props.isComplete ? <div>No Data Found</div> : <svg
                xmlns="http://www.w3.org/2000/svg"
                height="100px"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
              >
                <g transform="rotate(0 50 50)">
                  <rect
                    x="47.5"
                    y="25.5"
                    rx="2.5"
                    ry="3.75"
                    width="5"
                    height="15"
                    fill="#ffffff"
                  >
                    <animate
                      attributeName="opacity"
                      values="1;0"
                      keyTimes="0;1"
                      dur="0.7407407407407407s"
                      begin="-0.6666666666666666s"
                      repeatCount="indefinite"
                    ></animate>
                  </rect>
                </g>
                <g transform="rotate(36 50 50)">
                  <rect
                    x="47.5"
                    y="25.5"
                    rx="2.5"
                    ry="3.75"
                    width="5"
                    height="15"
                    fill="#ffffff"
                  >
                    <animate
                      attributeName="opacity"
                      values="1;0"
                      keyTimes="0;1"
                      dur="0.7407407407407407s"
                      begin="-0.5925925925925926s"
                      repeatCount="indefinite"
                    ></animate>
                  </rect>
                </g>
                <g transform="rotate(72 50 50)">
                  <rect
                    x="47.5"
                    y="25.5"
                    rx="2.5"
                    ry="3.75"
                    width="5"
                    height="15"
                    fill="#ffffff"
                  >
                    <animate
                      attributeName="opacity"
                      values="1;0"
                      keyTimes="0;1"
                      dur="0.7407407407407407s"
                      begin="-0.5185185185185185s"
                      repeatCount="indefinite"
                    ></animate>
                  </rect>
                </g>
                <g transform="rotate(108 50 50)">
                  <rect
                    x="47.5"
                    y="25.5"
                    rx="2.5"
                    ry="3.75"
                    width="5"
                    height="15"
                    fill="#ffffff"
                  >
                    <animate
                      attributeName="opacity"
                      values="1;0"
                      keyTimes="0;1"
                      dur="0.7407407407407407s"
                      begin="-0.4444444444444444s"
                      repeatCount="indefinite"
                    ></animate>
                  </rect>
                </g>
                <g transform="rotate(144 50 50)">
                  <rect
                    x="47.5"
                    y="25.5"
                    rx="2.5"
                    ry="3.75"
                    width="5"
                    height="15"
                    fill="#ffffff"
                  >
                    <animate
                      attributeName="opacity"
                      values="1;0"
                      keyTimes="0;1"
                      dur="0.7407407407407407s"
                      begin="-0.37037037037037035s"
                      repeatCount="indefinite"
                    ></animate>
                  </rect>
                </g>
                <g transform="rotate(180 50 50)">
                  <rect
                    x="47.5"
                    y="25.5"
                    rx="2.5"
                    ry="3.75"
                    width="5"
                    height="15"
                    fill="#ffffff"
                  >
                    <animate
                      attributeName="opacity"
                      values="1;0"
                      keyTimes="0;1"
                      dur="0.7407407407407407s"
                      begin="-0.2962962962962963s"
                      repeatCount="indefinite"
                    ></animate>
                  </rect>
                </g>
                <g transform="rotate(216 50 50)">
                  <rect
                    x="47.5"
                    y="25.5"
                    rx="2.5"
                    ry="3.75"
                    width="5"
                    height="15"
                    fill="#ffffff"
                  >
                    <animate
                      attributeName="opacity"
                      values="1;0"
                      keyTimes="0;1"
                      dur="0.7407407407407407s"
                      begin="-0.2222222222222222s"
                      repeatCount="indefinite"
                    ></animate>
                  </rect>
                </g>
                <g transform="rotate(252 50 50)">
                  <rect
                    x="47.5"
                    y="25.5"
                    rx="2.5"
                    ry="3.75"
                    width="5"
                    height="15"
                    fill="#ffffff"
                  >
                    <animate
                      attributeName="opacity"
                      values="1;0"
                      keyTimes="0;1"
                      dur="0.7407407407407407s"
                      begin="-0.14814814814814814s"
                      repeatCount="indefinite"
                    ></animate>
                  </rect>
                </g>
                <g transform="rotate(288 50 50)">
                  <rect
                    x="47.5"
                    y="25.5"
                    rx="2.5"
                    ry="3.75"
                    width="5"
                    height="15"
                    fill="#ffffff"
                  >
                    <animate
                      attributeName="opacity"
                      values="1;0"
                      keyTimes="0;1"
                      dur="0.7407407407407407s"
                      begin="-0.07407407407407407s"
                      repeatCount="indefinite"
                    ></animate>
                  </rect>
                </g>
                <g transform="rotate(324 50 50)">
                  <rect
                    x="47.5"
                    y="25.5"
                    rx="2.5"
                    ry="3.75"
                    width="5"
                    height="15"
                    fill="#ffffff"
                  >
                    <animate
                      attributeName="opacity"
                      values="1;0"
                      keyTimes="0;1"
                      dur="0.7407407407407407s"
                      begin="0s"
                      repeatCount="indefinite"
                    ></animate>
                  </rect>
                </g>
              </svg>}
            </div>

            {data.map((data: any, index: number) => {
              {
                /* If $color is provided */
              }
              if (Object.hasOwn(data, "$color")) {
                textColor = data["$color"];
              } else {
                textColor = "";
              }

              {
                /* If $bg is provided */
              }
              if (Object.hasOwn(data, "$bg")) {
                bgColor = data["$bg"];
                textColor = getFontColor(bgColor);
              } else {
                bgColor = "";
              }

              {
                /* If $special is provided */
              }
              if (Object.hasOwn(data, "$special")) {
                if (data["$special"]) textBold = true;
              }

              if (Object.hasOwn(data, "$click")) {
                rowClick = data["$click"];
              }

              if (Object.hasOwn(data, "$checkbox")) {
                checkbox = data["$checkbox"];
              } else {
                checkbox = true;
              }

              return (
                <tr
                  key={data._id}
                  className={`bg-white dark:bg-slate-700  border-slate-300 cursor-pointer border-b border dark:border-slate-900 text-black dark:text-white hover:bg-slate-100 dark:hover:bg-slate-600`}
                >
                  {/* If checkboxes enabled */}
                  {props.isCheckBoxEnabled ? (
                    <td
                      className="px-2 w-10 bg-white"
                      style={{ color: textColor, backgroundColor: bgColor }}
                    >
                      <input
                        type="checkbox"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                          checkBoxEmiter(event, data._id);
                        }}
                        checked={checkedItems.includes(data._id)}
                        disabled={!checkbox}
                        className="disabled:opacity-40"
                      />
                    </td>
                  ) : (
                    ""
                  )}

                  {/* If Skip is provided */}
                  {Object.hasOwn(data, "$skip")
                    ? generateEmptyCells(data["$skip"])
                    : ""}

                  {props.counter ? (
                    <td
                      className="pl-3 py-2 h-7 bg-white "
                      style={{
                        color: textColor,
                        backgroundColor: bgColor,
                      }}
                    >
                      {props.tableDataSet.currentPaginationIndex *
                        props.tableDataSet.dataPerPage -
                        props.tableDataSet.dataPerPage +
                        index +
                        1}
                    </td>
                  ) : (
                    ""
                  )}

                  {/* Main Table Data */}
                  {Object.keys(data).map((td: any, i: number) => {
                    const head = props.tableHeaders.map((th_d) => th_d.accessKey);
                    if (ignoreValues.includes(td) || td.includes("$"))
                      return "";

                    return (
                      <>
                        {
                          <td
                            key={i}
                            onClick={() =>
                              props.defaultLink !== undefined
                                ? navigate(
                                  `${props.defaultLink + "/" + data._id}`
                                )
                                : rowClick(data._id)
                            }
                            // this is tbale data aligin right path 
                            className={`relative ${props.directInputs?.columns?.includes(td) ? '' : `${props.padding !== undefined ? props.padding : 'px-4 py-1'}`} h-7 min-w-20  border-b bg-white border-slate-300 dark:border-slate-900 text-[12px] whitespace-nowrap ${textBold ? "font-bold text-lg" : ""} ${isRightAlign(td, (props.rightArrays ? props.rightArrays : [])) ? 'text-right' : ''}  `}
                            style={{
                              height: "20px !important",
                              color: textColor,
                              backgroundColor: "white",
                            }}
                          >
                            {td === "updated_at" ||
                              td === "created_at" ||
                              td === "date" ||
                              td === "createdAt" ||
                              td === "updatedAt" ? (
                              data[td].slice(0, 10)
                            ) : props.directInputs?.columns?.includes(td) ? (
                              // this is for direct input. direct input means, this column can be edited directly from the table.
                              // this is useful for editing the table data.

                              <div className="flex items-center justify-between text-right w-full h-full min-w-10 group">
                                <input
                                  type="text"
                                  id={`${index}-${i}`}
                                  onKeyDown={(event: any) => {
                                    handleKeyDown(event, index, i);
                                  }}
                                  value={
                                    data[td] === null ? "" : data[td]
                                  }
                                  className="p-1 block w-full h-full bg-transparent border ring-0 ring-offset-0 border-slate-300 dark:border-slate-500 pr-2 outline-none text-[12px] dark:text-gray-400 dark:bg-transparent focus:border-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                  defaultValue={data[td]} 
                                  onKeyUp={(event: any) => {
                                    if (event.key === "Enter") {
                                      props.directInputs?.action(
                                        data._id,
                                        td,
                                        event.target.value
                                      );
                                      setDirectInputCache("");
                                      event.target.blur();
                                    }
                                  }}
                                  onChange={(event: any) => {
                                    setDirectInputCache(event.target.value);
                                    console.log('trigger');
                                    setData((prevData) => {
                                      return prevData.map((item, idx) => {
                                        if (idx === index) {
                                          return {
                                            ...item,
                                            [td]: event.target.value,
                                            '$updated': true
                                          };
                                        }
                                        return item;
                                      });
                                    });
                                  }}
                                  onPaste={(event) => handlePast(event, index, i)}
                                />

                                <div
                                  className="w-fit h-fit hidden"
                                  onClick={() => {
                                    props.directInputs?.action(
                                      data._id,
                                      td,
                                      directInputCache
                                    );
                                    setDirectInputCache("");
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-4 h-4 stroke-green-500 hidden group-focus-within:flex hover:flex"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="m4.5 12.75 6 6 9-13.5"
                                    />
                                  </svg>
                                </div>
                              </div>
                            ) : // : data[td]
                              props.conditionalRendering?.field.includes(td) ? (
                                props.conditionalRendering?.function(
                                  td,
                                  data[td],
                                  data["_id"],
                                  data,
                                  `${index}-${i}`,
                                  {
                                    onKeyDown: (event: any) => handleKeyDown(event, index, i),
                                    onPaste: (event: any) => handlePast(event, index, i),
                                    onChange: (event: any) => {
                                      setData((prevData) => {
                                        return prevData.map((item, idx) => {
                                          if (idx === index) {
                                            return {
                                              ...item,
                                              [td]: event.target.value,
                                              '$updated': true
                                            };
                                          }
                                          return item;
                                        });
                                      });
                                    }
                                  }
                                )
                              ) : props.dateInputOne?.column?.includes(td) ? (
                                <div className="flex items-center justify-between text-right w-full h-full min-w-10 gap-2 group">
                                  <input
                                    type="date"
                                    defaultValue={data[td]}
                                    onKeyUp={(event: any) => {
                                      if (event.key === "Enter") {
                                        props.dateInputOne?.action(
                                          data._id,
                                          td,
                                          event.target.value
                                        );
                                        setDateInputOneCache("");
                                        event.target.blur();
                                      }
                                    }}
                                    onChange={(e) =>
                                      setDateInputOneCache(e.target.value)
                                    }
                                  />
                                </div>
                              ) : props.selectInputOne?.column?.includes(td) ? (
                                <div className="flex items-center justify-between text-right w-full h-full min-w-10 gap-2 group">
                                  <select
                                    defaultValue={data[td]}
                                    // value={data[td]}
                                    onChange={(e) => {
                                      setSelectInputOneCache(e.target.value);
                                    }}
                                    onKeyUp={(event: any) => {
                                      if (event.key === "Enter") {
                                        props.dateInputOne?.action(
                                          data._id,
                                          td,
                                          event.target.value
                                        );
                                        setSelectInputOneCache("");
                                        event.target.blur();
                                      }
                                    }}
                                  >
                                    <option>Select Option</option>
                                    {props.selectInputOne?.options.map(
                                      (val, index) => (
                                        <option
                                          key={index}
                                          value={val.value}
                                          selected={
                                            selectInputOneCache === val.value
                                          }
                                        >
                                          {val.label}
                                        </option>
                                      )
                                    )}
                                  </select>
                                </div>
                              ) : (
                                isImageUrl(data[td]) ?
                                  <div className="relative"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setIsHovered(true);
                                      setModalImageUrl(`${serverUrl}/${data[td]}`);
                                      e.stopPropagation();
                                    }}>
                                    <div className="w-8 h-8 rounded-full overflow-hidden" >
                                      <img
                                        src={`${serverUrl}/${data[td]}`}
                                        alt="Image"
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  </div>
                                  : (typeof data[td] === 'boolean') ? (data[td] ? 'Yes' : 'No') : data[td]
                              )}
                          </td>
                        }
                      </>
                    );
                  })}
                  {!(
                    props.actionButtons === undefined ||
                    Object.keys(props.actionButtons).length === 0
                  ) ? (
                    <td
                      className={`gap-5 flex items-center py-1 h-7 bg-white align-middle justify-end pr-2 focus:border-none focus:ring-1 bg-white focus:ring-blue-500`}
                    >
                      <a
                        // href={baseURL.getUri() + "/customer/get-pdf/"}
                        // download={true}
                        // target="_blank"
                        onClick={() =>
                          props.actionButtons?.pdf?.action(data)
                        }
                        className={`block ${props.actionButtons.pdf?.active
                          ? "flex justify-end"
                          : "hidden"
                          }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 stroke-purple-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
                          />
                        </svg>
                      </a>

                      <a
                        href="/src/files/Pricing.xlsx"
                        onClick={() =>
                          props.actionButtons?.excel?.action(data._id)
                        }
                        className={`${props.actionButtons.excel?.active
                          ? "flex justify-end"
                          : "hidden"
                          }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 stroke-blue-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
                          />
                        </svg>
                      </a>

                      <div
                        onClick={() =>
                          props.actionButtons?.edit?.action(data._id, data)
                        }
                        className={`${props.actionButtons.edit?.active
                          ? "flex justify-end"
                          : "hidden"
                          }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 stroke-slate-500 dark:stroke-slate-400"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </div>
                      <div
                        onClick={(event) => {
                          //@ts-ignore
                          props.actionButtons?.more?.action(data._id, event);
                        }}
                        className={`${props.actionButtons.more?.active
                          ? "flex justify-end"
                          : "hidden"
                          }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 stroke-slate-500 dark:stroke-slate-400"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                          />
                        </svg>
                      </div>

                      <div
                        onClick={() =>
                          props.actionButtons?.delete?.action(data._id)
                        }
                        className={`${props.actionButtons?.delete?.active
                          ? "flex justify-end"
                          : "hidden"
                          }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 36 36"
                          strokeWidth={1.5}
                          className="w-6 h-6 stroke-red-600 dark:stroke-red-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </div>
                      <div
                        onClick={() =>
                          props.actionButtons?.View?.action(data._id)
                        }
                        className={`${props.actionButtons?.View?.active
                          ? "flex justify-end"
                          : "hidden"
                          }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 stroke-slate-500 dark:stroke-slate-400"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      </div>

                      {(data['$new'] || data['$updated']) && <div
                        onClick={() => {
                            if(props.onSingleSave !== undefined) {
                              props.onSingleSave(data);
                            }
                          
                          }
                        }
                        className={`flex justify-end`}
                      >
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5 stroke-green-600"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/></svg> */}
                      
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 stroke-green-600">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>

                      </div>}

                      {data['$new'] && <div
                        onClick={() =>{
                          deleteRow(data);
                          }
                        }
                        className={`flex justify-end`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 stroke-red-600">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>


                      </div>}
                    </td>
                  ) : (
                    <td></td>
                  )}
                </tr>
              );
            })}
          </tbody>
          {props.isFooterEnabled ? (
            <tfoot>
              <tr className="bg-slate-300 border text-right font-medium border-slate-300">
                <td ></td>
                <td ></td>
                <td ></td>
                <td ></td>
                <td ></td>
                <td ></td>
                <td ></td>
                <td ></td>
                <td ></td>
                <td ></td>
                <td className="pr-2">{props.total ? props.total : 0}</td>
                <td className="pr-2">{props.totalW ? props.totalW : 0}</td>
                <td ></td>

              </tr>
            </tfoot>
          ) : (
            ""
          )}
        </table>
      </div>

      <div
        className={`${props.paginationEnabled ? "flex" : "hidden"
          } mt-2 items-center  justify-between gap-4`}
      >
        <div className="text-sm ">
          Showing{" "}
          {currentPaginationIndex === 1
            ? 1
            : dataPerPage * currentPaginationIndex - dataPerPage + 1}{" "}
          to{" "}
          {dataCount < dataPerPage ||
            currentPaginationIndex * dataPerPage > dataCount
            ? dataCount
            : currentPaginationIndex * dataPerPage}{" "}
          of {dataCount} entries
        </div>

        <div>
          <Pagination
            className="pagination-bar"
            currentPage={currentPaginationIndex}
            totalCount={dataCount}
            pageSize={dataPerPage}
            onPageChange={(page: number) => {
              handlePagechange(page);
            }}
          />
        </div>
        {isHovered && (
          <ImageModal
            onClose={() => setIsHovered(false)}
          />
        )}
      </div>
    </>
  );
}

const ForwardedAdvanceTable = forwardRef(AdvanceTable);

export default ForwardedAdvanceTable;