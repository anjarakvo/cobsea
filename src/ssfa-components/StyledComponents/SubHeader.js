import React from 'react';
import { styled } from "@mui/system";
import { Typography } from '@mui/material';

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginLeft: 20,
  marginTop: 20,
}))

export default function SubHeader({ children, ...props }) {
  return (
    <StyledTypography {...props}>
      {children}
    </StyledTypography>
  )
}