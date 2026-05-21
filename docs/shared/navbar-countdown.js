(function(){
  // Countdown to June 4 of the current year
  const now = new Date();
  const year = now.getFullYear();
  const target = new Date(year, 5, 4, 0, 0, 0); // months 0-based: 5 = June
  // If date already passed this year, use next year
  if (now > target) target.setFullYear(year + 1);

  function fmt(n){ return String(n).padStart(2,'0'); }

  function update() {
    const t = +target - Date.now();
    if (t <= 0) {
      el.textContent = '0d 00:00:00';
      clearInterval(timer);
      return;
    }
    const days = Math.floor(t / (1000*60*60*24));
    const hours = Math.floor((t / (1000*60*60)) % 24);
    const mins = Math.floor((t / (1000*60)) % 60);
    const secs = Math.floor((t / 1000) % 60);
    el.textContent = `${days}d ${fmt(hours)}:${fmt(mins)}:${fmt(secs)}`;
  }

  function createEl(){
    // try to attach to common navbar selectors
    const selectors = ["#navbar", ".navbar", "nav", "header"];
    for (let s of selectors){
      const parent = document.querySelector(s);
      if (parent){
        const container = document.createElement('div');
        container.id = 'navbar-countdown';
        container.setAttribute('aria-live','polite');
        container.style.display = 'inline-block';
        container.style.marginLeft = '1rem';
        parent.appendChild(container);
        return container;
      }
    }
    // fallback: prepend to body
    const container = document.createElement('div');
    container.id = 'navbar-countdown';
    container.setAttribute('aria-live','polite');
    container.style.position = 'fixed';
    container.style.top = '8px';
    container.style.right = '8px';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    return container;
  }

  // wait for DOM
  let el;
  let timer;
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ()=>{ el = createEl(); update(); timer = setInterval(update, 1000); });
  } else { el = createEl(); update(); timer = setInterval(update, 1000); }
})();
