import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
Mapboxgl.accessToken = 'pk.eyJ1IjoiZWZyZW5wYXIiLCJhIjoiY2w1anZubHF1MDQwNzNrcGVyaHNncGc0diJ9.7cTRP4sGAMCg2uxWWIpjrQ';


if(!navigator.geolocation){
  alert("Navegador no soporta Geolocalizacion")
  throw new Error("Navegador no soporta Geolocalizacion")
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
