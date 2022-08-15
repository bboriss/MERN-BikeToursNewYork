import "./Dropdown.css";

const Dropdown = () => {
  return (
    <div className="dropdown">
      <div className="dropdown-btn">Filter by duration</div>
      <div className="dropdown-content">
        <div className="dropdown-item"></div>
        <div className="dropdown-item">Shorter</div>
        <div className="dropdown-item">Longer</div>
      </div>
    </div>
  );
};

export default Dropdown;
