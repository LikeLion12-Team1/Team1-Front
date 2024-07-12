let API_SERVER_DOMAIN = "http://15.164.41.239:8080";
const accessToken = getCookie("accessToken");
const parts = window.location.href.split("/");
const crewName = parts[parts.length - 1];

// 쿠키 관련 함수
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

function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// 멤버 삭제 함수
function deleteMember(crewName, userId) {
  fetch(
    API_SERVER_DOMAIN + `/api/v1/user/my/crew/${crewName}?user-id=${userId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data.isSuccess) {
        console.log("멤버가 성공적으로 삭제되었습니다.");
        fetchCrewData(crewName);
      } else {
        console.log(`삭제 실패: ${data.message}`);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// 크루 데이터를 가져오고 화면에 표시하는 함수
function fetchCrewData(crewName) {
  fetch(API_SERVER_DOMAIN + `/api/v1/user/my/crew/${crewName}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data.isSuccess) {
        displayCrewData(data.result.adminMemberPreviewList);
      } else {
        console.log(`데이터 가져오기 실패: ${data.message}`);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// 크루 정보를 화면에 표시하는 함수
function displayCrewData(members) {
  const memberContainer = document.querySelector(".member");
  if (!memberContainer) {
    console.error(".member 요소를 찾을 수 없습니다.");
    return;
  }

  // member-list-container가 없다면 생성
  let listContainer = memberContainer.querySelector(".member-list-container");
  if (!listContainer) {
    listContainer = document.createElement("div");
    listContainer.className = "member-list-container";
    memberContainer.appendChild(listContainer);
  }

  let crewListContainer = memberContainer.querySelector("ul");
  if (!crewListContainer) {
    crewListContainer = document.createElement("ul");
    memberContainer.appendChild(crewListContainer);
  }

  crewListContainer.innerHTML = "";

  members.forEach((member) => {
    const listItem = document.createElement("li");
    listItem.className = "member-content";
    listItem.innerHTML = `
        <img src="/img/mypage-lightgreen.png" />
        <div class="member-content-nickname">${member.nickname}</div>
        <span class="member-delete-btn" onclick="deleteMember('${crewName}', '${member.userId}')">
          <i class="fa-solid fa-circle-xmark"></i>
        </span>
      `;
    crewListContainer.appendChild(listItem);
  });
}

// 커뮤니티 데이터를 가져오고 화면에 표시하는 함수
function fetchCommunityData(crewName) {
  fetch(API_SERVER_DOMAIN + `/api/v1/user/my/crew/${crewName}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data.isSuccess) {
        displayCommunityData(data.result.adminCommunityPreviewList);
      } else {
        console.log(`커뮤니티 데이터 가져오기 실패: ${data.message}`);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// 커뮤니티 정보를 화면에 표시하는 함수
function displayCommunityData(posts) {
  const communityContainer = document.querySelector(".community");
  if (!communityContainer) {
    console.error(".community 요소를 찾을 수 없습니다.");
    return;
  }

  let listContainer = communityContainer.querySelector(
    ".community-list-container"
  );
  if (!listContainer) {
    listContainer = document.createElement("div");
    listContainer.className = "community-list-container";
    communityContainer.appendChild(listContainer);
  }

  let communityList = listContainer.querySelector("ul");
  if (!communityList) {
    communityList = document.createElement("ul");
    listContainer.appendChild(communityList);
  }

  communityList.innerHTML = "";

  posts.forEach((post) => {
    const listItem = document.createElement("li");
    listItem.className = "community-content";
    listItem.id = `post${post.postId}`;
    listItem.innerHTML = `
      <img src="/img/mypage-lightgreen.png" />
      <div class="community-content-date">${formatDate(post.createdAt)}</div>
      <div class="community-content-msg">${post.authorId} 님이 ${
      post.category
    }를 인증했습니다.</div>
      <span class="admission">
        <i class="fa-solid fa-circle-arrow-up"></i>
      </span>
    `;
    communityList.appendChild(listItem);

    // 인증 완료 시 알림창 띄우기
    listItem.querySelector(".admission").addEventListener("click", () => {
      alert(`${post.authorId} 님이 ${post.category}를 인증했습니다.`);
    });
  });
}

// 날짜 포맷 함수
function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
}

document.addEventListener("DOMContentLoaded", () => {
  fetchCrewData(crewName);
  fetchCommunityData(crewName);
});
