import { useState } from 'react'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns'
import { Popover, Transition } from '@headlessui/react'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import PropTypes from 'prop-types';


export function DatePicker({ selected, onChange }) {
  const [viewing, setViewing] = useState(selected)

  const days = eachDayOfInterval({
    start: startOfMonth(viewing),
    end: endOfMonth(viewing),
  })

  return (
      <Popover className="relative">
        <Popover.Button className="flex items-center w-full px-4 py-2 text-left rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          <Calendar className="w-5 h-5 mr-2 text-gray-400" aria-hidden="true" />
          {format(selected, 'yyyy-MM-dd')}
        </Popover.Button>
        <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
        >
          <Popover.Panel className="absolute z-10 w-64 mt-2 bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <button
                    onClick={() => setViewing(subMonths(viewing, 1))}
                    className="p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-white font-semibold">
                {format(viewing, 'MMMM yyyy')}
              </span>
                <button
                    onClick={() => setViewing(addMonths(viewing, 1))}
                    className="p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                    <div key={day} className="text-center text-gray-500 text-xs">
                      {day}
                    </div>
                ))}
                {days.map((day) => (
                    <button
                        key={day.toString()}
                        onClick={() => {
                          onChange(day)
                          setViewing(day)
                        }}
                        className={`
                    w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${isSameMonth(day, viewing) ? 'text-white' : 'text-gray-500'}
                    ${
                            isSameDay(day, selected)
                                ? 'bg-blue-600'
                                : isSameMonth(day, viewing)
                                    ? 'hover:bg-gray-700'
                                    : ''
                        }
                  `}
                    >
                      {format(day, 'd')}
                    </button>
                ))}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
  )
}
DatePicker.propTypes = {
  selected: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
};
