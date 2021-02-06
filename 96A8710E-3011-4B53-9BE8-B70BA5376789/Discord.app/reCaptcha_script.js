function documentReady() {
  var PAGE_BG_COLOR = RECAPTCHA_THEME == 'dark' ? '#222' : '#fff';
  document.body.style.backgroundColor = PAGE_BG_COLOR;
  showCaptcha(document.body.firstElementChild);
}

function showCaptcha(el) {
  try {
    grecaptcha.render(el, {
      sitekey: RECAPTCHA_SITE_KEY,
      theme: RECAPTCHA_THEME,
      callback: captchaSolved,
      'expired-callback': captchaExpired,
    });

    window.webkit.messageHandlers.reCaptcha.postMessage(['didLoad']);
  } catch (_) {
    window.setTimeout(function() {
      showCaptcha(el);
    }, 50);
  }
}

function captchaSolved(response) {
  window.webkit.messageHandlers.reCaptcha.postMessage(['didSolve', response]);
}

function captchaExpired(response) {
  window.webkit.messageHandlers.reCaptcha.postMessage(['didExpire']);
}
