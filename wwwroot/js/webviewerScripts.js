window.webviewerFunctions = {
  initWebViewer: function () {
      const viewerElement = document.getElementById('viewer');
      WebViewer({
          path: 'lib',
      }, viewerElement).then((instance) => {
          // call apis here
          const {Core, UI} = instance;
          const {Feature} = UI;
          Core.documentViewer.loadDocument('https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf')
          UI.enableFeatures([Feature.FilePicker, Feature.Measurement]);
          var timeBegin = Date.now();

          Core.documentViewer.addEventListener('beginRendering', () => {
            timeBegin = Date.now();
          });

          Core.documentViewer.addEventListener('finishedRendering', () => {
              var timeFinish = Date.now();
              var timeTakenToRender = timeFinish-timeBegin;
              var r = Core.documentViewer.getDocument();
              var n = r.getFilename();
              console.log("finishedRendering: " + n + ". It took " + timeTakenToRender + " ms.")
            });
            
            Core.documentViewer.addEventListener('documentLoaded', () => {
              //Set the zoom level to 3%, and show the content as 2 pages continuous, 
              //so that the entire document is visible - since that forces the entire document
              //to render and not just the part that you can see.
              UI.setZoomLevel(0.03)
              const displayModeManager = Core.documentViewer.getDisplayModeManager();
              const cover = new Core.VirtualDisplayMode(Core.documentViewer, Core.DisplayModes.Cover);
              displayModeManager.setDisplayMode(cover);
            });
      })
  }
};