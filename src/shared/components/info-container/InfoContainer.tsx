import styles from './InfoContainer.module.scss';

import React from "react";

import Paper from "@mui/material/Paper";

const InfoContainer = ({ title = '', children }) => {
  return (
    <Paper elevation={4} className={styles['info-container']}>
      {!!title ?
        (<>
          <span className={styles['info-container_title']}>{title}</span>
          <hr className={styles['info-container_title-separator']} />
        </>) : null
      }
      {children}
    </Paper>
  );
}

export default InfoContainer;