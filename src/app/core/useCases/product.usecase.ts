import { Injectable } from "@angular/core";
import { ProductEntity } from "../entities/product.entity";
import { ProductService } from "../services/product.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ProductUseCase {


    constructor(
        private productService: ProductService
    ) {
    }
    getAllProduct(): Observable<ProductEntity[]> {
    return this.productService.getListOfProduct();
}
public roundTax(amount: number): number {
    return Math.ceil(amount / 0.05) * 0.05;
  }

  calculateTTC(priceHT: number, category: string, isImported: boolean): number {
    const taxes: number[] = [];

    // TVA en fonction de la catégorie
    let vatRate = 0;
    if (category === 'Books') {
      vatRate = 10;
    } else if (category !== 'Food' && category !== 'Medecine') {
      vatRate = 20;
    }
    if (vatRate > 0) {
      const vatTax = this.roundTax((priceHT * vatRate) / 100);
      taxes.push(vatTax);
    }

    // Taxe additionnelle d'importation de 5%
    if (isImported) {
      const importTax = this.roundTax((priceHT * 5) / 100);
      taxes.push(importTax);
    }

    // Somme des taxes
    const totalTax = taxes.reduce((sum, t) => sum + t, 0);

    // Prix TTC = HT + taxes, arrondi au centime
    return Math.round((priceHT + totalTax) * 100) / 100;
  }
}
