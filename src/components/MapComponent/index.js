import React, { useRef, useEffect } from "react";
import Bookmarks from '@arcgis/core/widgets/Bookmarks';
import Expand from '@arcgis/core/widgets/Expand';
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import Editor from '@arcgis/core/widgets/Editor';
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import Compass from "@arcgis/core/widgets/Compass";
import Legend from "@arcgis/core/widgets/Legend";
import Search from "@arcgis/core/widgets/Search";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";
import LayerList from "@arcgis/core/widgets/LayerList";


import "./style.css";

function useCombinedRefs(...refs) {
  const targetRef = React.useRef()

  React.useEffect(() => {
    refs.forEach(ref => {
      if (!ref) return

      if (typeof ref === 'function') {
        ref(targetRef.current)
      } else {
        ref.current = targetRef.current
      }
    })
  }, [refs])

  return targetRef
}


const MapComponent = React.forwardRef( (props, ref)=> {

  const mapDiv = useRef(null);

  const combinedRef = useCombinedRefs(ref, mapDiv)

  useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize application
       */
      const webmap = new WebMap({
        portalItem: {
          id: "017a7872319c45dab673bcfea3f6fe87"
        }
      });

      const view = new MapView({
        container: mapDiv.current,
        map: webmap
      });

      // var btn = document.createElement('button');
      // btn.innerText = 'Print Page';
      // btn.addEventListener('click', () => {
      //   // printJS('root', 'html');
      //   window.print()
      // });

      let scaleBar = new ScaleBar({
        view: view
      });
      // Add widget to the bottom left corner of the view
      view.ui.add(scaleBar, {
        position: "bottom-left"
      });


      const searchWidget = new Search({
        view: view
      });
      // Adds the search widget below other elements in
      // the top left corner of the view
      view.ui.add(searchWidget, {
        position: "top-left",
        index: 0 // make sure goes on top
      });


      let compass = new Compass({
        view: view
      });
      
      // adds the compass to the top left corner of the MapView
      view.ui.add(compass, "top-left");


      let legend = new Legend({
        view: view
      });
      
      const legendExpand = new Expand({
        view,
        content: legend,
        expanded: false
      });

      view.ui.add(legendExpand, "bottom-right");


      const editor = new Editor({
        view: view,
        allowedWorkflows: ["update"] // allows only updates and no adds
      });

      // view.ui.add(editor, "top-right");
      
      const editorExpand = new Expand({
        view,
        content: editor,
        expanded: false
      });

      // Add editorExpand to the top-right corner of the view
      view.ui.add(editorExpand, "top-right");

      // add basemap gallery
      let basemapGallery = new BasemapGallery({
        view: view
      });

      const bmgExpand = new Expand({
        view,
        content: basemapGallery,
        expanded: false
      });

      // Add basemap gallery to the top-right corner of the view
      view.ui.add(bmgExpand, "top-right");

      


      view.when(() => {
        const layerList = new LayerList({
          view: view
        });
        const layerExpand = new Expand({
          view,
          content: layerList,
          expanded: false
        });
        // Add widget to the top right corner of the view
        view.ui.add(layerExpand, "top-right");
      });
    }
  }, [ref]);

  return <div id="MapID" className="mapDiv" ref={combinedRef}></div>;
})

export default MapComponent;
