import React from 'react';
import { styled } from "@mui/system";
import { Typography } from '@mui/material';

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  padding: `60px 20px`,
  boxSizing: 'border-box',
  textAlign: 'center',
}))

export default function Header({ children, ...props }) {
  return (
    <StyledTypography {...props}>
      {children}
    </StyledTypography>
  )
}