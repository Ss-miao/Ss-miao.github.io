/* ===================================================================
   黄淼 OS · 数据
   -------------------------------------------------------------------
   桌面上的程序全从这里取数据：房间、作品、名片。
   加东西只改这个文件，不用碰界面代码。
   =================================================================== */
window.OS_DATA = {

  /* ---------- 我 ---------- */
  me: {
    name: '黄淼',
    tagline: 'AIGC · AI 内容运营',
    line: '用 AI 把想法变成能交付的作品',
    avatar: 'avatar.png',
    bio: [
      '做视频包装出身，现在主要用 AI 做内容：图片、视频、音乐，还有把想法直接做成能点开的东西。',
      '白天剪片子、调模型，晚上写工具。住过两间房子，都被我用手机扫成了点云，存在这台电脑里。'
    ],
    facts: [
      ['定位', '用 AI 把想法变成能交付的作品'],
      ['抖音', '情感图文 392 万播放 · 7.5 万粉丝'],
      ['产品', 'upmiao.com — AI 图片 / 视频 / 音乐 + 无限画布'],
      ['技能', 'AE · PR · PS · Midjourney · 可灵 · Seedance'],
      ['认证', '中职计算机教师资格证 · 计算机二级 / 三级 · C1']
    ]
  },

  contact: {
    phone: '13216765200',
    mail: 'hm3227513340@qq.com',
    site: 'upmiao.com',
    note: '接单：AI 视频 / 包装 / 商业片',
    links: [
      { name: 'upmiao.com', url: 'https://upmiao.com', sub: 'AI 图片 / 视频 / 音乐' },
      { name: 'GitHub', url: 'https://github.com/Ss-miao', sub: '代码与开源' },
      { name: '长页版简历', url: 'index.long.html', sub: '一张纸说完的那版' }
    ]
  },

  /* ---------- 我的房间（走进去的那间） ---------- */
  rooms: [
    {
      id: 'r1', p: 'r1',
      name: '带阳台的那间',
      en: 'THE ROOM WITH A BALCONY',
      meta: '15.8 m² · 3.74 × 4.22 m · 层高 2.62 m',
      span: '2023 — 2024',
      blurb: '床挨着墙，书桌顶着窗。晚上关灯以后，阳台外面的路灯会照进来。',
      cover: 'home/assets/r1/preview.jpg',
      url: 'home/room.html?p=r1'
    },
    {
      id: 'r2', p: 'r2',
      name: '长条的那间',
      en: 'THE LONG ROOM',
      meta: '45.5 m² · 4.13 × 11.06 m · 层高 2.60 m',
      span: '2024 — 2026',
      blurb: '四米一宽、十一米长的一个开间。从门口走到窗前，正好二十步。',
      cover: 'home/assets/r2/preview.jpg',
      url: 'home/room.html?p=r2'
    }
  ],

  /* ---------- 我的作品 ---------- */
  workCats: [
    { k: 'all', t: '全部' },
    { k: 'ae', t: 'AE 特效' },
    { k: 'edit', t: '剪辑' },
    { k: 'biz', t: '商业' },
    { k: 'aigc', t: 'AIGC' }
  ],
  works: [
    { t: '奖项荣誉包装', cat: 'ae', d: '荣誉奖项展示特效包装', dur: '0:45', img: 'portfolio/thumbnails/奖项包装.jpg', video: 'portfolio/videos/奖项包装.mp4' },
    { t: '品牌片头动画', cat: 'ae', d: '品牌片头动画设计', dur: '0:15', img: 'portfolio/thumbnails/片头包装.jpg', video: 'portfolio/videos/片头包装.mp4' },
    { t: '视觉特效合成', cat: 'ae', d: '视觉特效合成包装', dur: '1:12', img: 'portfolio/thumbnails/特效包装.jpg', video: 'portfolio/videos/特效包装.mp4' },
    { t: '科技感包装', cat: 'ae', d: '科技感视觉包装展示', dur: '0:06', img: 'portfolio/thumbnails/科技包装.jpg', video: 'portfolio/videos/科技包装.mp4' },
    { t: '赛博朋克跟踪', cat: 'ae', d: '赛博朋克风格跟踪特效', dur: '0:23', img: 'portfolio/thumbnails/赛博跟踪.jpg', video: 'portfolio/videos/赛博跟踪.mp4' },
    { t: '多人同屏特效', cat: 'ae', d: '多人同屏特效合成', dur: '0:03', img: 'portfolio/thumbnails/多人同屏包装.jpg', video: 'portfolio/videos/多人同屏包装.mp4' },
    { t: '年度总结包装', cat: 'ae', d: '年度总结视觉包装', dur: '0:10', img: 'portfolio/thumbnails/年度包装.jpg', video: 'portfolio/videos/年度包装.mp4' },
    { t: '照片展示动画', cat: 'ae', d: '照片展示动画包装', dur: '0:45', img: 'portfolio/thumbnails/照片包装.jpg', video: 'portfolio/videos/照片包装.mp4' },
    { t: '模板化包装', cat: 'ae', d: '模板化视觉包装', dur: '1:00', img: 'portfolio/thumbnails/套模板.jpg', video: 'portfolio/videos/套模板.mp4' },
    { t: 'App 界面展示', cat: 'ae', d: 'App 界面展示动画', dur: '1:50', img: 'portfolio/thumbnails/app套模板.jpg', video: 'portfolio/videos/app套模板.mp4' },
    { t: '电影感叙事剪辑', cat: 'edit', d: '电影感氛围叙事剪辑', dur: '0:23', img: 'portfolio/thumbnails/氛围感剪辑.jpg', video: 'portfolio/videos/氛围感剪辑.mp4' },
    { t: '高燃游戏混剪', cat: 'edit', d: '游戏高燃混剪集锦', dur: '0:23', img: 'portfolio/thumbnails/游戏剪辑.jpg', video: 'portfolio/videos/游戏剪辑.mp4' },
    { t: 'FPS 精彩集锦', cat: 'edit', d: 'FPS 游戏精彩集锦', dur: '0:21', img: 'portfolio/thumbnails/瓦罗兰特剪辑.jpg', video: 'portfolio/videos/瓦罗兰特剪辑.mp4' },
    { t: '游戏实况录制', cat: 'edit', d: '游戏实况录制剪辑', dur: '0:14', img: 'portfolio/thumbnails/我的世界短视频.jpg', video: 'portfolio/videos/我的世界短视频.mp4' },
    { t: '可爱风格创意', cat: 'edit', d: '可爱风格创意剪辑', dur: '0:20', img: 'portfolio/thumbnails/可爱风.jpg', video: 'portfolio/videos/可爱风.mp4' },
    { t: '定格动画制作', cat: 'edit', d: '定格动画创意制作', dur: '0:15', img: 'portfolio/thumbnails/木偶动画.jpg', video: 'portfolio/videos/木偶动画.mp4' },
    { t: '工厂宣传片', cat: 'biz', d: '工厂产线宣传视频', dur: '0:05', img: 'portfolio/thumbnails/工厂包装.jpg', video: 'portfolio/videos/工厂包装.mp4' },
    { t: '店铺推广视频', cat: 'biz', d: '店铺品牌推广视频', dur: '0:21', img: 'portfolio/thumbnails/理发店铺推广视频.jpg', video: 'portfolio/videos/理发店铺推广视频.mp4' },
    { t: '美业品牌宣传', cat: 'biz', d: '美业品牌宣传视频', dur: '0:06', img: 'portfolio/thumbnails/店铺宣传.jpg', video: 'portfolio/videos/店铺宣传.mp4' },
    { t: 'AI 视频制作', cat: 'aigc', d: 'AIGC 工具生成视频', dur: '0:59', img: 'portfolio/thumbnails/AI视频制作.jpg', video: 'portfolio/videos/AI视频制作.mp4' },
    { t: '东方天宫', cat: 'aigc', d: 'AI 生成的东方幻想场景短片', dur: '1:24', img: 'portfolio/thumbnails/东方天宫.jpg', video: 'portfolio/videos/东方天宫.mp4' }
  ],

  /* ---------- 说明 ---------- */
  readme: [
    '这台电脑里没有别的东西，只有住过的两间房和做过的一些片子。',
    '',
    '· 双击「我的房间」，挑一间，推门进去。人在里面可以用摇杆或 WASD 走，',
    '  拖画面转头，走到床、沙发、椅子前面按 E 坐下，抽屉和柜门可以拉开。',
    '· 双击「我的作品」，21 件片子，点开是大图和说明，有视频的直接放。',
    '· 想关掉窗口就点左上角那个红点。',
    '',
    '房间是用手机绕着走一圈扫出来的点云，不是建模，所以有的地方会有毛边，',
    '柜子里面是黑的——因为拍的时候柜门关着。这些都是真的。'
  ]
};
