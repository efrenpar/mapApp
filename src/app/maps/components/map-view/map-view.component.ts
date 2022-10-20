import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {Map, Popup, Marker} from 'mapbox-gl';
import { PlacesService } from '../../services';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit{

  @ViewChild("mapDiv") mapDivElement!:ElementRef;
  constructor(private palcesService:PlacesService,
    private mapService:MapService) { }
  
  ngAfterViewInit(): void {
    
    if(!this.palcesService.userLocation) throw Error("No hay placesService.userrlocation"); 
    
    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.palcesService.userLocation, // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

    const popup = new Popup()
      .setHTML(`
        <h6>Aqui estoy</h6>
        <span>Estoy en este lugar del mundo</span>
      `)

    new Marker({color:'red'})
      .setLngLat(this.palcesService.userLocation)
      .setPopup(popup)
      .addTo(map)

    this.mapService.set(map);
  }


}


