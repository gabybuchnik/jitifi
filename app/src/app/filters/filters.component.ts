import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { product } from '../models/jitifi.model';
import { JitifiService } from '../services/jitifi.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
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
    let tagid = this.jitifiService.getGendersTags(+order);
    this.products = this.jitifiService.showStoresProductsByGender(tagid);
  }
  filterPrice(){
    this.products = [];
    let value = this.budget.nativeElement.options[this.budget.nativeElement.selectedIndex].value;
    let tagid = this.jitifiService.getPriceTags(value);
    this.products = this.jitifiService.showStoresProductsByPrice(tagid);
  }
}
