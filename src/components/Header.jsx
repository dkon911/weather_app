import { useState } from 'react'
import { Search, Cloud } from 'lucide-react'
import { DatePicker } from './historical_stat/DatePicker'
import PropTypes from 'prop-types'

export default function Header({ city, setCity, handleFilterSubmit }) {
    const [selectedDate, setSelectedDate] = useState(new Date())

    const handleSubmit = (e) => {
        e.preventDefault()
        handleFilterSubmit(e)
    }

    return (
        <header className="bg-gray-800 rounded shadow-lg p-4 mb-4">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="flex items-center space-x-2">
                    <Cloud className="text-blue-500 h-8 w-8 md:h-10 md:w-10" />
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">ClimaFlow</h1>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto"
                >
                    <div className="relative w-full sm:w-64 md:w-72 lg:w-80">
                        <input
                            type="text"
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter city name"
                        />
                        <Search className="absolute right-3 top-2 text-gray-400 pointer-events-none" aria-hidden="true"/>
                    </div>

                    <button
                        type="submit"
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white font-bold h-10 leading-tight px-6 rounded-md transition duration-300"
                    >
                        Search
                    </button>
                </form>
            </div>
        </header>
    )
}

Header.propTypes = {
    city: PropTypes.string.isRequired,
    setCity: PropTypes.func.isRequired,
    handleFilterSubmit: PropTypes.func.isRequired,
}

