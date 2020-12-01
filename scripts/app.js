const githubData_data = {
//your username and token here
};

// const login = your username here

const body = {
  query: `
  query { 
    user (login: "${login}") {
      avatarUrl
      bio
      login
      twitterUsername
      starredRepositories{
        totalCount
      }
      followers {
        totalCount
      }
      following {
        totalCount
      }
      name
      location
      repositories(first: 12 orderBy: {field: UPDATED_AT, direction: DESC}) {
        nodes {
          createdAt
          description
          name
          stargazerCount
          primaryLanguage {
            name
          }
        }
      }
    }
  }
    `,
};

const baseUrl = "https://api.github.com/graphql";

const headers = {
  "Content-Type": "application/json",
  Authorization: `bearer ${githubData_data["token"]}`,
};

let response;
fetch(baseUrl, {
  method: "POST",
  headers: headers,
  body: JSON.stringify(body),
})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    const res_data = data.data.user;
    console.log(res_data);
    fb_container_1.innerHTML = `
    <div class="imgContainer">
    <img
      src=${res_data.avatarUrl}
      alt="profile pic"
      class="profilePic"
    />
  </div>
  <div class="loginNames">
    <h1>${res_data.name}</h1>
    <h2>${res_data.login}</h2>
  </div>
  <h3>
      ${res_data.bio}
  </h3>
  <button>Edit profile</button>
  <div class="followersCount">

  <img src="./assets/follow.png" class="img1" alt="f">

      <p>
          ${res_data.followers.totalCount} followers
      </p>
      <p style="margin: 0rem .2rem">
      .
      </p>
      <p>
           ${res_data.following.totalCount} following
      </p>
      <p style="margin: 0rem .2rem">
      .
      </p>
      <img src="./assets/star.png" class="img1" alt="f">
      <p>
          ${res_data.starredRepositories.totalCount}
      </p>
  </div>
  <div class="div">
  <img src="./assets/location.png"  alt="f" style="display: inline">
  <h4>${res_data.location}</h4>
  
  </div>
  <div class="div">
  <img src="./assets/twitter.svg"  alt="f" style="display: inline">
  <h4>@${res_data.twitterUsername}</h4>
  </div>
</div>
    `;

    let html = ``;
    for (const el of res_data.repositories.nodes) {
      let color;
      if (el.primaryLanguage.name === "CSS") {
        color = "purple";
      } else if (el.primaryLanguage.name === "HTML") {
        color = "red";
      } else {
        color = "yellow";
      }
      html += `
    <div class="repo">
<div class="repoRight">
<h1>${el.name}</h1>
${el.description? `<h3 class="repoDesc">${el.description}</h3>` :  ""}
<div class="repoInfo">
<div class="lanColor" style="background-color: ${color}"></div>
<p>${el.primaryLanguage.name}</p>
${el.stargazerCount?'<img style="margin-left: 1.5rem" src="./assets/star.png" alt="f">': "" } 
 ${el.stargazerCount? `<p style="margin-right: 1.5rem">${el.stargazerCount}</p>` :  ""}
      <p>updated ${timeDifferenceForDate(el.createdAt)}</p>
    </div>
</div>
<a>
  <img src="./assets/star.png" alt="f">
  Star
</a>
</div>`;
    }
    console.log(html);

    fb_container_2.innerHTML = html;
  })
.catch((err) => console.log(err));
