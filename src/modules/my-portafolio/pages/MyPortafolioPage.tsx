
import styles from './MyPortafolioPage.module.scss';

import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";

import RegisterPortafolioAsset from "../components/register-portafolio-asset/RegisterPortafolioAsset";
import UserPortafolioList from "../components/user-portafolio-list/UserPortafolioList";
import LoadingSpinner from '../../../shared/components/loading-spinner/LoadingSpinner'
import { useUserPortafolioListService } from "../../../core/hooks/use-user-portafolio-list-service";
import { useUserAuthService } from '../../../authentication/hooks/use-user-auth-service';
import { UserPortafolioTotalItem } from '../interfaces/user-portafolio-total-item';
import { Outlet } from 'react-router-dom';

const MyPortafolioPage = () => {
  const [showAddAsset, setShowAddAsset] = useState<boolean>(false);
  const [groupedPortafolioItems, setGroupedPortafolioItems] = useState<UserPortafolioTotalItem[]>([]);

  useEffect(() => {
    fetchTotalizedAssets();
  }, []);

  const userPortafolioListService = useUserPortafolioListService();
  const userAuthService = useUserAuthService();

  const toggleShowAssetHandler = () => {
    setShowAddAsset((prev) => !prev)
  }

  const isLoading = (): boolean => {
    return userPortafolioListService.getLoading();
  }

  const fetchTotalizedAssets = async () => {

    const user = userAuthService.currentUser?.email

    if(!user) {
      return;
    }

    const totalizedAssets = await userPortafolioListService.getUserPortafolioTotalized(user);
    setGroupedPortafolioItems(totalizedAssets)
  }

  const submitPortafolioHandler = () => {
    toggleShowAssetHandler();
    fetchTotalizedAssets();
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
        <Collapse in={showAddAsset}><RegisterPortafolioAsset onSubmit={submitPortafolioHandler}/></Collapse>
        <UserPortafolioList groupedPortafolioItems={groupedPortafolioItems}/>
        <Outlet />
      </div>
    </>
  )
};

export default MyPortafolioPage;