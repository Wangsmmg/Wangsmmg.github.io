const list = document.querySelector("#repos");
const skip = new Set(["Wangsmmg", "Wangsmmg.github.io"]);

fetch("https://api.github.com/users/Wangsmmg/repos?per_page=100&sort=updated&type=owner")
  .then((response) => (response.ok ? response.json() : Promise.reject()))
  .then((repos) => {
    const shown = repos.filter((repo) => repo && !repo.fork && !skip.has(repo.name));
    if (!shown.length) return;
    list.replaceChildren();
    for (const repo of shown.slice(0, 8)) {
      const item = document.createElement("li");
      const time = document.createElement("time");
      time.textContent = repo.language || "仓库";
      const text = document.createElement("p");
      const link = document.createElement("a");
      link.href = repo.html_url;
      link.textContent = repo.name;
      text.append(link);
      if (repo.description) text.append(document.createTextNode(" — " + repo.description));
      item.append(time, text);
      list.append(item);
    }
  })
  .catch(() => {});
