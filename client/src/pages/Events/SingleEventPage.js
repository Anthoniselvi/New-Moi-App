import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { BiEdit, BiShareAlt, BiDownload } from "react-icons/bi";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import EntriesPage from "../Entries/EntriesPage";
import { PrintEvent } from "./PrintEvent";
import EditEvent from "./EditEvent";
import CreateEntry from "../Entries/CreateEntry";
import NewEntriesPage from "../Entries/NewEntriesPage";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import EntriesTable from "../Entries/EntriesTable";

export default function SingleEventPage() {
  const [entries, setEntries] = useState([]);
  const [eventsList, setEventsList] = useState({});
  // const [totals, setTotals] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalGift, setTotalGift] = useState(0);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState();
  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("event");
  const selectedEvent = eventsList;
  const [selectedEntries, setSelectedEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  // const totalValue = totals.find(
  //   (singleTotal) => singleTotal.eventId === eventsList.eventId
  // );
  const getReports = (eventName) => {
    console.log("eventName :" + eventName);
    console.log("eventsList :", eventsList);

    const selectedEvent = eventsList;

    const selectedEventEntries = entries.filter(
      (entry) => entry.eventId === selectedEvent.eventId
    );
    console.log(
      "selectedEventEntries :" + JSON.stringify(selectedEventEntries)
    );
    setSelectedEntries(selectedEventEntries);
    console.log("SelectedEntries: ", selectedEntries);
    setLoading(true);
  };

  const getSelectedEvent = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/events/single/${eventId}`)
      .then((response) => {
        // console.log(response.data);
        setEventsList(response.data);
      });
  };

  const handleEditEvent = (eventId) => {
    setAnchorEl(null);
    setEditModalOpen(true);
    setSelectedRowId(eventId);
  };
  const fetchAllEntries = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/entries/all/${eventId}`)
      .then((response) => {
        setEntries(response.data.entriesList);
        setTotalAmount(response.data.totalAmount);
        setTotalGift(response.data.totalGift);
      });
  };
  // const fetchTotals = () => {
  //   axios
  //     .get(
  //       `${process.env.REACT_APP_BASE_URL}/entries/total/${eventsList.profileId}`
  //     )
  //     .then((response) => {
  //       // console.log(response);

  //       console.log("Totals : " + JSON.stringify(response.data));
  //       setTotals(response.data);
  //     });
  // };
  useEffect(() => {
    getSelectedEvent();
    fetchAllEntries();
    // fetchTotals();
    setLoading(true);
    // setSelectedEntries(entries.filter((entry) => entry.eventId === selectedEvent.eventId));
    setLoading(false);
  }, []);
  // }, [entries, selectedEvent]);

  return (
    <div className="home">
      <Sidebar profileId={selectedEvent.profileId} />
      <div className="homeContainer">
        <Box m="20px">
          <Box
            sx={{
              display: "flex",
              justifyContent: isNonMobile ? "space-between" : "center",
              flexDirection: isNonMobile ? "row" : "column",
              height: "10%",
              width: "100%",
              padding: "2% 0%",
              paddingBottom: "5%",
              borderBottom: "1px solid #cad3dd",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: "left",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#101a34",
                    fontFamily: "Poppins",
                    fontWeight: 600,
                    fontSize: "25px",
                    lineHeight: "34px",
                  }}
                >
                  {eventsList.name}
                </Typography>
                <Box
                  sx={{
                    "&:hover": {
                      transition: "0.3s ease",
                      transform: "scale(1.4)",
                    },
                  }}
                >
                  <PDFDownloadLink
                    document={
                      <PrintEvent
                        selectedEntries={selectedEntries}
                        selectedEvent={eventsList.name}
                      />
                    }
                    fileName={`${eventsList.name}.pdf`}
                  >
                    <BiDownload
                      style={{
                        color: "#50bcd9",
                        fontSize: "25px",
                        cursor: "pointer",
                      }}
                    />
                  </PDFDownloadLink>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  // flexDirection: isNonMobile ? "column" : "row",
                  // gap: isNonMobile ? "undefined" : "20%",
                  // gap: "10px",
                  alignItems: "left",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <CurrencyRupeeIcon
                    sx={{ color: "#50bcd9", fontSize: "16px" }}
                  />
                  <Typography
                    sx={{
                      color: "#101a34",
                      fontFamily: "Poppins",
                      fontWeight: 600,
                      fontSize: "16px",
                      lineHeight: "34px",
                    }}
                  >
                    {totalAmount}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <CardGiftcardIcon
                    sx={{ color: "#50bcd9", fontSize: "16px" }}
                  />
                  <Typography
                    sx={{
                      color: "#101a34",
                      fontFamily: "Poppins",
                      fontWeight: 600,
                      fontSize: "16px",
                      lineHeight: "34px",
                    }}
                  >
                    {totalGift}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <CalendarMonthIcon
                  style={{
                    color: "#50bcd9",
                    fontSize: "16px",
                  }}
                />
                <Typography
                  sx={{
                    color: "#101a34",
                    fontFamily: "Poppins",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "34px",
                  }}
                >
                  {eventsList.date}
                </Typography>
              </Box>
              <Box
                display="flex"
                gap="10px"
                // alignItems="center"
                // justifyContent="center"
                justifyContent={isNonMobile ? "center" : "space-between"}
                alignItems={isNonMobile ? "center" : "left"}
                // border="1px solid red"
                width="100%"
              >
                <Box
                  sx={{
                    backgroundColor: "#50bcd9",
                    color: "#fff",
                    border: "1px solid #50bcd9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    cursor: "pointer",
                    padding: "8px 15px",
                    borderRadius: "5px",
                    width: "50%",
                    "&:hover": {
                      transition: "0.3s ease",
                      transform: "scale(0.9)",
                    },
                  }}
                >
                  <BiShareAlt
                    style={{
                      color: "#fff",
                      fontSize: "22px",
                      fontWeight: 600,
                    }}
                  />
                  <Typography
                    variant="h5"
                    color="#fff"
                    sx={{ fontWeight: 600 }}
                  >
                    Share
                  </Typography>
                </Box>
                <Box
                  onClick={() => handleEditEvent(eventsList.eventId)}
                  sx={{
                    border: "1px solid #cad3dd",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    cursor: "pointer",
                    padding: "8px 15px",
                    borderRadius: "5px",
                    width: "50%",
                    "&:hover": {
                      transition: "0.3s ease",
                      transform: "scale(0.9)",
                    },
                  }}
                >
                  <BiEdit
                    style={{
                      color: "#101a34",
                      fontSize: "22px",
                      fontWeight: 600,
                    }}
                  />
                  <Typography
                    variant="h5"
                    color="#101a34"
                    sx={{ fontWeight: 600 }}
                  >
                    Edit
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              minHeight: "70vh",
              borderRadius: "10px",
              border: "1px solid #cad3dd",
              marginTop: "5%",
              backgroundColor: "#fff",
            }}
          >
            <Box
              sx={{
                height: "10%",
                width: "100%",
                borderBottom: "1px solid #cad3dd",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0% 2%",
              }}
            >
              <Typography
                sx={{
                  color: "#101a34",
                  // borderBottom: "2px solid #FE956F",
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  fontSize: "20px",
                }}
              >
                Guests{" "}
                <span style={{ color: "#a8acb3", fontSize: "22px" }}>
                  ({entries.length})
                </span>
              </Typography>
              <Button
                onClick={() => setCreateModalOpen(true)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                  color: "#50bcd9",
                  fontSize: "18px",
                  fontWeight: 600,
                  // border: "1px solid #cad3dd",
                  "&:hover": {
                    transition: "0.3s ease",
                    transform: "scale(1.4)",
                  },
                }}
              >
                <AddCircleOutlineIcon
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#50bcd9",
                  }}
                />
                <Typography
                  variant="h5"
                  color="#50bcd9"
                  sx={{ fontWeight: 600, textTransform: "none" }}
                >
                  Add
                </Typography>
              </Button>
            </Box>

            <Box
              sx={{
                padding: 0,
                height: "90%",
                width: "100%",
                display: "flex",
              }}
            >
              {/* <EntriesPage /> */}
              {/* <NewEntriesPage /> */}
              <EntriesTable />
            </Box>
          </Box>
          {createModalOpen ? (
            <CreateEntry
              open={createModalOpen}
              onClose={() => setCreateModalOpen(false)}
              eventId={eventId}
            />
          ) : (
            <></>
          )}
          {editModalOpen ? (
            <EditEvent
              eventName={eventsList.name}
              eventId={eventId}
              open={editModalOpen}
              onClose={() => setEditModalOpen(false)}
            />
          ) : (
            <></>
          )}
        </Box>
      </div>
    </div>
  );
}
