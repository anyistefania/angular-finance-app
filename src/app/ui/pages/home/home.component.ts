import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public products: Product[] = [
    {
      name: 'Current Accounts / Checking Accounts',
      image: '../../../assets/images/product-1.svg',
    },
    {
      name: 'Savings Accounts',
      image: '../../../assets/images/product-2.svg',
    },
    {
      name: 'Credit Cards',
      image: '../../../assets/images/product-3.svg',
    },
  ];
}
