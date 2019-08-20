import { Injectable } from '@angular/core';
import { product } from '../models/jitifi.model';

@Injectable({
  providedIn: 'root'
})
export class JitifiService {
  private data;
  private products: product[];
  constructor() {
    this.data = [];
    this.products = [];
    this.loadJsonFile();
  }
  async loadJsonFile() {
    let res = await fetch('../assets/data/products.json');
    let data = await res.json();
    this.data = data;
  }
  getData() {
    return this.data;
  }
  showStoresProducts(): product[] {
    this.products = [];
    for (let store of this.data.Stores) {
      let storeName = store.StoreName;
      for (let product of store.Products) {
        this.products.push(
          {
            image: product.ProductImage,
            storeName: storeName,
            price: product.PriceLabel,
            productName: product.ProductTitle
          }
        )
      }
    }
    return this.products;
  }
  showStoresProductsByGender(order: number): product[] {
    let tagid = null;
    for (let gender of this.data.GenderFilter) {
      if (gender.Order === order) {
        tagid = gender.TagId;
      }
    }
    if (tagid) {
      this.products = [];
      for (let store of this.data.Stores) {
        let storeName = store.StoreName;
        for (let product of store.Products) {
          let res = product.ProductTags.some(number => {
            return number === +tagid
          });
          if (res) {
            this.products.push(
              {
                image: product.ProductImage,
                storeName: storeName,
                price: product.PriceLabel,
                productName: product.ProductTitle
              }
            )
          }
        }
      }
    }
    else {
      this.showStoresProducts();
    }
    return this.products;
  }
  showStoresProductsByPrice(value: string): product[] {
    this.products = [];
    let tagid = [];
    let val = value.split('-');
    let [priceA, priceB] = val;
    let minPrice = +priceA;
    let maxPrice = +priceB;
    for (let price of this.data.PriceFilter) {
      if (minPrice && !maxPrice) {
        if (minPrice === 25 && price.Value <= minPrice) {
          tagid.push(price.TagId);
        }
        else if (minPrice === 100 && price.Value >= minPrice) {
          tagid.push(price.TagId);
        }
      }
      else if (minPrice && maxPrice && price.Value >= minPrice && price.Value <= maxPrice) {
        tagid.push(price.TagId);
      }
      else {
        this.showStoresProducts();
      }
    }
    return this.loadProducts(tagid);
  }
  loadProducts(tagid: number[]) {
    if (tagid.length) {
      this.products = [];
      for (let store of this.data.Stores) {
        let storeName = store.StoreName;
        for (let product of store.Products) {
          let res = product.ProductTags.some(number => {
            return tagid.some((item) => {
              return item === number;
            })
          });
          if (res) {
            this.products.push(
              {
                image: product.ProductImage,
                storeName: storeName,
                price: product.PriceLabel,
                productName: product.ProductTitle
              }
            )
          }
        }
      }
    }
    else {
      this.showStoresProducts();
    }
    return this.products;
  }
}
