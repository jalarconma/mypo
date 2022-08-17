import styles from './PortafolioHistoryItem.module.scss';

import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import Collapse from '@mui/material/Collapse';

import { PortafolioAction } from "../../../../models";
import SpanNumbericRounded from '../../../../shared/components/span-numeric-rounded/SpanNumericRounded';
import EditPortafolioAsset from '../edit-portafolio-asset/EditPortafolioAsset';
import { SubmitPortafolioState } from '../../models/submit-portafolio-state';
import { useRegisterPortafolioService } from '../../../../core/hooks/use-register-portafolio-service';
import { useUserAuthService } from '../../../../authentication/hooks/use-user-auth-service';
import { UserAuthService } from '../../../../authentication/interfaces/user-auth.interface';
import { RegisterPortafolioService } from '../../../../core/interfaces/register-portafolio.service';
import AlertDialog from '../../../../shared/components/alert-dialog/AlertDialog';
import { EditPortafolioForm } from '../../interfaces/edit-portafolio-form';
import { DeleteUserPortafolioInput, UpdateUserPortafolioInput, UserPortafolio } from '../../../../API';
import { RegisterPortafolioFieldsFactory } from '../../factories/register-portafolio-fields.factory';
import { StringUtils } from '../../../../shared/utils/string-utils';
import { DeletePortafolioState } from '../../models/delete-portafolio-state';

interface Props {
  asset: UserPortafolio;
  onEdit: (editedAsset: UserPortafolio | undefined) => void;
  onDelete: (deletedAsset: UserPortafolio | undefined) => void;
}

const PortafolioHistoryItem = ({ asset, onEdit, onDelete }: Props) => {
  console.log('PortafolioHistoryItem asset: ', asset)

  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [ submitState, setSubmitState ] = useState<SubmitPortafolioState>(new SubmitPortafolioState(false, undefined));
  const [ deleteState, setDeleteState ] = useState<DeletePortafolioState>(new DeletePortafolioState(false, undefined));

  const registerPortafolioService: RegisterPortafolioService = useRegisterPortafolioService();
  const userAuthService: UserAuthService = useUserAuthService();

  const getActionClassName = (): string => {

    if (asset?.action === PortafolioAction.BUY) {
      return 'positive-roi';

    } else if (asset?.action === PortafolioAction.SELL) {
      return 'negative-roi';
    }

    return '';
  }

  const toggleEditPortafolio = (): void => {
    setShowEditForm(prev => !prev);
  }

  const editPortafolioHandler = async (data: EditPortafolioForm) => {
    console.log('to submit data: ', data);
    setSubmitState(submitState.onSubmit(data));
  }

  const deleteAssetHandler = () => {
    console.log('to delete data: ', asset);
    setDeleteState(deleteState.onDelete(asset.id));
  }

  const cancelDialog = () => {
    setSubmitState(submitState.onCancel());
    setDeleteState(deleteState.onCancel());
  }

  const continueAssetAction = async () => {
    
    if(submitState.getSubmitData()) {
      submitEditedAsset();

    } else if(deleteState.getDeleteId()) {
      onDeleteAsset();
    }
  }

  const onDeleteAsset = async () => {
    
    if(!userAuthService.currentUser) {
      return ;
    }

    const assetToDelete: DeleteUserPortafolioInput = {
      id: asset.id
    };

    const result = await registerPortafolioService.deletePortafolioAsset(assetToDelete);
    setDeleteState(deleteState.onCancel());
    onDelete(result.data?.deleteUserPortafolio);
  }

  const submitEditedAsset = async () => {

    if(!userAuthService.currentUser) {
      return ;
    }

    const data = submitState.getSubmitData() as EditPortafolioForm;

    if(!data || !asset.id) {
      return;
    }

    const assetToEdit: UpdateUserPortafolioInput = {
      id: asset.id,
      user: asset.user,
      owner: asset.owner,
      action: PortafolioAction[data.action],
      asset_quantity: RegisterPortafolioFieldsFactory.getAssetQuantity(data),
      action_date: StringUtils.dateToValidString(data.assetActionDate),
      current_asset_price: data.assetPrice,
      userPortafolioSymbolId: asset.userPortafolioSymbolId
    };

    const result = await registerPortafolioService.editPortafolioAsset(assetToEdit);
    setSubmitState(submitState.onCancel());
    toggleEditPortafolio();
    onEdit(result.data?.updateUserPortafolio);
  }

  return (
    !asset ? null : 
    <>
      <div className={styles['portafolio-history-item']}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <span className={styles['item-title']}>{asset.action_date.split('T')[0]}</span>
          </Grid>
          <Grid item xs={6}>
            <SpanNumbericRounded value={asset.asset_quantity} styles={styles['item-value']} />
          </Grid>
          <Grid item xs={6}>
            <span className={`${styles['item-value']} ${getActionClassName()}`}>{asset.action}</span>
          </Grid>
          <Grid item xs={6} >
            <SpanNumbericRounded value={asset.current_asset_price} styles={styles['item-title']} startAdornment={'$'} />
          </Grid>
        </Grid>
        {!showEditForm ?
          (
            <IconButton aria-label="delete" size="small" color="error" className={styles['item-action']} 
              onClick={deleteAssetHandler} disabled={!asset.symbol}>
              <DeleteIcon />
            </IconButton>
          ) : null}
        {showEditForm ?
          (
            <IconButton aria-label="cancel" size="small" color="primary" className={styles['item-action']} onClick={toggleEditPortafolio}>
              <CancelIcon />
            </IconButton>
          ) :
          (
            <IconButton aria-label="edit" size="small" color="primary" className={styles['item-action']} 
              onClick={toggleEditPortafolio} disabled={!asset.symbol}>
              <ModeEditIcon />
            </IconButton>
          )}
      </div>
      <Collapse in={showEditForm}><EditPortafolioAsset onSubmit={editPortafolioHandler} asset={asset} formOpened={showEditForm}/></Collapse>
      <AlertDialog open={submitState.isOpened() || deleteState.isOpened()} onClose={cancelDialog} onContinue={continueAssetAction}/>
    </>
  )
}

export default PortafolioHistoryItem;