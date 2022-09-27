import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { MapRoutingModule } from './map-routing.module';



@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    MapRoutingModule
  ]
})
export class MapModule { }
