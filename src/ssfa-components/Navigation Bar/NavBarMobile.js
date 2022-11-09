import React, { useState } from "react";
import {
  IconButton, Drawer, Typography,
  List, ListItemText, ListItem,
  Collapse
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { ListItemButton } from '@mui/material';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const Collapsible = ({ title, dataOptions }) => {
  const location = useLocation()
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <ListItem
        disablePadding
        sx={{
          backgroundColor: theme => (location.pathname === "/data" ? theme.palette.quaternary.main : "inherit"),
          "&:hover": {
            backgroundColor: theme => (location.pathname === "/data" ? theme.palette.quaternary.main : "inherit")
          }
        }}
      >
        <IconButton onClick={() => setOpen(!open)}>
          {
            open ?
              <ArrowDropUpIcon
                fontSize="large"
                sx={{ color: theme => theme.palette.secondary.main }}
              />
              :
              <ArrowDropDownIcon
                fontSize="large"
                sx={{ color: theme => theme.palette.secondary.main }}
              />
          }
        </IconButton>
        <ListItemButton
          component={RouterLink}
          to="/data"
          sx={{
            paddingLeft: "5rem",
          }}
        >
          <ListItemText primary={title} />
        </ListItemButton>
      </ListItem>
      <Collapse in={open}>
        <List
          sx={{
            color: theme => theme.palette.secondary.contrastText,
            backgroundColor: theme => theme.palette.secondary.main
          }}
        >
          {dataOptions.map((option, idx) => (
            <ListItemButton
              key={idx}
              color="secondary"
              component={RouterLink}
              to={option.route}
              sx={{
                textAlign: 'center',
                backgroundColor: theme => (location.pathname === option.route ? theme.palette.quaternary.main : "inherit"),
                "&:hover": {
                  backgroundColor: theme => (location.pathname === option.route ? theme.palette.quaternary.main : "inherit")
                }
              }}
            >
              <ListItemText primary={option.text} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  )
}

const CustomizedItem = ({ route, text }) => {
  const location = useLocation()

  return (
    <ListItemButton
      component={RouterLink}
      alignItems="center"
      to={route}
      sx={{
        justifyContent: 'center',
        backgroundColor: theme => (location.pathname === route ? theme.palette.quaternary.main : "inherit"),
        "&:hover": {
          backgroundColor: theme => (location.pathname === route ? theme.palette.quaternary.main : "inherit")
        }
      }}
    >
      {text}
    </ListItemButton>
  )
}

export default function NavBarMobile({ lists, dataOptions }) {
  const [state, setState] = useState(false)

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={() => setState(true)}
      >
        <MenuIcon />
      </IconButton>
      <div id='spacer' style={{ width: 10 }} />
      <Typography align="center" style={{ flexGrow: 1, fontWeight: 'bold' }}>
        Marine Plastic Research Inventory (Beta)
      </Typography>
      <img
        src="https://github.com/Marine-Litter-Research-Inventory/image/blob/main/logos/Dugong%203.png?raw=true"
        alt="Site logo"
        width={40}
        style={{
          borderRadius: '30%',
          margin: '0 auto',
        }}
      />
      <Drawer
        anchor='top'
        open={state}
        onClose={() => setState(false)}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: theme => theme.palette.primary.main
          }
        }}
      >
        {lists.map((list, index) => (
          list.route !== "/data" ?
            <CustomizedItem
              key={index}
              text={list.text}
              route={list.route}
            />
            :
            <Collapsible
              key={index}
              title={list.text}
              dataOptions={dataOptions}
            />
        ))}
      </Drawer>
    </>
  )
}