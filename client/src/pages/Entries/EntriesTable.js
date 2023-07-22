import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
// import "./SearchStyle.css";
import axios from "axios";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
export default function EntriesTable() {
  const isNonMobile = useMediaQuery("(max-width: 1000px)");
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("event");
  const [entries, setEntries] = useState([]);
  const [eventsList, setEventsList] = useState({});
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState();
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalGift, setTotalGift] = useState(0);

  const handleEditEntry = (entryId) => {
    setEditModalOpen(true);
    setSelectedRowId(entryId);
  };
  const getSelectedEvent = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/events/single/${eventId}`)
      .then((response) => {
        // console.log(response);
        console.log(response.data);
        setEventsList(response.data);
      });
  };

  const fetchAllEntries = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/entries/all/${eventId}`)
      .then((response) => {
        // console.log(response);
        // console.log("fetchAllEntries : " + JSON.stringify(response.data));
        console.log(
          "fetchAllEntries : " + JSON.stringify(response.data.entriesList)
        );
        console.log(
          "totalAmount : " + JSON.stringify(response.data.totalAmount)
        );
        setEntries(response.data.entriesList);
        setTotalAmount(response.data.totalAmount);
        setTotalGift(response.data.totalGift);
      });
  };
  useEffect(() => {
    getSelectedEvent();
    fetchAllEntries();
  }, []);
  const columns = [
    { field: "personName", headerName: "Name", flex: 0.25, align: "left" },
    { field: "amount", headerName: "Amount", flex: 0.25, align: "left" },
    { field: "gift", headerName: "Gift", flex: 0.25, align: "left" },
    {
      field: "action",
      headerName: "Action",
      flex: 0.25,
      align: "left",
      renderCell: ({ row }) => (
        <>
          {isNonMobile ? (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: "2rem" }}>
              <Box
                sx={{
                  border: "1px solid #50bcd9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  cursor: "pointer",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  background: "#50bcd9",
                  color: "#fff",
                  "&:hover": {
                    transition: "0.3s ease",
                    transform: "scale(0.9)",
                    background: "#fafbfd",
                    color: "#101a34",
                  },
                }}
              >
                <BiEdit
                  style={{
                    color: "#101a34",
                    fontSize: "15px",
                    fontWeight: 600,
                  }}
                />
                <Typography
                  variant="h6"
                  color="#101a34"
                  //   sx={{ fontWeight: 600 }}
                >
                  Edit
                </Typography>
              </Box>
              <Box
                sx={{
                  border: "1px solid #cad3dd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  cursor: "pointer",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  "&:hover": {
                    transition: "0.3s ease",
                    transform: "scale(0.9)",
                  },
                }}
              >
                <RiDeleteBin6Line
                  style={{
                    color: "#101a34",
                    fontSize: "15px",
                    fontWeight: 600,
                  }}
                />
                <Typography
                  variant="h6"
                  color="#101a34"
                  //   sx={{ fontWeight: 600 }}
                >
                  Delete
                </Typography>
              </Box>
            </Box>
          )}
        </>
      ),
    },
  ];

  const rows = entries.map((row) => ({
    ...row,
    id: row._id,
  }));
  return (
    <Box sx={{ minHeight: "90vh", width: "85vw" }}>
      <Box
        sx={{
          "& .MuiDataGrid-root": {
            padding: "20px",
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: " 1px solid #cad3dd",
            fontSize: "15px",
            lineHeight: "19px",
            color: "#101a34",
            paddingTop: "30px",
            paddingBottom: "30px",
            alignItems: "left",
          },
          "& .name-column--cell": {
            color: "red",
          },
          "& .MuiDataGrid-columnHeaders": {
            // display: "none",
            backgroundColor: "#fafbfd",
            color: "#101a34",
            fontWeight: 600,
            fontSize: 11,
            lineHeight: 18,
            borderTop: "1px solid #cad3dd",
            borderBottom: "1px solid #cad3dd",
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
          //   slots={{ toolbar: QuickSearchToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
      </Box>
    </Box>
  );
}
