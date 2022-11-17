import React, { useState } from 'react';
import { SwipeableDrawer } from '@mui/material';
import { styled } from '@mui/system';

import ExperimentalChart from 'components/Chart/OldChart/ExperimentalChart';
import WordCloudChart from 'components/Chart/WordCloud';
// import DonutChart from 'components/Chart/DonutChart';

import CustomizedDrawer from 'components/CustomizedDrawer';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

const pullerHeight = 80
const pullerWidth = 30

const lists = [
  {
    icon: 0,
    text: 'Field Sampling Compartment',
    // secondaryText: 'per Territories/Location studied'
  },
  {
    icon: 0,
    text: 'Plastic Sizes Examined',
    // secondaryText: 'per Territories/Location studied'
  },
  {
    icon: 0,
    text: 'Water Body_General',
    // secondaryText: 'per Territories/Location studied'
  },
  {
    icon: 0,
    text: 'Country of Research',
    // secondaryText: 'per Territories/Location studied'
  },
  {
    icon: 2,
    text: 'Author Contribution Word Cloud',
    secondaryText: 'per Country'
  }
]

const Puller = styled('div')({
  top: `calc(${window.innerHeight}px / 2 - ${pullerHeight}px)`,
  height: pullerHeight,
  width: pullerWidth,
  right: -pullerWidth,
  backgroundColor: 'royalblue',
  position: 'absolute',
  visibility: 'visible',
  borderTopRightRadius: '1rem',
  borderBottomRightRadius: '1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
})


export default function Data() {
  const [isOpen, setIsOpen] = useState(false)
  const [graph, setGraph] = useState(0)
  // const [graph] = useState(0)
  const charts = [
    <ExperimentalChart
      key={0}
      filterLabel="Filter by Field Sampling_Compartment"
      filterValue="Field Sampling_Compartment"
      inclusive={["biota"]}
      targetList={["Water Body_General", "Fishing Gear Examined", "Plastic Sizes Examined"]}
      countLabel="Count by"
    />,
    <ExperimentalChart
      key={1}
      filterLabel="Filter by Plastic Sizes Examined"
      filterValue="Plastic Sizes Examined"
      inclusive={[]}
      targetList={["Adopted GESAMP Size"]}
      countLabel="Count by"
    />,
    <ExperimentalChart
      key={2}
      filterLabel="Filter by Water Body_General"
      filterValue="Water Body_General"
      inclusive={[]}
      targetList={["Field Sampling_Compartment", "Fishing Gear Examined", "Plastic Sizes Examined"]}
      countLabel="Count by"
    />,
    <ExperimentalChart
      key={3}
      filterLabel="Filter by Country of Research"
      filterValue="Country of Research"
      inclusive={[]}
      targetList={["Fishing Gear Examined", "Plastic Sizes Examined"]}
      countLabel="Count by"
    />,
    <WordCloudChart />,
  ]

  const DrawerComponent = () => {
    return (
      <SwipeableDrawer
        anchor="left"
        // variant='persistent'
        open={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        disableSwipeToOpen
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            overflow: 'visible',
          }
        }}
      >
        <Puller
          onClick={() => setIsOpen(false)}
          sx={{
            visibility: isOpen ? 'visible' : 'hidden',
          }}
        >
          <ArrowLeftIcon fontSize='large' />
        </Puller>
        <CustomizedDrawer lists={lists} onClick={setGraph} pos={graph} />
      </SwipeableDrawer>
    )
  }

  return (
    <div>
      <Puller
        onClick={() => setIsOpen(true)}
        sx={{
          left: 0,
          zIndex: 9999,
          visibility: isOpen ? 'hidden' : 'visible',
          position: 'sticky',
        }}
      >
        <ArrowRightIcon fontSize='large' />
      </Puller>
      <DrawerComponent />
      {charts[graph]}
    </div >
  )
}