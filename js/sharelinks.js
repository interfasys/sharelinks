/* global OC, $, t */
var ShareLinks = {};

/**
 * Adds buttons to the share dialogue
 */
ShareLinks.hijackShare = function () {
	var target = OC.Share.showLink;
	OC.Share.showLink = function () {
		var r = target.apply(this, arguments);
		var dropDownElement = $('#dropdown.drop.shareDropDown');
		var linkSwitchButtonElement = $('#linkSwitchButton');
		var urlElement = $('#linkText');
		var linkCheckboxElement = $('#linkCheckbox');

		// TODO: Use a switch button
		if (!linkSwitchButtonElement.length) {
			linkSwitchButtonElement = $('<a/>').addClass('button').attr('id', 'linkSwitchButton');
			linkCheckboxElement.find('+label').after(linkSwitchButtonElement);
		}

		if (dropDownElement.data('item-type') === "folder") {
			ShareLinks.showFolderLinksButton(urlElement, linkSwitchButtonElement);
		} else {
			ShareLinks.showFileLinksButton(dropDownElement, urlElement, linkSwitchButtonElement);
		}

		linkCheckboxElement.change(function () {
			if (this.checked) {
				linkSwitchButtonElement.show();
			} else {
				linkSwitchButtonElement.hide();
			}
		});

		return r;
	};
};

/**
 * Shows button to change links for folders
 *
 * @param {*} urlElement
 * @param {*} linkSwitchButtonElement
 */
ShareLinks.showFolderLinksButton = function (urlElement, linkSwitchButtonElement) {
	linkSwitchButtonElement.text(t('sharelinks', 'Show Gallery link'));

	linkSwitchButtonElement.toggle(function () {
		$(this).text(t('sharelinks', "Show Files link"));
		urlElement.val(urlElement.val().replace('index.php/s/',
			'index.php/apps/galleryplus/s/'));
	}, function () {
		$(this).text(t('sharelinks', "Show Gallery link"));
		urlElement.val(urlElement.val().replace('index.php/apps/galleryplus/s/',
			'index.php/s/'));

	});
};

/**
 * Shows button to change links for files
 *
 * @param {*} dropDownElement
 * @param {*} urlElement
 * @param {*} linkSwitchButtonElement
 */
ShareLinks.showFileLinksButton = function (dropDownElement, urlElement, linkSwitchButtonElement) {
	var filename = dropDownElement.parent().parent().data('file');
	var extension = filename.substr(filename.lastIndexOf('.') + 1);

	switch (extension.toLowerCase()) {
		case 'gif':
		case 'jpg':
		case 'jpeg':
		case 'png':
		case 'bmp':
		case 'svg':
			var fileId = dropDownElement.data('item-source');
			var tokenFilename = fileId + '.' + extension;
			linkSwitchButtonElement.text(t('sharelinks', 'Show direct link'));

			linkSwitchButtonElement.toggle(function () {
				$(this).text(t('sharelinks', "Show Files link"));
				urlElement.val(urlElement.val().replace('index.php/s/',
						'index.php/apps/galleryplus/s/') + '/' + tokenFilename);
			}, function () {
				$(this).text(t('sharelinks', "Show direct link"));
				urlElement.val(urlElement.val().replace('index.php/apps/galleryplus/s/',
					'index.php/s/').replace('/' + tokenFilename, ''));
			});
			break;
		default:
			linkSwitchButtonElement.hide();
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
