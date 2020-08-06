import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public title: string;
  public subtitle: string;
  public email: string;
  constructor() { 
    this.title = "Jorge Blanco";
    this.subtitle = "EstudianTec";
    this.email = "jorge.lusi1999@hotmail.com";
  }

  ngOnInit(): void {
  }

}
