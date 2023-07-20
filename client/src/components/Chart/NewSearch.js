import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 1,
        pb: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "2%",
        "& .MuiSvgIcon-root": {
          fontSize: "30px",
          color: "#101a34",
        },
        "& .MuiInput-input": {
          fontSize: "20px",
          color: "#101a34",
        },
      }}
    >
      <Typography variant="h4" fontWeight="600" color="#101a34">
        Search by Name
      </Typography>
      <GridToolbarQuickFilter sx={{ color: "#101a34" }} />
    </Box>
  );
}

export default function NewSearch({ searchResult, eventsList }) {
  console.log("eventsList in NewSearch : " + JSON.stringify(eventsList));
  console.log("searchResult in NewSearch : " + JSON.stringify(searchResult));
  const columns = [
    { field: "personName", headerName: "Name", flex: 0.25, align: "left" },
    { field: "eventName", headerName: "EventName", flex: 0.4, align: "left" },
    { field: "amount", headerName: "Amount", flex: 0.25, align: "left" },
    { field: "gift", headerName: "Gift", flex: 0.3, align: "left" },
  ];

  const rows = searchResult.map((row) => ({
    ...row,
    id: row._id,
    eventName:
      eventsList.find((event) => event.eventId === row.eventId)?.eventName ||
      "",
  }));

  return (
    <Box
      sx={{
        height: 400,
        width: 1,
        "& .MuiDataGrid-root": {
          border: "none",
          padding: "20px",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: " 1px solid #e8ecf1",
          fontSize: "15px",
          lineHeight: "19px",
          color: "#101a34",
          padding: "20px",
          alignItems: "left",
        },
        "& .name-column--cell": {
          color: "red",
        },
        "& .MuiDataGrid-columnHeaders": {
          // display: "none",
          backgroundColor: "#fafbfd",
          color: "#121212",
          borderBottom: "none",
          fontWeight: 700,
          fontSize: 16,
        },
        "& .MuiButton-text": {
          fontWeight: 600,
          fontSize: "11px",
          lineHeight: "18px",
          color: "#101a34",
        },
        "& .MuiInput-input": {
          color: "black",
        },
        "& .MuiSvgIcon-root": {
          color: "black",
        },
        "& .MuiInput-underline": {
          color: "black",
        },
        "& .MuiDataGrid-virtualScroller": {
          // backgroundColor: "#f5f7fa",
          color: "#121212",
        },
        "& .MuiDataGrid-footerContainer": {
          display: "none",
          borderTop: "none",
          // backgroundColor: colors.blueAccent[700],
          backgroundColor: "lightyellow",
        },
        "& .MuiCheckbox-root": {
          color: "black",
        },
        "& .MuiDataGrid-row:hover": {
          backgroundColor: "#e0e0e0", // change the background color to your desired value
          cursor: "pointer",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        slots={{ toolbar: QuickSearchToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </Box>
  );
}
