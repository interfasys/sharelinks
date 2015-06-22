# Share Links

An app which adds additional buttons to the ownCloud share dialogue, letting you quickly pick the type of link you need.

## Featuring

* Standard link to the public side of the Files app
* Link to the public side of the Gallery app
* Direct download link which is compatible with locations which check for a file extension in links

Direct download works for the following media types

* JPG/JPEG
* PNG
* GIF
* BMP
* SVG

## Maintainers

* [Olivier Paroz (@oparoz)](https://github.com/oparoz)

## Requirements

### Browser compatibility
This list is based on the current knowledge of the maintainers and the help they can get.
It will evolve if and when people provide patches to fix all known current issues

#### Fully supported
* Desktop: Firefox, Chrome, Internet Explorer 11+
* Mobile: Safari, Chrome on Android 5+ and iOS 8.x, BlackBerry 10, Firefox

#### Partially supported
* Mobile: Opera, Chrome on Android 4

#### Not supported
* Desktop: Internet Explorer prior to 11, Safari, Opera, Vivaldi
* Mobile: Windows Phone

### Server requirements

#### Required
* ownCloud >= 8.0.2
* [See ownCloud's requirements](https://doc.owncloud.org/server/8.0/admin_manual/installation/source_installation.html#prerequisites)
* [Gallery app](https://github.com/owncloud/galleryplus) installed. Not the Pictures app!

## Bugs

### Before reporting bugs

* Read the section about server and browser requirements
* Make sure you've enabled the Gallery app
* Read the "Known issues" section below
* Get the latest version of the app from [the releases page](https://github.com/interfasys/sharelinks/releases)
* [Check if they have already been reported](https://github.com/interfasys/sharelinks/issues)

### Known issues

None at this time

### When reporting bugs

* Enable debug mode by putting this at the bottom of **config/config.php**

```
DEFINE('DEBUG', true);
```

* Turn on debug level debug by adding **`loglevel" => 0,`** to your **config/config.php** and reproduce the problem
* Check **data/owncloud.log**

Please provide the following details so that your problem can be fixed:

* **data/owncloud.log** (important!)
* ownCloud version
* App version
* Browser version
* PHP version

## Installation

**IMPORTANT**: Make sure you've enabled the Gallery app

### Installing from archive
* Go to the [the releases page](https://github.com/interfasys/sharelinks/releases)
* Download the latest release/archive to your server's **owncloud/apps/** directory
* Unpack the app
* **IMPORTANT**: Rename it to sharelinks

### Installing from Git

In your terminal go into the **owncloud/apps/** directory and then run the following command:
```
$ git clone https://github.com/interfasys/sharelinks.git
```

Now you can activate it in the apps menu. It's called Gallery Share Links

To update the app go inside you **owncloud/apps/sharelinks/** directory and type:
```
$ git pull --rebase origin master
```

## How to use

If you share a file, you'll notice a switch letting you choose between the standard link and one which allows you to download the file directly, to post it to a forum per example.

If you share a folder, you'll notice a switch letting you choose between the standard link and one which lands directly into the Gallery app.

		