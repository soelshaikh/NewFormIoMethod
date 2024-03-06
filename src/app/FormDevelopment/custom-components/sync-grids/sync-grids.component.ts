import { Component, inject } from '@angular/core';
import {
  GridModule,
  RowSelectEventArgs,
  SelectionSettingsModel,
} from '@syncfusion/ej2-angular-grids';
import { ProductService } from '../../../Sercices/product.service';

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
  public selectionOptions?: SelectionSettingsModel = {
    mode: 'Row',
    type: 'Single',
  };

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
