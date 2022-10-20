import { Component, OnInit, ɵɵi18nEnd } from '@angular/core';
import { PlacesService } from '../../services';
import { Feature } from '../../interfaces/places';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  public selectedId:string="";

  constructor(private placesService:PlacesService,
              private mapservice:MapService) { }

  get isLoadingPlaces():boolean{
    return this.placesService.isLoadingPlaces;
  }

  get places():Feature[]{
    return this.placesService.places;
  }

  flytTo(place:Feature){

      this.selectedId = place.id
      const [lng,lat] = place.center;
      this.mapservice.flyTo([lng,lat]);
  }

  getDirections(place:Feature){

    const start = this.placesService.userLocation!;
    const end = place.center as [number,number];

    this.mapservice.getRouteBetwenTwoPoints(start,end);
  }

  ngOnInit(): void {
  }

}
