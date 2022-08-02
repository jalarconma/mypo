export class DeletePortafolioState {

  constructor (
    private openDialog: boolean = false, 
    private id: string | undefined
  ){}

  onDelete(id: string): DeletePortafolioState {
    return new DeletePortafolioState(true, id);
  }

  onCancel(): DeletePortafolioState {
    return new DeletePortafolioState(false, undefined)
  }

  getDeleteId(): string | undefined {
    return this.id;
  }

  isOpened(): boolean {
    return this.openDialog;
  }
}