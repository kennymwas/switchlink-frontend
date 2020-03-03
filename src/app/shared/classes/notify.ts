import {MatSnackBar} from '@angular/material';
import {forwardRef, Inject} from '@angular/core';
import {MatSnackBarConfig} from '@angular/material/snack-bar';

export class Notify {
  private title = 'Notification';

  constructor(@Inject(forwardRef(() => MatSnackBar)) public snackBar: MatSnackBar) {

  }

  /**
   * Show default notification
   */
  show(message: string, action?: string) {
    this.render(message, action, 'snackbar-default');
  }

  /**
   * Show warning notification
   */
  showWarning(message: string, action?: string) {
    this.render(message, action, 'snackbar-warning');
  }

  /**
   * Show success notification
   */
  showSuccess(message: string, action?: string) {
    this.render(message, action, 'snackbar-success');
  }

  /**
   * Show danger notification
   */
  showDanger(message: string, action?: string) {
    this.render(message, action, 'snackbar-danger');
  }

  private render(message: string, action: string, panelClass: string) {
    if (action === undefined) {
      action = this.title;
    }
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    config.panelClass = panelClass;
    config.horizontalPosition = 'right';
    this.snackBar.open(message, action, config);
  }

}
