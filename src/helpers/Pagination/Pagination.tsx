import { usePagination, DOTS } from './usePagination';

export default function Pagination(props: any){
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
      } = props;
    
      const paginationRange: any = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
      });

      if (currentPage === 0 || paginationRange.length < 2) {
        return null;
      }
    
      const onNext = () => {
        onPageChange(currentPage + 1);
      };
    
      const onPrevious = () => {
        onPageChange(currentPage - 1);
      };
    
    //   let lastPage = paginationRange[paginationRange.length - 1];

      return (
        <ul
      className="flex gap-1"
    >
      <li
        className=""
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber: any) => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li
            className={`${currentPage === pageNumber ? 'dark:bg-slate-700 bg-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600' : 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-950'} cursor-pointer flex items-center justify-center aspect-square w-10 rounded border border-stroke dark:border-strokedark`}

            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className=""
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
      );
}