window.sleep=ms=>new Promise(r=>setTimeout(r,ms));
window.__file=async function(name){const c=[...document.querySelectorAll('ytcp-button, button')].find(x=>x.offsetParent&&x.innerText.trim()==='關閉');c&&c.click();await sleep(800);
if(!document.querySelector('input[type=file][name=Filedata]')){document.querySelector('ytcp-button#upload-button, #upload-icon, ytcp-icon-button#upload-icon').click();await sleep(1500);}
const blob=await(await fetch('https://raw.githubusercontent.com/york20275/york20275/shorts/'+name)).blob();const f=new File([blob],name.split('/').pop(),{type:'video/mp4'});const dt=new DataTransfer();dt.items.add(f);const inp=document.querySelector('input[type=file][name=Filedata]');inp.files=dt.files;inp.dispatchEvent(new Event('change',{bubbles:true}));for(let i=0;i<40;i++){await sleep(500);const d=document.querySelector('ytcp-uploads-dialog');if(d&&d.querySelector('#title-textarea #textbox'))break;}return blob.size;};
window.__fill=async function(o){const log=[];const d=document.querySelector('ytcp-uploads-dialog');
const set=(sel,txt)=>{const el=d.querySelector(sel);el.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,txt);el.dispatchEvent(new Event('input',{bubbles:true}));el.blur();return el.innerText.length;};
log.push('title '+set('#title-textarea #textbox',o.title));log.push('desc '+set('#description-textarea #textbox',o.desc));
const nk=d.querySelector('tp-yt-paper-radio-button[name="VIDEO_MADE_FOR_KIDS_NOT_MFK"]');nk&&nk.click();
const more=d.querySelector('#toggle-button');if(more&&!d.querySelector('ytcp-chip-bar #text-input')){more.click();await sleep(1500);}
for(let k=0;k<60;k++){const c=d.querySelector('ytcp-chip-bar ytcp-chip');if(!c)break;c.querySelector('#delete-icon').click();await sleep(60);}
const ti=d.querySelector('ytcp-chip-bar #text-input');ti.focus();document.execCommand('insertText',false,o.tags.join(',')+',');ti.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',keyCode:13,bubbles:true}));await sleep(400);
log.push('tags '+d.querySelectorAll('ytcp-chip-bar ytcp-chip').length);
const al=d.querySelector('tp-yt-paper-radio-button[name="VIDEO_HAS_ALTERED_CONTENT_NO"]');al&&al.click();
for(let i=0;i<3;i++){d.querySelector('#next-button').click();await sleep(1300);}
const ex=d.querySelector('#second-container-expand-button');ex&&ex.click();await sleep(800);return log;};
window.__go=async function(i){const t=document.querySelector('ytcp-uploads-dialog #title-textarea #textbox');if(!(document.activeElement===t||t.contains(document.activeElement)))return 'nofocus '+document.activeElement.tagName;const r=await window.__fill(window.__M[i]);const s=window.innerWidth/800;const p=window.__pos();return [r,p.date.map(x=>Math.round(x/s)),p.time.map(x=>Math.round(x/s))];};
window.__pos=function(){const d=document.querySelector('ytcp-uploads-dialog');const r=e=>{const b=e.getBoundingClientRect();return [Math.round(b.x+b.width/2),Math.round(b.y+b.height/2)]};return {date:r(d.querySelector('#datepicker-trigger')),time:r(d.querySelector('#time-of-day-container input'))}};
window.__daypos=function(day){const s=window.innerWidth/800;const c=[...document.querySelectorAll('ytcp-date-picker span, ytcp-date-picker div')].filter(e=>e.offsetParent&&e.innerText&&e.innerText.trim()===String(day)&&!e.children.length);const e=c[0];if(!e)return null;const b=e.getBoundingClientRect();return [Math.round((b.x+b.width/2)/s),Math.round((b.y+b.height/2)/s)]};
window.__fin2=async function(i){const m=__M[i];const d=document.querySelector('ytcp-uploads-dialog');const v=d.querySelector('#time-of-day-container input').value,dt=d.querySelector('#datepicker-trigger').innerText;if(v===m.slot&&dt.includes(m.day+'日')){d.querySelector('#done-button').click();return 'clicked-done';}return 'BAD '+v+' '+dt;};
window.__w=async function(){await sleep(9000);return window.__upn;};
window.__start=async function(i){window.__upn=null;window.__file('news/'+__M[i].file).then(n=>window.__upn=n,e=>window.__upn='ERR '+e);for(let k=0;k<4;k++){await sleep(9000);if(window.__upn)break;}return [__M[i].file,__M[i].day,__M[i].slot,window.__upn,!!document.querySelector('ytcp-uploads-dialog #title-textarea #textbox')];};
window.__M=await(await fetch('https://raw.githubusercontent.com/york20275/york20275/shorts/news/meta2.json?'+Date.now())).json();
'loaded '+__M.length;
