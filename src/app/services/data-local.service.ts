import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Registro } from '../models/registro.model';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  constructor(private navCtrl: NavController) { }

  async guardarRegistro(format: string, content: string){

    const nuevoRegistro = new Registro(format, content);
    //Tarea 1 - Guardar registros en memoria del equipo y mostrar en tab2
    this.abrirRegistro(nuevoRegistro);

  }

  abrirRegistro(registro: Registro){

    this.navCtrl.navigateForward('/tabs/tab2');

    switch(registro.type){
      case 'http':
        console.log('Url:', registro);
        //Tarea 2 - Abrir el registro en el navegador nativo del dispositvo
        break;
      case 'geo':
        this.navCtrl.navigateForward(`/tabs/tab2/mapa/${registro.content}`);

        console.log('Geo:', registro);
        //Abrir el mapa
        break;
    }
  }

}
