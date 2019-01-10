## Gallerize
Gallerize is a web app allowing users to select artworks from API collections, position them onto virtual walls, and then project it into a 3D space, creating a virtual gallery. Built with React, Rails, and React 360.

## Background
The idea for this project came out of a desire to experiment with the way people can curate and interact with images online. While content curated projects such as Tumblr or Pinterest exist, as well as photo editing and collage applications, we were trying to see if we could make a more tactile experience for the user to play with these images. We also wanted to encourage the user to be able to tell a story through images. What we came up with as the MVP was the ability for the user to drag and drop images on a blank canvas wall, positioning them in a certain order, and provide accompanying captions, to explain why these images were chosen. We started with using artwork collection APIs from museums, and then played with other image collection APIs, such as Unsplash.

This evolved into an web app where users could sign up for an account where they would be given three walls, and they could position images and captions any way they want to on those walls. The position and size of the images would be saved, so the user could keep playing with the same three walls.

The reason it was expanded into three walls was because part of our reach objectives was to see if we could project the three walls onto 3D surfaces. I was able to do this later, by integrating the app with ReactVR. 

## Tech/Frameworks Used

<b>Languages</b>
- Ruby
- Javascript

<b>Web Frameworks</b>
- [Ruby on Rails](https://rubyonrails.org/)
- [React](https://reactjs.org/)
- [React 360](https://facebook.github.io/react-360/)

<b>UI Library</b>
- [Semantic UI React](https://react.semantic-ui.com/)

<b>Components</b>
- [Re-Resizable](https://github.com/bokuweb/re-resizable)
- [React Draggable](https://mzabriskie.github.io/react-draggable)
- [Repng](https://github.com/jxnblk/repng)
- [React Full Screen](https://www.npmjs.com/package/react-full-screen)

## Features
- User can create account and log in, using JWT Auth 
- User can  search for images by collection name with dynamic search bar
- User can select image, drag it around on the canvas (the wall), and resize it, with all sizes and positions on the canvas saved to their account
- User can input original text as a caption or as a title, drag it around on the canvas (the wall), and resize it, with all sizes and positions on the canvas saved to their account
- User can edit walls in full screen
- User can view the three walls they are editing as a 3D room, and move the camera around the room.

## API Reference

<b>Image APIs</b>
- [National Network of French Museums (RMN-GP)](https://api.art.rmngp.fr/?locale=en)
- [Harvard Art Museums API](https://mzabriskie.github.io/react-draggable)
- [Unsplash API](https://github.com/jxnblk/repng)


## How to use?
Recommended usage of the app:
1) Create an account by selecting Sign In/Sign Up from the menu at the top of the page, enter your details into the drop down menu, and click 'Sign Up'.
2) Browse the collections of artwork using the search bar at the top of the page. Click an image to put it on the wall, and wait for it to load.
3) Place as many images as you would like on the three walls. You can toggle between walls by selecting the tabs that are marked '1, 2, 3' at the top of the walls. 
4) Add any captions or titles to the wall by selecting 'Add Element' from the menu, and selecting whether you would like to add a caption or title.
5) You can remove unwanted images or text on your wall by hovering over them, and clicking the X that appears.
6) When satisfied with the state of your walls, you can click 'View 3D Gallery' to see it in VR. It may take a while for it to load, so please be patient.

## Contribute

I would welcome any suggestions or contributions to this project ! When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with me [ritz.wu@outlook.com] before making a change.

## Credits
Created with the support of [Sam Barker] (https://github.com/bamsarker) and [Nicolas Marcora] (https://github.com/MinimumViablePerson)

## Contact
If there is any issue with this app please email [ritz.wu@outlook.com].

## License
This project is licensed under the MIT License - © [Ritz Wu](http://www.ritsu.net/) and [Sarah Jacob] (https://github.com/sjacodes)
