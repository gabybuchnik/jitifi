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

  getGendersTags(order: number) : number{
    let tagid = null;
    for (let gender of this.data.GenderFilter) {
      if (gender.Order === order) {
        tagid = gender.TagId;
      }
    }
    return tagid;
  }

  showStoresProductsByGender(tagid: number): product[] {
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

  getPriceTags(value: string) : number[]{
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
    }
    return tagid;
  }

  showStoresProductsByPrice(tagid: number[]): product[] {
    this.products = [];
    if (tagid.length) {
      return this.loadProducts(tagid);
    }
    else {
      return this.showStoresProducts();
    }
  }

  loadProducts(tagid: number[]) : product[]{
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
    return this.products;
  }
}
