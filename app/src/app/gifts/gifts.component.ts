import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { product } from '../models/jitifi.model';
import { JitifiService } from '../services/jitifi.service';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.css']
})
export class GiftsComponent implements OnInit {
  products: product[];
  constructor(private jitifiService: JitifiService) {
    this.products = [];
  }
  async ngOnInit() {
    await this.jitifiService.loadJsonFile();
    this.products = this.jitifiService.showStoresProducts();
  }
}
