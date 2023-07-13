import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";

const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  "country.name": {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  representative: { value: null, matchMode: FilterMatchMode.IN },
  date: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
  },
  balance: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  status: {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
  verified: { value: null, matchMode: FilterMatchMode.EQUALS },
};

export const History = () => {
  const actionTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          style={{ color: "#5F6B8A" }}
          onClick={() => console.log(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          style={{ color: "#5F6B8A" }}
          onClick={() => console.log(rowData)}
        />
      </React.Fragment>
    );
  };
  const [data, setData] = useState([
    {
      date: "25.02.2022",
      description: "nesto dfrugo dsffd",
      timeTracked: "05:02:23",
    },
    {
      date: "20.02.2022",
      description: "dfrugo dsffd",
      timeTracked: "03:02:23",
    },
  ]);
  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState(null);
  const initFilters = () => {
    setFilters(defaultFilters);
    setGlobalFilterValue("");
  };
  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };

    // @ts-ignore
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const clearFilter = () => {
    initFilters();
  };

  return (
    <div style={{ margin: "5% 10% 0%" }}>
      <div
        style={{
          fontSize: "24px",
          fontWeight: "700",
        }}
      >
        <p> Trackers History</p>
      </div>
      <br /> <br />
      <div
        style={{
          marginBottom: "50px",
          backgroundColor: "#F9F9FD",
          padding: "25px",
        }}
        className="flex justify-content-between"
      >
        <span>
          <Calendar
            locale="en"
            value={selectedDate}
            showIcon
            onChange={(e: any) => setSelectedDate(e.value)}
            dateFormat="dd/mm/yy"
          />
        </span>
        <span>
          <Calendar
            locale="en"
            value={selectedDate}
            showIcon
            onChange={(e: any) => setSelectedDate(e.value)}
            dateFormat="dd/mm/yy"
          />
        </span>
        <span className="p-input-icon-right" style={{ float: "right" }}>
          <i
            className="pi pi-times"
            style={{ cursor: "pointer" }}
            onClick={clearFilter}
          />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search"
          />
        </span>
      </div>
      <div className="card">
        <DataTable
          value={data}
          paginator
          rows={5}
          showGridlines
          filters={filters}
          globalFilterFields={["date", "description", "timeTracked"]}
          tableStyle={{ minWidth: "50rem" }}
          paginatorClassName="custom-paginator"
        >
          <Column field="date" header="Date"></Column>
          <Column field="description" header="Description"></Column>
          <Column field="timeTracked" header="Time tracker"></Column>
          <Column header="Action" body={actionTemplate}></Column>
        </DataTable>
      </div>
    </div>
  );
};
export default History;
