import {
  Box,
  Typography,
  useTheme,
  Button,
  useMediaQuery,
} from "@mui/material";
import { tokens } from "../../theme";
import { useState, useEffect, createContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Avatar from "react-avatar";
import { Delete } from "@mui/icons-material";
import CreateEntry from "./CreateEntry";
import EditEntry from "./EditEntry";
import DeleteEntry from "./DeleteEntry";

export const RefreshContext = createContext({
  updateRefreshCount: () => {},
});
const EntriesPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
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

  const [refreshCount, setRefreshCount] = useState(0);

  const updateRefreshCount = () => {
    setRefreshCount(refreshCount + 1);
  };

  function refreshPage() {
    updateRefreshCount();
  }
  const createEntry = () => {
    setCreateModalOpen(true);
  };
  const handleDeleteEntry = (e, entryId) => {
    e.stopPropagation();
    setDeleteModalOpen(true);
    setSelectedRowId(entryId);
  };

  const handleEditEntry = (entryId) => {
    setEditModalOpen(true);
    setSelectedRowId(entryId);
  };

  const navigateToEventsPage = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/events/single/${eventId}`)
      .then((response) => {
        // console.log(response);

        console.log("Totals : " + JSON.stringify(response.data));
        // setProfileId(response.data.profileId);
        navigate(`/events?profile=${response.data.profileId}`);
      });
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
  }, [refreshCount]);

  return (
    // <RefreshContext.Provider value={{ updateRefreshCount }}>
    <Box m="20px" width="100%" height="100%">
      <Box
        width="100%"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        justifyContent="space-between"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 12" },
        }}
      >
        {entries.length > 0 && (
          <>
            {entries.map((entry, index) => (
              <Box
                gridColumn="span 6"
                key={index}
                onClick={() => handleEditEntry(entry.entryId)}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap="20px"
                padding="2%"
                borderRadius="10px"
                sx={{ backgroundColor: "#48cae4" }}
              >
                <Box
                  display="flex"
                  gap="10%"
                  onClick={() => handleEditEntry(entry.entryId)}
                >
                  <Avatar
                    name={entry.personName}
                    size="40"
                    round={true}
                    maxInitials="1"
                  />

                  <Box
                    display="flex"
                    flexDirection="column"
                    gap="2%"
                    alignItems="flex-start"
                  >
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ color: "#023e8a", fontWeight: 600 }}
                      textTransform="capitalize"
                    >
                      {entry.personName}
                    </Typography>
                    <Typography
                      variant="h6"
                      textTransform="capitalize"
                      sx={{ color: colors.grey[100] }}
                    >
                      {entry.city}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  display="flex"
                  alignItems="center"
                  onClick={() => handleEditEntry(entry.entryId)}
                >
                  {entry.presentType === "amount" ? (
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#023e8a",
                        fontWeight: 600,
                        textAlign: "right",
                      }}
                    >
                      ₹ {entry.amount}
                    </Typography>
                  ) : (
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#023e8a",
                        fontWeight: 600,
                        textAlign: "right",
                      }}
                    >
                      {entry.gift}
                    </Typography>
                  )}

                  <Box>
                    {/* <EditOrDelete entryId={entry.entryId} /> */}
                    <Button
                      style={{ color: "#fff" }}
                      onClick={(e) => handleDeleteEntry(e, entry.entryId)}
                    >
                      {" "}
                      <Delete />
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}
          </>
        )}
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
        <EditEntry
          entryId={selectedRowId}
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
        />
      ) : (
        <></>
      )}
      {deleteModalOpen ? (
        <DeleteEntry
          entryId={selectedRowId}
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
        />
      ) : (
        <></>
      )}
    </Box>
    // </RefreshContext.Provider>
  );
};

export default EntriesPage;
