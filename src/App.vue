<template>
  <div id="app">
      <SearchForm class="container"/>
      <Results />
  </div>
</template>

<script>
import SearchForm from './components/search/SearchForm';
import Results from './components/result/Results';

export default {
  name: 'App',
  components: {
    SearchForm,
    Results
  }
}
</script>

<style>
body{
   font-family: Avenir, Helvetica, Arial, sans-serif;
   line-height: 1.4;
   margin: 0;
}

.container{
  max-width: 1200px;
  margin: auto;
}

.btn{
    text-decoration: none;
    padding: 10px 15px;
    background-color: #0abf53;
    color: #ffffff;
    border-radius: 3px;
    border: none;
    font-size: 16px;
}


label{
  display: block;
  margin-bottom: 5px;
  color: #525252;
}

@media(max-width: 600px){
  body{
    font-size: 0.8rem;
  }
}
</style>
