import React from 'react';
import { styled } from "@mui/system";
import { Typography } from '@mui/material';

const StyledTypography = styled(Typography)(({ theme }) => ({
  margin: 'auto',
  boxSizing: 'border-box',
  padding: 20,
  marginBottom: 30,
}))

export default function Body({ children, ...props }) {
  return (
    <StyledTypography {...props}>
      {children}
    </StyledTypography>
  )
}