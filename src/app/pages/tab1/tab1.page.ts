import { AfterViewInit, Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController, Platform } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements AfterViewInit {
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  scanActive: boolean = false;

  constructor(
    private alertCtrl: AlertController,
    private platform: Platform,
    private dataLocalService: DataLocalService
    ) {}

  ngAfterViewInit() {
    if (this.platform.is('capacitor')) {
      BarcodeScanner.prepare();
    }
  }

  async scan() {
    if (this.platform.is('capacitor')) {
      console.log('Comenzando a escanear');
      const allowed = await this.checkPermisos();
      if (allowed) {
        this.scanActive = true;
        // console.log('Status permisos', allowed);
        const result = await BarcodeScanner.startScan();
        if (result.hasContent) {
          console.log(result.content);
          this.dataLocalService.guardarRegistro(result.format,result.content);
          this.scanActive = false;
        }
      }
    } else {
      console.log('Corriendo en la web');
      this.dataLocalService.guardarRegistro('geo','geo:43.374982821480074,-74.18034925898438?q=43.374982821480074,-74.18034925898438');
    }
  }

  checkPermisos() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        const alert = await this.alertCtrl.create({
          header: 'Sin permisos',
          message:
            'Por favor permita el acceso a la camara en sus preferencias',
          buttons: [
            {
              text: 'No',
              role: 'Cancel',
            },
            {
              text: 'Abrir preferencias',
              handler: () => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                BarcodeScanner.openAppSettings(), resolve(false);
              },
            },
          ],
        });

        await alert.present();
      } else {
        resolve(reject);
      }
    });
  }
}
