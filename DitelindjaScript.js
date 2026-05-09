document.addEventListener("DOMContentLoaded", () => {
  const introSection  = document.getElementById("intro");
  const finalSection  = document.getElementById("finalSection");
  const floatingTexts = Array.from(document.querySelectorAll(".floating-text"));
  const cakeImg       = document.getElementById("cakeImg");
  const cakeTitle     = document.getElementById("cakeTitle");
  const wishComeTrue  = document.getElementById("wishComeTrue");

  const VISIBLE_TIME = 5000;
  const EXIT_TIME    = 2000;
  const GAP_TIME     = 250;

  let isBlownOut = false;

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function resetIntroState() {
    floatingTexts.forEach((t) => t.classList.remove("active", "exit"));
  }

  async function showFloatingText(el) {
    resetIntroState();
    el.classList.add("active");
    await sleep(VISIBLE_TIME);
    el.classList.remove("active");
    el.classList.add("exit");
    await sleep(EXIT_TIME);
  }

  async function runIntroSequence() {
    finalSection.classList.add("hidden");
    introSection.classList.remove("hidden");

    for (const text of floatingTexts) {
      await showFloatingText(text);
      await sleep(GAP_TIME);
    }

    await sleep(300);
    introSection.classList.add("hidden");
    finalSection.classList.remove("hidden");
  }

  function fireConfetti() {
    const colors = ["#ffb6c1", "#f58db0", "#d96a93", "#ffd166", "#ffffff"];
    const end = Date.now() + 3000;
    (function frame() {
      confetti({ particleCount: 6, angle: 60,  spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }

  function blowOutCandles() {
    if (isBlownOut) return;
    isBlownOut = true;

    cakeImg.src = "CakeBLOWNOFF.gif";
    cakeImg.classList.add("blown");

    cakeTitle.textContent = "Le të bëhet realitet dëshira jote mamush!";
    cakeTitle.classList.add("done");

    wishComeTrue.classList.remove("hidden");

    fireConfetti();
  }

  cakeImg.addEventListener("click", blowOutCandles);

  resetIntroState();
  runIntroSequence();
});
