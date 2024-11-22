import PropTypes from 'prop-types';

const StatCard = ({ value, label, getColor }) => {
    return (
        <div className={`p-6 rounded-lg shadow-md ${getColor(value)}`}>
            <h3 className="text-2xl font-bold mb-2">{value}</h3>
            <p className="text-lg">{label}</p>
        </div>
    );
};

StatCard.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
    getColor: PropTypes.func.isRequired,
};

export default StatCard;
