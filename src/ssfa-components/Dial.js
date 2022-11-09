import React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ForwardIcon from '@mui/icons-material/Forward';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Dial({ sections }) {
  const [openDial, setOpenDial] = React.useState(false)
  const handleOpenDial = () => setOpenDial(true)
  const handleCloseDial = () => setOpenDial(false)

  const handleActionClick = (action) => {
    switch (action) {
      case "top":
        window.scroll({
          top: 0,
          behavior: "smooth"
        })
        break;
      default:
        const element = document.getElementById(action)
        window.scroll({
          top: window.pageYOffset + element.getBoundingClientRect().top - 100,
          behavior: "smooth"
        })
        break;
    }
  }

  return (
    <Box>
      <SpeedDial
        ariaLabel="Dial"
        icon={<SpeedDialIcon />}
        direction="up"
        onClose={handleCloseDial}
        onOpen={handleOpenDial}
        open={openDial}
        sx={{
          position: 'fixed',
          bottom: "1rem",
          left: "1rem",
          "& .MuiSpeedDial-fab,.MuiSpeedDial-fab:hover": {
            color: "white",
            backgroundColor: theme => theme.palette.secondary.main,
          }
        }}
      >
        {sections.map((section) => (
          <SpeedDialAction
            key={section}
            icon={<ForwardIcon />}
            tooltipTitle={section.replace(/ /g, "\xa0")}
            tooltipPlacement="right"
            tooltipOpen
            onClick={() => handleActionClick(section)}
            sx={{
              "& .MuiSpeedDialAction-fab": {
                backgroundColor: theme => theme.palette.quaternary.main,
              },
              "& .MuiSpeedDialAction-staticTooltipLabel": {
                backgroundColor: theme => theme.palette.primary.main,
              }
            }}
          />
        ))}
        <SpeedDialAction
          key={"top"}
          icon={<KeyboardArrowUpIcon />}
          tooltipTitle="Top"
          tooltipPlacement="right"
          tooltipOpen
          onClick={() => handleActionClick("top")}
          sx={{
            "& .MuiSpeedDialAction-fab": {
              backgroundColor: theme => theme.palette.quaternary.main,
            },
            "& .MuiSpeedDialAction-staticTooltipLabel": {
              backgroundColor: theme => theme.palette.primary.main,
            }
          }}
        />
      </SpeedDial>
    </Box>
  )
}