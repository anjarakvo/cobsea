import React from "react";
import {
  Button, Typography,
  Popper,
  ClickAwayListener,
  Box,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const DataExtends = ({ anchorEl, open, setOpen, dataOptions }) => {
  const location = useLocation()

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Popper
        anchorEl={anchorEl}
        open={open}
      >
        <Box
          sx={{
            backgroundColor: theme => theme.palette.secondary.main,
            marginTop: "1rem"
          }}
        >
          {dataOptions.map((list, idx) => (
            <Button
              key={idx}
              color="quaternary"
              component={RouterLink}
              to={list.route}
              sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                display: "block",
                color: "white",
              }}
              variant={list.route === location.pathname ? "contained" : "text"}
            >
              {list.text}
            </Button>
          ))}
        </Box>
      </Popper>
    </ClickAwayListener>
  )
}

export default function NavBarNormal({ lists, dataOptions }) {
  const location = useLocation()
  const dataRef = React.useRef()
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <img
        src="https://github.com/Marine-Litter-Research-Inventory/image/blob/main/logos/Dugong%203.png?raw=true"
        alt="Site logo"
        width={50}
        style={{
          borderRadius: '30%',
          marginRight: '1rem',
        }}
      />
      <Typography
        variant='body1'
        component='h1'
        color='inherit'
        style={{
          flexGrow: 1,
          fontWeight: 'bold',
        }}
      >
        Marine Plastic
        <br />
        Research Inventory (Beta)
      </Typography>
      {lists.map((list, idx) => (
        list.route === "/data" ?
          <React.Fragment key={idx}>
            <Button
              ref={dataRef}
              color="quaternary"
              component={RouterLink}
              to={list.route}
              sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: list.route === location.pathname ? "white" : "black",
              }}
              variant={list.route === location.pathname ? "contained" : "text"}
              onMouseEnter={() => setOpen(true)}
            >
              {list.text}
            </Button>
            <DataExtends
              anchorEl={dataRef.current}
              open={open}
              setOpen={setOpen}
              dataOptions={dataOptions}
            />
          </React.Fragment>
          :
          <Button
            key={idx}
            color="quaternary"
            component={RouterLink}
            to={list.route}
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: list.route === location.pathname ? "white" : "black",
            }}
            variant={list.route === location.pathname ? "contained" : "text"}
          >
            {list.text}
          </Button>
      ))
      }
    </>
  )
}