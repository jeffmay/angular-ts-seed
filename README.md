Angular + TypeScript + GruntTS
==============================

[AngularJS](http://angularjs.org/) is a super-heroic JavaScript framework for writing Single Page Apps (SPAs).
It takes care of synchronizing your models and your views. All you have to do is define filters and directives
to do handle DOM manipulation and routes and controllers for handling URL changes and voila, you now have
a template language that makes your HTML dynamic, testable, and reusable.

This seed project only includes the code responsible for building the app.js resource for the front-end, and
requires some way to serve the resource (when you no longer want to open the file locally).

Why TypeScript?
---------------

Angular is great because it makes unit testing easier. It is good to write tests when you want your code to stand
the test of time.

[TypeScript](http://www.typescriptlang.org/) goes a step further by providing you with free (and optional)
unit-tests that verify you aren't calling code that couldn't possibly work. It does so by providing type annotations.
Strongly typed code also helps your IDE (such as [WebStorm](http://www.jetbrains.com/webstorm/) or
[IntelliJ IDEA](http://www.jetbrains.com/idea/)) to provide offline documentation about the method you want to call
or the model you want to construct, and tell you when you are missing semi-colons ;)

TypeScript also allows you to write your code with any ECMAScript 6 enhancements and will automatically generate
ECMAScript version 3 or 5 for you. So you can start writing with arrow functions, modules, import statements
(for CommonJS or AMD), and all the forEach, filter, and other function programming goodness that has become
popular from Node and other event-driven libraries like AngularJS and Q. TypeScript will then compile all these
enhancements down into the version of JavaScript (3 or 5) and the type of module system (AMD or CommonJS) you
want with only the flip of a compiler switch.

To get TypeScript definition files for your favorite libraries, check out
[DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped). These definition files will allow you to refer
to code in plain-old JavaScript libraries, as long as this code is available in scope when the App is running.


Getting Started
---------------

1. First you need to install [Node](https://nodejs.org/) to get the Node Package Manager (NPM).
   (If you are using Mac OSX, I recommend using [Home Brew](http://brew.sh/) to install npm, `brew install node`)

2. Next you need to install the [Grunt CLI](http://gruntjs.com/getting-started) plugin for creating Grunt projects.

        $ npm install -g grunt-cli

3. For web modules, we are going to use [Bower](http://bower.io/)

        $ npm install -g bower

4. Now we can install all the node and bower modules we need for our project

        $ cd path/to/angular-ts-seed
        $ npm install
        $ bower install

5. Finally we can compile our project.

        # the next line will move all the library code from bower_modules into a publicly accessible place
        # as well as any other required setup for getting started
        $ grunt init
        # now we can get started
        $ grunt work

    At this point the terminal will appear to be locked up. It's not. It's just waiting for you to make code changes
    so that it can continuously compile whenever you make a change to the TypeScript source code.
    You can kill it at any time and rerun it without breaking anything.

6. Last but not least, you need something to serve your public assets and API endpoints.

For now, you can just open the [index.html](https://github.com/jeffmay/angular-ts-seed/blob/master/public/index.html)
file to view your application.


Architecture
============

About the Code
--------------

This project makes no prescription about which HTTP Server to use (despite the Play! icon :P). You can plug this
into any web platform of your choice. The code hints at a strategy of driving the application through events by
default, rather than round-trips to the database as the default. This is a good performance strategy, but not
a requirement of this design.


Building
--------

I chose to use CoffeeScript for the Gruntfile (which is supported by Grunt by default), since it is a lot easier
to move configurations around when you don't have to worry about all those annoying curly brackets and commas.
You can use plain JavaScript if you want your configuration to look more like TypeScript.

The build tasks are structured to build code for 3 different use cases:

1. Running and writing test code in a continuous compile setting
2. Working on the App code in a continuous compile setting
3. Deploying your app for production
    (left as an exercise for the reader, since this will depend on your needs)


Adding Libraries
----------------

When you need to add a library, you just need to do the following:

1. Find it on [Bower Components](http://sindresorhus.com/bower-components/)
2. Add it to your dependencies:

        $ bower install --save moar-jquery

3. Then copy the vendor js into your public/lib directory:

        $ grunt bower

4. Grab the TypeScript definition file from
[DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped).

    You will need to drop this definition file in your
    [defs directory](https://github.com/jeffmay/angular-ts-seed/blob/master/public/typescript/def)

    This is a bit of a manual process currently, but there is an awesome project that may help
    to manage these files as well, called [tsd](https://npmjs.org/package/tsd)

5. Add the definition file to your
[reference file](https://github.com/jeffmay/angular-ts-seed/blob/master/public/typescript/app/reference.ts)

If you can't find your library on DefinitelyTyped, you can stub out your own definition file using the
declare syntax to define variables and types that will be in scope when your application is running.

Even better, you should give these back to the community by adding it to the DefinitelyTyped repo.

Coding
------

This project is structured to harness TypeScript's reference file system, so that you can have models classes
and other interfaces at the root level. This works really well when you have a library like Angular that provides
you a module system for dependency injection, where you refer to the dependent objects from arguments of a function.

TypeScript's compiler will concatenate the files in the order of their dependencies (via the `<reference/>` tags).
We can simplify this by creating a single `reference.ts` file with all the files referenced in the order that
the need to be concatenated in the resulting JavaScript file.

If you are working within Angular on the same app, you don't really need to use CommonJS or RequireJS as you can
just concatenate all your code into a single file (which is a good practice anyhow) and save on the module load time.
TypeScript also has a way to make external modules if you need to load them asynchronously. You can convert your app
into an AMD module, you can use the [GruntTS](https://github.com/basarat/grunt-ts) plugin to generate an AMD loader
as well as the definition file. Then when you want to share code between different modules, you would specify
separate GruntTS tasks and add the separate code base's definition file to the dependent project's reference file.
The dependent project's task will kick off the build of the project it depends on, so that you can now import
the AMD module in your TypeScript code with the type signature generated from all the public code in your
AngularTS project.

There are other benefits to using file concatenation, such as implicit Angular wiring using modules.
Checkout this great introductory video that explains the
[Angular + GruntTS workflow](http://www.youtube.com/watch?v=0-6vT7xgE4Y).

To get coding, just run the following command:

    $ grunt work-and-watch

This will watch your filesystem for changes and perform the following tasks:

1. Generate references in your
[reference file](https://github.com/jeffmay/angular-ts-seed/blob/master/public/typescript/app/reference.ts)
for any new files you create

2. Compile your [templates](https://github.com/jeffmay/angular-ts-seed/blob/master/public/typescript/app/templates)
into a TypeScript template module that you can refer to without having to make a separate request to the server.

3. Compile and concatenate all your TypeScript code into a single app.js file in your
[public JS directory](https://github.com/jeffmay/angular-ts-seed/blob/master/public/js)

This will give you immediate feedback when a change you make will break some other piece of code
(which may be annoying), so you can just run this process a single time by running:

    $ grunt compile-work

Some times you will have old code laying around that may appear to be broken and you will get non-obvious failures
where all you really need to do is recompile. So the recommended command for starting work on a project (after
running all the tests as described below), is to run:

    $ grunt work

This will clear out your old JavaScript once before compiling. If the code fails to compile, you will hear the
bell from Grunt, but also your page will fail to load! This means something is *obviously* wrong with the build
and will direct your attention to what is likely a compilation error.


Testing
-------

To test your application, we concatenate your test code with the rest of your normal code and spin up a PhantomJS
browser to run through all the concatenated test code. You can add src file dependencies (such as your external
libraries) to the [Gruntfile.coffee](https://github.com/jeffmay/angular-ts-seed/blob/master/Gruntfile.coffee)

You can open any browser to the [test HTML file](https://github.com/jeffmay/angular-ts-seed/blob/master/public/tests.html)
to drop debugger statements or break points in your code. With a modern browser, you can place breakpoints in your
typescript code as a source map will be made available to the browser.

Whenever you are writing services, filters, controllers, or directives, it is a good idea to verify that they
work in a sandbox setting with automated unit tests. Especially if you want these things to stand the test of time!

A good strategy for test code is to first verify that you even have a use case for writing code. You do this
by writing your test code first (alongside some shell of actual code so that you don't get compilation errors).
To get started on the testing path, just fire up:

    $ grunt test-and-watch

This will do everything that running `work-and-watch` does for your App Code (as mentioned above), but for your
test code. Additionally, it will run your Jasmine unit test suite after every code change. If you need to save
battery, or you are tired of hearing a bell tell you that you are failing, you can compile your tests a
single time with:

    $ grunt compile-test
    $ grunt run-test

These two tasks are run separately because running the tests could take a while, and maybe you just want to
verify that the code compiles. Vice versa, maybe you don't want to recompile, but you want to drop a debugger
in some code that was broken before. Splitting the tasks allows you to dig a little deeper on the run-time
failure and compile-time failure of your test code without forcing them both on you.

For reasons mentioned above, you might have failures for test code files that are laying around because they
have moved or something silly, where the best thing to do is to just remove that old code. *Before writing
any code after you have pulled code changes from upstream*, I highly recommend that you clean your code,
compile the test code, and run the tests. The following command will do just this:

    $ grunt test

Additionally, it will put you in the `test-and-watch` mode, since you should probably start with your test
code anyway :P  You could pretty easily write a `clean-and-test` task, but I'll leave that as an exercise
to the reader.

You should always test your code but sometimes all you need is a basic page with all the well-tested and trusty
Angular built-in tools. In these cases, it will be pretty obvious, as you will probably be doing all your work
in the HTML.

The only thing you need to verify at this point is that your users' experience is safe from breaking changes.
This is where End-To-End (E2E) tests come in. Writing E2E tests will often involve using a Web Driver to click,
swipe, and type its way through your website and expecting to see some feature work as you would expect it.
Writing E2E tests helps take you off the hook when some other code (not YOUR code, of course) causes some
feature to stop working as expected.

While there are no E2E tests in this example project, you can set them up to run as either a separate task
or just have them run in Phantom with the rest of your test code.


Shout Outs
----------

This project is based off of the wonderful [GruntTS](https://npmjs.org/package/grunt-ts) plugin and
Angular workflow ideas put forth by @basarat.

Also I highly recommend checking out the [tsd](https://npmjs.org/package/tsd) project for managing your TypeScript
definition files.
