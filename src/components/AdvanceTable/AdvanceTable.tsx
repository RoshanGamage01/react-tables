/**
 * In this table component, I design some query syntax to make it easier to customize.
 * Every keywords are prefixed with $ sign. Because of this, we can easily identify.
 * 
 * Here are the main keywords:
 *  - $skip: This keyword is used to skip the number of cells in the table.
 *  - $special: This keyword is used to make the text bold and larger.
 *    -----------------------------------------------------------
 *  - $color: This keyword is used to change the text color.    | _______ This color values can be any valid css color value.
 *  - $bg: This keyword is used to change the background color. |         like hex, rgb, rgba, hsl, hsla, etc.
 *    -----------------------------------------------------------
 */




import { useNavigate } from 'react-router-dom';
import Pagination from '../../helpers/Pagination/';
import { ChangeEvent, useEffect, useState } from 'react';

// Interfaces
interface Props {
  tableDataSet: {
    data: any[];
    dataCount: number;
    currentPaginationIndex: number;
    dataPerPage: number;
  };
  counter?: boolean;
  exclude?: string[];
  handlePagechange?: (pageIndex: number) => void;
  actionButtons?: {
    delete?: {
      active: boolean;
      action: (id: string) => void;
    };
    edit?: {
      active: boolean;
      action: (id: string) => void;
    };
  };
  defaultLink?: string;
  isCheckBoxEnabled?: boolean;
  checkBoxEmiter?: (e: string[]) => void;
  paginationEnabled?: boolean;
}

/**
 * AdvanceTable component is a reusable component that takes in data from
 * props and renders a table with pagination.
 *
 * @param {Props} props
 * @returns {JSX.Element}
 */
export default function AdvanceTable(props: Props): JSX.Element {
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  let textBold: boolean = false;
  let textColor: string = '';
  let bgColor: string = '';

  const {
    data = [],
    dataCount = 1,
    currentPaginationIndex = 1,
    dataPerPage = 1,
  } = props.tableDataSet ?? {};

  const ignoreValues = props.exclude ?? [];

  useEffect(() => {
    if (props.checkBoxEmiter !== undefined) {
      props.checkBoxEmiter(checkedItems);
    }
  }, [checkedItems]);

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
    value: string,
  ): void {
    if (event.target.checked && !checkedItems.includes(value)) {
      setCheckedItems((prevItems: string[]) => [...prevItems, value]);
    } else {
      setCheckedItems((prevItems: string[]) =>
        prevItems.filter((item: string) => item !== value),
      );
    }

    return;
  }

  /**
   * Generates empty cells for the table.
   *
   * @param {number}
   * @returns {JSX.Element[]}
  */
  function generateEmptyCells(cellCount: number) : JSX.Element[] {
    const emptyCells: JSX.Element[] = [];

    for (let i = 0; i < cellCount; i++) {
      emptyCells.push(
        <td key={i} className="px-4 py-1 h-10 text-[12px]" 
        style={
          { 
            height: '20px !important',
            color: textColor,
            backgroundColor: bgColor,
          }
        }
        ></td>,
      );
    }
    
    return emptyCells;
  }

  return (
    <div className="rounded">
      <table className="w-full border border-slate-300 dark:border-slate-500 text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-auto relative">
        <thead className="text-xs text-slate-50 uppercase bg-slate-500 dark:bg-slate-900 dark:text-slate-300">
          <tr className="border-slate-300 dark:border-slate-900">
            {/* If checkboxes enabled */}
            {props.isCheckBoxEnabled ? <th></th> : ''}
            
            {/* If counter enabled */}
            { 
              props.counter ? <th className="pl-3 py-3">
                #
              </th> : ''
            } 

            {data.length === 0
              ? ''
              : Object.keys(data[0]).map((th: any) => {
                  if (ignoreValues.includes(th) || th.includes('$')) return '';

                  return (
                    <>
                      <th scope="col" className="px-4 py-2 text-[10px]">
                        {th}
                      </th>
                    </>
                  );
                })}
            <th
              scope="col"
              className={`${
                props.actionButtons === undefined ||
                Object.keys(props.actionButtons).length === 0
                  ? 'hidden'
                  : 'block'
              } px-6 py-3`}
            ></th>
          </tr>
        </thead>
        <tbody
          className={`default-table-layout relative min-h-max ${
            data.length === 0 || !data ? 'h-30' : ''
          } rounded`}
        >
          <div
            className={`${
              data.length === 0 || !data ? 'flex' : 'hidden'
            } absolute bg-black/30 dark:bg-slate-700/50 w-full h-full items-center justify-center`}
          >
            <svg
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
            </svg>
          </div>
          {data.map((data: any, index: number) => {
            {/* If $color is provided */}
            if (Object.hasOwn(data, '$color')) {
              textColor = data['$color'];
            }else{
              textColor = '';
            }

            {/* If $bg is provided */}
            if (Object.hasOwn(data, '$bg')) {
              bgColor = data['$bg'];
            }else{
              bgColor = '';
            }

            {/* If $special is provided */}
            if (Object.hasOwn(data, '$special')) {
              if(data['$special'] ) textBold = true;
            }

            return (
              <tr
                key={data._id}
                className="bg-white dark:bg-slate-700 border-slate-300 cursor-pointer dark:border-slate-900 text-black dark:text-white"
              >
                {/* If checkboxes enabled */}
                {props.isCheckBoxEnabled ? (
                  <td className="px-2" style={{ color: textColor, backgroundColor: bgColor}}>
                    <input
                      type="checkbox"
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        checkBoxEmiter(event, data._id);
                      }}
                    />
                  </td>
                ) : (
                  ''
                )}

                {/* If Skip is provided */}
                {
                  Object.hasOwn(data, '$skip') ? 
                    generateEmptyCells(data['$skip'])
                   : ''
                }

                {
                  props.counter ? <td className="pl-3 py-2 h-10">
                    {index + 1}
                  </td> : ''
                }

                {/* Main Table Data */}
                {Object.keys(data).map((td: any) => {
                  if (ignoreValues.includes(td) || td.includes('$')) return '';

                  

                  return (
                    <>
                      {
                        <td
                          onClick={() =>
                            props.defaultLink !== undefined
                              ? navigate(
                                  `${props.defaultLink + '/' + data._id}`,
                                )
                              : ''
                          }
                          className={`px-4 py-1 h-10 text-[12px] ${textBold ? 'font-bold text-lg' : ''}`}
                          style={
                            { 
                              height: '20px !important',
                              color: textColor,
                              backgroundColor: bgColor,
                            }
                          }
                        >
                          {data[td]}
                        </td>
                      }
                    </>
                  );
                })}
                {!(
                  props.actionButtons === undefined ||
                  Object.keys(props.actionButtons).length === 0
                ) ? (
                  <td className={`gap-5 pt-2 flex items-center justify-end pr-6`}>
                    <div
                        onClick={() => props.actionButtons?.edit?.action(data._id)}
                        className={`${
                          props.actionButtons.edit?.active
                            ? 'flex justify-end'
                            : 'hidden'
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 stroke-green-600 dark:stroke-green-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                      </div>
                    <div
                      onClick={() =>
                        props.actionButtons?.delete?.action(data._id)
                      }
                      className={`${
                        props.actionButtons?.delete?.active
                          ? 'flex justify-end'
                          : 'hidden'
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
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

                    
                  </td>
                ) : (
                  ''
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div
        className={`${
          props.paginationEnabled ? 'flex' : 'hidden'
        } mt-3 items-center justify-between gap-4`}
      >
        <div className="text-sm">
          Showing{' '}
          {currentPaginationIndex === 1
            ? 1
            : dataPerPage * currentPaginationIndex - dataPerPage + 1}{' '}
          to{' '}
          {dataCount < dataPerPage ||
          currentPaginationIndex * dataPerPage > dataCount
            ? dataCount
            : currentPaginationIndex * dataPerPage}{' '}
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
      </div>
    </div>
  );
}
