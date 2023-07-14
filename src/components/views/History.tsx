import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { useTrackers } from "../../helpers/useTrackers";
import "moment/locale/hr";

const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  date: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  description: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  representative: { value: null, matchMode: FilterMatchMode.IN },
  timeLogged: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
  },
};

export const History = () => {
  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const [dates, setDates] = useState({
    selectedDate1: null,
    selectedDate2: null,
  });
  const { data, getTrackers, handleEdit, handleDelete } = useTrackers();
  const moment = require("moment");
  moment.locale("hr");
  useEffect(() => {
    getTrackers();
  }, []);

  useEffect(() => {
    filterObjects();
  }, [dates]);

  const actionTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          style={{ color: "#5F6B8A" }}
          onClick={() => handleDelete(rowData)}
        />
      </React.Fragment>
    );
  };

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

  const textEditor = (options: any) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const filterObjects = () => {
    const filteredData = data?.filter((obj: any) =>
      moment(moment(obj.date).format("YYYY-MM-DD")).isBetween(
        moment(dates.selectedDate1).format("YYYY-MM-DD"),
        moment(dates.selectedDate2).format("YYYY-MM-DD")
      )
    );
    console.log(filteredData);
  };

  return (
    <div style={{ margin: "5% 10% 0%" }}>
      <div
        style={{
          fontSize: "24px",
          fontWeight: "700",
        }}
      >
        <p>Trackers History</p>
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
            value={dates.selectedDate1}
            showIcon
            onChange={(e: any) =>
              setDates({ ...dates, selectedDate1: e.value })
            }
            dateFormat="dd/mm/yy"
            style={{ marginRight: "30px" }}
          />
        </span>
        <span>
          <Calendar
            locale="en"
            value={dates.selectedDate2}
            showIcon
            onChange={(e: any) =>
              setDates({ ...dates, selectedDate2: e.value })
            }
            dateFormat="dd/mm/yy"
          />
        </span>
        <span className="p-input-icon-right" style={{ float: "right" }}>
          <i
            className="pi pi-times"
            style={{ cursor: "pointer" }}
            onClick={initFilters}
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
          dataKey="id"
          paginator
          rows={5}
          editMode="row"
          // showGridlines
          onRowEditComplete={handleEdit}
          filters={filters}
          globalFilterFields={["date", "description", "timeTracked"]}
          tableStyle={{ minWidth: "50rem" }}
          paginatorClassName="custom-paginator"
        >
          <Column
            field="date"
            header="Date"
            style={{ width: "250px" }}
          ></Column>
          <Column
            field="description"
            header="Description"
            editor={(options) => textEditor(options)}
          ></Column>
          <Column
            field="timeTracked"
            header="Time tracker"
            style={{ width: "350px" }}
          ></Column>
          <Column
            header={"Action"}
            body={actionTemplate}
            style={{ width: "60px", textAlign: "right" }}
          ></Column>
          <Column rowEditor style={{ width: "60px" }}></Column>
        </DataTable>
      </div>
    </div>
  );
};
export default History;
