import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { debounceTime, map } from 'rxjs/operators';
import { Artwork } from 'src/app/shared/artwork';
import { CrudService } from '../../shared/crud.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './artwork-edit.component.html',
  styleUrls: ['./artwork-edit.component.css'],
})
export class ArtworkEditComponent implements OnInit {
  public artworkForm: FormGroup;
  id: string;
  editMode = false;
  artwork: Artwork;

  constructor(
    public crudService: CrudService,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;

      this.crudService
        .getArtwork(this.id)
        .snapshotChanges()
        .subscribe((item) => {
          let a = item.payload.toJSON() as Artwork;
          a['$key'] = item.key;
          this.artwork = a;
          this.artForm();
        });

      if (!this.editMode) {
        this.artForm();
      }
    });

    this.artworkForm.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((value) => {
        this.onControlValueChanged();
      });
    this.onControlValueChanged();
  }

  artForm() {
    if (this.artwork) {
      this.artworkForm = this.fb.group({
        image: [this.artwork.image, Validators.required],
        name: [this.artwork.name, Validators.required],
        author: [this.artwork.author, Validators.required],
        date: [this.artwork.date, Validators.required],
        style: [this.artwork.style, Validators.required],
        medium: [this.artwork.medium],
        description: [this.artwork.description],
      });
    } else {
      this.artworkForm = this.fb.group({
        image: ['', Validators.required],
        name: ['', Validators.required],
        author: ['', Validators.required],
        date: ['', Validators.required],
        style: ['', Validators.required],
        medium: [''],
        description: [''],
      });
    }
  }
  onCancel() {
    this.router.navigate(['/collection'], { relativeTo: this.route });
  }

  onSubmit() {
    if (this.editMode) {
      this.crudService.updateArtwork(this.id, this.artworkForm.value);
    } else {
      this.crudService.addArtwork(this.artworkForm.value);
    }
    this.onCancel();
  }

  get image() {
    return this.artworkForm.get('image');
  }
  get name() {
    return this.artworkForm.get('name');
  }

  get author() {
    return this.artworkForm.get('author');
  }

  get date() {
    return this.artworkForm.get('date');
  }

  get style() {
    return this.artworkForm.get('style');
  }
  get medium() {
    return this.artworkForm.get('medium');
  }
  get description() {
    return this.artworkForm.get('description');
  }

  formErrors = {
    image: '',
    name: '',
    author: '',
    date: '',
    medium: '',
    style: '',
  };

  private validationMessages = {
    image: {
      required: 'image is required',
    },
    name: {
      required: 'name is required',
    },
    author: {
      required: 'author is required',
    },
    date: {
      required: 'date is required',
    },
    style: {
      required: 'style is required',
    },
  };
  onControlValueChanged() {
    const form = this.artworkForm;
    for (let field in this.formErrors) {
      this.formErrors[field] = '';
      let control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const validationMessages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += validationMessages[key] + ' ';
        }
      }
    }
  }
}
