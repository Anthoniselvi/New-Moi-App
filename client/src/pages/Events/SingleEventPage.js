import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { BiEdit, BiShareAlt } from "react-icons/bi";
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

export default function SingleEventPage() {
  const [entries, setEntries] = useState([]);
  const [eventsList, setEventsList] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalGift, setTotalGift] = useState(0);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState();
  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("event");
  const selectedEvent = eventsList;
  //   console.log("selected event's profileID : " + selectedEvent.profileId);
  const [selectedEntries, setSelectedEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

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
  useEffect(() => {
    getSelectedEvent();
    fetchAllEntries();
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
              justifyContent: "space-between",
              alignItems: "center",
              height: "10%",
              width: "100%",
              paddingTop: "5%",
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
                  color: "#121212",
                  cursor: "pointer",
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
            </Box>
            <Box
              sx={{
                border: "1px solid #cad3dd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                cursor: "pointer",
                padding: "8px 15px",
                borderRadius: "5px",
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
              <Typography variant="h5" color="#101a34" sx={{ fontWeight: 600 }}>
                Edit
              </Typography>
            </Box>
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
              <Typography variant="h5" color="#fff" sx={{ fontWeight: 600 }}>
                Share
              </Typography>
            </Box>
            <Box
              sx={{
                color: "#fff",
                background: "#fafbfd",
                border: isNonMobile ? "1px solid #cad3dd" : undefined,
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: "8px 15px",
                fontWeight: 600,
                fontSize: "13px",
                lineHeight: "18px",
                borderRadius: "5px",
                fontFamily: "Poppins",
                cursor: "pointer",
              }}
            >
              {loading ? (
                <span>Loading...</span>
              ) : (
                <PDFDownloadLink
                  document={
                    <PrintEvent
                      selectedEntries={selectedEntries}
                      selectedEvent={eventsList.name}
                    />
                  }
                  fileName={`${eventsList.name}.pdf`}
                >
                  {isNonMobile ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >
                      <DownloadForOfflineIcon
                        sx={{
                          color: "#101a34",
                          fontSize: "25px",
                          cursor: "pointer",
                        }}
                      />
                      Download
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <DownloadForOfflineIcon
                        sx={{
                          color: "#101a34",
                          fontSize: "25px",
                          cursor: "pointer",
                        }}
                      />
                    </Box>
                  )}
                </PDFDownloadLink>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "80vh",
              borderRadius: "10px",
              border: "1px solid #cad3dd",
              marginTop: "4%",
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
                paddingLeft: "2%",
                paddingRight: "2%",
              }}
            >
              <Typography
                sx={{
                  color: "#101a34",
                  borderBottom: "2px solid #FE956F",
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  fontSize: "17px",
                }}
              >
                Guests ({entries.length})
              </Typography>
              <Button
                onClick={() => setCreateModalOpen(true)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                  outline: "none",
                  border: "none",
                  color: "#50bcd9",
                  background: "none",
                  fontWeight: 600,
                }}
              >
                <AddCircleOutlineIcon />
                Add
              </Button>
            </Box>

            <Box
              sx={{
                padding: 0,
                height: "100%",
                width: "100%",
                display: "flex",
                backgroundColor: "#ffffff",
              }}
            >
              {/* {isNonMobile ? (
            <NewEntiesList
              entries={entries}
              eventsList={eventsList}
              totalAmount={totalAmount}
              totalGift={totalGift}
            />
          ) : (
            <EntriesPage />
          )} */}
              <EntriesPage />
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
