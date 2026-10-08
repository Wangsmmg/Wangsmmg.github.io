const list = document.querySelector("#repos");
const skip = new Set(["Wangsmmg", "Wangsmmg.github.io"]);
fetch("https://api.github.com/users/Wangsmmg/repos?per_page=100&sort=updated&type=owner")
  .then((response) => (response.ok ? response.json() : Promise.reject()))
  .then((repos) => {
    const shown = repos.filter((repo) => repo && !repo.fork && !skip.has(repo.name));
    if (!shown.length || !list) return;
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
const reveals = document.querySelectorAll(".reveal");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduce || !("IntersectionObserver" in window)) {
  reveals.forEach((node) => node.classList.add("in"));
} else {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("in");
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.16 });
  reveals.forEach((node) => observer.observe(node));
}
