import styles from './LoadingSpinner.module.scss';

import React from "react";

import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box";

const LoadingSpinner = () => {
  return (
    <Box className={styles["loading-spinner"]}>
      <CircularProgress />
    </Box>
  );
}

export default LoadingSpinner;