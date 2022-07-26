import { EditPortafolioForm } from "../interfaces/edit-portafolio-form";
import { RegisterPortafolioForm } from "../interfaces/register-portafolio-form";

export class SubmitPortafolioState {

  constructor (
    private openDialog: boolean = false, 
    private submitData: RegisterPortafolioForm | EditPortafolioForm | undefined
  ){}

  onSubmit(data: RegisterPortafolioForm | EditPortafolioForm): SubmitPortafolioState {
    return new SubmitPortafolioState(true, data)
  }

  onCancel(): SubmitPortafolioState {
    return new SubmitPortafolioState(false, undefined)
  }

  getSubmitData(): RegisterPortafolioForm | EditPortafolioForm | undefined {
    return this.submitData;
  }

  isOpened(): boolean {
    return this.openDialog;
  }
}