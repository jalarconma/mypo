
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
import { useRegisterPortafolioService } from '../../../core/hooks/use-register-portafolio-service';
import { CreateUserPortafolioInput } from '../../../API';
import { PortafolioAction } from '../../../models';
import { RegisterPortafolioFieldsFactory } from '../factories/register-portafolio-fields.factory';
import { RegisterPortafolioForm } from '../interfaces/register-portafolio-form';
import { StringUtils } from '../../../shared/utils/string-utils';
import { SubmitPortafolioState } from '../models/submit-portafolio-state';
import AlertDialog from '../../../shared/components/alert-dialog/AlertDialog';

const MyPortafolioPage = () => {
  const [showAddAsset, setShowAddAsset] = useState<boolean>(false);
  const [groupedPortafolioItems, setGroupedPortafolioItems] = useState<UserPortafolioTotalItem[]>([]);
  const [ submitState, setSubmitState ] = useState<SubmitPortafolioState>(new SubmitPortafolioState(false, undefined));

  useEffect(() => {
    fetchTotalizedAssets();
  }, []);

  const userPortafolioListService = useUserPortafolioListService();
  const userAuthService = useUserAuthService();
  const registerPortafolioService = useRegisterPortafolioService();

  const toggleShowAssetHandler = () => {
    setShowAddAsset((prev) => !prev)
  }

  const isLoading = (): boolean => {
    return userPortafolioListService.getLoading() || userAuthService.getLoading() || registerPortafolioService.getLoading();
  }

  const fetchTotalizedAssets = async () => {

    const user = userAuthService.currentUser?.email

    if(!user) {
      return;
    }

    const totalizedAssets = await userPortafolioListService.getUserPortafolioTotalized(user);
    setGroupedPortafolioItems(totalizedAssets)
  }

  const submitPortafolioHandler = async (data: RegisterPortafolioForm) => {
    console.log('to submit data: ', data);
    setSubmitState(submitState.onSubmit(data));
  }

  const submitNewAssset = async () => {
    if(!userAuthService.currentUser) {
      return ;
    }

    const data = submitState.getSubmitData() as RegisterPortafolioForm;

    if(!data) {
      return;
    }

    const assetToAdd: CreateUserPortafolioInput = {
      user: userAuthService.currentUser.email,
      owner: userAuthService.currentUser.username,
      action: PortafolioAction[data.action],
      asset_quantity: RegisterPortafolioFieldsFactory.getAssetQuantity(data),
      action_date: StringUtils.dateToValidString(data.assetActionDate),
      current_asset_price: data.assetPrice,
      userPortafolioSymbolId: data.assetSymbol.id
    };

    await registerPortafolioService.addAssetToPortafolio(assetToAdd);
    setSubmitState(submitState.onCancel());
    toggleShowAssetHandler();
    await fetchTotalizedAssets();
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
        <Collapse in={showAddAsset}><RegisterPortafolioAsset onSubmit={submitPortafolioHandler} formOpened={showAddAsset}/></Collapse>
        <UserPortafolioList groupedPortafolioItems={groupedPortafolioItems}/>
        <AlertDialog open={submitState.isOpened()} onClose={() => setSubmitState(submitState.onCancel())} onContinue={submitNewAssset}/>
        <Outlet />
      </div>
    </>
  )
};

export default MyPortafolioPage;