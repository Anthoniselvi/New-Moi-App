import React, { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { Button, useTheme, useMediaQuery } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { tokens } from "../../theme";
import Sidebar from "../Sidebar/Sidebar";

function Profile(props) {
  const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [searchParam] = useSearchParams();
  const profileId = searchParam.get("profile");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`${process.env.REACT_APP_BASE_URL}/profile/${profileId}`, {
        name: name,
        age: age,
        gender: gender,
        address: address,
        city: city,
        mobile: mobile,
        email: email,
      })
      .then((response) => {
        console.log("updated profile: " + JSON.stringify(response));
        alert("Profile updated successfully");
        // navigate(`/events?profile=${profileId}`);
      });
  };

  const navigateToEventsList = () => {
    navigate(`/events?profile=${profileId}`);
  };

  const getProfile = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/profile/${profileId}`)
      .then((response) => {
        // console.log(response);
        console.log("get selected Profile : " + JSON.stringify(response.data));
        // setProfiles(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setMobile(response.data.mobile);
        setAge(response.data.age);
        setAddress(response.data.address);
        setCity(response.data.city);
        setGender(response.data.gender);
      });
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="home">
      <Sidebar profileId={profileId} />
      <div className="homeContainer">
        <Box m="20px">
          {/* <div style={{margin: 20}}> */}
          <div style={{ display: "flex", alignItems: "center", gap: "3%" }}>
            <ArrowBackIcon
              onClick={navigateToEventsList}
              style={{ cursor: "pointer" }}
            />

            <div className="editprofile-image">
              <FaUserAlt className="profile-icon" style={{ fontSize: 22 }} />
            </div>
            <h1>Profile</h1>
          </div>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "column",
              gap: "20px",

              "& > div": { width: isNonMobile ? undefined : "300px" },
            }}
            className="profile-form"
          >
            <TextField
              margin="normal"
              required
              // fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              readOnly
              color="secondary"
              onChange={(e) => setName(e.target.value)}
              // error={errors.email}
            />
            {/* {errors.email && <p className="error">{errors.email}</p>} */}
            {/* /> */}
            {/* <TextField
          margin="normal"
          required
          fullWidth
          name="age"
          label="Age"
          type="age"
          id="age"
          autoComplete="age"
          focused={false}
          inputProps={{ style: { borderColor: '#FFF' } }}
          InputLabelProps={{ style: { color: '#FFF' } }}
          value={age}
          onChange={(e) => setAge(e.target.value)}

        /> */}
            {/* {errors.password && <p className="error">{errors.password}</p>} */}
            {/* /> */}

            <FormControl focused={false} color="secondary" fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="others">Others</MenuItem>
              </Select>
            </FormControl>
            {/* <TextField
          margin="normal"
          required
          fullWidth
          id="address"
          label="Address"
          name="address"
          autoComplete="address"
          autoFocus
          focused={false}
          inputProps={{ style: { borderColor: '#FFF' } }}
          InputLabelProps={{ style: { color: '#FFF' } }}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          
        /> */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="city"
              label="City"
              name="city"
              autoComplete="city"
              autoFocus
              focused={false}
              color="secondary"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              // error={errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="mobile"
              label="Mobile Number"
              name="mobile"
              autoComplete="mobile"
              autoFocus
              focused={false}
              color="secondary"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              // error={errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              readOnly
              focused={false}
              color="secondary"
              onChange={(e) => setEmail(e.target.value)}
              // error={errors.email}
            />
            <br />
            <br />
            <Button
              // onClick={navigateToEventList}
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                width: 200,
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                "& > Button": { width: isNonMobile ? undefined : "200px" },
              }}
            >
              Update
            </Button>
          </Box>
          {/* </div> */}
        </Box>
      </div>
    </div>
  );
}

export default Profile;
