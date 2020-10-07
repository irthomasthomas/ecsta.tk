<script>
  export let photo;

  import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function sayHello() {
		dispatch('message', {
			text: photo.rootTag
		});
  }
  
  function openRelated() {
    dispatch('message', {
      text: photo.related
    });
  }
</script>

<style>
  .photo-card {
    animation: show 0.5s forwards ease-in-out;
  }

  .photo {
    width: 100%;
    object-fit: cover;
    height: 300px;
    background-color: #ccc;
    margin-bottom: 10px;
    box-shadow:4px 4px 5px #771313;
  }

  .photographer {
    display: inline-block;
  }

  .photographer a {
    color: #333;
    text-decoration: none;
  }

  .photographer a:hover {
    text-decoration: underline;
  }

  @keyframes show {
    0% {
      opacity: 0;
      transform: translateY(100px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .ribbon {
    position: absolute;
    right: -5px; top: -5px;
    z-index: 1;
    overflow: hidden;
    width: 75px; height: 75px;
    text-align: right;
  }
  .ribbon span {
    font-size: 10px;
    font-weight: bold;
    color: #FFF;
    text-transform: uppercase;
    text-align: center;
    line-height: 20px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    width: 100px;
    display: block;
    background: #79A70A;
    background: linear-gradient(#2989d8 0%, #1e5799 100%);
    box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
    position: absolute;
    top: 19px; right: -21px;
  }
  .ribbon span::before {
    content: "";
    position: absolute; left: 0px; top: 100%;
    z-index: -1;
    border-left: 3px solid #1e5799;
    border-right: 3px solid transparent;
    border-bottom: 3px solid transparent;
    border-top: 3px solid #1e5799;
  }
  .ribbon span::after {
    content: "";
    position: absolute; right: 0px; top: 100%;
    z-index: -1;
    border-left: 3px solid transparent;
    border-right: 3px solid #1e5799;
    border-bottom: 3px solid transparent;
    border-top: 3px solid #1e5799;
  }
</style>

{#if photo.rootTag}
  <li class="photo-card">
      <img class="photo" src={photo.imgUrl} crossorigin="anonymous" alt={photo.rootTag || ""} on:click={sayHello}>
      <div class="ribbon"><span>{photo.rootTag}</span></div>
  </li>
<!-- None of these related are showing on front -->
{:else if photo.related != "False"}
<li class="photo-card">
      <img class="photo" src={photo.imgUrl} crossorigin="anonymous" alt={photo.related || ""} on:click={openRelated}>
      <div class="ribbon"><span>#{photo.related}1</span></div>
</li>
{:else}
  <li class="photo-card">
  <a href={photo.link} crossorigin="anonymous" rel="noopener noreferrer" target="_blank">
    <img class="photo" src={photo.imgUrl} alt={photo.link || ""}>
  </a>
  </li>
{/if}