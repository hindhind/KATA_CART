import { Injectable } from "@angular/core";
import { CategoryService } from "../services/category.service";
import { Observable } from "rxjs";
import { categoryEntity } from "../entities/category.entity";


@Injectable({
    providedIn: 'root',
})
export class CategoryUseCase {


    constructor(
        private categoryService: CategoryService
    ) {
    }
  
    getAllCategories():Observable<categoryEntity[]> {
        return this.categoryService.getAllCategory();
    }



   


}
