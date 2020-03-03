import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class SharedService {

  constructor(private title: Title) { }

  /**
   * Returns the Root title that can be appended to paths
   **/
  public get ROOT_TITLE(): string {
    return 'SWITCHLINK | Admin';
  }

  /**
   * Sets the currentn title for the page using the set convention.
   * @param title The title we are setting for the current page.
   **/
  public setPageTitle(title: string) {
    this.title.setTitle(title + ' - ' + this.ROOT_TITLE);
  }

}
