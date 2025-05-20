import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-filter-category',
  templateUrl: './filter-category.component.html',
  styleUrls: ['./filter-category.component.scss'],
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule],
  
})
export class FilterCategoryComponent {
  @Input() categories: string[] = [];
  @Output() categorySelected = new EventEmitter<string>();

  selectedCategory: string = '';

  onCategoryChange() {
    this.categorySelected.emit(this.selectedCategory);
  }
}
