document.addEventListener("DOMContentLoaded", function () {
  const fileList = document.getElementById("file-list");

  fetch("catalogs/files.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load files.json");
      }
      return response.json();
    })
    .then((data) => {
      data.files.forEach((file) => {
        const listItem = document.createElement("li");
        listItem.classList.add("fade-in");

        const link = document.createElement("a");
        link.href = `catalogs/${file.path}`;
        link.textContent = file.name;
        link.target = "_blank";

        listItem.appendChild(link);
        fileList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Error loading file list:", error);
      fileList.innerHTML = "<li>Failed to load catalog list.</li>";
    });
});
