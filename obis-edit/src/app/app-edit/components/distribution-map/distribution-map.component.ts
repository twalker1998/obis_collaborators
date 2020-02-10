import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { loadModules } from 'esri-loader';

@Component({
  selector: 'app-distribution-map',
  templateUrl: './distribution-map.component.html',
  styleUrls: ['./distribution-map.component.css']
})
export class DistributionMapComponent implements OnInit {
  @Input() sname: string;

  @Output() mapLoadedEvent = new EventEmitter<boolean>();

  constructor() { }

  async initializeMap() {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [
        Map,
        MapView,
        FeatureLayer,
        Home,
        Extent,
        Fullscreen
      ] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/layers/FeatureLayer',
        'esri/widgets/Home',
        'esri/geometry/Extent',
        'esri/widgets/Fullscreen'
      ]);

      // map extent: Need this since no basemap; otherwise extent is pretty wonky
      const bounds = new Extent({
        xmin: -103.5,
        ymin: 33.0,
        xmax: -93.5,
        ymax: 37.5,
        spatialReference: { wkid: 4326 } // this is for the extent only; need to set map spatial reference in view.
      });

      const speciesquery = 'sname=\'' + this.sname + '\'';

      // Oklahoma Counties Layer
      const okcounties = new FeatureLayer({
        url: 'https://obsgis.csa.ou.edu:6443/arcgis/rest/services/ONHI/ArcGISServer_Counties/MapServer'
      });

      const octemplate = {
        // autocasts as new PopupTemplate()
        title: '<em>{sname}</em> ({vernacularname}): {datasetname}',
        content: [
          {
            type: 'fields',
            fieldInfos: [
              {
                fieldName: 'eventdate',
                label: 'Date of Occurrence:'
              },
              {
                fieldName: 'recordedby',
                label: 'Recorded By:'
              },
              {
                fieldName: 'catalognumber',
                label: 'Catalog Number:'
              },
              {
                fieldName: 'institutioncode',
                label: 'Institution:'
              },
              {
                fieldName: 'locality',
                label: 'Locality:'
              },
              {
                fieldName: 'habitat',
                label: 'Habitat:'
              },
              {
                fieldName: 'basisofrecord',
                label: 'Basis of Record:'
              }
            ]
          }
        ]
      };

      // Occurrences Layer
      const ocquery = new FeatureLayer({
        url: 'https://obsgis.csa.ou.edu:6443/arcgis/rest/services/ONHI/All_Occurrences/MapServer/0/',
        definitionExpression: speciesquery,
        title: 'OBIS Occurrences',
        outFields: ['*'],
        popupTemplate: octemplate
      });

      const map = new Map({
        // basemap: "satellite",
        layers: [okcounties, ocquery]
      });


      const view = new MapView({
        container: 'viewDiv',
        map,
        extent: bounds,
        spatialReference: 3857 // spatial reference of map; different from the extent
      });

      // Home button
      const homeBtn = new Home({
        view
      });

      // Add the home button to the top left corner of the view
      view.ui.add(homeBtn, 'top-left');

      const fullscreen = new Fullscreen({
        view
      });

      view.ui.add(fullscreen, 'top-right');

      return new MapView(view);
    } catch (error) {
      console.log('EsriLoader: ', error);
    }
  }

  ngOnInit() {
    // Initialize MapView and return an instance of MapView
    this.initializeMap();
  }
}
