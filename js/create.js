document.getElementById('camera-icon').addEventListener('click', function() {
	document.getElementById('open-file').click();
});

document.getElementById('open-file').addEventListener('change', function(event) {
	loadFile(event.target);
});

function loadFile(input) {
	let file = input.files[0];
	
	let newImage = document.createElement("img");

	newImage.src = URL.createObjectURL(file);
	newImage.id = 'new-image'
	newImage.style.height = "100%";
	newImage.style.width = "100%";
	newImage.style.objectFit = "cover";

	let container = document.getElementById('show-image');
	container.innerHTML = '';
	container.appendChild(newImage);
}

document.querySelectorAll('.choice-all button').forEach(function(button) {
	button.addEventListener('click', function() {
		this.classList.toggle('clicked');
	});
});