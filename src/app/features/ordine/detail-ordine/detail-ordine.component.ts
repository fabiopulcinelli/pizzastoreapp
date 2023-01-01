import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSearchService } from 'src/app/shared/services/data-search.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { OrdineService } from '../ordine.service';

export interface OrdineForm extends FormGroup<{
  id: FormControl<any>;
  data: FormControl<Date>;
  codice: FormControl<string>;
  costoTotale: FormControl<any>;
  closed: FormControl<any>;
  cliente: FormControl<any>;
  fattorino: FormControl<any>;
}> { }

@Component({
  selector: 'app-detail-ordine',
  templateUrl: './detail-ordine.component.html',
  styleUrls: ['./detail-ordine.component.css']
})
export class DetailOrdineComponent {

  constructor(private ordineService: OrdineService,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dataSearchService: DataSearchService) {
  }

  ordineReactive: OrdineForm = this.fb.group({
    id: this.fb.control(null),
    data: this.fb.nonNullable.control(new Date(), [Validators.required]),
    codice: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    costoTotale: this.fb.nonNullable.control('', [Validators.required]),
    closed: this.fb.nonNullable.control('', [Validators.required]),
    cliente: this.fb.nonNullable.control('', [Validators.required]),
    fattorino: this.fb.nonNullable.control('', [Validators.required]),
  });

  urlFlag: string = "";

  ngOnInit(): void {
    let operation = this.route.snapshot.queryParamMap.get('operation');
    let id: number = Number(this.route.snapshot.paramMap.get('id'));
    if (operation?.includes("readOnly")) {
      this.ordineReactive.disable();
      this.urlFlag = "readOnlyActivated";
    }
    if (operation?.includes("edit")) {
      this.urlFlag = "editActivated";
    }
    if (operation?.includes("add")) {
      this.urlFlag = "addActivated";
    }
    if(operation?.includes("search")) {
      this.urlFlag = "searchActivated";
    }
    if (!operation?.includes("add") && !operation?.includes("search")) {
      this.ordineReactive.get('id')?.setValue(id);
      this.ordineService.findById(id).subscribe(res => {
        this.ordineReactive.patchValue(res);
      });
    }

  }

  handleFormRequest(): void {
    if (this.urlFlag == "addActivated") {

      this.ordineService.create(this.ordineReactive.getRawValue()).subscribe({
        next: clienteItem => this.ordineReactive.patchValue(clienteItem),
        complete: () => this.router.navigate([`/ordine/list`], this.snackbarService.openSnackBar('Operazione effettuata correttamente.', ["blue"])!)
      });
    }

    if (this.urlFlag == "editActivated") {
      this.ordineService.update(this.ordineReactive.value).subscribe({
        next: clienteItem => this.ordineReactive.patchValue(clienteItem),
        complete: () => this.router.navigate([`/ordine/list`], this.snackbarService.openSnackBar('Operazione effettuata correttamente.', ["blue"])!)
      });
    }

    if(this.urlFlag == "searchActivated") {
      this.ordineService.search(this.ordineReactive.value).subscribe({
        next: clienteItem => this.dataSearchService.setData(clienteItem),
        complete: () => this.router.navigate(['/ordine/list'], {queryParams: {search:"true"}})
      });
    }
  }

}
