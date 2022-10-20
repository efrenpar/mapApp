import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlacesResponse, Feature } from '../interfaces/places';
import { PlacesApiClient } from '../api/placesApiClient';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?:[number,number];

  public isLoadingPlaces:boolean=false;
  public places:Feature[]=[];
  
  get isUserLocationReady():boolean{
      return !!this.userLocation;
  }

  constructor(
    private placesApi:PlacesApiClient,
    private mapService:MapService
    ) {
    this.getUserLocation();
   }


  public async getUserLocation():Promise<[number,number]>{
    return new Promise((resolve,reject)=>{
      navigator.geolocation.getCurrentPosition(
        ({coords})=>{
          this.userLocation = [coords.longitude,coords.latitude];
          resolve(this.userLocation);
        },(err)=>{
            alert("No se puede obtener la geolocalizacion");
            console.log(err);
            reject();
        }
      )
    })
  }

  getPlacesByQuery(query:string=""){

    if(query.length===0){
        this.isLoadingPlaces=false;
        this.places=[];
        return;
    }

    if (!this.userLocation) throw Error("no hay user Location");

    this.isLoadingPlaces = true;
    this.placesApi.get<PlacesResponse>(`/${query}.json`,{
      params:{
        proximity:this.userLocation?.join(",")
      }
    })
        .subscribe(res=>{
            this.isLoadingPlaces = false;
            this.places = res.features;
          this.mapService.createMarkersFromPlaces(this.places);
        
          })
  }


}
