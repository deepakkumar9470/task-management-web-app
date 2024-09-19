import React from 'react'

const FilterTask = ({filter,handleFilterChange}) => {
  return (
    <div className="px-6 py-2 flex items-start gap-2">
      <h1 className="hidden lg:block text-xl font-bold mb-2 text-gray-300">Filter Task : </h1>

      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-1 rounded-md font-semibold transition-all duration-300 shadow-md ${
            filter === 'all'
              ? 'bg-blue-600 text-white scale-100'
              : 'bg-gray-200 text-gray-800 hover:bg-blue-600 hover:text-white hover:scale-100'
          }`}
          onClick={()=>handleFilterChange('all')}
        >
          All
        </button>
        <button
          className={`px-4 py-1 rounded-md font-semibold transition-all duration-300 shadow-md ${
            filter === 'done'
              ? 'bg-green-500 text-white scale-100'
              : 'bg-gray-200 text-gray-800 hover:bg-green-500 hover:text-white hover:scale-100'
          }`}
          onClick={()=>handleFilterChange('done')}
        >
          Done
        </button>
        <button
          className={`px-4 py-1 rounded-md font-semibold transition-all duration-300 shadow-md ${
            filter === 'inprogress'
              ? 'bg-yellow-500 text-white scale-100'
              : 'bg-gray-200 text-gray-800 hover:bg-yellow-500 hover:text-white hover:scale-100'
          }`}
          onClick={()=>handleFilterChange('inprogress')}
        >
          In Progress
        </button>
        <button
          className={`px-4 py-1 rounded-md font-semibold transition-all duration-300 shadow-md ${
            filter === 'todo'
              ? 'bg-purple-500 text-white scale-100'
              : 'bg-gray-200 text-gray-800 hover:bg-purple-500 hover:text-white hover:scale-100'
          }`}
          onClick={()=>handleFilterChange('todo')}
        >
          Todo
        </button>
      </div>
    </div>
  )
}

export default FilterTask