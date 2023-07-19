import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="600"
        // color="rgba(54, 162, 235)"
        color="#101a34"
      >
        Search by Name
      </Typography>
      <GridToolbarQuickFilter sx={{ color: "rgba(255, 198, 117)" }} />
    </Box>
  );
}

export default function NewSearch({ searchResult, eventsList }) {
  console.log("eventsList in NewSearch : " + JSON.stringify(eventsList));
  console.log("searchResult in NewSearch : " + JSON.stringify(searchResult));
  const columns = [
    { field: "personName", headerName: "Name", flex: 0.25 },
    { field: "eventName", headerName: "EventName", flex: 0.4 },
    { field: "amount", headerName: "Amount", flex: 0.25 },
    { field: "gift", headerName: "Gift", flex: 0.3 },
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
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .name-column--cell": {
          color: "red",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "rgb(140, 141, 255)",
          color: "#121212",
          borderBottom: "none",
          fontWeight: 700,
          fontSize: 16,
        },
        "& .MuiButton-text": {
          color: "#121212",
          // background: "green"
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
          backgroundColor: "#f5f7fa",
          color: "#121212",
        },
        "& .MuiDataGrid-footerContainer": {
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
