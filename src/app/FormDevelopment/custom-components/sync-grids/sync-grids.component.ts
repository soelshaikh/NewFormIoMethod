import { Component, inject } from '@angular/core';
import {
  GridModule,
  RowSelectEventArgs,
  SelectionSettingsModel,
} from '@syncfusion/ej2-angular-grids';
import { ProductService } from '../../../Services/product.service';

@Component({
  selector: 'sync-grid',
  templateUrl: './sync-grids.component.html',
  standalone: true,
  imports: [GridModule],
  providers: [ProductService],
})
export class SyncGridsComponent {
  public productService: ProductService = inject(ProductService);
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
   * Constructor function of the component.
   * It initializes the component's properties and subscribes to the ProductService to fetch product data.
   * Upon receiving the data, it assigns the products to the dataSource property.
   */
  constructor() {
    this.productService.get().subscribe((res: any) => {
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
