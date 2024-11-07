function HighlightCard({ title, value, icon, children }) {
  return (
    <div className="bg-gray-700 relative rounded-lg p-4">
      <h3 className="text-gray-400 mb-2 flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </h3>
      {value && <div className="text-2xl font-bold mb-2">{value}</div>}
      {children}
    </div>
  );
}
export default HighlightCard;