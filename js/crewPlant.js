document.addEventListener("DOMContentLoaded", function() {
    const earth = document.querySelector('.plants');
    const peopleNum = 19;
    const earthRadius = 230;
    const plantWidth = 100;
    const plantHeight = 100;


    crewIds.forEach(async (crewId, i) => {
        try {
            // Fetch crew nickname data
            const response = await fetch(`/api/v1/crews/${crewId}/crew-plant`);
            const data = await response.json();

            if (data.isSuccess && data.result.length > 0) {
                const crewMemberName = data.result[0].crewMemberName;

                const angle = (i / peopleNum) * 2 * Math.PI;
                const x = earthRadius * Math.cos(angle) - plantWidth / 2;
                const y = earthRadius * Math.sin(angle) - plantHeight / 2;

                const nicknameDiv = document.createElement('div');
                nicknameDiv.className = 'nickname';
                nicknameDiv.textContent = crewMemberName;

                const personalPlant = document.createElement('div');
                personalPlant.className = 'personal-plant';

                // Example: Assuming plant images are named plant1.png, plant2.png, etc.
                personalPlant.style.backgroundImage = `url(/img/plant_unlock/plant${data.result[0].crewMemberMainPlantId}.png)`;
                personalPlant.style.width = `${plantWidth}px`;
                personalPlant.style.height = `${plantHeight}px`;

                personalPlant.style.left = `${40 + earthRadius + x}px`;
                personalPlant.style.top = `${40 + earthRadius + y}px`;

                const rotation = (angle * 180 / Math.PI) + 90;
                personalPlant.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;

                personalPlant.appendChild(nicknameDiv);
                earth.appendChild(personalPlant);
            } else {
                console.error(`Failed to fetch data for crew ID ${crewId}`);
            }
        } catch (error) {
            console.error(`Error fetching data for crew ID ${crewId}:`, error);
        }
    });
});


	// const nicknames = [
    //     "Alice", "Bob", "Charlie", "David", "Eve",
    //     "Frank", "Grace", "Heidi", "Ivan", "Judy",
    //     "Mallory", "Niaj", "Oscar", "Peggy", "Trent"
    // ];

    // for (let i = 0; i < peopleNum; i++) {

    //     const angle = (i / peopleNum) * 2 * Math.PI;
    //     const x = earthRadius * Math.cos(angle) - plantWidth / 2;
    //     const y = earthRadius * Math.sin(angle) - plantHeight / 2;

	// 	const nicknameDiv = document.createElement('div');
    //     nicknameDiv.className = 'nickname';
    //     nicknameDiv.textContent = nicknames[i % nicknames.length];
        
	// 	const personalPlant = document.createElement('div');
    //     personalPlant.className = 'personal-plant';
    //     personalPlant.style.backgroundImage = 'url(/img/plant_unlock/flower4.png)';

    //     personalPlant.style.left = `${40+ earthRadius + x}px`;
    //     personalPlant.style.top = `${40 + earthRadius + y}px`;

	// 	const rotation = (angle * 180 / Math.PI) + 90;
    //     personalPlant.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;

    //     personalPlant.appendChild(nicknameDiv);
    //     earth.appendChild(personalPlant);
    // }

