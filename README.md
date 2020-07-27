# Webpack Starter Kit

## Clone This Repo

That's right, _clone_ not fork. You will use this repo multiple times, but you can only fork a repository once. So here is what you need to do to clone the repo and still be able to push changes to your repo:

1. Clone down this repo. Since you don't want to name your project "webpack-starter-kit", you can use an optional argument when you run `git clone` (you replace the `[...]` with the terminal command arguments): `git clone [remote-address] [what you want to name the repo]`
1. Remove the default remote: `git remote rm origin` (notice that `git remote -v` not gives you back nothing)
1. Create a new repo on GitHub with the name of `[what you want to name the repo]` to be consistent with naming
1. Copy the address that you would use to clone down this repo - something like `git@github.com:...`
1. Add this remote to your cloned down repo: `git remote add origin [address you copied in the previous step]` - do not include the brackets

Now try to commit something and push it up to your new repo. If everything is setup correctly, you should see the changes on GitHub.

## Setup

After one person has gone through the steps of cloning down this repo and editing the remote, everyone should clone down the repo. 

Then install the library dependencies. Run:

```bash
npm install
```

To verify that it is setup correctly, run `npm start` in your terminal. Go to `http://localhost:8080/` and you should see a page with some `h1` text and a pink background. If that's the case, you're good to go. Enter `control + c` in your terminal to stop the server at any time.

## Where to Add Your Code

### JavaScript

You have to be very intentional with where you add your feature code. This repo uses a tool called [webpack](https://webpack.js.org/) to combine many JavaScript files into one big file. Webpack enables you to have many, separate JavaScript files to keep your code organized and readable. Webpack expects all of your code files to be in a specific place, or else it doesn't know how to combine them all behind the scenes.

**Create all of your feature code files in the `src` directory.**

Since code is separated into multiple files, you need to use the `import` and `export` syntax to share code across file.

Here is a video that walks through some information about [import and export](https://www.youtube.com/watch?v=_3oSWwapPKQ). There are a lot of resources out there about `import` and `export`, and resources will sometimes call them `ES6 modules`. It's something you will see in React and beyond.

### HTML

Add the HTML you need in the `index.html` file in the `./src` directory. There is some boilerplate HTML that exists from the start that you can modify.

### CSS (SCSS/SASS)

This project is setup to use SCSS/SASS files by default instead of your regular CSS files. Add your SCSS files in the `src/css` directory. There is a `base.scss` file already there, but you can change this file and add multiple SCSS files in this directory.

This might sound weird, but you need to `import` your SCSS files in the JavaScript entry file (`index.js`) for the styles to be applied to your HTML. The example `base.scss` file has already been imported in the JavaScript entry file as an example.

### Images

Add your image files in the `src/images` directory. Similar to CSS files, you need to `import` image files in the JavaScript entry file (`index.js`). Then go into the HTML and add an `img` element with the `src` attribute pointing to the `images` directory. There is an example in the `index.html` file for you to see.

## How to View Your Code in Action

In the terminal, run:

```bash
npm start
```

You will see a bunch of lines output to your terminal. One of those lines will be something like:

```bash
Project is running at http://localhost:8080/
```

Go to `http://localhost:8080/` in your browser to view your code running in the browser.

---

## Test Files Organization

Similar to feature code, your test code needs to be put in a specific place for it to run successfully.

**Put all of your test files in the `test` directory.** As a convention, all test filenames should end with `-test.js`. For instance: `box-test.js`.

## Running Your Tests

Run your test suite using the command:

```bash
npm test
```

The test results will output to the terminal.

---

## Linting Your Code

Run the command in your terminal `npm run lint` to run the linter on your JavaScript code. There will be errors and warnings right from the start in this starter kit - the linter is still running successfully.

Your linter will look at the JavaScript files you have within the `src` directory and the `test` directory. 

## Webpack?

If you look in the `package.json` file, you'll see one of the library dependencies called `webpack`. If you're interested in learning more about what Webpack is and how it works behind the scenes, take a look through the [Webpack configuration documentation](https://webpack.js.org/concepts/).

## Deploying to GitHub Pages

_If you are finished with the functionality and testing of your project_, then you can consider deploying your project to the web! This way anyone can play it without cloning down your repo.

[GitHub Pages](https://pages.github.com/) is a great way to deploy your project to the web. Don't worry about this until your project is free of bugs and well tested!

If you _are_ done, you can follow [this procedure](./gh-pages-procedure.md) to get your project live on GitHub Pages.

# Final README
# FitLit Refactor

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]


<br />
<p align="center">
  <a href="https://github.com/relyt4me/RefactorTractor-FitLit">
  </a>

  <h3 align="center">FitLit</h3>

  <p align="center">
    <br />
    <a href="https://github.com/relyt4me/RefactorTractor-FitLit"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://github.com/relyt4me/RefactorTractor-FitLit/issues">Report Bug</a>
    ·
    <a href="https://github.com/relyt4me/RefactorTractor-FitLit/issues">Request Feature</a>
  </p>
</p>

## Table of Contents

* [About the Project](#about-the-project)
* [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Main Contributors](#contributors)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)

<!-- ABOUT THE PROJECT -->
## About The Project

![FitLit Screenshot]()

* This Refactor Tractor FitLit project is the first major refactoring project given during the 2nd Module (10 weeks into the program) at Turing School of Software Engineering. We were given an already functioning FitLit website, with numerous issues, in which our goal was to refactor to allow for better accessibility, testing with chai-spies, DRY implementation, SRP implementaion while working with new team of Turing students. 
* The FitLit site is a site for tracking all of your FitLit information! User can track their hydration amount, sleep amount, sleep quality, number of steps, number of stairs and active minutes per day or week. All of these measurements are compared to a user's friends and overall community averages.

### Installation

**Fork this repository:**

https://github.com/relyt4me/RefactorTractor-FitLit

**Clone your forked repository**

`git clone` and the copied URL

**Change into the directory and install the project dependencies**

`cd` into directory and run `npm install` for dependencies

<!-- USAGE EXAMPLES -->
## Usage
* Users can see their step goal, all time step record...
![screenshot of left side static information]()

* Users can see there daily and weekly statistics for activities, sleep and hydration
![screenshot of middle main display]()

* Users can see their friends step counts for the week and see how who the last week's step challenge
![screen shot of right side friends display]

* The details of this refactor are outlined in the <a href="https://frontend.turing.io/projects/module-2/refactor-tractor.html" target="\__blank">refactor project spec</a>.
* The details of the original project are outlined in the <a href="https://frontend.turing.io/projects/fitlit.html" target="\__blank">original project spec</a>.

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/relyt4me/RefactorTractor-FitLit/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

* Fork the Project

* Create your Feature Branch (`git checkout -b feature/AmazingFeature`)

* Commit your Changes (`git commit -m 'Add some AmazingFeature'`)

* Push to the Branch (`git push origin feature/AmazingFeature`)

* Open a Pull Request

<!-- MAIN CONTRIBUTIONS -->
## Main Contributors

* Jordan Shryock 
  * jordan.m.shryock@gmail.com 
  * [Jordan's Linkedin](https://www.linkedin.com/in/jordan-shryock-6a48b9113/)
* Carly Clift 
  * carlymclift@gmail.com 
  * [Carly's Linkedin](https://www.linkedin.com/in/carly-clift-8795491a4/)
* Tyler Haglund
  * relyt4me@gmail.com
  * [Tyler's Linkedin](https://www.linkedin.com/in/tyler-he-him-haglund-043b511aa)

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Img Shields](https://shields.io)
* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [Unplash](https://unsplash.com/)


<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/relyt4me/RefactorTractor-FitLit.svg?style=flat-square
[contributors-url]: https://github.com/relyt4me/RefactorTractor-FitLit/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/relyt4me/RefactorTractor-FitLit.svg?style=flat-square
[forks-url]: https://github.com/relyt4me/RefactorTractor-FitLit/network/members
[stars-shield]: https://img.shields.io/github/stars/relyt4me/RefactorTractor-FitLit.svg?style=flat-square
[stars-url]: https://github.com/relyt4me/RefactorTractor-FitLit/stargazers
[issues-shield]: https://img.shields.io/github/issues/relyt4me/RefactorTractor-FitLit.svg?style=flat-square
[issues-url]: https://github.com/relyt4me/RefactorTractor-FitLit/issues
[jordy-linkedin]: https://www.linkedin.com/in/jordan-shryock-6a48b9113/
