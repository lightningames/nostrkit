<script>
  import "@picocss/pico";
  import { Router, Link, Route } from 'svelte-routing';
  import Home from './Home.svelte';
  import About from './About.svelte';
  import What from './What.svelte';
  import SelfHosting from './SelfHosting.svelte';
</script>

<style>

</style>

<Router>
  <main class="container">
    <header>
      <nav>
        <ul>
          <li><Link to="/home"><strong>NOSTRKIT</strong></Link></li>
          <li>by <a href="https://plebnet.dev/">PlebNet.dev</a></li>
        </ul>
        <ul>
          <li><Link to="/what">What is NOSTRKIT?</Link></li>
          <li><Link to="/about">About NOSTRKIT</Link></li>
          <li><Link to="/selfhosting">Self Hosting</Link></li>
        </ul>
      </nav>
    </header>
    <hr />

    <Route path="/home" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/what" component={What} />
    <Route path="/selfhosting" component={SelfHosting} />
  </main>
</Router>
