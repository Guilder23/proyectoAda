(function(){

  const BIRTHDAY_MONTH = 5;
  const BIRTHDAY_DAY = 10;
  const BIRTHDAY_HOUR = 0;
  const BIRTHDAY_MINUTE = 0;
  const BIRTHDAY_SECOND = 0;

  const GAME_DURATION_SEC = 30;
  const HEART_SPAWN_INTERVAL_MS = 520;
  const HEART_SPEED_PX_PER_SEC = 210;
  const CATCHER_BOTTOM_PX = 14;
  const CATCHER_WIDTH_PX = 96;
  const HEART_SIZE_PX = 32;

  const FOODS = [
    { name: 'Pique', emoji: '🍲' },
    { name: 'Salchipapa', emoji: '🍟' },
    { name: 'Kindong', emoji: '🍜' },
    { name: 'Silpancho', emoji: '🥩' },
    { name: 'Sopa de maní', emoji: '🥜' },
    { name: 'Hamburguesa', emoji: '🍔' },
    { name: 'Ramen', emoji: '🍜' },
    { name: 'Comida sorpresa', emoji: '🎁' }
  ];

  function getCountdownState(){

    const now = new Date();
    const y = now.getFullYear();

    if(now.getMonth() === BIRTHDAY_MONTH - 1 && now.getDate() === BIRTHDAY_DAY){
      return { mode: 'today' };
    }

    let target = new Date(y, BIRTHDAY_MONTH - 1, BIRTHDAY_DAY, BIRTHDAY_HOUR, BIRTHDAY_MINUTE, BIRTHDAY_SECOND);
    const endDay = new Date(y, BIRTHDAY_MONTH - 1, BIRTHDAY_DAY, 23, 59, 59, 999);

    if(now > endDay){
      target = new Date(y + 1, BIRTHDAY_MONTH - 1, BIRTHDAY_DAY, BIRTHDAY_HOUR, BIRTHDAY_MINUTE, BIRTHDAY_SECOND);
    }

    return { mode: 'count', target };

  }

  function pad(n){
    return String(n).padStart(2, '0');
  }

  function updateCountdown(){

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const msgEl = document.getElementById('countdownMessage');

    if(!daysEl || !hoursEl || !minutesEl){
      return;
    }

    const state = getCountdownState();

    if(state.mode === 'today'){

      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      if(secondsEl){
        secondsEl.textContent = '00';
      }
      if(msgEl){
        msgEl.textContent = '¡Feliz cumpleaños, Ada! 🎂❤️';
        msgEl.hidden = false;
      }
      return;

    }

    const now = new Date();
    let diff = state.target - now;

    if(diff <= 0){

      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      if(secondsEl){
        secondsEl.textContent = '00';
      }
      if(msgEl){
        msgEl.textContent = '¡Feliz cumpleaños, Ada! 🎂❤️';
        msgEl.hidden = false;
      }
      return;

    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);
    const seconds = Math.floor(diff / 1000);

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    if(secondsEl){
      secondsEl.textContent = pad(seconds);
    }
    if(msgEl){
      msgEl.hidden = true;
    }

  }

  function openExperience(){

    document.getElementById('introScreen').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
    typeText();

  }

  const text = `Feliz Cumpleaños\nMi Abogada Favorita ❤️`;
  let index = 0;

  function typeText(){

    const typing = document.getElementById('typingText');

    const interval = setInterval(() => {

      const currentChar = text.charAt(index);

      if(currentChar === '\n'){
        typing.innerHTML += '<br>';
      } else {
        typing.innerHTML += currentChar;
      }

      index++;

      if(index >= text.length){
        clearInterval(interval);
      }

    }, 80);

  }

  function scrollToSection(id){
    document.getElementById(id).scrollIntoView({
      behavior: 'smooth'
    });
  }

  function openEvidenceModal(){

    const overlay = document.getElementById('evidenceOverlay');
    if(!overlay){
      return;
    }

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    const closeBtn = document.getElementById('closeEvidenceModal');
    if(closeBtn){
      closeBtn.focus();
    }

  }

  function closeEvidenceModal(){

    const overlay = document.getElementById('evidenceOverlay');
    if(!overlay){
      return;
    }

    overlay.classList.remove('open');
    document.body.style.overflow = '';

  }

  function showMessage(){
    openEvidenceModal();
  }

  function initEvidenceModal(){

    const overlay = document.getElementById('evidenceOverlay');
    const backdrop = document.getElementById('evidenceOverlayBackdrop');
    const closeBtn = document.getElementById('closeEvidenceModal');

    if(closeBtn){
      closeBtn.addEventListener('click', closeEvidenceModal);
    }

    if(backdrop){
      backdrop.addEventListener('click', closeEvidenceModal);
    }

    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape'){
        const el = document.getElementById('evidenceOverlay');
        if(el && el.classList.contains('open')){
          closeEvidenceModal();
        }
      }
    });

  }

  const particlesContainer = document.getElementById('particles');
  const heartsContainer = document.getElementById('heartsContainer');
  const flowersContainer = document.getElementById('flowersContainer');

  function createFloatingItems(){

    if(heartsContainer){

      setInterval(() => {

        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's';

        heartsContainer.appendChild(heart);

        setTimeout(() => {
          heart.remove();
        }, 10000);

      }, 600);

    }

    if(flowersContainer){

      setInterval(() => {

        const flower = document.createElement('div');
        flower.className = 'flower';
        flower.innerHTML = '🌸';
        flower.style.left = Math.random() * 100 + 'vw';
        flower.style.animationDuration = (Math.random() * 6 + 6) + 's';

        flowersContainer.appendChild(flower);

        setTimeout(() => {
          flower.remove();
        }, 12000);

      }, 1200);

    }

  }

  const canvas = document.getElementById('fireworks');
  const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;

  if(canvas && ctx){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

  }

  let fireworks = [];

  function createFirework(){

    if(!canvas || !ctx){
      return;
    }

    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;

    for(let i = 0; i < 40; i++){
      fireworks.push({
        x,
        y,
        radius: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 6,
        dy: (Math.random() - 0.5) * 6,
        alpha: 1
      });
    }

  }

  function animateFireworks(){

    if(!canvas || !ctx){
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let index = fireworks.length - 1; index >= 0; index--){

      const f = fireworks[index];

      ctx.beginPath();
      ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,77,166,${f.alpha})`;
      ctx.fill();

      f.x += f.dx;
      f.y += f.dy;
      f.alpha -= 0.01;

      if(f.alpha <= 0){
        fireworks.splice(index, 1);
      }

    }

    requestAnimationFrame(animateFireworks);

  }

  function initParticles(){

    if(!particlesContainer){
      return;
    }

    for(let i = 0; i < 150; i++){

      const particle = document.createElement('div');

      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
      particle.style.opacity = Math.random();
      particle.style.width = particle.style.height = Math.random() * 5 + 2 + 'px';

      particlesContainer.appendChild(particle);

    }

  }

  window.addEventListener('scroll', () => {

    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach(reveal => {

      const windowHeight = window.innerHeight;
      const elementTop = reveal.getBoundingClientRect().top;

      if(elementTop < windowHeight - 100){
        reveal.classList.add('active');
      }

    });

  });

  window.addEventListener('resize', () => {
    if(canvas && ctx){
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  });

  let wheelRotation = 0;
  let wheelSpinning = false;

  function initFoodWheel(){

    const wheel = document.getElementById('foodWheel');
    const btn = document.getElementById('spinFoodBtn');
    const result = document.getElementById('foodResult');
    const inner = document.getElementById('foodWheelInner');

    if(!wheel || !btn || !result){
      return;
    }

    inner.textContent = '¡Gira la ruleta!';

    btn.addEventListener('click', () => {

      if(wheelSpinning){
        return;
      }

      wheelSpinning = true;
      btn.disabled = true;
      result.textContent = 'Girando...';

      const idx = Math.floor(Math.random() * FOODS.length);
      const slice = 360 / FOODS.length;
      const spins = 5 + Math.floor(Math.random() * 3);
      wheelRotation += spins * 360 + (360 - idx * slice - slice / 2);

      wheel.style.transform = `rotate(${wheelRotation}deg)`;

      window.setTimeout(() => {

        const pick = FOODS[idx];
        inner.textContent = pick.emoji;
        result.innerHTML = `Veredicto: <strong>${pick.name}</strong> ${pick.emoji}<br><span style="color:#cfcfcf;font-size:.95rem">Hoy toca invitarle esto ❤️</span>`;
        wheelSpinning = false;
        btn.disabled = false;

      }, 4600);

    });

  }

  function initHeartGame(){

    const gameArea = document.getElementById('heartGameArea');
    const catcher = document.getElementById('heartCatcher');
    const scoreEl = document.getElementById('gameScore');
    const timeEl = document.getElementById('gameTimeLeft');
    const startBtn = document.getElementById('startHeartGame');
    const overlay = document.getElementById('heartGameOverlay');
    const overlayScore = document.getElementById('overlayHeartScore');
    const closeOverlay = document.getElementById('closeHeartOverlay');

    if(!gameArea || !catcher || !startBtn){
      return;
    }

    let gameRunning = false;
    let timeLeftSec = GAME_DURATION_SEC;
    let score = 0;
    let hearts = [];
    let spawnTimer = null;
    let gameTimer = null;
    let lastTs = 0;
    let rafId = null;

    function setCatcherX(clientX){

      const rect = gameArea.getBoundingClientRect();
      let x = clientX - rect.left;
      const half = CATCHER_WIDTH_PX / 2;
      x = Math.max(half, Math.min(rect.width - half, x));
      catcher.style.left = x + 'px';

    }

    function onMove(e){

      if(!gameRunning){
        return;
      }

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      setCatcherX(clientX);

    }

    gameArea.addEventListener('mousemove', onMove);
    gameArea.addEventListener('touchmove', onMove, { passive: true });

    gameArea.addEventListener('touchstart', (e) => {
      if(!gameRunning){
        return;
      }
      if(e.touches && e.touches[0]){
        setCatcherX(e.touches[0].clientX);
      }
    }, { passive: true });

    function clearHearts(){

      hearts.forEach(h => h.el.remove());
      hearts = [];

    }

    function endGame(){

      gameRunning = false;
      if(spawnTimer){
        window.clearInterval(spawnTimer);
        spawnTimer = null;
      }
      if(gameTimer){
        window.clearInterval(gameTimer);
        gameTimer = null;
      }
      if(rafId){
        cancelAnimationFrame(rafId);
        rafId = null;
      }

      clearHearts();
      startBtn.disabled = false;

      if(overlay && overlayScore){

        overlayScore.textContent = String(score);
        overlay.classList.add('open');

      }

    }

    function spawnHeart(){

      if(!gameRunning){
        return;
      }

      const el = document.createElement('div');
      el.className = 'falling-heart';
      el.textContent = '❤️';
      const rect = gameArea.getBoundingClientRect();
      const maxX = Math.max(8, rect.width - HEART_SIZE_PX - 8);
      const x = Math.random() * maxX;
      el.style.left = x + 'px';
      el.style.top = '-40px';

      gameArea.appendChild(el);

      hearts.push({
        el,
        y: -40,
        x
      });

    }

    function loop(ts){

      if(!gameRunning){
        return;
      }

      if(!lastTs){
        lastTs = ts;
      }

      const dt = Math.min(0.05, (ts - lastTs) / 1000);
      lastTs = ts;

      const rect = gameArea.getBoundingClientRect();
      const areaH = rect.height;
      const catcherRect = catcher.getBoundingClientRect();
      const areaRect = gameArea.getBoundingClientRect();

      const catcherTop = catcherRect.top - areaRect.top;
      const catcherLeft = catcherRect.left - areaRect.left;
      const catcherRight = catcherLeft + catcherRect.width;

      const speed = HEART_SPEED_PX_PER_SEC * dt;

      for(let i = hearts.length - 1; i >= 0; i--){

        const h = hearts[i];
        h.y += speed;
        h.el.style.top = h.y + 'px';

        const heartLeft = h.x;
        const heartRight = h.x + HEART_SIZE_PX;
        const heartBottom = h.y + HEART_SIZE_PX;

        if(
          heartBottom >= catcherTop &&
          h.y <= catcherTop + catcherRect.height * 0.85 &&
          heartRight > catcherLeft &&
          heartLeft < catcherRight
        ){

          score++;
          scoreEl.textContent = String(score);
          h.el.remove();
          hearts.splice(i, 1);
          continue;

        }

        if(h.y > areaH){

          h.el.remove();
          hearts.splice(i, 1);

        }

      }

      rafId = requestAnimationFrame(loop);

    }

    function tick(){

      timeLeftSec--;
      timeEl.textContent = String(timeLeftSec);

      if(timeLeftSec <= 0){
        endGame();
      }

    }

    startBtn.addEventListener('click', () => {

      if(gameRunning){
        return;
      }

      score = 0;
      scoreEl.textContent = '0';
      timeLeftSec = GAME_DURATION_SEC;
      timeEl.textContent = String(timeLeftSec);
      lastTs = 0;
      clearHearts();

      const rect = gameArea.getBoundingClientRect();
      catcher.style.left = rect.width / 2 + 'px';

      gameRunning = true;
      startBtn.disabled = true;
      if(overlay){
        overlay.classList.remove('open');
      }

      spawnTimer = window.setInterval(spawnHeart, HEART_SPAWN_INTERVAL_MS);
      gameTimer = window.setInterval(tick, 1000);

      rafId = requestAnimationFrame(loop);

    });

    if(closeOverlay){
      closeOverlay.addEventListener('click', () => {
        overlay.classList.remove('open');
      });
    }

  }

  createFloatingItems();
  setInterval(updateCountdown, 1000);
  updateCountdown();

  if(canvas && ctx){
    setInterval(createFirework, 1200);
    animateFireworks();
  }

  initParticles();
  initFoodWheel();
  initHeartGame();
  initEvidenceModal();

  window.openExperience = openExperience;
  window.scrollToSection = scrollToSection;
  window.showMessage = showMessage;

})();
