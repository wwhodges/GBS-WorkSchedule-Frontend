import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiDataService } from 'src/app/common/services';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { OrderList } from 'src/app/common/models/orderList.model';
import { Order } from 'src/app/common/models';

@Component({
  selector: 'app-used-destinations',
  templateUrl: './used-destinations.component.html',
  styleUrls: ['./used-destinations.component.scss']
})
export class UsedDestinationsComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();
  public orders: OrderList;
  public isLoading = true;
  public dayOrders: any;

  constructor(private apiData: ApiDataService) { }

  ngOnInit() {
    this.orders = new OrderList();

      this.loadData();
  }

  loadData() {
    this.unsubscribe$.next();
    this.isLoading = true;
    this.apiData.getOrderUsedDestinations().pipe(takeUntil(this.unsubscribe$)).subscribe(
      apiResult => {
        this.orders = apiResult;
        this.isLoading = false;
        this.dayOrders = [{ desc: 'MON', orders: this.orders.orders.filter( ord => ord.destination.startsWith('MON') || ord.palDest.startsWith('MON')).sort(compare) },
                          { desc: 'TUE', orders: this.orders.orders.filter( ord => ord.destination.startsWith('TUE') || ord.palDest.startsWith('TUE')).sort(compare) },
                          { desc: 'WED', orders: this.orders.orders.filter( ord => ord.destination.startsWith('WED') || ord.palDest.startsWith('WED')).sort(compare) },
                          { desc: 'THU', orders: this.orders.orders.filter( ord => ord.destination.startsWith('THU') || ord.palDest.startsWith('THU')).sort(compare) },
                          { desc: 'FRI', orders: this.orders.orders.filter( ord => ord.destination.startsWith('FRI') || ord.palDest.startsWith('FRI')).sort(compare) },
                          { desc: 'SAT', orders: this.orders.orders.filter( ord => ord.destination.startsWith('SAT') || ord.palDest.startsWith('SAT')).sort(compare) },
                          { desc: 'SUN', orders: this.orders.orders.filter( ord => ord.destination.startsWith('SUN') || ord.palDest.startsWith('SUN')).sort(compare) }
                ];
      }, (error) => { console.log(error); }
    );
  }


  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

}

function compare(a: Order, b: Order) {
  const aDest = a.palDest === '' ? a.destination.substr(3) : a.palDest.substr(3);
  const bDest = b.palDest === '' ? b.destination.substr(3) : b.palDest.substr(3);
  
  return +aDest - +bDest;
}
