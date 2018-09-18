// 获取视屏宽度
let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
let htmlDom = document.getElementsByTagName('html')[0];

// 设置html的fontSize的值
htmlDom.style.fontSize = htmlWidth / 10 + 'px';
// console.log(htmlDom)
window.addEventListener('resize', (e) => {
let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
htmlDom.style.fontSize = htmlWidth / 10 + 'px';
})

