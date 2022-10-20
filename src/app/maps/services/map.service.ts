import { Injectable } from '@angular/core';
import { LngLatBounds, LngLatLike, Map, Marker, Popup} from 'mapbox-gl';
import { Feature } from '../interfaces/places';
import { PlacesService } from './index';
import { DirectionsApiClient } from '../api/directionsApiClient';
import { DirectionResponse, Route } from '../interfaces/directions';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map:Map | undefined;
  private markers:Marker[]=[];

  get isMapReady(){
    return !!this.map;
  }

  constructor(private directionApi:DirectionsApiClient){

  }
  
  set(map:Map){
    this.map = map;
  }

  flyTo(coords:LngLatLike){
      if(!this.isMapReady){
        throw Error("El mapa no esta inicializado");
      }

      this.map?.flyTo({
        zoom:14,
        center:coords
      })
  }

  createMarkersFromPlaces(places:Feature[]){
    if(!this.map){
      throw Error("Mapa no inicializado");
    }

    this.markers.forEach(marker=>marker.remove());
    const newMarkers=[];
    
    for(const place of places){
        const [lng,lat] = place.center;
        const popup = new Popup()
          .setHTML(
            `
              <h6>${place.text}</h6>
              <span>${place.place_name}</span>
            `
          )
        
        const newMarker = new Marker()
            .setLngLat([lng,lat])
            .setPopup(popup)
            .addTo(this.map)

        newMarkers.push(newMarker);
    }

    this.markers = newMarkers;

    if(places.length===0) return;

    const bounds = new LngLatBounds();

    newMarkers.forEach(marker=>bounds.extend(marker.getLngLat()));
    bounds.extend(this.map.getCenter());
    this.map.fitBounds(bounds);
  }

  getRouteBetwenTwoPoints(start:[number,number],end:[number,number]){

      this.directionApi.get<DirectionResponse>(`/${start.join(",")};${end.join(",")}`)
          .subscribe(resp=>this.drawPoliLyne(resp.routes[0]));
  }

  drawPoliLyne(route:Route){

    if(!this.map){
      throw Error("Mapa no inicializado");
    }

    const coords = route.geometry.coordinates;
    const start = coords[0] as [number,number];

    const bounds = new LngLatBounds();
    coords.forEach(([lng,lat])=>{
      bounds.extend([lng,lat])
    })

    this.map?.fitBounds(bounds,{
      padding:200
    });
  }
}
