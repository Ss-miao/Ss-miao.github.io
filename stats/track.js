(function(){
var API='https://water.beer/stats/api/track';
var vid=localStorage.getItem('_hvid');
if(!vid){vid='v_'+Math.random().toString(36).slice(2,10)+Date.now();localStorage.setItem('_hvid',vid);}

var page=location.pathname.replace(/\/$/,'')||'/';
var project='主页';
if(page.includes('/parallel-life'))project='平行人生';
else if(page.includes('/vibe-to-product'))project='Vibe to Product';
else if(page.includes('/logic-puzzle'))project='逻辑推演';
else if(page.includes('/ai-card-sandbox'))project='卡牌沙盒';
else if(page.includes('/plant-lab'))project='植物实验室';
else if(page.includes('/stats'))project='数据看板';
else if(page==='/'||page==='/index.html')project='主页';

function send(action,extra){
  var d={vid:vid,page:page,project:project,action:action,referrer:document.referrer||'',
    ua:navigator.userAgent.slice(0,200),screen:screen.width+'x'+screen.height};
  if(extra)for(var k in extra)d[k]=extra[k];
  try{var r=new XMLHttpRequest();r.open('POST',API,true);r.setRequestHeader('Content-Type','application/json');r.send(JSON.stringify(d));}catch(e){}
}

send('pageview');

var stayStart=Date.now();
window.addEventListener('beforeunload',function(){
  var stay=Math.round((Date.now()-stayStart)/1000);
  send('stay',{seconds:stay});
});

window._track=send;
})();
