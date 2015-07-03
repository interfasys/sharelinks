<?php
/**
 * ownCloud - sharelinks
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Olivier Paroz <owncloud@interfasys.ch>
 *
 * @copyright Olivier Paroz 2015
 */

namespace OCA\ShareLinks\AppInfo;

use OCP\Util;

$app = new Application();
$c = $app->getContainer();
$appName = $c->query('AppName');

/**
 * Loading translations
 *
 * The string has to match the app's folder name
 */
Util::addTranslations('sharelinks');

// Hack which only loads the scripts in the Files app, if Gallery is enabled
$request = $c->query('Request');
$galleryVersion = \OCP\App::getAppVersion('galleryplus');
if ((\OCP\App::isEnabled('galleryplus')
	 && (int)$galleryVersion >= 12)
	&& isset($request->server['REQUEST_URI'])
) {
	$url = $request->server['REQUEST_URI'];
	if (preg_match('%index.php/apps/files(/.*)?%', $url)
	) {
		/**
		 * Scripts for the Files app
		 */
		Util::addScript($appName, 'sharelinks');

		/**
		 * Styles for the Files app
		 */
		Util::addStyle($appName, 'sharelinks');
	}
}
