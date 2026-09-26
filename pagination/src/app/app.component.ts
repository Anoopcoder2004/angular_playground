import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

  title = 'pagination';
  products: Product[] = [];
  displayedProducts: Product[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  pages: number[] = [];

  ngOnInit(): void {
    this.manyProduct();
    this.calculateTotalPages();
    this.calculateDisplayedItems();
  }
  

  calculateTotalPages(){
    this.totalPages = Math.ceil(this.products.length / this.pageSize);
    for(let i = 1; i <= this.totalPages; i++){
      this.pages.push(i);
    }

  }
  calculateDisplayedItems(){
    const start = (this.currentPage-1)*this.pageSize;
    const end =  this.currentPage* this.pageSize;
    this.displayedProducts = this.products.slice(start,end);
  }

  manyProduct() {
    for (let i = 1; i < 101; i++) {
      this.products.push({
        id: i,
        name: " product-" + i,
        price: 100 + i
      });
    }
  }

  goToPreviousPage(){
    if(this.currentPage === 1){
      return;
    }
    this.currentPage--;
    this.calculateDisplayedItems();
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.calculateDisplayedItems();
    }
  }
  onPageChange(page:number){
    this.currentPage = page;
    this.calculateDisplayedItems();
  }
}
