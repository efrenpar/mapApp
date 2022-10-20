import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent implements OnInit {

  constructor(private mapService:MapService,
    private placesService:PlacesService) { }

  ngOnInit(): void {
  }


  getToMyLocation(){
    if(!this.placesService.isUserLocationReady){
        throw Error("No hay ubicacion de usuario")
    }

    if(!this.mapService.isMapReady){
      throw Error("No se ha inicializado el mapa")
    }
    this.mapService.flyTo(this.placesService.userLocation!)
    console.log("ir a mi unicacion");
  }

}
