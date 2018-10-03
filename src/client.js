import {ReactInstance, Location, Surface} from 'react-360-web';

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    fullScreen: true,
    ...options,
  });

  // Create three roots: two flat panels on the left and the right, and a Location
  // to mount rendered models in 3D space
  const leftPanel = new Surface(1000, 1000, Surface.SurfaceShape.Flat);
  leftPanel.setAngle(
    -Math.PI / 2, /* horiz angle */
    0 /* vertical angle */
  );
  const rightPanel = new Surface(1500, 800, Surface.SurfaceShape.Flat);
  rightPanel.setAngle(Math.PI / 2, 0);

  const frontPanel = new Surface(1500, 800, Surface.SurfaceShape.Flat);
  frontPanel.setAngle(0, 0);

  r360.renderToSurface(
    r360.createRoot('TopPosts'),
    leftPanel,
  );
  r360.renderToSurface(
    r360.createRoot('CurrentPost'),
    rightPanel,
  );
   r360.renderToSurface(
    r360.createRoot('CurrentPost'),
    frontPanel,
  );

  r360.compositor.setBackground('./static_assets/whiteroom.jpg');
}

export default init
