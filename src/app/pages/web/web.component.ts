import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { NavController } from '@ionic/angular';
import { Registro } from 'src/app/models/registro.model';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.scss'],
})
export class WebComponent implements OnInit {
  constructor(private iab: InAppBrowser, private nvCtrol: NavController) {}

//   async conseguirRegistro(format: string, content: string){
//   const nuevoRegistro = new Registro(format, content);
//   this.nuevoRegistro(nuevoRegistro);
// }

//   nuevoRegistro(registro: Registro){
//   }



  ngOnInit() {

    // const browser = this.iab.create(`https://www.google.com/`);
    // browser.show();


    // //const back = this.nvCtrol.navigateForward(`/tabs/tab2`);
    // if(!browser){
    //   this.nvCtrol.navigateBack(`/tabs/tab2`);
    // }
    // // if(browser.close){
    // //   const back = this
    // //   this.
    // // }

  }

}
