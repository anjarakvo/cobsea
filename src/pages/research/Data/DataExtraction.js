import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Highlighter from "react-highlight-words";
import {
  Container,
  Paper,
  Box,
  Link,
  Typography,
  Button,
  TextField,
  IconButton,
  Grid,
  Hidden,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import {
  setDataRows,
  setSearchDisplay,
  setSearchKeywords,
  setColumnOrder,
  setColumnOrderLong,
} from "ssfa-store/slice/dataExtraction";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Item, SortableItem } from "ssfa-components/DnD/SortableItem";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import LinkIcon from "@mui/icons-material/Link";

import Header from "ssfa-components/StyledComponents/Header";
import Body from "ssfa-components/StyledComponents/Body";
import CustomDataInstruction from "ssfa-components/Table/CustomDataInstruction";
import SubNav from "./subnav";

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

const QuickSearchToolbar = (props) => {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
        justifyContent: "space-between",
        display: "flex",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "#436F79",
      }}
    >
      <div>
        <GridToolbarColumnsButton sx={{ color: "#fff" }} />
        <GridToolbarFilterButton sx={{ color: "#fff" }} />
        <GridToolbarExport sx={{ color: "#fff" }} />
      </div>
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        // color="quaternary"
        className="grid-search-input"
        InputProps={{
          startAdornment: (
            <SearchIcon
              fontSize="small"
              color="quaternary"
              onClick={props.onClick}
            />
          ),
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? "visible" : "hidden" }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          width: {
            xs: 1,
            sm: "auto",
          },
          m: (theme) => theme.spacing(1, 0.5, 1.5),
          "& .MuiSvgIcon-root": {
            mr: 0.5,
          },
          "& .MuiInput-underline:hover": {
            color: (theme) => theme.palette.quaternary.main,
          },
        }}
      />
    </Box>
  );
};

const CustomCell = (props) => {
  // console.log(props)
  const Wrapper = ({ children }) => {
    return (
      <div
        style={{
          width: props.width - 20,
          padding: 10,
          alignItems: "center",
          // justifyContent: 'center',
          display: "flex",
          textAlign: "left",
          borderBottom: "1px solid",
        }}
      >
        {children}
      </div>
    );
  };

  const CustomLink = ({ href }) => {
    return (
      <Wrapper>
        <Link href={href} target="_blank" rel="noreferrer noopener">
          <LinkIcon color="secondary" />
        </Link>
      </Wrapper>
    );
  };

  const Default = ({ searchKeywords, textToHighlight }) => {
    return (
      <Wrapper>
        <Highlighter
          searchWords={searchKeywords}
          autoEscape={true}
          textToHighlight={textToHighlight ?? ""}
          highlightStyle={{ backgroundColor: "#c8a464" }}
        />
      </Wrapper>
    );
  };

  switch (props.field) {
    case "link":
      return <CustomLink href={props.value} />;
    case "id":
      return <Wrapper>{props.value}</Wrapper>;
    default:
      return (
        <Default
          searchKeywords={props.searchKeywords}
          textToHighlight={props.value}
        />
      );
  }
};

const ColumnOrganizer = (props) => {
  const { columnOrder, columnOrderLong, columnHeaders } = useSelector(
    (state) => state.dataExtraction
  );
  const dispatch = useDispatch();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  function handleDragEnd({ active, over }) {
    if (active.id !== over.id) {
      const oldIndex = columnOrder.indexOf(active.id);
      const newIndex = columnOrder.indexOf(over.id);
      dispatch(setColumnOrder(arrayMove(columnOrder, oldIndex, newIndex)));
      dispatch(
        setColumnOrderLong(arrayMove(columnOrderLong, oldIndex, newIndex))
      );
    }
  }

  function handleReset() {
    dispatch(setColumnOrder(columnHeaders.map((col) => col.headerName)));
    dispatch(setColumnOrderLong(columnHeaders));
  }

  return (
    <Paper
      sx={{
        height: 1000,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ECF2F8",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#EBF2F8",
          color: "#00405F",
          textAlign: "center",
          padding: 2,
          marginBottom: 1,
        }}
      >
        <Typography>Drag and drop columns to reorder them.</Typography>
        <br />
        <Button variant="contained" size="small" onClick={handleReset}>
          Reset order
        </Button>
      </Box>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={columnOrder}
          strategy={verticalListSortingStrategy}
        >
          {columnOrder.map((title, idx) => (
            <SortableItem
              key={columnOrder[idx]}
              index={idx}
              data={columnOrder}
            />
          ))}
        </SortableContext>
        <DragOverlay>
          <Item />
        </DragOverlay>
      </DndContext>
    </Paper>
  );
};

// Main program start here
export default function DataExtraction() {
  const dispatch = useDispatch();
  const {
    columnOrderLong,
    columnHeaders,
    data,
    dataRows,
    searchKeywords,
    searchDisplay,
  } = useSelector((state) => state.dataExtraction);

  const requestSearch = (searchValue) => {
    dispatch(setSearchKeywords(searchValue));
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = data.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field]);
      });
    });
    dispatch(setDataRows(filteredRows));
  };

  return (
    <div>
      <SubNav />
      <Container>
        <Body variant="body1">
          <CustomDataInstruction />
        </Body>
        <Grid container spacing={2}>
          <Hidden smDown>
            <Grid item sm={2}>
              <ColumnOrganizer></ColumnOrganizer>
            </Grid>
          </Hidden>
          <Grid item xs={12} sm={10}>
            <Paper elevation={1} style={{ height: 1000, marginBottom: "4rem" }}>
              <DataGrid
                rows={dataRows}
                columns={columnOrderLong.map((col) => ({
                  ...col,
                  valueFormatter: ({ value }) =>
                    value?.toString().replace(/\n/g, ""),
                }))}
                density="comfortable"
                rowHeight={120}
                columnBuffer={20}
                components={{
                  Cell: CustomCell,
                  Toolbar: QuickSearchToolbar,
                  // ColumnsPanel: CustomPanel,
                }}
                componentsProps={{
                  cell: {
                    columnHeaders,
                    searchKeywords,
                  },
                  toolbar: {
                    value: searchDisplay,
                    onClick: () => requestSearch(searchDisplay),
                    onChange: (event) =>
                      dispatch(setSearchDisplay(event.target.value)),
                    clearSearch: () => {
                      dispatch(setSearchDisplay(""));
                      requestSearch("");
                    },
                  },
                }}
                sx={{
                  "& .MuiDataGrid-row": {
                    maxHeight: "unset !important",
                  },
                  "& .MuiDataGrid-columnHeader": (theme) => ({
                    backgroundColor: theme.palette.primary.main,
                  }),
                  "& .MuiDataGrid-iconSeparator": (theme) => ({
                    color: "#9c4a55",
                  }),
                  "& .MuiDataGrid-virtualScrollerContent": {
                    overflow: "unset",
                  },
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
