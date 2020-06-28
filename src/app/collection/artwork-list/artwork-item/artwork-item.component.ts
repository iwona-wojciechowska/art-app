import { Component, OnInit, Input } from '@angular/core';
import { Artwork } from 'src/app/shared/artwork';

@Component({
  selector: 'app-artwork-item',
  templateUrl: './artwork-item.component.html',
  styleUrls: ['./artwork-item.component.css'],
})
export class ArtworkItemComponent implements OnInit {
  @Input() artwork: Artwork;
  @Input() index: number;

  constructor() {}

  ngOnInit(): void {
    console.log(this.artwork);
  }
}
