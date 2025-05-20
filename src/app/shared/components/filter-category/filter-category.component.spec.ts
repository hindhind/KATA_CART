import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterCategoryComponent } from './filter-category.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppModule } from 'src/app/app.module';



describe('FilterCategoryComponent', () => {
  let component: FilterCategoryComponent;
  let fixture: ComponentFixture<FilterCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppModule,
        FilterCategoryComponent
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
