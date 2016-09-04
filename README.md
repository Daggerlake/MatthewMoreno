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
script(src='javascripts/jquery-1.11.1.min.js
```
I replaced that line with the line below.
```jade
script(src='../node_modules/jquery/dist/jquery.min.js')
```
