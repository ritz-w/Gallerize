import React, { Component } from 'react'
import {ReactInstance, Location, Surface} from 'react-360-web';


export default class ThreeDViewer extends Component {

    init(bundle, parent, options = {}) {
    const r360 = new ReactInstance(bundle, parent, {
        fullScreen: false,
        ...options,
    });

    const leftPanel = new Surface(1000, 1000, Surface.SurfaceShape.Flat);
    leftPanel.setAngle(
        -Math.PI / 2, /* horiz angle */
        0 /* vertical angle */
    );
    const rightPanel = new Surface(1000, 1000, Surface.SurfaceShape.Flat);
    rightPanel.setAngle(Math.PI / 2, 0);

    const frontPanel = new Surface(1000, 1000, Surface.SurfaceShape.Flat);
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
        r360.createRoot('GalleryWall'),
        frontPanel,
    );

    r360.compositor.setBackground('./static_assets/whiteroom.jpg');
    }

    render() {
        return (
            <div className='360-container'>{this.init}</div>
        )
    }
}