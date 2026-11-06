/* BoardUI v2: KPI sparklines + command palette */
(function(){
  "use strict";
  /* decorative sparklines in KPI cards */
  var waves=[
    [8,13,10,16,14,19,17,22,20,25,24],
    [20,17,19,13,15,11,14,8,11,6,8],
    [7,11,9,14,12,17,15,20,18,23,22],
    [22,19,21,16,18,13,15,10,12,7,9]
  ];
  function spark(v){
    var w=66,h=30,step=w/(v.length-1);
    var pts=v.map(function(d,i){return [(i*step).toFixed(1),(h-d).toFixed(1)]});
    var line='M'+pts.map(function(p){return p.join(',')}).join(' L');
    var area=line+' L'+w+','+h+' L0,'+h+' Z';
    return '<svg class="stat-spark" viewBox="0 0 66 30" preserveAspectRatio="none" aria-hidden="true"><path class="area" d="'+area+'"/><path class="line" d="'+line+'"/></svg>';
  }
  document.querySelectorAll('.stat').forEach(function(el,i){
    el.insertAdjacentHTML('beforeend',spark(waves[i%waves.length]));
  });

  /* command palette */
  var items=[
    {t:'概览',en:'OVERVIEW',id:'hero',i:'⌂'},
    {t:'我的历程',en:'EXPERIENCE',id:'expSection',i:'◷'},
    {t:'技能树',en:'SKILLS',id:'skillsSection',i:'✦'},
    {t:'服务范围',en:'SERVICES',id:'servicesSection',i:'◈'},
    {t:'证书与资质',en:'CREDENTIALS',id:'certSection',i:'✓'},
    {t:'作品集',en:'WORKS',id:'worksSection',i:'▦'},
    {t:'AI 问答 / 联系我',en:'CONTACT',id:'chatSection',i:'✉'},
    {t:'切换深浅色',en:'THEME',i:'◐',theme:true}
  ];
  var root=document.getElementById('cmdk'), input=document.getElementById('cmdkInput'),
      list=document.getElementById('cmdkList'), trigger=document.getElementById('cmdkTrigger');
  var shown=[], sel=0, reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
  function render(q){
    q=(q||'').trim().toLowerCase();
    shown=items.filter(function(it){return !q||(it.t+it.en).toLowerCase().indexOf(q)>-1});
    sel=0;
    list.innerHTML=shown.length?shown.map(function(it,i){
      return '<button class="cmdk-item'+(i===0?' sel':'')+'" data-i="'+i+'"><span class="ci-ico">'+it.i+'</span><span>'+it.t+'</span><span class="ci-en">'+it.en+'</span></button>';
    }).join(''):'<div class="cmdk-empty">没有匹配的区块</div>';
  }
  function mark(){
    [].forEach.call(list.querySelectorAll('.cmdk-item'),function(n,i){n.classList.toggle('sel',i===sel)});
    var cur=list.querySelector('.cmdk-item.sel'); if(cur) cur.scrollIntoView({block:'nearest'});
  }
  function open(){
    root.hidden=false; input.value=''; render('');
    setTimeout(function(){input.focus()},20);
  }
  function close(){root.hidden=true}
  function go(i){
    var it=shown[i]; if(!it) return;
    close();
    if(it.theme){var b=document.getElementById('themeBtn'); if(b) b.click(); return}
    var el=document.getElementById(it.id), c=document.getElementById('mainContent');
    if(el&&c) c.scrollTo({top:Math.max(0,el.offsetTop-2),behavior:reduce?'auto':'smooth'});
  }
  if(trigger) trigger.addEventListener('click',open);
  root.querySelector('[data-cmdk-close]').addEventListener('click',close);
  list.addEventListener('click',function(e){
    var b=e.target.closest('.cmdk-item'); if(b) go(+b.dataset.i);
  });
  input.addEventListener('input',function(){render(input.value)});
  document.addEventListener('keydown',function(e){
    if((e.metaKey||e.ctrlKey)&&String(e.key).toLowerCase()==='k'){e.preventDefault();root.hidden?open():close();return}
    if(root.hidden) return;
    if(e.key==='Escape'){e.preventDefault();close()}
    else if(e.key==='ArrowDown'){e.preventDefault();sel=Math.min(sel+1,shown.length-1);mark()}
    else if(e.key==='ArrowUp'){e.preventDefault();sel=Math.max(sel-1,0);mark()}
    else if(e.key==='Enter'){e.preventDefault();go(sel)}
  });
})();
