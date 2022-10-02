import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Registro } from '../models/registro.model';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private _storage: Storage | null = null;
  private _localHistorial: Registro[] = [];

  constructor(private navCtrl: NavController, private iab: InAppBrowser, private storage: Storage) {
    this.init();

  }

  get getLocalHistorial(){
    // eslint-disable-next-line no-underscore-dangle
    return [...this._localHistorial];
  }

  async guardarRegistro(format: string, content: string){

    const nuevoRegistro = new Registro(format, content);
    //Tarea 1 - Guardar registros en memoria del equipo y mostrar en tab2
    // eslint-disable-next-line no-underscore-dangle
    this._localHistorial = [nuevoRegistro, ...this._localHistorial];
    // eslint-disable-next-line no-underscore-dangle
    this._storage.set('historial', this._localHistorial);
    //
    this.abrirRegistro(nuevoRegistro);
    // console.log(content);
  }

  async init() {
    const storage = await this.storage.create();
    // eslint-disable-next-line no-underscore-dangle
    this._storage = storage;
    await this.cargarRegistros();
  }

  async cargarRegistros(){
    try{
    // eslint-disable-next-line no-underscore-dangle
    const historialGuardado = await this._storage.get('historial');
    // eslint-disable-next-line no-underscore-dangle
    this._localHistorial = historialGuardado || [];
    } catch (error) {
      console.log(error);
    }

  }


  abrirRegistro(registro: Registro){

    this.navCtrl.navigateForward('/tabs/tab2');

    switch(registro?.type){
      case 'http':
        const browser = this.iab.create(registro.content);
        browser.show();
        console.log('Url:', registro.content);
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
