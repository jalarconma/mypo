import React, { useRef, useState } from "react";

import styles from './MyPortafolioPage.module.scss';

import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';

import RegisterPortafolioAsset from "../components/register-portafolio-asset/RegisterPortafolioAsset";
import UserPortafolioList from "../components/user-portafolio-list/UserPortafolioList";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import Collapse from "@mui/material/Collapse";

const MyPortafolioPage = () => {
  const [showAddAsset, setShowAddAsset] = useState<boolean>(false);
  const containerRef = useRef(null);

  const toggleShowAssetHandler = () => {
    setShowAddAsset((prev) => !prev)
  }

  return (
    <div className={styles['my-portafolio-page']}>
      <h2>My Portafolio</h2>
      <Stack direction="row-reverse" className={styles['my-portafolio-page_actions']}>
        <Button variant="outlined" startIcon={showAddAsset ? <CancelIcon /> : <AddIcon />} onClick={toggleShowAssetHandler}>
          {showAddAsset ? 'Cancel' : 'Add'}
        </Button>
      </Stack>
      <Collapse in={showAddAsset}><RegisterPortafolioAsset /></Collapse>
      <UserPortafolioList />
    </div>
  )
};

export default MyPortafolioPage;