# Pixel Showdown #
[Documentation](./documentation)

[Live Site](https://pixel-showdown.herokuapp.com)

## About ##
Pixel Showdown is an original, full stack web application that allows users to create pixel art and compete in pixel art competitions. The central feature to the site is the dynamic pixel art editor which includes tools common to most drawing software coupled with animation capabilities. Other key features incldue the ability for users to create, judge, and compete in competitions with customized rulesets. Things that can be customized includes the allowed image editor tools, time limit, and color palette available. Along with all of this, users are able to follow one another, sketch freely, and set their profile pictures to an image of their own creation. Overall, Pixel Showdown is a place to express your creativity and competitiveness through pixel art.

## Installation ##
1. Clone the GitHub repository.
2. Create a database user with your desired password using PostgreSQL.
3. Create a new database with the user from the previous step as the owner.
4. Create an AWS IAM user and public Bucket with permissions granted to the IAM user.
5. Create a .env file using the guidelines of the example.env file, adding in the information from the previous three steps.
6. Run ***npm install*** in the react-app directory.
7. In the main directory run ***pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt***.
8. Open your pipenv shell by running *** pipenv shell ***
9. Run ***flask db upgrade***.
10. Run ***flask seed all***.
11. Run *** flask run *** to start the backend server.
12. To start the react server, exit your pipenv shell and run ***npm start*** in the react-app directory.

## Technologies Used ##
Petential places uses various technologies to create a dynamic and fun web application. The front end utilizes React and Redux while the back end relies on Express, Sequelize and PostgreSQL. Other key technologies include AWS for image uploading and the TomTom Maps API for displaying map information.

## Key Features ##

### Image Uploading ###
One of the most important features of a review site like Yelp and Petential places is the capability for users to upload images. When adding an image to a review or business, users are able to add a link to an existing picture or upload an image from their local computer. Petential Places allows for this through the use of AWS. Upon selecting the upload image button, users are permitted to select a png, jpeg, or gif file to upload. After making this selection, the image file is incorporated into a FormData object which is then sent to the backend server via an HTTP POST request. The Express server then converts this image into base64 and uploads it to AWS using a unique identifier as its name. This implementation allows for seamless image uploading and a snappy user experience.

![Uploading GIF](./documentation/README_Images/UploadDemo.gif)

***A demonstration of the image uploading feature from the user's perspective.***

![Uploading Code Snippet](./documentation/README_Images/openUpload.png)

***A code snippet from Petential Places that opens up the local device image upload window.***

### Image Viewing ###
Uploading images would not serve much of a purpose if they could not be viewed afterwards. As such, one of the most important features of Petential Places is the image viewing modal. This dynamic feature allows for users to browse through all of the images posted for a business or choose to focus on one at a time to see additional information. All of this is handled through fetching the image data from the backend, storing it in Redux, and changing what is displayed using React state.

![Image Modal GIF](./documentation/README_Images/ImageModalDemo.gif)

***A demonstration of the image browsing modal from the user's perspective.***

![Image Modal Code Snippet](./documentation/README_Images/toggleImageModal.png)

***A code snippet that toggles the image modal display mode.***

## Challenges ##
There were numerous challenges in the development of Petential Places that had to be addressed along the way. One of the most interesting issues was how to effectively display a business' location. The solution for this came in the form of the TomTom Maps API. This technology was selected for its dynamism and the ease with which a product key could be obtained. One central issue with weaving this API into the application, came in ensuring that the maps would not load before receiving coordinate data from the server. This was accomplished via using React state to prevent display of the map until a response had been received from the server.

Perhaps the most fun challenge in the project was creating a seeder data generator. This script involved selecting a random business name via a combination of a pet-related adjective and a business type. Following this, a randomized location, cat breed, and street name were all generated. A randomized number of reviews were then created for the business using a similar method. Each review also could contain up to five photos which were pulled from The Cat API based on the breed of cat associated with the business. All of this data was output into a JSON file which could then be integrated into the database.
