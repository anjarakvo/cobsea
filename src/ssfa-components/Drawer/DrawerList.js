import React from 'react';
import { List, ListItem, IconButton, ListItemText, ListItemButton, Collapse } from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

function handleClick(action) {
  const element = document.getElementById(action)
  window.scroll({
    top: window.pageYOffset + element.getBoundingClientRect().top - 100,
    behavior: "smooth"
  })
}


export default function DrawerList({ content }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <ListItem key={content.title} disablePadding>
        <IconButton
          onClick={() => setOpen(!open)}
        >
          {
            open ?
              <ArrowDropUpIcon sx={{ color: theme => theme.palette.secondary.contrastText }} />
              :
              <ArrowDropDownIcon sx={{ color: theme => theme.palette.secondary.contrastText }} />
          }
        </IconButton>
        <ListItemButton
          onClick={() => handleClick(content.title)}
        >
          <ListItemText primary={content.title} />
        </ListItemButton>
      </ListItem>
      <Collapse in={open}>
        <List>
          {content.charts.map((chart, idx) => (
            <ListItemButton
              key={idx}
              onClick={() => handleClick(chart.title)}
            >
              <ListItemText primary={chart.title} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  )
}