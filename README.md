# QX HexaGon

**QX HexaGon** is a marrige between a [@greasemonkey UserScript](http://www.greasespot.net/) and a [@openstyles UserStyle](https://add0n.com/stylus.html) that gives [qruiser.com](https://www.qruiser.com/) a new cleaner layout and adding some usefull keyboard navigation shortcuts together with some usability tweaks to make the whole experience more enjoyable.

| QX HexaGon | QX HexaGon Clean | QX HexaGon Companion |
| :--------: | :--------------: | :------------------: |
| [![Install directly with Stylus](https://img.shields.io/badge/Install%20directly%20with-Stylus-285959.svg)](https://raw.githubusercontent.com/BlackSkorpio/qx-hexagon/master/dist/css/qx-hexagon.user.css) | [![Install directly with Stylus](https://img.shields.io/badge/Install%20directly%20with-Stylus-285959.svg)](https://raw.githubusercontent.com/BlackSkorpio/qx-hexagon/master/dist/css/qx-hexagon-clean.user.css) | [![Install directly with Greasemokey](https://img.shields.io/badge/Install%20Directly%20With-Greasemonkey-%236e4e8e.svg)](https://github.com/BlackSkorpio/qx-hexagon/raw/master/dist/userscript/qx-heagon-companion.user.js) |
| **T h e** | **B l e e d i n g** | **E d g e** |
| [![Install directly with Stylus](https://img.shields.io/badge/Install%20directly%20with-Stylus-285959.svg)](https://raw.githubusercontent.com/BlackSkorpio/qx-hexagon/develop/style/qx-hexagon.user.css) | [![Install directly with Stylus](https://img.shields.io/badge/Install%20directly%20with-Stylus-285959.svg)](https://raw.githubusercontent.com/BlackSkorpio/qx-hexagon/develop/style/qx-hexagon-clean.user.css) | [![Install directly with Greasemokey](https://img.shields.io/badge/Install%20Directly%20With-Greasemonkey-%236e4e8e.svg)](https://github.com/BlackSkorpio/qx-hexagon/raw/develop/userscript/qx-heagon-companion.user.js) |

#### You need a Userstyle Manager to use these, I recommend [stylus](https://github.com/openstyles/stylus) as it supports UserCSS, which allows for auto-updating of styles.

![QX HexaGon logo](svg-src/hexagon-logo.svg)

## QX HexaGon UserStyle
A modernized theme for [qruiser.com](https://www.qruiser.com/) that rewrites the new layout using flexbox and grid containers.

### Some style highlight of QX HexaGon
* Merged **Logged in favorites** and **Favorites** widget
* Sticky sidebar sections
  * **Left sidebar**
    * Mood/Status widget
    * Favorites widget
    * Messages widget
    * Your stuff widget
  * **Right sidebar**
    * Latest logged in members widget
* Animated notifications
* SVG icons instead of the old raster images

You can have [a closer look at how it looks here](screens/screens.md#shortcuts).

#### Install [the UserStyle](https://raw.githubusercontent.com/BlackSkorpio/qx-hexagon/master/dist/css/qx-hexagon.user.css)
[![Install directly with Stylus](https://img.shields.io/badge/Install%20directly%20with-Stylus-285959.svg)](https://raw.githubusercontent.com/BlackSkorpio/qx-hexagon/master/dist/css/qx-hexagon.user.css)

## QX HexaGon Companion UserScript
Fixes that goes hand in hand with the QX Hexagon userstyle.

**_The [UserScript](https://github.com/BlackSkorpio/qx-hexagon/raw/master/dist/userscript/qx-heagon-companion.user.js) is required_** to be able to enjoy the above [UserStyle](https://raw.githubusercontent.com/BlackSkorpio/qx-hexagon/master/dist/css/qx-hexagon.user.css) since here we are cleaning up a lot of the annoyencies that comes with the original layout and adding a lot of goodies!

### FIXES
* Removing the `.odd` and `.even` classes in favor for the `.qxh-flex-item` and `.qxh-grid-item`.
* Removing a lot of redundant and obsolete elements that is no longer neccesary now when using display grid and flexbox.
* Replacing all `.png` images with more modern `.svg` equilaments, these icons is even adapting there colors to the current color scheme used in profiles and clubs.

### Additions
* Adding browser titles to all pages for easy bookmarking and cleaner browser history.
* Adding source and template classes to the body tag. I.e: `.qxh-source-clubs` and `.qxh-template-clubs-scribble`.
* Adding keyboard navigation to all _important_ pages:

### Keyboard navigation
* **Basic keys**
  * **H** - Takes you directly to **_your own profilepage_**
  * **F** - Takes you to your **_current online favorites_**, or if non of them are online at the moment, it takes you to the **_all favorites_** page.
  * **V** - Takes you to the **_Your last visitors_** page
  * **C** - Takes you to the **_updated clubs page_**, if any, if no clubs is found updated it takes you the **_Your clubs page_**.
  * **X** - Clear all notifications/mark all messages as read.
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
  * **9** - Logout

#### Install HexaGon

| QX HexaGon | QX HexaGon Clean | QX HexaGon Companion |
| :--------: | :--------------: | :------------------: |
| [![Install directly with Stylus](https://img.shields.io/badge/Install%20directly%20with-Stylus-285959.svg)](https://raw.githubusercontent.com/BlackSkorpio/qx-hexagon/master/dist/css/qx-hexagon.user.css) | [![Install directly with Stylus](https://img.shields.io/badge/Install%20directly%20with-Stylus-285959.svg)](https://raw.githubusercontent.com/BlackSkorpio/qx-hexagon/master/dist/css/qx-hexagon-clean.user.css) | [![Install directly with Greasemokey](https://img.shields.io/badge/Install%20Directly%20With-Greasemonkey-%236e4e8e.svg)](https://github.com/BlackSkorpio/qx-hexagon/raw/master/dist/userscript/qx-heagon-companion.user.js) |
--------------------------------------------------------------------------------

## FAQ
* **Question:** Is the style available on userstyles.org?
  * **Answer:** No, the style there is just a placeholder pointing here.
* **Question:** What is a UserStyle manager?
  * **Answer:** Simply said: it's a browser extension that will help you keep your custom styles in a neat order.
* **Question:** Is there a special manager that you can recomend?
  * **Answer:** I personaly prefer to use [Stylus](https://github.com/openstyles/stylus) that is available for [Firefox](https://addons.mozilla.org/firefox/addon/styl-us/), [Chrome](https://chrome.google.com/webstore/detail/clngdbkpkpeebahjckkjfobafhncgmne) and [Opera](https://addons.opera.com/extensions/details/stylus/).
* **Question:** Do I need the [QX HexaGon Companion UserScript](#qx-hexagon-companion-userscript)?
  * **Answer:** Yes the companion script is neccesary since it does a lot of the heavy lifting for the style.
* **Question:** Is there any UserScript manager that you can recomend?
  * **Answer:** Once again, this is from my personal point of view, but I prefer the [Greasemokey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) UserScript Manager.
  If your using **Google Chrome**, **Microsoft Edge**, **Opera** or **Safari** I would recomend the [Tampermonkey extension](https://tampermonkey.net/).
  **Tampermonkey for:**
    * [Google Chrome](https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo)
    * [Microsoft Edge](https://www.microsoft.com/store/apps/9NBLGGH5162S)
    * [Opera](https://addons.opera.com/en/extensions/details/tampermonkey-beta/)
    * [Safari](https://safari-extensions.apple.com/details/?id=net.tampermonkey.safari-G3XV72R5TC)
    * [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
