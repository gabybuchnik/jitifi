import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { product } from '../models/jitifi.model';
import { JitifiService } from '../services/jitifi.service';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.css']
})
export class GiftsComponent implements OnInit {
  @ViewChild('gender') gender: ElementRef;
  @ViewChild('budget') budget: ElementRef;
  products: product[];
  constructor(private jitifiService: JitifiService) {
    this.products = [];
  }
  async ngOnInit() {
    await this.jitifiService.loadJsonFile();
    this.products = this.jitifiService.showStoresProducts();
  }
  filterGender() {
    this.products = [];
    let order = this.gender.nativeElement.options[this.gender.nativeElement.selectedIndex].value;
    this.products = this.jitifiService.showStoresProductsByGender(+order);
  }
  filterPrice(){
    this.products = [];
    let value = this.budget.nativeElement.options[this.budget.nativeElement.selectedIndex].value;
    this.products = this.jitifiService.showStoresProductsByPrice(value);
  }
}
