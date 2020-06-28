import { Artwork } from './../shared/artwork';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  AngularFireList,
  AngularFireObject,
  AngularFireDatabase,
} from '@angular/fire/database';

@Injectable()
export class CrudService {
  artworksRef: AngularFireList<any>;
  artworkRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  addArtwork(artwork: Artwork) {
    this.artworksRef.push({
      image: artwork.image,
      name: artwork.name,
      author: artwork.author,
      date: artwork.date,
      style: artwork.style,
      medium: artwork.medium,
      description: artwork.description,
    });
  }

  getArtworks() {
    this.artworksRef = this.db.list('artworks-list');
    return this.artworksRef;
  }

  getArtwork(id: string) {
    this.artworkRef = this.db.object('artworks-list/' + id);
    return this.artworkRef;
  }
  updateArtwork(index: string, artwork: Artwork) {
    this.artworkRef.update({
      image: artwork.image,
      name: artwork.name,
      author: artwork.author,
      date: artwork.date,
      style: artwork.style,
      medium: artwork.medium,
      description: artwork.description,
    });
  }

  deleteArtwork(id: string) {
    this.artworkRef = this.db.object('artworks-list/' + id);
    this.artworkRef.remove();
  }
}
