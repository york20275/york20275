// YouTube Studio upload helper (runs inside studio.youtube.com)
window.__up = async function (o) {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const log = [];
  // open dialog
  if (!document.querySelector('ytcp-uploads-dialog input[type=file], input[type=file][name=Filedata]')) {
    const b = document.querySelector('#upload-icon, ytcp-button#create-icon');
    if (b) { b.click(); await sleep(800); const it = [...document.querySelectorAll('tp-yt-paper-item')].find(x => /上傳影片|Upload videos/.test(x.innerText)); it && it.click(); await sleep(1500); }
  }
  const blob = await (await fetch(o.url)).blob();
  const f = new File([blob], o.filename, { type: 'video/mp4' });
  const dt = new DataTransfer(); dt.items.add(f);
  const inp = document.querySelector('input[type=file][name=Filedata]');
  inp.files = dt.files; inp.dispatchEvent(new Event('change', { bubbles: true }));
  log.push('file ' + blob.size);
  let d; for (let i = 0; i < 40; i++) { await sleep(500); d = document.querySelector('ytcp-uploads-dialog'); if (d && d.querySelector('#title-textarea #textbox')) break; }
  await sleep(1500);
  const set = (sel, txt) => { const el = d.querySelector(sel); el.focus(); document.execCommand('selectAll', false, null); document.execCommand('insertText', false, txt); el.dispatchEvent(new Event('input', { bubbles: true })); el.blur(); return el.innerText.length; };
  log.push('title ' + set('#title-textarea #textbox', o.title));
  log.push('desc ' + set('#description-textarea #textbox', o.desc));
  const nk = d.querySelector('tp-yt-paper-radio-button[name="VIDEO_MADE_FOR_KIDS_NOT_MFK"]'); nk && nk.click();
  const more = d.querySelector('#toggle-button'); more && more.click(); await sleep(1500);
  // tags: remove defaults then add ours
  for (let k = 0; k < 60; k++) { const c = d.querySelector('ytcp-chip-bar ytcp-chip'); if (!c) break; const x = c.querySelector('#delete-icon, ytcp-icon-button, [icon]'); (x || c).click(); await sleep(60); }
  const ti = d.querySelector('ytcp-chip-bar #text-input'); ti.focus(); document.execCommand('insertText', false, o.tags.join(',') + ',');
  ti.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13, bubbles: true })); await sleep(400);
  log.push('tags ' + d.querySelectorAll('ytcp-chip-bar ytcp-chip').length);
  const al = d.querySelector('tp-yt-paper-radio-button[name="VIDEO_HAS_ALTERED_CONTENT_NO"]'); al && al.click();
  // category -> Gaming
  const trig = d.querySelector('#category ytcp-dropdown-trigger') || d.querySelector('#category'); trig.click(); await sleep(900);
  const g = [...document.querySelectorAll('tp-yt-paper-item, ytcp-ve, yt-formatted-string, span, div')].find(e => e.childElementCount === 0 && e.offsetParent && /^(遊戲|Gaming)$/.test(e.textContent.trim()) && !d.querySelector('#category').contains(e));
  if (g) { (g.closest('tp-yt-paper-item') || g).click(); } await sleep(500);
  log.push('cat ' + d.querySelector('#category').innerText.trim().split('\n').pop());
  // go to visibility
  for (let i = 0; i < 3; i++) { d.querySelector('#next-button').click(); await sleep(1300); }
  const pv = d.querySelector('tp-yt-paper-radio-button[name="PRIVATE"]'); pv && pv.click();
  const ex = d.querySelector('#second-container-expand-button'); ex && ex.click(); await sleep(1000);
  log.push('link ' + ((d.querySelector('a.ytcp-video-info, .video-url-fadeable a') || {}).href || ''));
  return log;
};
'ok';
