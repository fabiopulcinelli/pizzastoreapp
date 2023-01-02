import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { Ordine } from 'src/app/model/ordine';
import { DataSearchService } from 'src/app/shared/services/data-search.service';
import { DialogComponent } from '../dialog/dialog.component';
import { OrdineService } from '../ordine.service';

@Component({
  selector: 'app-list-ordine',
  templateUrl: './list-ordine.component.html',
  styleUrls: ['./list-ordine.component.css']
})
export class ListOrdineComponent {

  constructor(private ordineService: OrdineService, private router: Router, public dialog: MatDialog, private route: ActivatedRoute, private dataSearchService: DataSearchService) {}
  dataSource: MatTableDataSource<Ordine> = new MatTableDataSource<Ordine>();
  displayedColumns: string[] = ['id', 'data', 'codice', 'costoTotale', 'closed', 'cliente', 'fattorino', 'azioni'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  urlSearchOperationFlag: string | null = ""

  //dati proprietario
  clientiDataSource: MatTableDataSource<Cliente> = new MatTableDataSource<Cliente>()
  displayedClientiColumns: string[] = ['id', 'nome', 'cognome', 'indirizzo', 'attivo'];
  ricavi: number = 0;
  ordini: number = 0;
  pizze: number = 0;

  ngOnInit(): void {
    let operation = this.route.snapshot.queryParamMap.get('search');
    this.urlSearchOperationFlag = operation;
    if(operation == 'true') {
      this.dataSource.data = this.dataSearchService.getData();
    } else if(operation == 'false') {
      this.clientiDataSource.data = this.dataSearchService.getData();
      this.ricavi = this.dataSearchService.getRicavi();
      this.ordini = this.dataSearchService.getOrdini();
      this.pizze = this.dataSearchService.getPizze();
    } else {
      this.getData();
    }
  }

  openDialog(idOrdine: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      data: {idOrdine}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ordineService.getAllOrdini().subscribe(res => {
        this.dataSource.data = res;
      })
    });
  }


  getData() {
    this.ordineService.getAllOrdini().subscribe(res => {
      console.log(res),
      this.dataSource.data = res;
    });
  }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  showDetail(id: number) {
    this.router.navigate(["ordine/", id], {queryParams: {operation:"readOnly"}});
  }

  onClickDelete(id: number) {
    this.openDialog(id);
  }

  onClickAddNew() {
    this.router.navigate(["ordine/create"], {queryParams: {operation:"add"}});
  }

  onClickUpdate(id: number) {
    this.router.navigate(["ordine/edit/", id], {queryParams: {operation:"edit"}});
  }

  resetDataSource() {
    this.getData();
    this.urlSearchOperationFlag = "";
  }

}
