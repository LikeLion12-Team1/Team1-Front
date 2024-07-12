let API_SERVER_DOMAIN = "http://15.164.41.239:8080";

const accessToken = getCookie("accessToken");
const crewId = localStorage.getItem('selectedCrewId');
  /* 쿠키 관련 함수들 */
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
    	var date = new Date();
    	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    	expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      	var cookie = cookies[i];
      	while (cookie.charAt(0) === " ") {
        	cookie = cookie.substring(1, cookie.length);
      	}
      	if (cookie.indexOf(nameEQ) === 0) {
        	return cookie.substring(nameEQ.length, cookie.length);
     	}
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + "=; Expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
}


document.addEventListener("DOMContentLoaded", function() {
    const earth = document.querySelector('.plants');
    // const peopleNum = 4;
    const earthRadius = 230;
    const plantWidth = 100;
    const plantHeight = 100;

    fetch(API_SERVER_DOMAIN + `/api/v1/crews/${crewId}/crew-plant`, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + accessToken,
        },
    }).then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        return response.json();
    }).then(data => {
        if (data.isSuccess && data.result) {
            const crewMembers = data.result;

            for (let i = 0; i < crewMembers.length; i++) {
                const crewMember = crewMembers[i];
                const crewMemberName = crewMember.crewMemberName;
                const plantId = crewMember.crewMemberMainPlantId;

                const angle = (i / crewMembers.length) * 2 * Math.PI;
                const x = earthRadius * Math.cos(angle) - plantWidth / 2;
                const y = earthRadius * Math.sin(angle) - plantHeight / 2;

                const nicknameDiv = document.createElement('div');
                nicknameDiv.className = 'nickname';
                nicknameDiv.textContent = crewMemberName;

                const personalPlant = document.createElement('div');
                personalPlant.className = 'personal-plant';

                



                personalPlant.style.backgroundImage = `url(/img/plant_unlock/${plantId}.png)`; // Adjust URL as per your image path

                personalPlant.style.left = `${40 + earthRadius + x}px`;
                personalPlant.style.top = `${40 + earthRadius + y}px`;

                const rotation = (angle * 180 / Math.PI) + 90;
                personalPlant.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;

                personalPlant.appendChild(nicknameDiv);
                earth.appendChild(personalPlant);
            }
        } else {
            console.error('Failed to fetch crew plant data:', data.message);
        }
    })
    .catch(error => {
        console.error('Error fetching crew plant data:', error);
    });
});
	// const nicknames = [
    //     "Alice", "Bob", "Charlie", "David", "Eve",
    //     "Frank", "Grace", "Heidi", "Ivan", "Judy",
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
// });
