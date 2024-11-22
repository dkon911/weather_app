import { useState } from 'react'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns'
import { Popover, Transition } from '@headlessui/react'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import PropTypes from 'prop-types'

export function DatePicker({ selected, onChange }) {
  const [viewing, setViewing] = useState(selected)

  const days = eachDayOfInterval({
    start: startOfMonth(viewing),
    end: endOfMonth(viewing),
  })

  const previousMonth = () => setViewing(subMonths(viewing, 1))
  const nextMonth = () => setViewing(addMonths(viewing, 1))

  return (
      <div className="inline-block w-64">
        <Popover className="relative">
          {({open}) => (
              <>
                <Popover.Button
                    className="flex items-center w-full px-4 py-2 text-left rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
                  <Calendar className="w-5 h-5 mr-2 text-gray-600"/>
                  <span className="text-gray-700">{format(selected, 'PPP')}</span>
                </Popover.Button>
                <Transition
                    show={open}
                    enter="transition duration-200 ease-out"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition duration-150 ease-in"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute z-10 mt-2 w-64 p-4 bg-white rounded-md shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <button
                          className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onClick={previousMonth}
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-600"/>
                      </button>
                      <h2 className="text-lg font-semibold text-gray-700">
                        {format(viewing, 'MMMM yyyy')}
                      </h2>
                      <button
                          className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onClick={nextMonth}
                      >
                        <ChevronRight className="w-5 h-5 text-gray-600"/>
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500 mb-2">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                          <div key={day}>{day}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {days.map((day, dayIdx) => (
                          <div
                              key={day.toString()}
                              className={`${
                                  dayIdx === 0 ? `col-start-${day.getDay() + 1}` : ''
                              }`}
                          >
                            <button
                                className={`w-8 h-8 flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    isSameMonth(day, viewing)
                                        ? 'text-gray-700 hover:bg-gray-100'
                                        : 'text-gray-400'
                                } ${
                                    isSameDay(day, selected)
                                        ? 'bg-blue-500 text-grey hover:bg-blue-600'
                                        : ''
                                } ${
                                    isToday(day)
                                        ? 'border border-blue-500'
                                        : ''
                                }`}
                                onClick={() => {
                                  onChange(day)
                                  setViewing(day)
                                }}
                            >
                              <time dateTime={format(day, 'yyyy-MM-dd')}>
                                {format(day, 'd')}
                              </time>
                            </button>
                          </div>
                      ))}
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
          )}
        </Popover>
      </div>
        )
        }

        DatePicker.propTypes = {
        selected: PropTypes.instanceOf(Date).isRequired,
        onChange: PropTypes.func.isRequired,
      }

