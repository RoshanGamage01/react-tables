import { useNavigate } from 'react-router-dom';
import Pagination from '../../helpers/Pagination/';

type DefaultTableProps = {
    tableDataSet?: {
        data: any[];
        dataCount?: number;
        currentPaginationIndex?: number;
        dataPerPage?: number;
    };
    exclude?: string[];
    handlePagechange?: (pageIndex: number) => void;
    actionButtons?: any;
    defaultLink?: string;
};

export default function DefaultTable(props: DefaultTableProps) {
    const navigate = useNavigate();

    const {
        data = [],
        dataCount = 1,
        currentPaginationIndex = 1,
        dataPerPage = 1,
    } = props.tableDataSet ?? {};

    console.log(data)

    const ignoreValues = props.exclude ?? [];

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

  return (
    <div className='rounded'>
      <table className="w-full border border-slate-300 dark:border-slate-500 text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-auto relative">
        <thead className="text-xs text-slate-50 uppercase bg-slate-500 dark:bg-slate-900 dark:text-slate-300">
          <tr className="border-slate-300 dark:border-slate-900">
            { data.length === 0 ? '' : Object.keys(data[0]).map((th: any) => {
              if (ignoreValues.includes(th)) return '';
              return (
                <>
                  <th scope="col" className="px-6 py-3">
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
        <tbody className={`default-table-layout relative min-h-max ${data.length === 0 || !data ? 'h-32' : ''} rounded`}>
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
          {data.map((data: any) => {
            return (
              <tr
                key={data._id}
                className="bg-white dark:bg-slate-700 border-slate-300 cursor-pointer dark:border-slate-900 text-black dark:text-white"
              >
                {Object.keys(data).map((td: any) => {
                  if (ignoreValues.includes(td)) return '';
                  return (
                    <>
                      <td
                        onClick={() => props.defaultLink !== undefined ? navigate(`${props.defaultLink + '/'+data._id}`): ''}
                        className="px-6 py-2 h-10"
                        style={{ height: '20px !important' }}

                      >
                        {data[td]}
                      </td>
                    </>
                  );
                })}
                {!(
                  props.actionButtons === undefined ||
                  Object.keys(props.actionButtons).length === 0
                ) ? (
                  <td className={`gap-5 items-center justify-end pr-6`}>
                    <div
                      onClick={() => props.actionButtons.delete.action(data._id)}
                      className={`${
                        props.actionButtons.delete.active
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

      <div className="mt-3 flex items-center justify-between gap-4">
        <div className="text-sm">
          Showing{' '}
          {currentPaginationIndex === 1
            ? 1
            : dataPerPage * currentPaginationIndex - dataPerPage + 1}{' '}
          to {(dataCount < dataPerPage || currentPaginationIndex * dataPerPage > dataCount ? dataCount : currentPaginationIndex * dataPerPage)} of {dataCount} entries
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
