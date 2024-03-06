import { Component, inject } from '@angular/core';
import {
  GridModule,
  RowSelectEventArgs,
  SelectionSettingsModel,
} from '@syncfusion/ej2-angular-grids';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'sync-grid',
  templateUrl: './sync-grids.component.html',
  standalone: true,
  imports: [GridModule],
})
export class SyncGridsComponent {
  public dataSource: any;
  public Record: Object;
  public url = 'https://dummyjson.com/products';

  /**
   * Optional property that defines the selection options for a component.
   * It specifies the mode and type of selection to be used.
   * Default mode is 'Row' and type is 'Single'.
   */
  public selectionOptions?: SelectionSettingsModel = {
    mode: 'Row',
    type: 'Single',
  };

  /**
   * Constructs the ProductService with HttpClient dependency injection.
   * Makes an HTTP GET request to fetch product data from the specified URL and populates the dataSource property.
   * @param http The HttpClient service for making HTTP requests.
   */
  constructor(private http: HttpClient) {
    // Make an HTTP GET request to fetch product data
    this.http.get(this.url).subscribe((res: any) => {
      // Populate the dataSource property with the products obtained from the response
      this.dataSource = res.products;
    });
  }
  
  ngonInit(): void {
    //Removing Syncfusion premium dialog after 2 seconds
    setTimeout(() => {
      const els = document.querySelectorAll('div[style*="z-index: 999999999"]');
      els.forEach((e) => {
        e.remove();
      });
    }, 2000);
  }

  rowSelected(args: RowSelectEventArgs): void {
    // Assigning the data from the row selection event to the Record property
    this.Record = args.data;
    // Displaying an alert with the Order ID retrieved from the Record object
    alert(`Order ID : ${this.Record['id']}`);
  }
}
