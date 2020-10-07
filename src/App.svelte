<script>

  window.addEventListener('popstate', function(event) {
    // The popstate event is fired each time when the current history entry changes.
    window.location.href = hist_url;
    // window.location.reload(true);
    // var r = confirm("You pressed a Back button! Are you sure?!");
    // if (r == true) {
    //     // Call Back button programmatically as per user confirmation.
    //     history.back();
    //     // Uncomment below line to redirect to the previous page instead.
    //     // window.location = document.referrer // Note: IE11 is not supporting this.
    // } else {
    //     // Stay on the current page.
    //     history.pushState(null, null, window.location.pathname);
    // }
    // history.pushState(null, null, window.location.pathname);

}, false);
  
  import { onMount } from 'svelte';
  import Search from './Search.svelte';
  import SearchResults from './SearchResults.svelte';
  import LoadingIndicator from './LoadingIndicator.svelte';

  // top10 ecsta.tk/enqueue?tag=top10tags
  let searchQuery = '';
  let searchTerm = null;
  let totalPages = null;
  let searchResults = [];
  let nextPage = 1;
  let isLoading = false;

  let observer;
  let target;
  let hist_state = {name: 'ecsta.tk'};
  let hist_url = 'http://ecsta.tk/';
  // Need to create a history event, but currently 

  const options = {
    rootMargin: '0px 0px 300px',
    threshold: 0,
  };

  onMount(() => {
    observer = new IntersectionObserver(loadMoreResults, options);
    target = document.querySelector('.loading-indicator');
    searchTerm = 'top10tags';
    searchEcsta();
  });

  function handleMessage(event) {
    searchQuery = event.detail.text;
    handleSubmit();
  }
  
  function handleSubmit() {
    searchTerm = searchQuery.trim();
    searchResults = [];
    totalPages = null;
    nextPage = 1;

    // if (!searchTerm) return;
    if (!searchTerm) 
    {
      searchTerm = 'top10tags';
    }

    observer.observe(target);
    history.pushState(hist_state, '', hist_url);

    searchEcsta();
  }

  function searchEcsta() {
    isLoading = true;
    const endpoint = `http://185.214.164.173:9090/enqueue?tag=${searchTerm}&page=${nextPage}`;
    // const endpoint = `http://thomasthomas.tk:9090/enqueue?tag=${searchTerm}&page=${nextPage}`;
    
    fetch(endpoint)
      .then(response => {
        if (!response.ok) {
          alert(response.statusText);
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        if (data.total === 0) {
          alert(`Sorry, nothing was found for sale in #${searchTerm}`)
          return;
        }

        searchResults = [...searchResults, ...data.results];
        totalPages = data.total_pages;

        if (nextPage < totalPages) {
          nextPage += 1;
        }
      })
      .catch(() => alert(`${response.statusText} Oh an error occured!`))
      .finally(() => {
        isLoading = false;

        if (nextPage >= Number(totalPages)) {
          observer.unobserve(target);
        }
      });
  }

  const loadMoreResults = entries => {
    entries.forEach(entry => {
      // If new search or if ongoing search
      if (nextPage === 1 || isLoading) return;

      if (entry.isIntersecting) {
        searchEcsta();
      }
    });
  };

</script>
<style>
  .App {
    width: 100%;
    max-width: 1500px;
    padding: 20px;
    margin: 0 auto 50px;
    text-align: center;
  }

  h1 {
    font-size: 50px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
</style>

<main class="App">
  <!-- <h4>ecsta.tk about stuff</h4> -->
  <Search bind:query={searchQuery} handleSubmit={handleSubmit} />
  
  <!-- <SearchResults on:message={handleMessage}/> -->
  
  <SearchResults results={searchResults} on:message={handleMessage}/>

  <div class="loading-indicator">
    {#if isLoading}
      <LoadingIndicator isLoading={isLoading} />
    {/if}
  </div>
</main>
