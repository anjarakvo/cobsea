import React from 'react';
import { Typography } from "@mui/material";
import { styled } from "@mui/system";

export default function HeaderRibbon({ text, color, ...props }) {

  const Ribbon = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette[color].main,
    color: theme.palette[color].contrastText,
    minHeight: 50,
    maxWidth: "70%",
    // borderRadius: "0 0.7rem 0.7rem 0",
    alignItems: "center",
    display: "flex",
    padding: "0.2rem 1rem",
  }))

  return (
    <div>
      <Ribbon>
        <Typography {...props}>{text}</Typography>
      </Ribbon>
    </div>
  )
}