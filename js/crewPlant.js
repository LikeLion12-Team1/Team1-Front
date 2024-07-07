document.addEventListener("DOMContentLoaded", function() {
    const earth = document.querySelector('.plants');
    const peopleNum = 19;
    const earthRadius = 230;
    const plantWidth = 100;
    const plantHeight = 100;

	const nicknames = [
        "Alice", "Bob", "Charlie", "David", "Eve",
        "Frank", "Grace", "Heidi", "Ivan", "Judy",
        "Mallory", "Niaj", "Oscar", "Peggy", "Trent"
    ];

    for (let i = 0; i < peopleNum; i++) {
        const angle = (i / peopleNum) * 2 * Math.PI;
        const x = earthRadius * Math.cos(angle) - plantWidth / 2;
        const y = earthRadius * Math.sin(angle) - plantHeight / 2;

		const nicknameDiv = document.createElement('div');
        nicknameDiv.className = 'nickname';
        nicknameDiv.textContent = nicknames[i % nicknames.length];
        
		const personalPlant = document.createElement('div');
        personalPlant.className = 'personal-plant';
        personalPlant.style.backgroundImage = 'url(/img/plant.png)';

        personalPlant.style.left = `${40+ earthRadius + x}px`;
        personalPlant.style.top = `${40 + earthRadius + y}px`;

		const rotation = (angle * 180 / Math.PI) + 90;
        personalPlant.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;

        personalPlant.appendChild(nicknameDiv);
        earth.appendChild(personalPlant);
    }
});
