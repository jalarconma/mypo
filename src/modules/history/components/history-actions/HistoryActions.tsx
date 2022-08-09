import styles from './HistoryActions.module.scss';

import React, { useState } from "react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Collapse from '@mui/material/Collapse';
import SortIcon from '@mui/icons-material/Sort';
import CancelIcon from '@mui/icons-material/Cancel';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import HistoryActionFilter from '../history-action-filter/HistoryActionFilter';

const HistoryActions = () => {

  const [ showSorts, setShowSorts ] = useState<boolean>(false);
  const [ showFilters, setShowFilters ] = useState<boolean>(false);

  const toggleshowSortsHandler = () => {
    setShowFilters(false);
    setShowSorts(prev => !prev);
  }

  const toggleshowFiltersHandler = () => {
    setShowSorts(false);
    setShowFilters(prev => !prev);
  }
  
  return (
    <div className={styles['history-page_actions']}>
      <Stack direction="row-reverse" spacing={2}>
        <Button className={styles['action-button']} variant="outlined" startIcon={showSorts ? <CancelIcon /> : <SortIcon />} onClick={toggleshowSortsHandler}>
          {showSorts ? 'Close' : 'Sort'}
        </Button>
        <Button className={styles['action-button']} variant="outlined" startIcon={showFilters ? <CancelIcon /> : <AutoAwesomeMotionIcon />} onClick={toggleshowFiltersHandler}>
          {showFilters ? 'Close' : 'Filter'}
        </Button>
      </Stack>
      <Collapse in={showSorts}><h1>HERE THE SORTS</h1></Collapse>
      <Collapse in={showFilters}><HistoryActionFilter /></Collapse>
    </div>
  );
}

export default HistoryActions;