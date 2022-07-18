import React, { useRef, useState } from "react";

import styles from './MyPortafolioPage.module.scss';

import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";

import RegisterPortafolioAsset from "../components/register-portafolio-asset/RegisterPortafolioAsset";
import UserPortafolioList from "../components/user-portafolio-list/UserPortafolioList";
import LoadingSpinner from '../../../shared/components/loading-spinner/LoadingSpinner'
import { useUserPortafolioListService } from "../../../core/hooks/use-user-portafolio-list-service";

const MyPortafolioPage = () => {
  const [showAddAsset, setShowAddAsset] = useState<boolean>(false);
  const containerRef = useRef(null);

  const userPortafolioListService = useUserPortafolioListService();

  const toggleShowAssetHandler = () => {
    setShowAddAsset((prev) => !prev)
  }

  const isLoading = (): boolean => {
    return userPortafolioListService.getLoading();
  } 

  return (
    <>
      { isLoading() ? <LoadingSpinner /> : null}
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
    </>
  )
};

export default MyPortafolioPage;