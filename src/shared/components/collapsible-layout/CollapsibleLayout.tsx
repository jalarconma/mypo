import styles from './CollapsibleLayout.module.scss';

import React from 'react';


const CollapsibleLayout = ({ children }) => {
  
  return (
    <div className={styles['collapsible-layout']}>
      { children }
    </div>
  );

}

export default CollapsibleLayout;