import styles from './InfoContainer.module.scss';

import React from "react";

import Paper from "@mui/material/Paper";

const InfoContainer = ({ children }) => {
  return (
    <Paper elevation={4} className={styles['info-container']}>
      { children }
    </Paper>
  );
}

export default InfoContainer;