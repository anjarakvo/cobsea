import {
  Container, Typography, Tooltip
  // List, ListItem, Hidden, Grid
} from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useSelector } from 'react-redux';
import WaveUpper from "components/StyledComponents/WaveUpper";


const Wrapper = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  minHeight: 180,
}))

const TextWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}))

export default function Footer() {
  const { lastUpdated } = useSelector(state => state.rootData);

  return (
    <div style={{ width: '100%' }}>
      <WaveUpper />
      <Wrapper>
        <Container maxWidth='md'>
          <div style={{ height: 120 }} />
          <TextWrapper>
            <Tooltip
              title={<> Information is correct as of<br /> {lastUpdated.toString()}</>}
              placement="top-end"
              arrow
            >
              <InfoOutlinedIcon
                color="tertiary"
                fontSize="medium"
                style={{ marginRight: 10 }}
              />
            </Tooltip>
            <Typography
              variant="subtitle2"
              component="span"
            >
              We welcome any feedback. Feel free to send us a message via the Feedback tab.
            </Typography>
          </TextWrapper>
        </Container>
      </Wrapper >
    </div >
  )
}