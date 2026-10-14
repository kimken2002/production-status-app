function DataTable({ dates, rows }) {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th></th>
            {dates.map((date) => (
              <th key={date}>{date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>気温（℃）</th>
            {rows.temperature.map((value, index) => (
              <td key={`temperature-${index}`}>{value}</td>
            ))}
          </tr>
          <tr>
            <th style={{ minWidth: "120px" }}>水分（％）</th>
            {rows.humidity.map((value, index) => (
              <td key={`humidity-${index}`}>{value}</td>
            ))}
          </tr>
          <tr>
            <th>土壌（重量）</th>
            {rows.soil.map((value, index) => (
              <td key={`soil-${index}`}>{value}</td>
            ))}
          </tr>
        </tbody>
      </table>

      <table className="data-table sub-table">
        <tbody>
          <tr>
            <th>散水（時間）</th>
            {rows.watering.map((value, index) => (
              <td key={`watering-${index}`}>{value}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
