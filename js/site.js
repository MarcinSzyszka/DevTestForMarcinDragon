(function () {
	ImagesElementsManager = function (imagesDataArray) {
		var selectedImageLocalStorageKey = 'selectedImageLocalStorageKey';
		var selectedImageClassName = 'selected-image';
		var imagesDataArray = imagesDataArray;

		this.createImagesElements = function () {
			var mainContainer = document.getElementById('container');
			var imageList = getListElement();

			var i = 0,
				imagaesDataArrayLength = imagesDataArray.length

			for (i; i < imagaesDataArrayLength; i++) {
				var imgElement = getImgElement(imagesDataArray[i]);
				var imageLinkElement = document.createElement('a');
				imageLinkElement.appendChild(imgElement);
				var liElement = document.createElement('li');
				liElement.appendChild(imageLinkElement);
				imageList.appendChild(liElement);
			}

			mainContainer.appendChild(imageList);
		}




		var isLocalStorageEnabled = function() {
			return typeof (Storage) !== "undefined"
		}

		var getListElement = function () {
			var ul = document.createElement('ul');
			ul.setAttribute('class', 'images-elements-list');

			return ul;
		}

		var getImgElement = function (imageData) {
			var onClickFunction = toggleSelctedClassAtImageElement;
			var imgElement = document.createElement('img');
			imgElement.src = imageData.media.m;

			imgElement.addEventListener('click', function (evt) {
				onClickFunction(evt.target);
			}, false);

			addSelectedImageClassIfNeeded(imgElement);

			return imgElement;
		}

		var toggleSelctedClassAtImageElement = function (imgElement) {
			if (imgElement.classList.contains(selectedImageClassName)) {
				if (isLocalStorageEnabled()) {
					localStorage.removeItem(selectedImageLocalStorageKey + imgElement.src);
				}
				imgElement.classList.remove(selectedImageClassName);
			}
			else {
				if (isLocalStorageEnabled()) {
					localStorage.setItem(selectedImageLocalStorageKey + imgElement.src, 'selected');
				}
				imgElement.classList.add(selectedImageClassName);
			}
		}

		var addSelectedImageClassIfNeeded = function (imageLinkElement) {
			if (isLocalStorageEnabled()) {
				var key = selectedImageLocalStorageKey + imageLinkElement.src;
				if (localStorage.getItem(key)) {
					imageLinkElement.classList.add(selectedImageClassName);
				}
			}
		}
	}
})();