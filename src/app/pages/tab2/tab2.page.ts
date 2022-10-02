import { Component } from '@angular/core';
import { Registro } from 'src/app/models/registro.model';
import { DataLocalService } from 'src/app/services/data-local.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public dataLocal: DataLocalService ) {}

  get historial(): Registro[]{
    //  console.log(this.dataLocal.getLocalHistorial);
    return this.dataLocal.getLocalHistorial;
  }

  abrirHistorial(registro: Registro){
    console.log('historial', registro);
    this.dataLocal.abrirRegistro(registro);

}

}
