import * as React from "react";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useMediaQuery } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import DeleteEvent from "./DeleteEvent";

// import { RefreshContext } from "./index";

export default function EditEvent({ open, onClose, eventId, eventName }) {
  console.log("eventId recd in NeweditEvent :" + eventId);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const [eventType, setEventType] = useState("");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedRowId, setSelectedRowId] = React.useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  // const navigate = useNavigate();

  // const [searchParam] = useSearchParams();
  // const eventId = searchParam.get("event");
  //   const [refreshCount, setRefreshCount] = useState(0);
  //   const { updateRefreshCount } = useContext(RefreshContext);
  // const updateRefreshCount = () => {
  //   setRefreshCount(refreshCount + 1);
  // };
  //   const { updateRefreshCount = () => {} } = useContext(RefreshContext);
  function refreshPage() {
    // updateRefreshCount();
  }

  const handleEditSave = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/events/edit/${eventId}`, {
        eventType: eventType,
        name: name,
        place: place,
        date: date,
      })
      .then((response) => {
        console.log("Updated Event : " + JSON.stringify(response));
      });
    onClose();
    // refreshPage();
  };

  const handleDeleteEvent = (eventId) => {
    setAnchorEl(null);
    setDeleteModalOpen(true);
    setSelectedRowId(eventId);
  };

  const getSelectedEvent = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/events/single/${eventId}`)
      .then((response) => {
        // console.log(response);

        console.log("Totals : " + JSON.stringify(response.data));
        setEventType(response.data.eventType);
        setName(response.data.name);
        setPlace(response.data.place);
        setDate(response.data.date);
      });
  };
  useEffect(() => {
    getSelectedEvent();
  }, []);
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{ sx: { backgroundColor: "#fff", color: "#121212" } }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: "5%",
          }}
        >
          <DialogTitle variant="h4" color="#DA344D">
            Edit
          </DialogTitle>
          <DeleteOutlineOutlined
            onClick={() => handleDeleteEvent(eventId)}
            sx={{ fontSize: 20, cursor: "pointer", color: "#DA344D" }}
          />
        </Box>
        <DialogContent>
          <form
            onSubmit={handleEditSave}
            style={{
              margin: "5% 0%",
              width: "300px",
              // width: isMobile ? "100%" : "60%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <label
                // for="eventType"
                style={{
                  fontFamily: "Poppins",
                  fontSize: "13px",
                  lineHeight: "18px",
                  color: "#101a34",
                  fontWeight: 600,
                }}
              >
                Event Type:
              </label>
              <select
                style={{
                  background: "#fff",
                  borderRadius: "7px",
                  width: "100%",
                  height: "44px",
                  padding: "8px 15px",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "20px",
                  color: "#101a34",
                  border: "1px solid #cad3dd",
                  fontFamily: "Poppins",
                }}
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
              >
                <option>Select Event Type</option>
                <option value="wedding">Wedding</option>
                <option value="birthday">Birthday</option>
                <option value="baby">Baby Shower</option>
                <option value="house">House Warming</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <label
                // for="name"
                style={{
                  fontFamily: "Poppins",
                  fontSize: "13px",
                  lineHeight: "18px",
                  color: "#101a34",
                  fontWeight: 600,
                }}
              >
                Event Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                style={{
                  background: "#fff",
                  borderRadius: "7px",
                  width: "100%",
                  height: "44px",
                  padding: "8px 15px",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "20px",
                  color: "#101a34",
                  border: "1px solid #cad3dd",
                  fontFamily: "Poppins",
                }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <label
                // for="place"
                style={{
                  fontFamily: "Poppins",
                  fontSize: "13px",
                  lineHeight: "18px",
                  color: "#101a34",
                  fontWeight: 600,
                }}
              >
                Place:
              </label>
              <input
                type="text"
                id="place"
                name="place"
                style={{
                  background: "#fff",
                  borderRadius: "7px",
                  width: "100%",
                  height: "44px",
                  padding: "8px 15px",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "20px",
                  color: "#101a34",
                  border: "1px solid #cad3dd",
                  fontFamily: "Poppins",
                }}
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <label
                // for="eventName"
                style={{
                  fontFamily: "Poppins",
                  fontSize: "13px",
                  lineHeight: "18px",
                  color: "#101a34",
                  fontWeight: 600,
                }}
              >
                Date:
              </label>
              <input
                type="date"
                id="date"
                name="date"
                style={{
                  background: "#fff",
                  borderRadius: "7px",
                  width: "100%",
                  height: "44px",
                  padding: "8px 15px",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "20px",
                  color: "#101a34",
                  border: "1px solid #cad3dd",
                  fontFamily: "Poppins",
                }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </form>
          {/* <form>
            <FormControl
              fullWidth
              sx={{
                // width: "300px",
                "& > div": { width: isNonMobile ? "300px" : "250px" },
                "& .MuiFormLabel-root": {
                  color: "#121212",
                },
                "& .MuiInputBase-root": {
                  color: "#121212",
                },
                "& .MuiMenuItem-root": {
                  backgroundColor: "#fff",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "green",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "blue",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "purple",
                },
                "& .MuiSelect-icon": {
                  color: "#121212",
                },
              }}
            >
              <InputLabel id="demo-simple-select-label">Event Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                required
                value={eventType}
                label="Event Type"
                onChange={(e) => setEventType(e.target.value)}
              >
                <MenuItem value="wedding">Wedding</MenuItem>
                <MenuItem value="birthday">Birthday</MenuItem>
                <MenuItem value="baby">Baby Shower</MenuItem>
                <MenuItem value="house">House Warming</MenuItem>
                <MenuItem value="others">Others</MenuItem>
              </Select>
            </FormControl>
            <br />
            <br />
            <TextField
              fullWidth
              sx={{
                // width: "300px",
                // margin: "5px",
                "& > div": { width: isNonMobile ? "300px" : "250px" },
                "& .MuiInputLabel-root": { color: "#121212" },
                "& .MuiInputBase-input": {
                  color: "#121212",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "green",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "blue",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "purple",
                },
              }}
              type="text"
              label="Event Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <br />
            <TextField
              fullWidth
              sx={{
                // width: "300px",
                // margin: "5px",
                "& > div": { width: isNonMobile ? "300px" : "250px" },
                "& .MuiInputLabel-root": { color: "#121212" },
                "& .MuiInputBase-input": {
                  color: "#121212",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "green",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "blue",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "purple",
                },
              }}
              type="text"
              label="Place"
              variant="outlined"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
            <br />
            <br />
            <TextField
              fullWidth
              sx={{
                // width: "300px",
                // margin: "5px",
                "& > div": { width: isNonMobile ? "300px" : "250px" },
                "& .MuiInputLabel-root": { color: "#121212" },
                "& .MuiInputBase-input": {
                  color: "#121212",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "green",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "blue",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "purple",
                },
              }}
              type="date"
              label="Date"
              variant="outlined"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <br />
            <br />
          </form> */}
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ backgroundColor: "#ff574d", fontSize: "13px" }}
            type="submit"
            color="secondary"
            variant="contained"
            onClick={onClose}
          >
            CANCEL
          </Button>
          <Button
            sx={{ backgroundColor: "#56c984", fontSize: "13px" }}
            type="submit"
            color="secondary"
            variant="contained"
            onClick={handleEditSave}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      {deleteModalOpen ? (
        <DeleteEvent
          eventName={name}
          eventId={eventId}
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
