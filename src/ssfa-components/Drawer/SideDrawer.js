import React from 'react';
import { List, Drawer, IconButton } from '@mui/material';

import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

import DrawerList from "components/Drawer/DrawerList";
import useWindowDimensions from 'components/utils/useWindowDimensions';


export default function SideDrawer({ lists }) {
  const dimensions = useWindowDimensions()
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <IconButton
        color="primary"
        // variant="contained"
        size="large"
        onClick={() => setOpen(!open)}
        sx={{
          position: 'fixed',
          bottom: "1rem",
          left: "1rem",
          zIndex: 1,
          backgroundColor: theme => theme.palette.secondary.main,
        }}
      >
        <SubdirectoryArrowRightIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: theme => theme.palette.secondary.main,
            color: theme => theme.palette.secondary.contrastText,
            width: dimensions[0] * 0.4,
          }
        }}
      >
        <List>
          {lists.map((content, idx) => (
            <DrawerList key={idx} content={content} />
          ))}
        </List>
      </Drawer >
    </>
  )
}