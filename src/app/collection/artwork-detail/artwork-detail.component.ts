import { CrudService } from './../../shared/crud.service';
import { Component, OnInit } from '@angular/core';
import { Artwork } from 'src/app/shared/artwork';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-artwork-detail',
  templateUrl: './artwork-detail.component.html',
  styleUrls: ['./artwork-detail.component.css'],
})
export class ArtworkDetailComponent implements OnInit {
  artwork: Artwork;
  id: string;

  constructor(
    private crudService: CrudService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      let s = this.crudService.getArtwork(this.id);
      s.snapshotChanges().subscribe((item) => {
        let a = item.payload.toJSON() as Artwork;
        a['$key'] = item.key;
        this.artwork = a;
      });
    });
  }
  onDeleteArtwork() {
    this.crudService.deleteArtwork(this.id);
    this.router.navigate(['/collection']);
  }
  onEditArtwork() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  getItem() {
    this.crudService.getArtwork(this.id);
  }
  addToFav() {}
}
