# QX HexaGon

QX HexaGon is a marrige between a [UserScript](@greasemonkey) and a UserStyle that gives [qruiser.com](https://www.qruiser.com/) a new cleaner layout and adding some keyboard navigation shortcuts.

![QX HexaGon preview](screens/hexagon-logo.png)

## QX HexaGon UserStyle
A modernized theme for qruiser.com

#### Install [the UserStyle](https://raw.githubusercontent.com/BlackSkorpio/qx-hexagon/master/dist/css/qx-hexagon.user.css)

## QX HexaGon Companion UserScript
Fixes that goes hand in hand with the QX Hexagon userstyle.

The UserScript is required to be able to enjoy the above UserStyle since here we are cleaning up a lot of the annoyencies that comes with the original layout and adding a lot of goodies!

### FIXES
* Removing the `.odd` and `.even` classes in favor for the `.qxh-flex-item` and `.qxh-grid-item`.
* Removing a lot of redundant and obsolete elements that is no longer neccesary now when using display grid and flexbox.
* Replacing all `.png` images with more modern `.svg` equilaments, these icons is even adapting there colors to the current color scheme used in profiles and clubs.

### Additions
* Adding browser titles to all pages for easy bookmarking and cleaner browser history.
* Adding source and template classes to the body tag. I.e: `.qxh-source-clubs` and `.qxh-clubs-scribble`.
* Adding keyboard navigation to all _important_ pages:
 * **H** - Takes you directly to **_your own profilepage_**
 * **F** - Takes you to your **_current online favorites_**, or if non of them are online at the moment, it takes you to the **_all favorites_** page.
 * **V** - Takes you to the **_Your last visitors_** page
 * **C** - Takes you to the **_updated clubs page_**, if any, if no clubs is found updated it takes you the **_Your clubs page_**.
 * **
* **Scroll keys**
 * **Q** - Back to the top
	* **W** - Scroll upwards slowly
	* **A** - Scroll up one "page"/One viewport height
 * **E** - Down to the end
	* **S** - Scroll downwards slowly
	* **D** - Scroll down one "page"/One viewport height
 * **
* **Sections Keyboard shortcuts**
 * **1** - Members Section
 * **2** - Clubs Section
 * **3** - Pictures Section
 * **4** - Movies Section
 * **5** - Blogs Section
 * **6** - Forums Section
 * **7** - Conversations Section
 * **8** - Info Section

#### Install [the UserScript](https://github.com/BlackSkorpio/qx-hexagon/raw/master/dist/userscript/qx-hexagon-companion.user.js)
