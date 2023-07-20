import * as React from "react";
import { useState } from "react";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { Box, Typography, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchStyle.css";

export default function SearchTable({ searchResult, eventsList }) {
  const [searchName, setSearchName] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const handleSearchClick = () => {
    setIsActive((prevIsActive) => !prevIsActive);
    setShowSearch(true);
  };
  return (
    <Box padding="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight="600" color="#101a34">
          Search by Name
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          padding="10px"
          className={`search-bar-container ${isActive ? "active" : ""}`}
        >
          <img
            src="https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/magnifier-512.png"
            alt="magnifier"
            className="magnifier"
            onClick={handleSearchClick}
          />
          <input type="text" className="input" placeholder="Search ..." />
        </Box>
      </Box>
    </Box>
  );
}
