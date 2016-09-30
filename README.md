# Chapter 6
## Live version
The live version of the app can be accessed [here]( https://glacial-beach-72033.herokuapp.com/). Below is a screenshot of the project in the wild.
![Chapter 5 screenshot](/public/images/chapter_6_screenshot.png)

## Notes
* The path in the title of Listing 6.1 is incorrect; the correct path should read `app_api/routes/index.js`.
* The location that I used to test posting was Metronome Cafe.
  * **lat**: 47.255039
  * **long**: -122.48330

# Chapter 5
## Live version
The live version of the app can be accessed [here]( https://glacial-beach-72033.herokuapp.com/). Below is a screenshot of the project in the wild and the mLab database documents view.
![Chapter 5 screenshot](/public/images/chapter_5_screenshot.png)
![mLab database documents view](/public/images/chapter_5_mlab.png)

## Notes
* I used the following locations in the database.
  * Oppenheimer Cafe
    * **lat**: 47.263599
    * **long**: -122.483337
  * Diversions Cafe
    * **lat**: 47.263475
    * **long**: -122.479086
  * Metropolitan Market
    * **lat**: 47.269738
    * **long**: -122.489818
  * Tully's Coffee
    * **lat**: 47.255685
    * **long**: -122.440836
  * B Sharp Coffee House
    * **lat**: 47.257505
    * **long**: -122.442026
  * Seattle Public Library
    * **lat**: 47.606889
    * **long**: -122.332533

# Chapter 4
## Live version
The live version of the app can be accessed [here]( https://glacial-beach-72033.herokuapp.com/). Below is a screenshot of the project in the wild.
![Chapter 4 screenshot](/public/images/chapter_4_screenshot.png)

## Notes
* There is a typo in the tile of Listing 4.7 in *Getting MEAN*. The listing should refer to `app_server/views/location-info.jade` instead of `app_server/views/location-info.js`.
* As mentioned in Professor Mullen's notes for Chapter 4, Google Maps requires an API key to generate a static image to embed in the page.
* The coordinates for the example location were changed to 47.263599, -122.483337 to reflect the location of Oppenheimer cafe.
* Review from Charlie Chaplin -> review from The Grizz
* Listing 4.8 gives an incorrect path `app_server/views/location-review.form.js`; the correct path for Listing 4.8 is `app_server/views/location-review-form.jade`.
* Added additional Lorem ipsum from [lipsum.com](http://lipsum.com)
* Widened about page text block (`.col-md-6` -> `.col-md-10`)


# Chapter 3
## Live Version
The live version of the app can be accessed [here]( https://glacial-beach-72033.herokuapp.com/). Below is a screenshot of the project in the wild.
![Chapter 3 screenshot](/public/images/chapter_3_screenshot.png)

## Notes

Received two deprecation warnings on running `npm install`.
* jade@1.11.0: Jade has been renamed to pug, please install the latest version of pug instead of jade
* transformers@2.1.0: Deprecated, use jstransformer

Apparently jQuery is now listed as a npm package, so I installed it using npm (`npm install jquery`) instead of downloading it manually and placing it in the `public/javascripts` folder of the application as suggested by the book. To accommodate this change, I had to modify the book's suggeted code for `app_server/views/layout.jade`. The book suggested the following line.
```jade
script(src='javascripts/jquery-1.11.1.min.js)
```
I replaced that line with the line below.
```jade
script(src='../node_modules/jquery/dist/jquery.min.js')
```

**UPDATE:** Based on feedback received from Professor Mullen that jQuery was not accessible via node_modules, I switched over to using Bower to manage front-end javascript dependencies. The layout.jade file has been updated to reference .
```jade
script(src='/bower_components/jquery/dist/jquery.min.js')
```
To make this work with the Express middleman, I had to update the Express configuration in app.js, adding the following line.
```javascript
app.use('/bower_components',  express.static(path.join(__dirname , 'bower_components')));
```
This should configure the Express middleman to serve up dependencies that reside in the `bower_components` folder, referenced beginning with `/bower_components` as static files.
