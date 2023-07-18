import React from "react";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { tokens } from "../../theme";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import StatBox1 from "../../components/StatBox/StatBox1";
import StatBox2 from "../../components/StatBox/StatBox2";
import StatBox3 from "../../components/StatBox/StatBox3";

export default function DashboardRows() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <div>
      <Box
        width="100%"
        m="20px 0px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        justifyContent="space-between"
        gridAutoRows="90px"
        gap="20px"
        border="1px solid red"
        sx={
          {
            //   "& > div": { gridColumn: isNonMobile ? undefined : "span 12" },
          }
        }
      >
        <Box
          //   onClick={navigateToEvents}
          gridColumn="span 4"
          backgroundColor="#fff"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="10px"
        >
          <StatBox1
            // title1={eventsList.length}
            subtitle1="Events"
            icon1={
              <AllInboxIcon
                sx={{ color: "rgb(140, 141, 255)", fontSize: "24px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor="#fff"
          display="flex"
          alignItems="center"
          justifyContent="center"
          // paddingTop="30px"
          borderRadius="10px"
        >
          <StatBox2
            // title2={`₹ ${totalAmount}`}
            // subtitle1={`Maximum Amount - ₹ ${maxAmount.amount}`}
            subtitle1="Amount"
            // progress="0.75"
            // increase="+14%"
            icon2={
              <CurrencyRupeeIcon
                sx={{ color: "rgb(255, 198, 117)", fontSize: "24px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 4"
          backgroundColor="#fff"
          display="flex"
          alignItems="center"
          justifyContent="center"
          // paddingTop="30px"
          borderRadius="10px"
        >
          <StatBox3
            // title3={`${totalGift}`}
            // subtitle1={`Total Amount - ₹ ${allTotalAmount}`}
            subtitle1="Gifts"
            icon3={
              <CardGiftcardIcon
                sx={{ color: "rgb(36, 153, 239)", fontSize: "24px" }}
              />
            }
          />
        </Box>
        {/* ROW 2 */}
        {/* <Box
          gridColumn="span 6"
          gridRow="span 3"
          backgroundColor="#fff"
          //    overflow="auto"
          borderRadius="10px"
        >
          <Box display="flex" flexDirection="column" padding="10px">
            {!showSearch ? (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                padding="10px"
              >
                <Typography
                  variant="h5"
                  fontWeight="600"
                  sx={{ color: "rgba(39, 206, 136)" }}
                >
                  Search by Name
                </Typography>
                <IconButton
                  sx={{ backgroundColor: "rgba(39, 206, 136, 0.2)" }}
                  onClick={handleSearchClick}
                >
                  <SearchIcon sx={{ color: "rgba(39, 206, 136)" }} />
                </IconButton>
              </Box>
            ) : (
              <TextField
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Search by Name"
              />
            )}
            <NewSearchTable
              searchResult={searchResult}
              eventsList={eventsList}
              width="100%"
            />
          </Box>
        </Box> */}

        {/* <Box
          gridColumn="span 6"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        
          borderRadius="10px"
          padding="25px 15px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ color: "rgb(140, 141, 255)", paddingBottom: 2 }}
          >
            Total of All Events
          </Typography>
          <NewEventsTable eventsList={eventsList} />
        </Box> */}

        {/* <Box
        //   onClick={navigateToEvents}
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          borderRadius="10px"
        >
          <Box
            mt="25px"
            // p="0 30px"
            paddingLeft="30px"
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color="rgba(54, 162, 235)"
              >
                Events Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="500"
                color="rgba(255, 159, 64)"
              >
                {`₹ ${totalAmount}`}
              </Typography>
            </Box>
        
          </Box>
          <Box height="250px" sx={{ padding: 3, width: "100%" }}>
      
            <NewBar eventsList={eventsList} />
          </Box>
        </Box> */}

        {/* <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
         
          borderRadius="10px"
        >
          <Box display="flex" flexDirection="column" padding="10px">
            {!filterSearch ? (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                padding="10px"
              >
                <Typography
                  variant="h5"
                  fontWeight="600"
                  sx={{ color: "rgba(255, 49, 111)" }}
                >
                  Filter by Amount
                </Typography>
                <IconButton
                  sx={{ backgroundColor: "rgba(255, 49, 111, 0.2)" }}
                  onClick={handleFilterClick}
                >
                  <SortIcon sx={{ color: "rgba(255, 49, 111)" }} />
                </IconButton>
              </Box>
            ) : (
              <TextField
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Filter by Amount"
              />
            )}

            <NewFilterTable
              filteredEntries={filteredEntries}
              eventsList={eventsList}
            />
          </Box>
        </Box> */}
      </Box>
    </div>
  );
}
