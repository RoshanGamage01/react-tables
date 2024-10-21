import { TableField } from "./type";

/**
 * `Props` interface for the `AdvanceTable` component.
 */
export default interface Props {
  /**
  `tableHeaders`: Required array of objects specifying table headers. Each object should contain:
    - `header`: The header text.
    - `key`: The key to access the data in the object.
    - `className`: Optional string for additional classes.
   */
  tableFieldConfigs: TableField[];

  /**
   * `tableDataSet`: Object containing data and pagination information for the table.
   *
   * - `data`: Array of objects to be displayed in the table.
   * - `dataCount`: Total number of data items in the database.
   * - `currentPaginationIndex`: Current page index of the table.
   * - `dataPerPage`: Number of data items per page.
   */
  tableDataSet: {
    data: any[];
    dataCount: number;
    currentPaginationIndex: number;
    dataPerPage: number;
  };

  rightArrays?: string[];
  

  /**
   * `counter`: Optional boolean to indicate if a counter should be included.
   */
  counter?: boolean;
  isComplete?: boolean;
  total?: number;
  totalW?: number;

  /**
   * `exclude`: Optional array of strings specifying columns to exclude.
   */
  exclude?: string[];

  /**
   * `handlePagechange`: Optional function to handle page changes.
   */
  getUpdatedData?: (tableData: any[]) => any[];

  /**
   * `handlePagechange`: Optional function to handle page changes.
   */
  handlePagechange?: (pageIndex: number) => void | Promise<void>;

  /**
   * `actionButtons`: Optional object defining action buttons and their handlers.
   */
  actionButtons?: {
    delete?: {
      active: boolean;
      action: (id: string) => void;
    };
    edit?: {
      active: boolean;
      action: (id: string, data?: any) => void;
    };
    more?: {
      active: boolean;
      action: (id: string) => void;
    };
    View?: {
      active: boolean;
      action: (id: string) => void;
    };
    pdf?: {
      active: boolean;
      action: (id: string) => void;
    };
    excel?: {
      active: boolean;
      action: (id: string) => void;
    };
  };

  /**
   * `defaultLink`: Optional string for a default link.
   */
  defaultLink?: string;

  /**
   * `isCheckBoxEnabled`: Optional boolean to indicate if checkboxes should be enabled.
   */
  isCheckBoxEnabled?: boolean;


  addbutton?: boolean;
  padding?: boolean;


  /**
   * `checkBoxEmiter`: Optional function to handle checkbox events.
   */
  checkBoxEmiter?: (values: string[]) => void;

  /**
   * `paginationEnabled`: Optional boolean to indicate if pagination should be enabled.
   */
  paginationEnabled?: boolean;

  /**
   * `clickEvent`: Optional function to handle click events.
   */
  clickEvent?: (id: string) => void;

  /**
   * `directInputs`: Optional object defining direct input columns and their action handler.
   */
  directInputs?: {
    columns: string[];
    action: (id: string, key: string, value: string) => void | Promise<void>;
  };

  /**
   * `onBulkSave`: Optional function to submit newly added row data as a batch.
   */
  onBulkSave?: (newData: any[], updatedData: any[]) => void;

  /**
   * `onSingleSave`: Optional function to submit newly added row data individually.
   */
  onSingleSave?: (data: any) => void;

  /**
   * `onDataUpdated`: Optional function to triger when data in table updated.
   */
  onDataUpdated?: (data: any[]) => void;

  /**
   * `conditionalRendering`: Optional object defining conditional rendering fields and their action handler.
   * `field`: The field to be conditionally rendered.
   * `function`: The function to be executed to render the field.
   */
  conditionalRendering?: {
    field: string[];
    function: (
      field: string,
      value: string | boolean | number,
      id: string,
      dataObject?: any,
      elementId?: string,
      events?: any
    ) => string | boolean | number | JSX.Element | Promise<any>;
  };

  selectInputOne?: {
    column: string[];
    options: { label: string; value: any }[];
    action: (id: string, key: string, value: string) => void | Promise<void>;
  };

  dateInputOne?: {
    column: string[];
    action: (id: string, key: string, value: string) => void | Promise<void>;
  };

  checkedItemList?: any;

  isFooterEnabled ?:boolean;
}
