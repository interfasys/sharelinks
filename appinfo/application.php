<?php
/**
 * ownCloud - sharelinks
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Olivier Paroz <owncloud@interfasys.ch>
 * @copyright Olivier Paroz 2015
 */

namespace OCA\ShareLinks\AppInfo;

use OCP\AppFramework\App;

/**
 * Class Application
 *
 * @package OCA\ShareLinks\AppInfo
 */
class Application extends App {

	/**
	 * Constructor
	 *
	 * @param array $urlParams
	 */
	public function __construct(array $urlParams = []) {
		parent::__construct('sharelinks', $urlParams);
	}

}
