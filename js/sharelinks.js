/* global OC, $, t */
var ShareLinks = {};

/**
 * Adds buttons to the share dialogue
 */
ShareLinks.hijackShare = function () {
	var ShareDialogLinkShareViewRender = OC.Share.ShareDialogLinkShareView.prototype.render;
	OC.Share.ShareDialogLinkShareView.prototype.render = function () {
		var r = ShareDialogLinkShareViewRender.apply(this, arguments);
		var $linkSwitchButtonElement = this.$el.find('#linkSwitchButton');
		var $linkText = this.$el.find('.linkText');
		var $checkBox = this.$el.find('.linkCheckbox');
		var fileInfoModel = this.model.fileInfoModel;

		// TODO: Use a switch button
		if (!$linkSwitchButtonElement.length) {
			$linkSwitchButtonElement =
				$('<a/>').addClass('button').attr('id', 'linkSwitchButton');
			$checkBox.find('+label').after($linkSwitchButtonElement);
		}

		switch (fileInfoModel.get('type')) {
			case 'dir':
				ShareLinks.showFolderLinksButton($linkText, $linkSwitchButtonElement);
				break;
			case 'file':
				ShareLinks.showFileLinksButton(fileInfoModel.get('name'), fileInfoModel.get('id'),
					$linkText, $linkSwitchButtonElement);
				break;
		}

		if ($checkBox.is(':checked')) {
			$linkSwitchButtonElement.show();
		} else {
			$linkSwitchButtonElement.hide();
		}

		return r;
	};
};

/**
 * Shows button to change links for folders
 *
 * @param {*} $linkText
 * @param {*} $linkSwitchButtonElement
 */
ShareLinks.showFolderLinksButton = function ($linkText, $linkSwitchButtonElement) {
	console.log('$linkText', $linkText);
	console.log('$linkSwitchButtonElement', $linkSwitchButtonElement);

	$linkSwitchButtonElement.text(t('sharelinks', 'Show Gallery link'));

	$linkSwitchButtonElement.toggle(function () {
		$(this).text(t('sharelinks', "Show Files link"));
		$linkText.val($linkText.val().replace('index.php/s/',
			'index.php/apps/galleryplus/s/'));
	}, function () {
		$(this).text(t('sharelinks', "Show Gallery link"));
		$linkText.val($linkText.val().replace('index.php/apps/galleryplus/s/',
			'index.php/s/'));

	});
};

/**
 * Shows button to change links for files
 *
 * @param {String} filename
 * @param {Number} fileId
 * @param {*} $linkText
 * @param {*} $linkSwitchButtonElement
 */
ShareLinks.showFileLinksButton = function (filename, fileId, $linkText, $linkSwitchButtonElement) {
	var extension = filename.substr(filename.lastIndexOf('.') + 1);

	switch (extension.toLowerCase()) {
		case 'gif':
		case 'jpg':
		case 'jpeg':
		case 'png':
		case 'bmp':
		case 'svg':
			var tokenFilename = fileId + '.' + extension;
			$linkSwitchButtonElement.text(t('sharelinks', 'Show direct link'));

			$linkSwitchButtonElement.toggle(function () {
				$(this).text(t('sharelinks', "Show Files link"));
				$linkText.val($linkText.val().replace('index.php/s/',
						'index.php/apps/galleryplus/s/') + '/' + tokenFilename);
			}, function () {
				$(this).text(t('sharelinks', "Show direct link"));
				$linkText.val($linkText.val().replace('index.php/apps/galleryplus/s/',
					'index.php/s/').replace('/' + tokenFilename, ''));
			});
			break;
		default:
			$linkSwitchButtonElement.hide();
	}
};

$(document).ready(function () {

		if ($('#body-login').length > 0) {
			return true; //deactivate on login page
		}

		if ($('#filesApp').val()) {
			$('#fileList').one('updated', ShareLinks.hijackShare);
		}
	}
);
