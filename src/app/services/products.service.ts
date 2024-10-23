import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Product {
    id: number;
    name: string;
    category: number;
    price: number;
    unit: string;
    availability: boolean;
    sale: boolean;
    discount: number;
    comments: string;
    owner: string;
}

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    private apiUrl = 'http://51.255.166.155:1352/tig/products/'

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        console.log(this.apiUrl);
        
        return this.http.get<Product[]>(this.apiUrl);
    }
    getProductsByCategory(categoryId: number): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl).pipe(
            map((products: Product[]) => products.filter((product: Product) => product.category === categoryId))
        );
    }
    getProductOnSale(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl).pipe(
            map((products: Product[]) => products.filter((product: Product) => product.sale === true))
        )
    }
}