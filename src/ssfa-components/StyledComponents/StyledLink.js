import React from 'react';
import { Link } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';

export default function StyledLink({ children, to }) {
  return (
    <Link
      component={RouterLink}
      to={to}
      color="secondary"
      underline="none"
      sx={{
        fontWeight: 'bold',
      }}
    >
      {children}
    </Link>
  )
}