import React, { useState, useRef, useEffect } from 'react';
import { useTable, usePagination, useGlobalFilter, useSortBy } from 'react-table';
import { Search, RefreshCw, Edit2, Trash2, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Filter, X } from 'lucide-react';

const Table = ({ 
  columns, 
  data, 
  onEdit, 
  onDelete, 
  onRefresh,
  filters = [],
  isLoading = false
}) => {
  // ... (previous state and hooks remain the same)
  const [filterValues, setFilterValues] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterPopupRef = useRef(null);
  const filterButtonRef = useRef(null);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageCount,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 10 }
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isFilterOpen &&
        filterPopupRef.current &&
        !filterPopupRef.current.contains(event.target) &&
        !filterButtonRef.current.contains(event.target)
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);

  const handleFilterSubmit = () => {
    console.log(filterValues);
    setIsFilterOpen(false);
  };

  return (
    <div className="flex flex-col h-full max-h-screen bg-white rounded-lg shadow-lg">
      {/* Fixed Header Section with modified search bar */}
      <div className="flex-none bg-white  p-4 border-b">
        <div className="flex justify-between items-center gap-4">
          {/* Left side with search */}
          <div className="w-64"> {/* Fixed width for search bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={globalFilter || ''}
                onChange={e => setGlobalFilter(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"/>
            </div>
          </div>

          {/* Right side with filter and refresh buttons */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                ref={filterButtonRef}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-5 w-5 text-gray-600" />
              </button>

              {/* Filter Popup */}
              {isFilterOpen && (
                <>
                  <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
                  <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                    <div 
                      ref={filterPopupRef}
                      className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto"
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-xl font-semibold text-gray-900">Filters</h3>
                          <button
                            onClick={() => setIsFilterOpen(false)}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {filters.map((filter, index) => (
                            <div key={index} className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">
                                {filter.label}
                              </label>
                              <select
                                onChange={(e) => setFilterValues(prev => ({
                                  ...prev,
                                  [filter.name]: e.target.value
                                }))}
                                value={filterValues[filter.name] || ''}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              >
                                <option value="">{filter.label}</option>
                                {filter.options.map((option, idx) => (
                                  <option key={idx} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                          <button
                            onClick={() => {
                              setFilterValues({});
                              setIsFilterOpen(false);
                            }}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                          >
                            Clear All
                          </button>
                          <button
                            onClick={handleFilterSubmit}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                          >
                            Apply Filters
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={onRefresh}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className={`h-5 w-5 text-gray-600 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 min-h-0">
        <div className="h-full overflow-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <th
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                          className="sticky top-0 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                          style={{ minWidth: column.minWidth }}
                        >
                          <div className="flex items-center space-x-1">
                            <span>{column.render('Header')}</span>
                            <span>
                              {column.isSorted
                                ? column.isSortedDesc
                                  ? <ChevronDown className="h-4 w-4" />
                                  : <ChevronUp className="h-4 w-4" />
                                : ''}
                            </span>
                          </div>
                        </th>
                      ))}
                      <th className="sticky top-0 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Actions
                      </th>
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                  {page.map(row => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} className="hover:bg-gray-50">
                        {row.cells.map(cell => (
                          <td
                            {...cell.getCellProps()}
                            className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap"
                          >
                            {cell.render('Cell')}
                          </td>
                        ))}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => onEdit(row.original)}
                              className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => onDelete(row.original)}
                              className="p-1 text-red-600 hover:text-red-800 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Footer with Pagination */}
      <div className="flex-none bg-white border-t p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">
              Rows per page:
            </span>
            <select
              value={pageSize}
              onChange={e => setPageSize(Number(e.target.value))}
              className="px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {[10, 20, 30, 40, 50].map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">
              Page {pageIndex + 1} of {pageCount}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                className="p-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                className="p-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;