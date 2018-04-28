# Course Instructions 1.1
## Add columns to your web page

* Create files and folder under the following file structure
```
web-tweet-static
│   index.html
└───css
    │   columns.css
    │   main.css
```
* Download `normalizer.css` from https://necolas.github.io/normalize.css/8.0.0/normalize.css and move it under css folder
```
Normalize.css makes browsers render all elements more consistently and in line with modern standards. It precisely targets only the styles that need normalizing.
```
* Open `index.html` file and add the following starter code:
    * If you are using Visual Studio Code or Sublime Text, you can get the code snippet by typing `html`.
    * If you don't have the code snippet, you can type them in your editor.
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Web Tweet</title>
    <link rel="stylesheet" type="text/css" media="screen" href="css/normalize.css">
    <link rel="stylesheet" type="text/css" media="screen" href="css/columns.css">
    <link rel="stylesheet" type="text/css" media="screen" href="css/main.css">
</head>
<body>
    <div>

    </div>
</body>
</html>
```
* Open your `index.html` file in browser and you should see a blank web page with `Web Tweet` as the title on the top
* Now, let's change the background color
    * Open `main.css` and insert the following code
    * Add additional white background style class `.bg-white` for later usage
```
body {
    background-color: #F8F8F8;
}

.bg-white {
    background-color: #FFF;
}
```
* Refresh your page and you should see the change of the background color
    * You can replace `#F8F8F8` with other color hexcode from here https://htmlcolorcodes.com/
* Add container and column class in `index.html` file `<body>` tag
```
<div class="container">
    <div class="col-2of5 bg-white">
        <p>Column 2 of 5</p>
    </div>
    <div class="col-3of5 bg-white">
        <p>Column 3 of 5</p>
    </div>
</div>
```
* Add 5 column base code in `columns.css` file
    * `container` is centered in the screen with 90% of the screen with and maximun width 1024px
    * Use `[class*='col-']` syntax to select all classes that start with `col-`
    * Leave 2% margin on both left and right
```
.container {
    width: 90%;
    max-width: 1024px;
    margin-left: auto;
    margin-right: auto;
}

[class*='col-'] {
    float:left;
}

.col-1of5 {
    width: 18%;
    margin-left: 1%;
    margin-right: 1%; 
}

.col-2of5 {
    width: 38%;
    margin-left: 1%;
    margin-right: 1%; 
}

.col-3of5 {
    width: 58%;
    margin-left: 1%;
    margin-right: 1%; 
}

.col-4of5 {
    width: 78%;
    margin-left: 1%;
    margin-right: 1%; 
}
```
* Refresh the page and you should see two white columns.

## Key knowledges
* Order of CSS files in HTML
* Use case of `%` and `px` in CSS
* CSS class selector and group selector `[class*='col-']`
* `background-color`
* Use case of `margin` and `margin-top`, `margin-right`, `margin-bottom` and `margin-left`
* Use case of `float: left`
* Difference between `width`, `min-width` and `max-width`

