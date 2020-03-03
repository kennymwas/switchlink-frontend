import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {GlobalParams} from './globalparams';
import {Meta} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {DataTableWrapper} from '../../entities/wrappers/data-table-wrapper';
import {ResponseWrapper} from '../../entities/wrappers/response-wrapper';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class StewardService<T, E> {

  constructor(
    private route: Router,
    private http: HttpClient,
    private globalParam: GlobalParams,
    private meta: Meta
  ) {
    // const csrf = this.meta.getTag('name=_csrf').content;

    this.token = localStorage.getItem('access_token');

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      // 'X-CSRF-TOKEN': csrf
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')

    });

    this.headersNoToken = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      // 'X-CSRF-TOKEN': csrf
    });
    this.headersLogin = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      // 'X-CSRF-TOKEN': csrf
      'Authorization': 'Basic ' + btoa('switchlink-client:switchlink-secret')
    });
    this.headersPlain = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      // 'X-CSRF-TOKEN': csrf
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    this.headersFormdata = new HttpHeaders({
      // 'X-CSRF-TOKEN': csrf
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    this.headersMultipart = new HttpHeaders({
      'Content-type': 'multipart/form-data; charset=utf-8',
      // 'X-CSRF-TOKEN': csrf
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });
  }

  private headers: HttpHeaders;
  private headersNoToken: HttpHeaders;
  private headersLogin: HttpHeaders;
  private headersPlain: HttpHeaders;
  private headersFormdata: HttpHeaders;
  private headersMultipart: HttpHeaders;
  token: string;

  /**
   * Used to render action buttons
   */
  static renderMore(id: any) {
    return '<div class=\'actions-buttons center\' id=\'' + id + '\'><i class=\'fa fa-check\' title=\'Approve\'></i> <i class=\'fa fa-ban\' title=\'Decline\'></i></div>';
  }

  /**
   * Used to handle http post requests
   */
  post(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    return this.http.post(this.globalParam.baseUrl + endpoint, JSON.stringify(data), {headers: this.headers}).pipe(
      catchError(this.handleError<any>())
    );
  }

  postNoToken(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    return this.http.post(this.globalParam.baseUrl + endpoint, JSON.stringify(data), {headers: this.headersNoToken}).pipe(
      catchError(this.handleError<any>())
    );
  }


  postLogin(endpoint: string, data: T): Observable<any> {
    return this.http.post(this.globalParam.baseUrl + endpoint, data, {
      // return this.http.post(endpoint, data, {
      headers: this.headersLogin
    }).pipe(
      catchError(this.handleError<any>())
    );
  }

  postForm(endpoint: string, data: T): Observable<any> {
    return this.http.post(this.globalParam.baseUrl + endpoint, data, {
      headers: this.headersPlain
    }).pipe(
      catchError(this.handleError<any>())
    );
  }

  postFormAuthorized(endpoint: string, data: T, options?: HttpHeaders): Observable<any> {
    if (!options) {
      options = this.headersPlain;
    }
    return this.http.post(this.globalParam.baseUrl + endpoint, data, {headers: options}).pipe(
      catchError(this.handleError<any>())
    );
  }

  /**
   * Used to handle http post requests
   */
  put(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    return this.http.put(this.globalParam.baseUrl + endpoint, JSON.stringify(data), {headers: this.headers}).pipe(
      catchError(this.handleError<any>())
    );
  }

  putNoToken(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    return this.http.put(this.globalParam.baseUrl + endpoint, JSON.stringify(data), {headers: this.headersNoToken}).pipe(
      catchError(this.handleError<any>())
    );
  }

  delete(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    return this.http.request('delete', this.globalParam.baseUrl + endpoint, {headers: this.headers, body: JSON.stringify(data)}).pipe(
      catchError(this.handleError<any>())
    );
  }

  get(endpoint: string, data?: Map<string, string>): Observable<ResponseWrapper<E>> {
    const options = {
      headers: this.headers,
      params: this.getHttpParams(data)
    };
    return this.http.get(this.globalParam.baseUrl + endpoint, options).pipe(
      catchError(this.handleError<any>())
    );
  }

  getNoToken(endpoint: string, data?: Map<string, string>): Observable<ResponseWrapper<E>> {
    const options = {
      headers: this.headersNoToken,
      params: this.getHttpParams(data)
    };
    return this.http.get(this.globalParam.baseUrl + endpoint, options).pipe(
      catchError(this.handleError<any>())
    );
  }


  getFile(endpoint: string, data?: Map<string, string>): Observable<ResponseWrapper<E>> {
    const options = {
      params: this.getHttpParams(data)
    };
    return this.http.get(this.globalParam.baseUrl + endpoint, options).pipe(
      catchError(this.handleError<any>())
    );
  }

  sendFormData(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    return this.http
      .post(this.globalParam.baseUrl + endpoint, data, {
        headers: this.headersFormdata
      })
      .pipe(catchError(this.handleError<any>()));
  }

  postFormData(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    const formData: FormData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    return this.http.post(this.globalParam.baseUrl + endpoint, formData, {headers: this.headersFormdata}).pipe(
      catchError(this.handleError<any>())
    );
  }

  postFormDataMultipart(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    const formData: FormData = new FormData();
    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        data[key].forEach(k2 => {
          formData.append(key, k2);
        });
      } else {
        formData.append(key, data[key]);
      }
    });

    return this.http.post(this.globalParam.baseUrl + endpoint, formData, {headers: this.headersFormdata}).pipe(
      catchError(this.handleError<any>())
    );
  }

  putFormDataMultiPart(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    const formData: FormData = new FormData();
    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        data[key].forEach(k2 => {
          formData.append(key, k2);
        });
      } else {
        formData.append(key, data[key]);
      }
    });
    return this.http.put(this.globalParam.baseUrl + endpoint, formData, {headers: this.headersFormdata}).pipe(
      catchError(this.handleError<any>())
    );
  }

  private getHttpParams(data: Map<string, string>): HttpParams {
    if (data === undefined) {
      return new HttpParams();
    }
    let httpParams: HttpParams = new HttpParams();
    data.forEach((value: string, key: string) => {
      httpParams = httpParams.append(key, value);
    });
    return httpParams;
  }

  public dataTableReload(endpoint?: string) {
    $($.fn.dataTable.tables(true)).DataTable().ajax.url(this.globalParam.baseUrl + endpoint).load(null, true);
    $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, true);
  }

  public intiateDataTable(endpoint: string, cols: Array<DataTables.ColumnSettings>,
                          idField: string, params?: Map<any, string>,
                          paramCallBack?: any, isCheckBoxEnable?: boolean): DataTables.Settings {
    if (isCheckBoxEnable === undefined) {
      isCheckBoxEnable = true;
    }
    if (params == null) {
      params = new Map<any, string>();
    }
    let dtOptions: any = {};
    let httpParams: HttpParams = new HttpParams();
    params.forEach((value: any, key: string) => {
      httpParams = httpParams.append(key, value);
    });
    let columOptions: any = {};
    if (isCheckBoxEnable) {
      columOptions = {
        orderable: !isCheckBoxEnable,
        className: 'select-checkbox',
        targets: 0,
        checkboxes: {
          selectRow: isCheckBoxEnable
        }
      };
    }

    dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      responsive: true,
      // select: true,
      ajax: (dTParams: any, callback) => {
        if (paramCallBack != null) {
          paramCallBack(dTParams);
        }
        const options = {
          headers: this.headers,
          params: this.parseDataTableParams(dTParams, httpParams)
        };
        this.http
          .get<DataTableWrapper<T>>(
            this.globalParam.baseUrl + endpoint,
            options
          ).subscribe(resp => {
            callback({
              recordsTotal: resp.data.totalElements,
              recordsFiltered: resp.data.totalElements,
              data: resp.data.content
            });
          },
          error => {
            if (error.status === 401) {
              try {
                this.dataTableReload(endpoint);
              } catch (e) {
                console.log('Error', e);
              }
            }
          });
      },
      columns: cols,
      on: (event: string, callback: ((e: Event, settings: any, json: any) => void)) => {
        // console.log('Testing on select event');
      },
      // preDrawCallback: preCallBack,
      rowCallback: (row: Node, data: T[], index: number) => {
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          //                    console.debug("Testing click event");
        });
        $(row).attr('data-id', data[idField]);
        return row;
      },
      dom: 'Bfrtip',
      // USED TO REMOVE THE SEARCH INPUT.
      bFilter: false,
      buttons: [],
      columnDefs: [
        columOptions
      ],
      select: {
        style: 'multi'
      },
      order: [[1, 'asc']]
    };
    return dtOptions;
  }

  public intiateDataTableNoToken(endpoint: string, cols: Array<DataTables.ColumnSettings>,
                                 idField: string, params?: Map<any, string>, paramCallBack?: any): DataTables.Settings {
    // let colz:Array<DataTables.ColumnSettings> = new ;
    if (params == null) {
      params = new Map<any, string>();
    }
    let dtOptions: any = {};
    let httpParams: HttpParams = new HttpParams();
    params.forEach((value: any, key: string) => {
      httpParams = httpParams.append(key, value);
    });
    dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      responsive: {
        breakpoints: [
          {name: 'desktop', width: Infinity},
          {name: 'tablet', width: 1024},
          {name: 'fablet', width: 768},
          {name: 'phone', width: 480}
        ]
      },
      // select: true,
      ajax: (dTParams: any, callback) => {
        if (paramCallBack != null) {
          paramCallBack(dTParams);
        }
        // console.debug('TODO ======== implement sort for: \n DataTable Params: ' + JSON.stringify(dTParams));
        const options = {
          headers: this.headersNoToken,
          params: this.parseDataTableParams(dTParams, httpParams)
        };
        this.http
          .get<DataTableWrapper<T>>(
            this.globalParam.baseUrl + endpoint,
            options
          ).subscribe(resp => {
          callback({
            recordsTotal: resp.data.totalElements,
            recordsFiltered: resp.data.totalElements,
            data: resp.data.content
          });
        });
      },
      columns: cols,
      on: (event: string, callback: ((e: Event, settings: any, json: any) => void)) => {
        // console.log('Testing on select event');
      },
      //            preDrawCallback: preCallBack,
      rowCallback: (row: Node, data: T[], index: number) => {
        //                $('td', row).unbind('click');
        //                $('td', row).bind('click', () => {
        //                    console.debug("Testing click event");
        //                });
        $(row).attr('data-id', data[idField]);
        return row;
      },
      dom: 'Bfrtip',
      // USED TO REMOVE THE SEARCH INPUT.
      bFilter: false,
      buttons: [],
      columnDefs: [{
        orderable: false,
        className: 'select-checkbox',
        targets: 0,
        checkboxes: {
          selectRow: true
        }
      }],
      select: {
        style: 'multi'
        // selector: 'td:first-child'
      },
      order: [[1, 'asc']]
    };
    return dtOptions;
  }

  /**
   * used to parse datatable params to http client and spring boot pageable params
   */
  private parseDataTableParams(dtParams: any, httpParams: HttpParams): HttpParams {
    // console.log(dtParams);
    /*if (parseInt(dtParams.size, 0) > 0) {
        httpParams = httpParams.append('size', dtParams.size);
    } else {
        httpParams = httpParams.append('size', dtParams.length);
    }*/

    httpParams = httpParams.append('page', '' + (dtParams.start / dtParams.length));
    if (!dtParams.needle) {
      httpParams = httpParams.append('needle', dtParams.search.value);
    }

    if (dtParams.order.length > 0) {
      httpParams = httpParams.append('sort', dtParams.columns[dtParams.order[0].column].data + ',' + dtParams.order[0].dir);
    }

    Object.keys(dtParams).forEach((key) => {
      // tslint:disable-next-line:triple-equals
      if (key != 'length' && key != 'start' && key != 'search' && key != 'sort'
        // tslint:disable-next-line:triple-equals
        && key != 'order' && key != 'columns') {
        httpParams = httpParams.append(key, dtParams[key]);
      }
    });

    return httpParams;
  }

  /**
   * Used to catch exception thrown by http client returns internal server error
   * if status 500 is encountered
   */
  // tslint:disable-next-line:no-shadowed-variable
  private handleError<ResponseWrapper>() {
    return (error: HttpErrorResponse): Observable<any> => {
      const res = new ResponseWrapper();
      //            console.error(error); // log to console instead
      // tslint:disable-next-line:triple-equals
      if (error.status == 500) {
        res.code = error.status;
        res.message = 'Sorry internal server error occured please try again later';
      } else {
        res.code = error.status;
        res.message = error.error.message;
        res.data = error.error.data;
      }
      return of(res);
    };
  }

}
