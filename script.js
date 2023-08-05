// This event listener ensures that the JavaScript code runs after the DOM is fully loaded and ready.
document.addEventListener("DOMContentLoaded", () => {
    // this is an to my API key that i got from Unsplash
    const accesskey = "5sROmVbGlal_vt9eWLSeqdWdxTFxYERhZd4M2tQjlro";
  
    // References to various HTML elements using their IDs
    const searchForm = document.getElementById("search-form");
    const searchBox = document.getElementById("search-box");
    const searchResult = document.getElementById("search-result");
    const showMoreBtn = document.getElementById("showMoreBtn");
    
    // Variables to keep track of search keyword
    let keyword = "";
    let page = 1;
  
    // Function to fetch and display images based on the search query
    async function searchImages() {
      // for Getting the keyword from the search box input
      keyword = searchBox.value;
  
      // API URL with the search query, page number, and access key
      const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=12`;
  
      // For Fetching data from the API
      const response = await fetch(url);
      const data = await response.json();
  
      // To clear the searchResult container if it's the first page of results
      if (page === 1) {
        searchResult.innerHTML = "";
      }
  
      // To get the list of images from the API response
      const results = data.results;
  
      // Loop through the images and create image elements with links
      for (const result of results) {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
  
        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
      }
    }
  
    // Function to show the "Show More" button
    function showShowMoreButton() {
      showMoreBtn.style.display = "block";
    }
  
    // Event listener for the search form submission
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault(); // to Prevent the default form submission behavior
      page = 1; // to reset the page to 1 for a new search
      searchImages(); // to call the function to fetch and display images
      showShowMoreButton(); // to call showShowMoreButton() after searchImages() is executed.
    });
  
    // Event listener for the "Show More" button click
    showMoreBtn.addEventListener("click", () => {
      page++; // to increment the page number to load the next set of images
      searchImages(); // to Call the function to fetch and display more images
    });
  });
  