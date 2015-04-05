# Exercise 1 - The Basics, Getting A Server Up #
We'll be using the [express-generator](http://expressjs.com/starter/generator.html) package to layout a basic Node Express app.
For this example I used v4.11.0 of that package.
All instructions are relative to the top-level of the repository.

First we'll grab that package.

1. Run: `npm install express-generator@4.11.0 -g`
2. Run: `express -e` enter 'yes' when asked about the empty directory. _Note: Here I am only setting one option, `-e`, which tells express that I intend to use EJS templates. EJS feels the closest to HTML while still giving you some power within those pages to render things with. Many others may prefer Jade or handlebars which are also `express` options, but I will be using EJS._
3. Run: `npm install` to download all the components that our [express](http://expressjs.com/) app came prescribed with.
4. You can run either `npm start` or `node bin/www` to start your server and goto [localhost:3000](http://localhost:3000) to see the "hello world" express page. _Note: `npm start` is simply a shorthand to run the command specified inside your **package.json**, in our case the **express-generator** set that command to `node ./bin/www`, open your **package.json** and view the 
```
"scripts": {
    "start": 
}
```
to see that property.

### Troubleshooting
Win8.1 x64 users may need to try the following if node-gyp fails:

1. Install VS 2012 Express for Windows - [http://www.microsoft.com/en-us/download/details.aspx?id=34673]()
2. Install Windows SDK for Windows 8.1 - [https://msdn.microsoft.com/en-us/windows/desktop/bg162891.aspx]()