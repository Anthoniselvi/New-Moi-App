import * as React from "react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMediaQuery, Typography, Box } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import axios from "axios";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import EditIcon from "@mui/icons-material/Edit";
// import NewEditEvent from "../events/NewEditEvent";

export default function EventsList({ eventslist }) {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const profileId = searchParam.get("profile");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleEditEvent = (eventId, event) => {
    event.stopPropagation(); // Stop event propagation to the parent Box

    setAnchorEl(null);
    setEditModalOpen(true);
    setSelectedRowId(eventId);
  };
  const navigateToSingleEventPage = (eventId) => {
    navigate(`/eventpage?event=${eventId}`);
  };

  const navigateToCreateEvent = () => {
    navigate(`/newevent?profile=${profileId}`);
  };

  const handleBoxHover = (index) => {
    setHoveredIndex(index);
  };

  return (
    <Box sx={{ width: "100%", minHeight: "100%" }}>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          // flexWrap: 'wrap',
          justifyContent: "space-between",
          flexWrap: isNonMobile ? "wrap" : "nowrap",
          flexDirection: isNonMobile ? "row" : "column",
        }}
      >
        <Box
          onClick={navigateToCreateEvent}
          sx={{
            height: "300px",
            // width: '30%',
            width: isNonMobile ? "30%" : "100%",
            marginBottom: isNonMobile ? undefined : "5%",
            border: "1px solid #cad3dd",
            borderRadius: "10px",
            display: "flex",
            gap: "5%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": {
              backgroundColor: "rgb(140, 141, 255)",
              color: "#ffffff",
              "& .MuiTypography-root, & .MuiSvgIcon-root": {
                color: "#ffffff",
              },
            },
          }}
        >
          <ControlPointIcon
            sx={{ fontSize: "40px", color: "rgb(140, 141, 255)" }}
          />
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "17px",
              lineHeight: "22px",
              fontFamily: "Poppins",
              color: "#101a34",
            }}
          >
            Create a new Event
          </Typography>
        </Box>

        {eventslist.map((singleEvent, index) => (
          <Box
            key={index}
            onClick={() => navigateToSingleEventPage(singleEvent.eventId)}
            onMouseEnter={() => handleBoxHover(index)}
            onMouseLeave={() => handleBoxHover(null)}
            sx={{
              position: "relative",
              height: "300px",
              // width: '30%',
              width: isNonMobile ? "30%" : "100%",
              border: "1px solid #cad3dd",
              borderRadius: "10px",
              display: "flex",
              marginBottom: "5%",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                backgroundColor: "rgb(140, 141, 255)",
                color: "#ffffff",
                "& .MuiTypography-root, & .MuiSvgIcon-root": {
                  color: "#ffffff",
                },
              },
            }}
          >
            <div
              style={{
                overflow: "hidden",
                width: "100%",
                height: "65%",
                backgroundImage: `url(${singleEvent.eventImage})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            ></div>

            <Box
              padding="0% 5%"
              width="100%"
              height="35%"
              display="flex"
              flexDirection="column"
              gap="20%"
              alignItems="left"
              justifyContent="center"
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "15px",
                  lineHeight: "20px",
                  fontFamily: "Poppins",
                  color: "#101a34",
                }}
              >
                {singleEvent.eventName}
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box display="flex" alignItems="center" gap="5px">
                  <CurrencyRupeeIcon
                    sx={{ fontSize: "20px", color: "#d3133b" }}
                  />
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "17px",
                      lineHeight: "22px",
                      fontFamily: "Poppins",
                      color: "#d3133b",
                    }}
                  >
                    {singleEvent.totalAmount}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="5px">
                  <CardGiftcardIcon
                    sx={{ fontSize: "20px", color: "#d3133b" }}
                  />
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "17px",
                      lineHeight: "22px",
                      fontFamily: "Poppins",
                      color: "#d3133b",
                    }}
                  >
                    {singleEvent.totalGift}
                  </Typography>
                </Box>
              </Box>
            </Box>
            {hoveredIndex === index && (
              <EditIcon
                onClick={(event) => handleEditEvent(singleEvent.eventId, event)}
                sx={{
                  fontSize: "30px",
                  position: "absolute",
                  top: "10%",
                  left: "90%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 1,
                  backgroundColor: "red",
                  padding: "5px",
                  borderRadius: "50%",
                }}
              />
            )}
          </Box>
        ))}
      </Box>
      {/* {editModalOpen ? (
        <NewEditEvent
          // eventName={singleEvent.name}
          eventId={selectedRowId}
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
        />
      ) : (
        <></>
      )} */}
    </Box>
  );
}
