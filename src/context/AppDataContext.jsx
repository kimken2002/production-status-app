import { createContext, useContext, useMemo, useState } from "react";

const AppDataContext = createContext(null);

function formatDate(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}`;
}

function createInitialDates() {
  const today = new Date();
  return Array.from({ length: 3 }, (_, index) => {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + index);
    return formatDate(nextDate);
  });
}

export function AppDataProvider({ children }) {
  const initialDates = useMemo(() => createInitialDates(), []);

  const [productionData, setProductionData] = useState({
    dates: initialDates,
    rows: {
      temperature: Array(initialDates.length).fill(""),
      humidity: Array(initialDates.length).fill(""),
      soil: Array(initialDates.length).fill(""),
      watering: Array(initialDates.length).fill(""),
    },
  });

  const [employees, setEmployees] = useState([
    { id: "000001", name: "山田太郎", department: "生産部" },
    { id: "000002", name: "佐藤花子", department: "管理部" },
  ]);

  const addProductionRecord = ({
    date,
    temperature,
    humidity,
    soil,
    watering,
  }) => {
    setProductionData((prev) => {
      const nextDates = [...prev.dates];
      const nextRows = {
        temperature: [...prev.rows.temperature],
        humidity: [...prev.rows.humidity],
        soil: [...prev.rows.soil],
        watering: [...prev.rows.watering],
      };

      let targetIndex = nextDates.indexOf(date);

      if (targetIndex === -1) {
        nextDates.push(date);
        nextRows.temperature.push("");
        nextRows.humidity.push("");
        nextRows.soil.push("");
        nextRows.watering.push("");
        targetIndex = nextDates.length - 1;
      }

      if (temperature !== "") nextRows.temperature[targetIndex] = temperature;
      if (humidity !== "") nextRows.humidity[targetIndex] = humidity;
      if (soil !== "") nextRows.soil[targetIndex] = soil;
      if (watering !== "") nextRows.watering[targetIndex] = watering;

      return {
        dates: nextDates,
        rows: nextRows,
      };
    });
  };

  const isDuplicateEmployee = ({ id, name }) => {
    return employees.some(
      (employee) => employee.id === id || employee.name === name,
    );
  };

  const addEmployee = (employee) => {
    setEmployees((prev) => [...prev, employee]);
  };

  return (
    <AppDataContext.Provider
      value={{
        productionData,
        addProductionRecord,
        employees,
        addEmployee,
        isDuplicateEmployee,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  return useContext(AppDataContext);
}
