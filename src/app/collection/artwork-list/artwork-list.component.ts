import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Artwork } from 'src/app/shared/artwork';
import { CrudService } from 'src/app/shared/crud.service';

@Component({
  selector: 'app-artwork-list',
  templateUrl: './artwork-list.component.html',
  styleUrls: ['./artwork-list.component.css'],
})
export class ArtworkListComponent implements OnInit {
  hideWhenNoArtwork = false;
  noData = false;
  preLoader = true;

  artworks: Artwork[];
  subscription: Subscription;
  selectedArtwork: Artwork;

  constructor(
    public crudApi: CrudService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dataState();
    let s = this.crudApi.getArtworks();
    s.snapshotChanges().subscribe((items) => {
      this.artworks = [];
      items.forEach((item) => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.artworks.push(a as Artwork);
      });
    });
  }
  dataState() {
    this.crudApi
      .getArtworks()
      .valueChanges()
      .subscribe((data) => {
        this.preLoader = false;
        if (data.length <= 0) {
          this.hideWhenNoArtwork = false;
          this.noData = true;
        } else {
          this.hideWhenNoArtwork = true;
          this.noData = false;
        }
      });
  }
}
