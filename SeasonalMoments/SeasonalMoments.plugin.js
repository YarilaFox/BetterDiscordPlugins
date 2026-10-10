/**
 * @name SeasonalMoments
 * @author arikm
 * @description Seasonal particles, winter snow, fireworks, and private holiday cards in chats and calls.
 * @version 0.7.0
 */

/* The autumn leaf shape is MIT licensed: Diemen Design, LibreICONS.
 * https://github.com/DiemenDesign/LibreICONS */

const NAME = "SeasonalMoments";
const STYLE_ID = "seasonal-moments-style";
const PREVIEW_THEME_CLASSES = ["theme-light", "theme-dark", "theme-midnight", "theme-darker", "theme-ash", "theme-onyx"];
const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const MONTHS_RU = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const MONTHS_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// One roll per local day and plugin session. Spring is the rainiest season; winter stays snowy.
const RAIN_CHANCE = [0, 0, .35, .55, .45, .20, .15, .20, .30, .38, .20, 0];
const STORM_CHANCE = [0, 0, .10, .16, .20, .24, .28, .26, .15, .10, .06, 0];
const LEAF_PATH = "m 9.2375,10.433335 c -0.9041667,0.45 -1.9145833,0.71666 -2.9333333,0.71666 -1.7125,0 -3.1479167,-0.83541 -3.1479167,-0.83541 -0.3354167,0 -0.7375,1.35208 -1.31875,1.35208 -0.5625,0 -0.8375,-0.5 -0.8375,-0.80208 0,-0.68959 1.325,-1.22709 1.325,-1.61042 0,0 -0.2604167,-0.44167 -0.2604167,-1.23333 0,-2.10834 1.69375,-3.6125 3.5958334,-4.23542 1.3729166,-0.45 4.2916666,0.0729 5.2229163,-0.80208 0.36875,-0.3375 0.55,-0.65 1.1125,-0.65 0.75625,0 1.004167,1.94166 1.004167,2.50625 0,2.31041 -1.135417,4.30208 -3.7625,5.59375 z m -5.2979167,-1.575 c 1.3229167,-1.87292 3.0104167,-2.68334 5.36875,-2.5 0.1833334,0.0146 0.34375,-0.12292 0.3583334,-0.30625 0.014583,-0.18334 -0.1229167,-0.34375 -0.30625,-0.35834 -2.5833334,-0.2 -4.4979167,0.70625 -5.9645834,2.78125 -0.10625,0.15 -0.070833,0.35834 0.079167,0.46459 0.15,0.10625 0.3583333,0.0708 0.4645833,-0.0813 z";
// Twemoji Christmas tree (the standard emoji artwork used in Discord chat), CC BY 4.0.
// Copyright 2018 Twitter, Inc. and other contributors. https://github.com/jdecked/twemoji
const TREE_EMOJI_DATA = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNiAzNiI+PHBhdGggZmlsbD0iIzY2MjExMyIgZD0iTTIyLjA4OCAzMi44M2MwIDEuOTk3LTEuNjE5IDIuNzEyLTMuNjE2IDIuNzEycy0zLjYxNi0uNzE1LTMuNjE2LTIuNzEybC45MDQtOC4xMzZjMC0xLjk5Ni43MTUtMS44MDggMi43MTItMS44MDggMS45OTcgMCAyLjcxMi0uMTg4IDIuNzEyIDEuODA4bC45MDQgOC4xMzZ6Ii8+PHBhdGggZmlsbD0iIzVDOTEzQiIgZD0iTTMwLjU5IDI3LjY3NWMtNi4yOTQtNS4zOTItOC44NDMtMTMuMTEyLTEyLjExOC0xMy4xMTJzLTUuODI0IDcuNzIxLTEyLjExOCAxMy4xMTJjLTIuNjQ1IDIuMjY2LTEuMzg1IDMuNTc3IDIuMjQxIDMuMzE0IDMuMjMyLS4yMzMgNi4yNTUtLjk2NiA5Ljg3Ny0uOTY2czYuNjQ2LjczMyA5Ljg3Ni45NjZjMy42MjcuMjYzIDQuODg2LTEuMDQ5IDIuMjQyLTMuMzE0eiIvPjxwYXRoIGZpbGw9IiMzRTcyMUQiIGQ9Ik0yOC41NDYgMjUuNTM4Yy00LjgzNy00LjQzNS03LjU1NS0xMC43ODctMTAuMDc0LTEwLjc4Ny0yLjUxNyAwLTUuMjM2IDYuMzUyLTEwLjA3MyAxMC43ODctMy44NDQgMy41MjQgNS4wMzcgNC4zMTUgMTAuMDczIDAgNS4wMzQgNC4zMTYgMTMuOTE3IDMuNTI0IDEwLjA3NCAweiIvPjxwYXRoIGZpbGw9IiM1QzkxM0IiIGQ9Ik0yOC41NDYgMjEuOTQ1Yy00LjgzNy00LjE0My03LjU1NS0xMC4wNzctMTAuMDc0LTEwLjA3Ny0yLjUxNyAwLTUuMjM2IDUuOTM0LTEwLjA3MyAxMC4wNzctMy44NDQgMy4yOTIgNS4wMzcgNC4wMzEgMTAuMDczIDAgNS4wMzQgNC4wMzIgMTMuOTE3IDMuMjkyIDEwLjA3NCAweiIvPjxwYXRoIGZpbGw9IiMzRTcyMUQiIGQ9Ik0yNi4zMzYgMTkuMDAzYy0zLjc3NS0zLjIzNS01Ljg5Ny03Ljg2OC03Ljg2NC03Ljg2OC0xLjk2NSAwLTQuMDg4IDQuNjMyLTcuODY0IDcuODY4LTMgMi41NyAzLjkzMiAzLjE0NyA3Ljg2NCAwIDMuOTMgMy4xNDYgMTAuODY1IDIuNTcgNy44NjQgMHoiLz48cGF0aCBmaWxsPSIjNUM5MTNCIiBkPSJNMjYuMzM2IDE2LjMxMWMtMy43NzUtMy4yMzUtNS44OTctNy44NjctNy44NjQtNy44NjctMS45NjUgMC00LjA4OCA0LjYzMi03Ljg2NCA3Ljg2Ny0zIDIuNTcxIDMuOTMyIDMuMTQ3IDcuODY0IDAgMy45MyAzLjE0NyAxMC44NjUgMi41NzEgNy44NjQgMHoiLz48cGF0aCBmaWxsPSIjM0U3MjFEIiBkPSJNMjQuODE4IDEzLjkyYy0zLjA0Ny0yLjYxLTQuNzYtNi4zNDktNi4zNDctNi4zNDktMS41ODYgMC0zLjI5OSAzLjczOS02LjM0NyA2LjM0OS0yLjQyMiAyLjA3NSAzLjE3NCAyLjU0IDYuMzQ3IDAgMy4xNzQgMi41NCA4Ljc3IDIuMDc1IDYuMzQ3IDB6Ii8+PHBhdGggZmlsbD0iIzVDOTEzQiIgZD0iTTI0LjgxOCAxMS44OTRjLTMuMDQ3LTIuNjEtNC43Ni02LjM0OS02LjM0Ny02LjM0OS0xLjU4NiAwLTMuMjk5IDMuNzM5LTYuMzQ3IDYuMzQ5LTIuNDIyIDIuMDc1IDMuMTc0IDIuNTQgNi4zNDcgMCAzLjE3NCAyLjU0IDguNzcgMi4wNzUgNi4zNDcgMHoiLz48cGF0aCBmaWxsPSIjM0U3MjFEIiBkPSJNMjMuMzAxIDguOTExQzIwLjk4MyA2LjkyNSAxOS42OCA0LjA4IDE4LjQ3MiA0LjA4Yy0xLjIwNyAwLTIuNTExIDIuODQ1LTQuODMgNC44MzEtMS44NDMgMS41NzkgMi40MTUgMS45MzMgNC44MyAwIDIuNDE0IDEuOTMzIDYuNjczIDEuNTc5IDQuODI5IDB6Ii8+PHBhdGggZmlsbD0iIzVDOTEzQiIgZD0iTTIzLjMwMSA3LjgzMkMyMC45ODMgNS44NDUgMTkuNjggMyAxOC40NzIgM2MtMS4yMDcgMC0yLjUxMSAyLjg0NS00LjgzIDQuODMyLTEuODQzIDEuNTc5IDIuNDE1IDEuOTMzIDQuODMgMCAyLjQxNCAxLjkzMiA2LjY3MyAxLjU3OCA0LjgyOSAweiIvPjxjaXJjbGUgZmlsbD0iI0ZGQ0M0RCIgY3g9IjE2LjUiIGN5PSIxMi4wNDIiIHI9IjEuNSIvPjxjaXJjbGUgZmlsbD0iI0ZGQ0M0RCIgY3g9IjIwIiBjeT0iMjUiIHI9IjIiLz48Y2lyY2xlIGZpbGw9IiNERDJFNDQiIGN4PSIyMi41IiBjeT0iMTUuNSIgcj0iMi41Ii8+PGNpcmNsZSBmaWxsPSIjREQyRTQ0IiBjeD0iMTAiIGN5PSIyNiIgcj0iMiIvPjxjaXJjbGUgZmlsbD0iI0E2RDM4OCIgY3g9IjE0IiBjeT0iMTkiIHI9IjIiLz48Y2lyY2xlIGZpbGw9IiNBNkQzODgiIGN4PSIyNiIgY3k9IjIzIiByPSIyIi8+PHBhdGggZmlsbD0iI0ZGQUMzMyIgZD0iTTE5LjM3OSAxLjY3OWMuMTQzLjI3NS41MTIuNTQ5LjgxNy42MDlsMS4zNzkuMjY5Yy4zMDUuMDYuMzc3LjI5LjE1OS41MTJsLS45ODMgMS4wMDRjLS4yMTcuMjIyLS4zNjUuNjU3LS4zMjYuOTY1bC4xNyAxLjM5NGMuMDM4LjMwOS0uMTU5LjQ0OC0uNDM4LjMxTDE4LjkgNi4xMTdjLS4yNzktLjEzOC0uNzM4LS4xNDQtMS4wMi0uMDEzbC0xLjI3NC41OTRjLS4yODIuMTMtLjQ3Ni0uMDE0LS40My0uMzIybC4yMDUtMS4zOWMuMDQ1LS4zMDctLjA5MS0uNzQ1LS4zMDItLjk3M2wtLjk1OS0xLjAyN2MtLjIxMi0uMjI3LS4xMzUtLjQ1Ny4xNzItLjUwOGwxLjM4NS0uMjM0Yy4zMDctLjA1MS42ODEtLjMxNi44MzItLjU4OEwxOC4xOS40MjdjLjE1MS0uMjcyLjM5NC0uMjY5LjUzNy4wMDZsLjY1MiAxLjI0NnoiLz48L3N2Zz4=";

const CSS = `
#seasonal-moments-layer{position:absolute;overflow:hidden;pointer-events:none;z-index:0;contain:layout style paint;filter:blur(var(--sm-layer-blur,0px));transition:opacity .2s ease}
#seasonal-moments-layer.sm-call-layer{z-index:1;opacity:.7}
#seasonal-moments-layer .sm-particle,.sm-snowfall-bridge .sm-particle{position:absolute;top:-40px;left:var(--sm-left);width:var(--sm-size);height:var(--sm-size);display:flex;align-items:center;justify-content:center;color:var(--sm-color);font-size:var(--sm-size);line-height:1;opacity:var(--sm-opacity);animation:sm-fall var(--sm-duration) linear var(--sm-delay) infinite;will-change:transform;user-select:none}
.sm-snowfall-bridge{position:fixed;overflow:hidden;pointer-events:none;z-index:5;contain:layout style paint;filter:blur(var(--sm-layer-blur,0px))}
.sm-snowfall-bridge .sm-particle{top:calc(-40px - var(--sm-bridge-offset))}
#seasonal-moments-layer .sm-particle svg{width:100%;height:100%;fill:currentColor}
#seasonal-moments-layer .sm-particle.sm-snow,.sm-snowfall-bridge .sm-particle.sm-snow{border-radius:50%;background:currentColor;box-shadow:0 0 6px rgba(221,240,255,.32);animation-name:sm-snow-fall}
#seasonal-moments-layer .sm-particle.sm-summer-star{top:var(--sm-star-top);border-radius:50%;background:currentColor;box-shadow:0 0 var(--sm-star-glow) currentColor;animation:sm-star-twinkle var(--sm-duration) ease-in-out var(--sm-delay) infinite}
.sm-composer-snowbank{position:absolute;top:0;left:0;width:100%;height:14px;overflow:hidden;pointer-events:none;z-index:1;border-radius:8px 8px 0 0}
.sm-composer-snowbank svg{display:block;width:100%;height:100%}
#seasonal-moments-layer .sm-firework-launch{position:absolute;bottom:1px;left:var(--sm-fw-left);height:var(--sm-fw-launch-height,22px);width:var(--sm-fw-launch-width,2px);border-radius:2px;background:linear-gradient(transparent,var(--sm-fw-color));box-shadow:0 0 7px var(--sm-fw-color);animation:sm-fw-launch var(--sm-fw-launch-duration,.48s) ease-out forwards;pointer-events:none}
#seasonal-moments-layer .sm-firework-ray{position:absolute;left:var(--sm-fw-left);top:var(--sm-fw-top);width:var(--sm-fw-size);height:var(--sm-fw-size);color:var(--sm-fw-color);opacity:0;animation:sm-fw-burst var(--sm-fw-burst-duration,1.1s) ease-out var(--sm-fw-delay) forwards;pointer-events:none}
#seasonal-moments-layer .sm-firework-ray svg{width:100%;height:100%;fill:currentColor;filter:drop-shadow(0 0 3px currentColor)}
#seasonal-moments-layer .sm-firework-ray::after{content:"";position:absolute;left:50%;top:50%;width:1px;height:var(--sm-fw-tail);background:linear-gradient(currentColor,transparent);transform-origin:top;transform:rotate(var(--sm-fw-angle));opacity:.6}
#seasonal-moments-layer .sm-birthday-burst{position:absolute;left:var(--sm-burst-left);top:var(--sm-burst-top);width:var(--sm-burst-size);height:var(--sm-burst-size);color:var(--sm-burst-color);opacity:0;animation:sm-birthday-burst .9s ease-out forwards;pointer-events:none}
#seasonal-moments-layer .sm-birthday-burst svg{width:100%;height:100%;fill:currentColor}
.sm-nickname-perch{position:absolute;bottom:calc(100% - 4px);left:var(--sm-perch-left);display:block;width:var(--sm-perch-size);height:var(--sm-perch-size);color:var(--sm-perch-color);font-size:var(--sm-perch-size);line-height:1;pointer-events:none;user-select:none;z-index:2;animation:sm-nickname-land 4.5s ease-out forwards}
.sm-nickname-perch svg{display:block;width:100%;height:100%;fill:currentColor}
.sm-nickname-perch.sm-perch-snow{border-radius:50%;background:currentColor;box-shadow:0 0 5px currentColor}
#app-mount.sm-weather-root{transition:filter .45s ease}#app-mount.sm-weather-root.sm-rain-tone{filter:brightness(.97) contrast(.975)}
#app-mount.sm-preview-black{--background-primary:#0b0c10;--background-secondary:#111218;--background-tertiary:#08090c;--background-base-lowest:#08090c;--background-base-lower:#0b0c10;--background-base-low:#111218;--bg-base-primary:#0b0c10;--bg-base-secondary:#111218;--channeltextarea-background:#1a1b23;--text-normal:#e9eaf1;--text-strong:#fff}
#app-mount.sm-preview-nitro{--background-primary:#261d38;--background-secondary:#21192f;--background-tertiary:#191326;--background-base-lowest:#191326;--background-base-lower:#21192f;--background-base-low:#2d2240;--bg-base-primary:#261d38;--bg-base-secondary:#21192f;--channeltextarea-background:#382b4d;--brand-500:#aa79f1;--text-link:#d4b8ff;--text-normal:#f0eafa;--text-strong:#fff}
#app-mount.sm-preview-nitro [class*="chatContent"]{background:radial-gradient(ellipse at 70% 0%,rgba(155,95,236,.16),transparent 55%),linear-gradient(135deg,#211a32,#30213f 65%,#22192f)}
#seasonal-moments-layer .sm-rain-drop{position:absolute;inset:0 auto 0 var(--sm-left);width:20px;pointer-events:none}
#seasonal-moments-layer .sm-rain-streak{position:absolute;top:0;left:4px;width:12px;height:var(--sm-rain-length);animation:sm-rain-fall var(--sm-rain-duration) linear var(--sm-rain-delay) infinite}
#seasonal-moments-layer .sm-rain-streak::before{content:"";display:block;margin-left:5px;width:1.5px;height:100%;border-radius:2px;background:linear-gradient(to bottom,transparent,rgba(145,189,230,.20),rgba(195,225,250,.75));box-shadow:0 0 5px rgba(135,185,230,.24)}
#seasonal-moments-layer .sm-rain-splash{position:absolute;left:calc(5px + var(--sm-rain-drift));bottom:3px;width:10px;height:1px;background:rgba(190,223,252,.6);opacity:0;transform-origin:center;animation:sm-rain-splash var(--sm-rain-duration) linear var(--sm-rain-delay) infinite}
#seasonal-moments-layer .sm-rain-splash::before,#seasonal-moments-layer .sm-rain-splash::after{content:"";position:absolute;bottom:1px;width:4px;height:1px;background:inherit}
#seasonal-moments-layer .sm-rain-splash::before{left:-3px;transform:rotate(-35deg)}
#seasonal-moments-layer .sm-rain-splash::after{right:-3px;transform:rotate(35deg)}
#seasonal-moments-layer .sm-lightning{position:absolute;inset:0;pointer-events:none;animation:sm-lightning .8s ease-out forwards}
#seasonal-moments-layer .sm-lightning.sm-left{background:linear-gradient(90deg,rgba(185,207,246,.24),rgba(185,207,246,.08) 43%,transparent 65%)}
#seasonal-moments-layer .sm-lightning.sm-right{background:linear-gradient(270deg,rgba(185,207,246,.24),rgba(185,207,246,.08) 43%,transparent 65%)}
@keyframes sm-fall{from{transform:translate3d(0,-50px,0) rotate(0deg)}to{transform:translate3d(var(--sm-drift),calc(var(--sm-height) + 100px),0) rotate(var(--sm-rotation))}}
@keyframes sm-snow-fall{from{transform:translate3d(0,-50px,0);opacity:var(--sm-opacity)}99%{opacity:var(--sm-opacity)}to{transform:translate3d(var(--sm-drift),calc(var(--sm-height) + 40px - var(--sm-size)),0);opacity:0}}
@keyframes sm-star-twinkle{0%,100%{transform:scale(.82);opacity:var(--sm-dim-opacity)}50%{transform:scale(1.12);opacity:var(--sm-opacity)}}
@keyframes sm-nickname-land{0%{transform:translate3d(-9px,-32px,0) rotate(-30deg);opacity:0}17%{opacity:.9}32%{transform:translate3d(0,1px,0) rotate(8deg)}43%{transform:translate3d(0,-3px,0) rotate(-6deg)}54%,78%{transform:translate3d(0,0,0) rotate(-8deg);opacity:.9}100%{transform:translate3d(0,0,0) rotate(-8deg);opacity:0}}
@keyframes sm-fw-launch{0%{transform:translateY(0) scaleY(.5);opacity:0}15%{opacity:1}85%{opacity:1}100%{transform:translateY(var(--sm-fw-travel)) scaleY(.7);opacity:0}}
@keyframes sm-fw-burst{0%{transform:translate3d(0,0,0) scale(.2);opacity:0}15%{opacity:1}70%{opacity:.85}100%{transform:translate3d(var(--sm-fw-x),var(--sm-fw-y),0) scale(.15);opacity:0}}
@keyframes sm-birthday-burst{0%{transform:translate3d(0,0,0) scale(.15);opacity:0}25%{opacity:.95}45%{transform:translate3d(var(--sm-burst-x-mid),var(--sm-burst-y-mid),0) scale(1.15);opacity:1}100%{transform:translate3d(var(--sm-burst-x),var(--sm-burst-y),0) scale(.15);opacity:0}}
@keyframes sm-rain-fall{0%{transform:translate3d(0,-65px,0) rotate(7deg);opacity:0}5%{opacity:.8}75%{transform:translate3d(var(--sm-rain-drift),calc(var(--sm-height) - var(--sm-rain-length) - 4px),0) rotate(7deg);opacity:.8}81%{transform:translate3d(var(--sm-rain-drift),calc(var(--sm-height) - 10px),0) scaleY(.22);opacity:.65}89%{transform:translate3d(calc(var(--sm-rain-drift) + 4px),calc(var(--sm-height) - 34px),0) scaleY(.42) rotate(-10deg);opacity:.35}100%{transform:translate3d(calc(var(--sm-rain-drift) + 8px),calc(var(--sm-height) - 18px),0) scaleY(.3);opacity:0}}
@keyframes sm-rain-splash{0%,74%{transform:scaleX(.2) translateY(0);opacity:0}78%{transform:scaleX(.7) translateY(0);opacity:.6}88%{transform:scaleX(1.4) translateY(-2px);opacity:.35}100%{transform:scaleX(1.8) translateY(-3px);opacity:0}}
@keyframes sm-lightning{0%,100%{opacity:0}15%{opacity:.2}24%{opacity:.04}39%{opacity:.32}60%{opacity:.07}}
@media(prefers-reduced-motion:reduce){#seasonal-moments-layer .sm-particle,#seasonal-moments-layer .sm-rain-drop,#seasonal-moments-layer .sm-lightning,#seasonal-moments-layer .sm-firework-launch,#seasonal-moments-layer .sm-firework-ray,.sm-nickname-perch{display:none!important}}
.sm-birthday-li{position:relative;display:block;margin:12px 16px 0 72px;padding:0 0 32px;color:var(--text-normal,#e8e8ed);font-family:var(--font-primary,"gg sans",sans-serif)}
.sm-birthday-li::before{content:"";position:absolute;left:-70px;top:-22px;bottom:20px;width:3px;border-radius:0 2px 2px 0;background:var(--brand-500,#5865f2)}
.sm-birthday-bell{position:absolute;left:-50px;top:34px;width:20px;height:20px;fill:var(--brand-500,#5865f2)}
.sm-birthday-card{box-sizing:border-box;display:flex;align-items:center;gap:15px;min-height:98px;padding:14px 18px;border:1px solid var(--background-modifier-accent,#36383f);border-radius:13px;background:var(--background-secondary,#17181e)}
.sm-birthday-icon{position:relative;flex:0 0 60px;width:60px;height:60px;border-radius:50%;display:grid;place-items:center;font-size:27px;background:linear-gradient(135deg,#7550b5,#b463d2)}
.sm-birthday-icon img{width:100%;height:100%;border-radius:50%;object-fit:cover}
.sm-birthday-copy{min-width:0;flex:1}.sm-birthday-title{font-size:16px;font-weight:600;line-height:20px;color:var(--text-strong,#fff)}.sm-birthday-subtitle{font-size:14px;line-height:18px;color:var(--text-muted,#aaa);margin-top:2px}
.sm-birthday-actions{display:flex;gap:8px;flex-wrap:wrap}.sm-birthday-actions button{appearance:none;border:1px solid var(--background-modifier-accent,#444);border-radius:8px;padding:8px 12px;background:var(--button-secondary-background,#303238);color:var(--text-normal,#eee);font:inherit;font-size:13px;font-weight:500;cursor:pointer}.sm-birthday-actions button:last-child{display:inline-flex;align-items:center;gap:6px;background:#f7f7fb;color:#17171b;border-color:#f7f7fb;box-shadow:0 0 15px #7482f344}.sm-birthday-actions button:last-child svg{width:15px;height:15px;fill:currentColor}.sm-birthday-actions button:hover{filter:brightness(1.12)}
.sm-birthday-private{display:flex;align-items:center;gap:3px;font-size:12px;color:var(--text-muted,#888);margin:12px 0 0}.sm-birthday-private svg{width:16px;height:16px;fill:currentColor;margin-right:2px}.sm-birthday-private button{appearance:none;border:0;background:none;color:var(--text-link,#53a9ff);font:inherit;cursor:pointer;padding:0}
.sm-newyear-card .sm-birthday-actions button:last-child{box-shadow:0 0 16px #f9d98166}
.sm-december-tree{position:absolute;display:flex;align-items:center;justify-content:center;width:38px;height:38px;transform:translateX(-50%) rotate(-8deg);transform-origin:50% 85%;pointer-events:none;user-select:none;z-index:2}
.sm-december-tree img{display:block;width:38px;height:38px;object-fit:contain}
.sm-date-settings{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.sm-date-settings>div{min-width:130px}.sm-date-settings button{background:none;border:0;color:var(--text-link,#53a9ff);cursor:pointer}.sm-welcome{display:grid;gap:12px}.sm-welcome-pickers{display:flex;gap:10px}.sm-welcome-pickers>div{flex:1;min-width:0}.sm-welcome-note{color:var(--text-muted,#aaa);font-size:12px}
@media(max-width:650px){.sm-birthday-li{margin-left:16px}.sm-birthday-li::before{left:-15px}.sm-birthday-card{align-items:flex-start;flex-wrap:wrap}.sm-birthday-actions{width:100%;padding-left:71px}}
`;

function parseBirthday(value) {
    const match = String(value || "").trim().match(/^(\d{1,2})[.\/-](\d{1,2})$/);
    if (!match) return null;
    const day = Number(match[1]);
    const month = Number(match[2]);
    if (month < 1 || month > 12 || day < 1 || day > DAYS_IN_MONTH[month - 1]) return null;
    return `${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

module.exports = class SeasonalMoments {
    constructor() {
        this.settings = {birthday: null, welcomeSeen: false, seasonal: true, rain: true, storm: true, effectMode: "auto", birthdayEffect: true, interactions: false, blur: 2, intensity: "normal", previewHotkeys: true};
        this.hiddenFor = {birthday: null, newyear: null};
        this.cards = {birthday: null, newyear: null};
        this.modeKey = "";
        this.timeouts = new Set();
        this.viewport = null;
        this.chatList = null;
        this.surfaceKind = null;
        this.absenceTimer = null;
        this.fadeRemovalTimer = null;
        this.frame = null;
        this.weather = null;
        this.thunderTimer = null;
        this.flashRemoval = null;
        this.fireworkTimer = null;
        this.treeNode = null;
        this.snowbank = null;
        this.snowbankHost = null;
        this.snowbankSvg = null;
        this.snowbankWidth = 0;
        this.snowBridge = null;
        this.snowBridgeSource = null;
        this.toneRoot = null;
        this.localeStore = null;
        this.nicknameParticles = new Map();
        this.nextNicknameAt = 0;
        this.previewMode = null;
        this.previewTheme = null;
        this.themeSnapshot = null;
        this.previewHidden = null;
    }

    start() {
        const saved = BdApi.Data.load(NAME, "settings");
        if (saved && typeof saved === "object") this.settings = {...this.settings, ...saved};
        this.settings.birthday = /^\d{2}-\d{2}$/.test(this.settings.birthday || "") ? this.settings.birthday : null;
        if (!["auto", "autumn", "winter", "spring", "summer", "rain", "storm", "newyear", "none"].includes(this.settings.effectMode)) this.settings.effectMode = "auto";
        BdApi.DOM.addStyle(STYLE_ID, CSS);
        this.layer = document.createElement("div");
        this.layer.id = "seasonal-moments-layer";
        this.layer.setAttribute("aria-hidden", "true");
        this.tick = this.tick.bind(this);
        this.scheduleTick = this.scheduleTick.bind(this);
        this.positionLayer = this.positionLayer.bind(this);
        this.onPreviewKeyDown = this.onPreviewKeyDown.bind(this);
        this.tick();
        this.timer = setInterval(this.tick, 1500);
        window.addEventListener("resize", this.scheduleTick);
        window.addEventListener("keydown", this.onPreviewKeyDown, true);
        this.observer = new MutationObserver(this.scheduleTick);
        this.observer.observe(document.querySelector("#app-mount") || document.body, {childList: true, subtree: true});
        if (!this.settings.welcomeSeen && !this.settings.birthday) this.showWelcome();
    }

    stop() {
        clearInterval(this.timer);
        window.removeEventListener("resize", this.scheduleTick);
        window.removeEventListener("keydown", this.onPreviewKeyDown, true);
        this.resetPreview(false);
        this.observer?.disconnect();
        if (this.frame != null) cancelAnimationFrame(this.frame);
        this.stopThunder();
        this.stopFireworks();
        clearTimeout(this.absenceTimer);
        clearTimeout(this.fadeRemovalTimer);
        this.absenceTimer = null;
        this.fadeRemovalTimer = null;
        this.updateTone(false);
        this.toneRoot?.classList.remove("sm-weather-root");
        this.toneRoot = null;
        this.detachChat();
        for (const timeout of this.timeouts) clearTimeout(timeout);
        this.timeouts.clear();
        this.removeCards();
        this.cards = {birthday: null, newyear: null};
        this.treeNode?.remove();
        this.treeNode = null;
        this.removeSnowbank();
        this.snowbank = null;
        this.snowbankSvg = null;
        this.snowbankWidth = 0;
        this.removeSnowBridge();
        this.layer?.remove();
        this.layer = null;
        BdApi.DOM.removeStyle(STYLE_ID);
    }

    save() {
        BdApi.Data.save(NAME, "settings", this.settings);
        this.tick();
    }

    isRussian() {
        const store = this.localeStore || BdApi.Webpack?.getStore?.("LocaleStore") || BdApi.Webpack?.Stores?.LocaleStore;
        if (store) this.localeStore = store;
        const locale = store?.locale || navigator.language || "en";
        return /^ru(?:[-_]|$)/i.test(locale);
    }

    onPreviewKeyDown(event) {
        if (!this.settings.previewHotkeys || event.repeat || event.isComposing || event.ctrlKey || event.altKey || event.metaKey || event.shiftKey) return;
        if (event.target?.closest?.('input, textarea, [contenteditable="true"], [role="textbox"], [data-slate-editor="true"]')) return;
        const code = event.code || "";
        if ((code === "Escape" || event.key === "Escape") && (this.previewMode !== null || this.previewTheme !== null)) {
            event.preventDefault(); event.stopImmediatePropagation(); this.resetPreview(); return;
        }
        if (!this.findChat() && !this.findCall()) return;
        const digit = /^(?:Digit|Numpad)([1-9])$/.exec(code);
        const modes = ["autumn", "winter", "spring", "summer", "rain", "storm", "birthday", "newyear", "none"];
        if (digit) {
            event.preventDefault(); event.stopImmediatePropagation();
            this.previewMode = modes[Number(digit[1]) - 1];
            this.previewHidden = null;
            this.modeKey = "";
            this.tick();
            return;
        }
        const key = code === "KeyQ" || ["q", "й"].includes(event.key?.toLowerCase()) ? "black"
            : code === "KeyW" || ["w", "ц"].includes(event.key?.toLowerCase()) ? "light"
            : code === "KeyE" || ["e", "у"].includes(event.key?.toLowerCase()) ? "nitro" : null;
        if (!key) return;
        event.preventDefault(); event.stopImmediatePropagation();
        this.applyPreviewTheme(key);
    }

    applyPreviewTheme(theme) {
        if (!this.themeSnapshot) {
            const selector = PREVIEW_THEME_CLASSES.map(name => `.${name}`).join(",");
            const nodes = new Set([document.documentElement, document.body, document.querySelector("#app-mount"), ...document.querySelectorAll(selector)]);
            this.themeSnapshot = [...nodes].filter(Boolean).map(node => ({node, classes: PREVIEW_THEME_CLASSES.filter(name => node.classList.contains(name))}));
        }
        for (const {node} of this.themeSnapshot) {
            node.classList.remove(...PREVIEW_THEME_CLASSES);
            node.classList.add(theme === "light" ? "theme-light" : "theme-dark");
        }
        const root = document.querySelector("#app-mount");
        root?.classList.toggle("sm-preview-black", theme === "black");
        root?.classList.toggle("sm-preview-nitro", theme === "nitro");
        this.previewTheme = theme;
    }

    restorePreviewTheme() {
        for (const {node, classes} of this.themeSnapshot || []) {
            node.classList.remove(...PREVIEW_THEME_CLASSES);
            node.classList.add(...classes);
        }
        const root = document.querySelector("#app-mount");
        root?.classList.remove("sm-preview-black", "sm-preview-nitro");
        this.themeSnapshot = null;
        this.previewTheme = null;
    }

    resetPreview(refresh = true) {
        this.previewMode = null;
        this.previewHidden = null;
        this.modeKey = "";
        this.restorePreviewTheme();
        if (refresh && this.layer) this.tick();
    }

    scheduleTick() {
        if (this.frame != null) return;
        this.frame = requestAnimationFrame(() => { this.frame = null; this.tick(); });
    }

    showWelcome() {
        const ru = this.isRussian();
        const selected = {day: 0, month: 0};
        const React = BdApi.React;
        const Dropdown = BdApi.Components.DropdownInput;
        const DateFields = () => {
            const [day, setDay] = React.useState(0);
            const [month, setMonth] = React.useState(0);
            const dayOptions = [{label: ru ? "День" : "Day", value: 0}];
            for (let number = 1; number <= (DAYS_IN_MONTH[month - 1] || 31); number++) dayOptions.push({label: String(number), value: number});
            const monthOptions = [{label: ru ? "Месяц" : "Month", value: 0}, ...(ru ? MONTHS_RU : MONTHS_EN).map((label, index) => ({label, value: index + 1}))];
            return React.createElement("div", {className: "sm-welcome"},
                React.createElement("div", null, ru ? "Когда у вас день рождения?" : "When is your birthday?"),
                React.createElement("div", {className: "sm-welcome-pickers"},
                    React.createElement("div", null, React.createElement(Dropdown, {options: dayOptions, value: day, onChange: value => { const next = Number(value); setDay(next); selected.day = next; }})),
                    React.createElement("div", null, React.createElement(Dropdown, {options: monthOptions, value: month, onChange: value => {
                        const next = Number(value);
                        setMonth(next);
                        selected.month = next;
                        if (day > (DAYS_IN_MONTH[next - 1] || 31)) { setDay(0); selected.day = 0; }
                    }}))
                ),
                React.createElement("div", {className: "sm-welcome-note"}, ru ? "Год не нужен. Дата хранится только в настройках плагина." : "No year needed. The date stays in this plugin's local settings."));
        };
        const content = React.createElement(DateFields);
        BdApi.UI.showConfirmationModal(ru ? "Сезонные моменты" : "Seasonal Moments", content, {
            size: "bd-modal-medium",
            confirmText: ru ? "Сохранить" : "Save",
            cancelText: ru ? "Позже" : "Later",
            onConfirm: () => {
                const birthday = parseBirthday(`${selected.day}.${selected.month}`);
                if (!birthday) {
                    BdApi.UI.showToast(ru ? "Выберите день и месяц" : "Choose a day and month", {type: "error"});
                    const timeout = setTimeout(() => { this.timeouts.delete(timeout); if (this.layer) this.showWelcome(); }, 100);
                    this.timeouts.add(timeout);
                    return;
                }
                this.settings.birthday = birthday;
                this.settings.welcomeSeen = true;
                this.save();
            },
            onCancel: () => { this.settings.welcomeSeen = true; this.save(); }
        });
    }

    getSettingsPanel() {
        const ru = this.isRussian();
        const React = BdApi.React;
        const Dropdown = BdApi.Components.DropdownInput;
        const plugin = this;
        const DatePicker = () => {
            const initial = plugin.settings.birthday;
            const [day, setDay] = React.useState(initial ? Number(initial.slice(3)) : 0);
            const [month, setMonth] = React.useState(initial ? Number(initial.slice(0, 2)) : 0);
            const change = (nextDay, nextMonth) => {
                plugin.settings.birthday = parseBirthday(`${nextDay}.${nextMonth}`);
                plugin.settings.welcomeSeen = true;
                plugin.save();
            };
            const dayOptions = [{label: ru ? "День" : "Day", value: 0}];
            for (let number = 1; number <= (DAYS_IN_MONTH[month - 1] || 31); number++) dayOptions.push({label: String(number), value: number});
            const monthOptions = [{label: ru ? "Месяц" : "Month", value: 0}, ...(ru ? MONTHS_RU : MONTHS_EN).map((label, index) => ({label, value: index + 1}))];
            return React.createElement("div", {className: "sm-date-settings"},
                React.createElement("div", null, React.createElement(Dropdown, {options: dayOptions, value: day, onChange: value => { const next = Number(value); setDay(next); change(next, month); }})),
                React.createElement("div", null, React.createElement(Dropdown, {options: monthOptions, value: month, onChange: value => {
                    const next = Number(value);
                    const nextDay = day > (DAYS_IN_MONTH[next - 1] || 31) ? 0 : day;
                    setMonth(next); setDay(nextDay); change(nextDay, next);
                }})),
                React.createElement("button", {type: "button", onClick: () => { setDay(0); setMonth(0); change(0, 0); }}, ru ? "Сбросить" : "Clear"));
        };
        return BdApi.UI.buildSettingsPanel({
            onChange: (_, id, value) => {
                this.settings[id] = id === "blur" ? Number(value) : value;
                if (id === "rain" || id === "storm") this.weather = null;
                if (id === "previewHotkeys" && !value) this.resetPreview(false);
                this.save();
            },
            settings: [
                {type: "category", id: "appearance", name: ru ? "СЕЗОННАЯ АТМОСФЕРА" : "SEASONAL ATMOSPHERE", shown: true, settings: [
                    {type: "switch", id: "seasonal", name: ru ? "Сезонные частицы" : "Seasonal particles", note: ru ? "Используется в автоматическом режиме." : "Used in automatic mode.", value: this.settings.seasonal},
                    {type: "switch", id: "interactions", name: ru ? "Частицы на никнеймах" : "Particles on usernames", note: ru ? "Листья, снег и цветы иногда ложатся на никнеймы и исчезают через несколько секунд." : "Leaves, snow and flowers sometimes settle on usernames, then disappear after a few seconds.", value: this.settings.interactions},
                    {type: "slider", id: "blur", name: ru ? "Размытие" : "Blur", note: ru ? "Равномерно размывает весь слой частиц." : "Blurs the whole particle layer evenly.", value: Number(this.settings.blur), min: 0, max: 12, step: 1, units: "px", inline: false},
                    {type: "dropdown", id: "intensity", name: ru ? "Количество частиц" : "Particle density", value: this.settings.intensity, options: [{label: ru ? "Низкое" : "Low", value: "low"}, {label: ru ? "Обычное" : "Normal", value: "normal"}, {label: ru ? "Высокое" : "High", value: "high"}]}
                ]},
                {type: "category", id: "weather", name: ru ? "ПОГОДА" : "WEATHER", shown: true, settings: [
                    {type: "dropdown", id: "effectMode", name: ru ? "Режим эффекта" : "Effect mode", note: ru ? "Выбор сохраняется. Авто следует календарю и случайной погоде." : "The choice is saved. Auto follows the calendar and random weather.", value: this.settings.effectMode, options: [
                        {label: ru ? "Авто" : "Auto", value: "auto"},
                        {label: ru ? "Осень — листья" : "Autumn — leaves", value: "autumn"},
                        {label: ru ? "Зима — снег" : "Winter — snow", value: "winter"},
                        {label: ru ? "Весна — цветы" : "Spring — flowers", value: "spring"},
                        {label: ru ? "Лето — звёзды" : "Summer — stars", value: "summer"},
                        {label: ru ? "Дождь" : "Rain", value: "rain"},
                        {label: ru ? "Гроза" : "Thunderstorm", value: "storm"},
                        {label: ru ? "Новый год — фейерверк" : "New Year — fireworks", value: "newyear"},
                        {label: ru ? "Выключено" : "Off", value: "none"}
                    ]},
                    {type: "switch", id: "rain", name: ru ? "Случайный дождь в режиме Авто" : "Occasional rain in Auto", note: ru ? "Шанс определяется месяцем при запуске и раз в новый день." : "Chance depends on the month at startup and each new day.", value: this.settings.rain},
                    {type: "switch", id: "storm", name: ru ? "Мягкая гроза в режиме Авто" : "Gentle thunderstorm in Auto", note: ru ? "Во время некоторых дождей редко подсвечивает половину чата." : "During some rain sessions, softly lights one half of the chat.", value: this.settings.storm, enableWith: "rain"}
                ]},
                {type: "category", id: "birthday", name: ru ? "ДЕНЬ РОЖДЕНИЯ" : "BIRTHDAY", shown: true, settings: [
                    {type: "custom", id: "birthdayDate", name: ru ? "Дата рождения" : "Birthday date", note: ru ? "Год не нужен. 29 февраля отмечается 28 февраля в невисокосный год." : "No year needed. February 29 moves to February 28 in non-leap years.", inline: false, children: React.createElement(DatePicker)},
                    {type: "switch", id: "birthdayEffect", name: ru ? "Поздравление и блёстки" : "Birthday card and sparkles", note: ru ? "Личная карточка в чате появляется только в день рождения." : "A private chat card appears only on your birthday.", value: this.settings.birthdayEffect}
                ]},
                {type: "category", id: "preview", name: ru ? "ПРЕДПРОСМОТР ДЛЯ ЗАПИСИ" : "RECORDING PREVIEW", shown: true, settings: [
                    {type: "switch", id: "previewHotkeys", name: ru ? "Горячие клавиши предпросмотра" : "Preview hotkeys", note: ru
                        ? "1 листья · 2 снег · 3 цветы · 4 звёзды · 5 дождь · 6 гроза · 7 день рождения · 8 Новый год · 9 выключить. Й/Ц/У: чёрная, светлая, Nitro-подобная тема. Esc: вернуть обычный вид. Не работают при вводе текста."
                        : "1 leaves · 2 snow · 3 flowers · 4 stars · 5 rain · 6 storm · 7 birthday · 8 New Year · 9 off. Q/W/E: black, light, Nitro-inspired theme. Esc restores the normal view. Disabled while typing.", value: this.settings.previewHotkeys}
                ]}
            ]
        });
    }

    birthdayToday(now) {
        const birthday = this.settings.birthday;
        if (!birthday) return false;
        const today = `${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
        if (birthday === today) return true;
        return birthday === "02-29" && today === "02-28" && new Date(now.getFullYear(), 1, 29).getMonth() !== 1;
    }

    isNewYear(now) {
        return (now.getMonth() === 11 && now.getDate() === 31) || (now.getMonth() === 0 && now.getDate() === 1);
    }

    rollWeather(now) {
        const key = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
        if (this.weather?.key === key) return;
        const month = now.getMonth();
        const rain = Boolean(this.settings.rain) && Math.random() < RAIN_CHANCE[month];
        this.weather = {key, rain, storm: rain && Boolean(this.settings.storm) && Math.random() < STORM_CHANCE[month]};
    }

    getMode(now) {
        this.rollWeather(now);
        if (this.previewMode !== null) return this.previewMode === "storm" ? "rain" : this.previewMode;
        if (this.settings.effectMode !== "auto") return this.settings.effectMode === "storm" ? "rain" : this.settings.effectMode;
        if (this.settings.seasonal && this.isNewYear(now)) return "newyear";
        if (this.settings.birthdayEffect && this.birthdayToday(now)) return "birthday";
        if (this.weather.rain) return "rain";
        if (!this.settings.seasonal) return "none";
        const month = now.getMonth() + 1;
        if (month >= 9 && month <= 11) return "autumn";
        if (month === 12 || month <= 2) return "winter";
        if (month <= 5) return "spring";
        return "summer";
    }

    stormActive() {
        if (this.previewMode !== null) return this.previewMode === "storm";
        return this.settings.effectMode === "storm" || (this.settings.effectMode === "auto" && Boolean(this.weather?.storm));
    }

    updateTone(active) {
        const root = document.querySelector("#app-mount");
        if (this.toneRoot && this.toneRoot !== root) this.toneRoot.classList.remove("sm-rain-tone", "sm-weather-root");
        this.toneRoot = root;
        root?.classList.add("sm-weather-root");
        root?.classList.toggle("sm-rain-tone", active);
    }

    stopThunder() {
        clearTimeout(this.thunderTimer);
        clearTimeout(this.flashRemoval);
        this.thunderTimer = null;
        this.flashRemoval = null;
        this.flash?.remove();
        this.flash = null;
    }

    showLightning() {
        if (!this.layer || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        this.flash?.remove();
        const flash = document.createElement("div");
        flash.className = `sm-lightning ${Math.random() < .5 ? "sm-left" : "sm-right"}`;
        this.flash = flash;
        this.layer.appendChild(flash);
        clearTimeout(this.flashRemoval);
        this.flashRemoval = setTimeout(() => { if (this.flash === flash) this.flash = null; flash.remove(); this.flashRemoval = null; }, 800);
    }

    scheduleThunder() {
        if (this.thunderTimer || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        this.thunderTimer = setTimeout(() => {
            this.thunderTimer = null;
            if (!this.layer || !this.stormActive() || this.getMode(new Date()) !== "rain") return;
            this.showLightning();
            this.scheduleThunder();
        }, 18000 + Math.random() * 30000);
    }

    stopFireworks() {
        clearTimeout(this.fireworkTimer);
        this.fireworkTimer = null;
    }

    scheduleFireworks() {
        if (this.fireworkTimer || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        this.fireworkTimer = setTimeout(() => {
            this.fireworkTimer = null;
            if (this.mode !== "newyear" || !this.viewport || !this.layer) return;
            if (!document.hidden) this.launchFirework();
            this.scheduleFireworks();
        }, 2300 + Math.random() * 2500);
    }

    launchFirework(force = false) {
        if (!this.layer || (!force && this.mode !== "newyear") || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const width = this.layer.clientWidth || this.viewport?.clientWidth || 0;
        const height = this.layer.clientHeight || this.viewport?.clientHeight || 0;
        if (width < 200 || height < 180) return;
        const count = 2 + Math.floor(Math.random() * 2);
        const viewport = this.viewport;
        let previousX = null;
        let delay = 0;
        for (let i = 0; i < count; i++) {
            const firework = this.makeFireworkSpec(width, height, previousX);
            previousX = firework.x;
            if (i === 0) { this.launchOneFirework(firework, force); continue; }
            delay += 430 + Math.random() * 470;
            const timeout = setTimeout(() => {
                this.timeouts.delete(timeout);
                if (this.layer && this.viewport === viewport && (this.mode === "newyear" || (force && this.isNewYear(new Date())))) {
                    this.launchOneFirework(firework, force);
                }
            }, delay);
            this.timeouts.add(timeout);
        }
    }

    makeFireworkSpec(width, height, previousX) {
        const palette = ["#ffe18a", "#b6d9ff", "#e9b8ff", "#ffbacd", "#c6ffef", "#ffcc9e", "#d4c5ff"];
        const radius = Math.min(78 + Math.random() * 45, height * .20, width * .14);
        const minX = radius + 12;
        const maxX = width - radius - 12;
        let x = minX;
        for (let attempt = 0; attempt < 8; attempt++) {
            x = minX + Math.random() * (maxX - minX);
            if (previousX == null || Math.abs(x - previousX) >= Math.min(radius * 1.6, width * .22)) break;
        }
        const minY = radius + 14;
        const maxY = height * .49 - radius;
        const y = minY + Math.random() * Math.max(0, maxY - minY);
        const colorIndex = Math.floor(Math.random() * palette.length);
        return {
            x, y, radius, height,
            color: palette[colorIndex],
            secondColor: palette[(colorIndex + 2 + Math.floor(Math.random() * 3)) % palette.length],
            pattern: Math.random() < .42 ? "double" : "scatter",
            launchDuration: 400 + Math.random() * 230,
            burstDuration: 950 + Math.random() * 450
        };
    }

    launchOneFirework(firework, force) {
        const launch = document.createElement("span");
        launch.className = "sm-firework-launch";
        launch.style.setProperty("--sm-fw-left", `${firework.x}px`);
        launch.style.setProperty("--sm-fw-color", firework.color);
        launch.style.setProperty("--sm-fw-travel", `${-(firework.height - firework.y)}px`);
        launch.style.setProperty("--sm-fw-launch-duration", `${firework.launchDuration}ms`);
        launch.style.setProperty("--sm-fw-launch-height", `${16 + Math.random() * 13}px`);
        launch.style.setProperty("--sm-fw-launch-width", `${1.5 + Math.random() * 1.5}px`);
        this.layer.appendChild(launch);
        const timeout = setTimeout(() => {
            this.timeouts.delete(timeout);
            launch.remove();
            if (this.layer && this.viewport && (this.mode === "newyear" || (force && this.isNewYear(new Date())))) this.fireworkBurst(firework);
        }, firework.launchDuration);
        this.timeouts.add(timeout);
    }

    fireworkBurst(firework) {
        const nodes = [];
        const rings = firework.pattern === "double"
            ? [{count: 13 + Math.floor(Math.random() * 5), radius: firework.radius, color: firework.color, delay: 0},
                {count: 7 + Math.floor(Math.random() * 5), radius: firework.radius * .52, color: firework.secondColor, delay: .14}]
            : [{count: 16 + Math.floor(Math.random() * 8), radius: firework.radius, color: firework.color, delay: 0}];
        for (const ring of rings) {
            const offset = Math.random() * Math.PI * 2;
            for (let i = 0; i < ring.count; i++) {
                const angle = offset + 2 * Math.PI * i / ring.count + (Math.random() - .5) * .22;
                const distance = ring.radius * (.72 + Math.random() * .28);
                const ray = document.createElement("span");
                ray.className = "sm-firework-ray";
                for (const [key, value] of Object.entries({
                    "--sm-fw-left": `${firework.x}px`, "--sm-fw-top": `${firework.y}px`,
                    "--sm-fw-size": `${ring.delay ? 5 + Math.random() * 7 : 7 + Math.random() * 9}px`,
                    "--sm-fw-color": ring.color,
                    "--sm-fw-x": `${Math.cos(angle) * distance}px`, "--sm-fw-y": `${Math.sin(angle) * distance}px`,
                    "--sm-fw-tail": `${ring.delay ? 7 + Math.random() * 8 : 11 + Math.random() * 10}px`,
                    "--sm-fw-angle": `${angle * 180 / Math.PI + 90}deg`,
                    "--sm-fw-delay": `${ring.delay + Math.random() * .09}s`,
                    "--sm-fw-burst-duration": `${firework.burstDuration}ms`
                })) ray.style.setProperty(key, value);
                ray.appendChild(this.makeSparkleSvg());
                this.layer.appendChild(ray);
                nodes.push(ray);
            }
        }
        const timeout = setTimeout(() => { this.timeouts.delete(timeout); nodes.forEach(node => node.remove()); }, firework.burstDuration + 300);
        this.timeouts.add(timeout);
    }

    updateTree(now, visible) {
        const winter = this.mode === "winter" || this.mode === "newyear";
        const preview = this.previewMode === "winter" || this.previewMode === "newyear" || this.settings.effectMode === "winter" || this.settings.effectMode === "newyear";
        if (!visible || !winter || (now.getMonth() !== 11 && !preview)) { this.treeNode?.remove(); return; }
        const host = this.snowbankHost;
        if (!host || !this.snowbank?.isConnected) { this.treeNode?.remove(); return; }
        if (!this.treeNode) {
            this.treeNode = document.createElement("span");
            this.treeNode.className = "sm-december-tree";
            this.treeNode.setAttribute("role", "img");
            const picture = document.createElement("img");
            picture.src = TREE_EMOJI_DATA;
            picture.alt = "";
            this.treeNode.appendChild(picture);
        }
        this.treeNode.setAttribute("aria-label", this.isRussian() ? "Новогодняя ёлочка" : "Christmas tree");
        if (this.treeNode.parentElement !== host) host.appendChild(this.treeNode);
        const bankLeft = parseFloat(this.snowbank.style.left) || 0;
        const bankTop = parseFloat(this.snowbank.style.top) || 0;
        const bankWidth = parseFloat(this.snowbank.style.width) || 0;
        Object.assign(this.treeNode.style, {
            left: `${bankLeft + bankWidth * .061}px`,
            top: `${bankTop - 29}px`
        });
    }

    removeSnowbank() {
        this.snowbank?.remove();
        if (this.snowbankHost && this.snowbankPositionChanged && this.snowbankHost.style.position === "relative") {
            this.snowbankHost.style.position = this.oldSnowbankPosition;
        }
        this.snowbankHost = null;
        this.snowbankPositionChanged = false;
    }

    removeSnowBridge() {
        this.snowBridge?.remove();
        this.snowBridge = null;
        this.snowBridgeSource = null;
    }

    updateSnowBridge(mode, chatVisible) {
        if (!chatVisible || (mode !== "winter" && mode !== "newyear") || !this.snowbankHost || !this.layer?.isConnected) {
            this.removeSnowBridge();
            return;
        }
        const layerRect = this.layer.getBoundingClientRect();
        const bankRect = this.snowbank.getBoundingClientRect();
        const visibleEnd = Math.min(layerRect.bottom, this.viewport.getBoundingClientRect().bottom);
        const gap = bankRect.top + 3 - visibleEnd;
        if (gap <= 1 || gap > 100 || bankRect.width < 200) { this.removeSnowBridge(); return; }
        if (!this.snowBridge) {
            this.snowBridge = document.createElement("div");
            this.snowBridge.className = "sm-snowfall-bridge";
            this.snowBridge.setAttribute("aria-hidden", "true");
            document.body.appendChild(this.snowBridge);
        }
        const rightInset = Math.max(0, layerRect.right - bankRect.right);
        const leftInset = Math.max(0, bankRect.left - layerRect.left);
        Object.assign(this.snowBridge.style, {
            top: `${visibleEnd}px`, left: `${layerRect.left}px`,
            width: `${layerRect.width}px`, height: `${gap}px`,
            clipPath: `inset(0 ${rightInset}px 0 ${leftInset}px)`
        });
        this.snowBridge.style.setProperty("--sm-bridge-offset", `${visibleEnd - layerRect.top}px`);
        this.snowBridge.style.setProperty("--sm-height", `${bankRect.top + 3 - layerRect.top}px`);
        this.snowBridge.style.setProperty("--sm-layer-blur", this.layer.style.getPropertyValue("--sm-layer-blur"));
        const snow = [...this.layer.children].filter(node => node.classList.contains("sm-snow"));
        if (this.snowBridgeSource !== snow[0] || this.snowBridge.childElementCount !== snow.length) {
            const now = performance.now();
            this.snowBridge.replaceChildren(...snow.map(source => {
                const clone = source.cloneNode(false);
                const elapsed = ((now - source._smPhaseStart) % source._smDurationMs + source._smDurationMs) % source._smDurationMs;
                clone.style.setProperty("--sm-delay", `${-elapsed / 1000}s`);
                return clone;
            }));
            this.snowBridgeSource = snow[0] || null;
        }
    }

    updateSnowbank(mode, chatVisible) {
        if (!chatVisible || (mode !== "winter" && mode !== "newyear")) { this.removeSnowbank(); return; }
        const composer = document.querySelector('main [class*="channelTextArea"], [class*="channelTextArea"]');
        const inner = [...(composer?.querySelectorAll('[class*="scrollableContainer"]') || [])]
            .find(node => node.getBoundingClientRect().width > 200 && node.getBoundingClientRect().height > 35);
        const host = composer;
        if (!host || host.getBoundingClientRect().width < 200) { this.removeSnowbank(); return; }
        if (!this.snowbank) this.snowbank = this.makeSnowbank();
        if (this.snowbankHost !== host) {
            this.removeSnowbank();
            this.snowbankHost = host;
            this.oldSnowbankPosition = host.style.position;
            this.snowbankPositionChanged = getComputedStyle(host).position === "static";
            if (this.snowbankPositionChanged) host.style.position = "relative";
            host.appendChild(this.snowbank);
        }
        const outerRect = host.getBoundingClientRect();
        const innerRect = inner?.getBoundingClientRect() || outerRect;
        const right = outerRect.right - innerRect.right >= 0 && outerRect.right - innerRect.right <= 32
            ? outerRect.right : innerRect.right;
        Object.assign(this.snowbank.style, {
            top: `${innerRect.top - outerRect.top - host.clientTop - 6}px`,
            left: `${innerRect.left - outerRect.left - host.clientLeft}px`,
            width: `${right - innerRect.left}px`
        });
        this.drawSnowbank(right - innerRect.left);
    }

    findChat() {
        for (const list of document.querySelectorAll('ol[data-list-id="chat-messages"], [data-list-id="chat-messages"]')) {
            let scroller = list.parentElement;
            while (scroller && scroller !== document.body) {
                const overflow = getComputedStyle(scroller).overflowY;
                if ((overflow === "auto" || overflow === "scroll") && scroller.clientHeight > 100) break;
                scroller = scroller.parentElement;
            }
            const viewport = scroller && scroller !== document.body ? scroller : list.parentElement;
            const rect = viewport?.getBoundingClientRect();
            if (rect && rect.width > 200 && rect.height > 100 && rect.bottom > 0 && rect.top < innerHeight) return {list, viewport};
        }
        return null;
    }

    findCall() {
        for (const selector of ['[class*="videoGrid"]', '[class*="callContainer"]', '[class*="callWrapper"]']) {
            for (const viewport of document.querySelectorAll(selector)) {
                const rect = viewport.getBoundingClientRect();
                if (rect.width < 300 || rect.height < 180 || rect.bottom <= 0 || rect.top >= innerHeight) continue;
                if (viewport.closest('[data-list-id="chat-messages"]')) continue;
                // Use the large call surface, not a small call toolbar.
                return {viewport, list: null, kind: "call"};
            }
        }
        return null;
    }

    detachChat() {
        this.clearNicknameParticles();
        this.viewport?.removeEventListener("scroll", this.positionLayer);
        if (this.viewport && this.oldViewportPosition !== null) this.viewport.style.position = this.oldViewportPosition;
        if (this.chatList) {
            this.chatList.style.position = this.oldListPosition;
            this.chatList.style.zIndex = this.oldListZIndex;
        }
        this.viewport = null;
        this.chatList = null;
        this.surfaceKind = null;
    }

    clearNicknameParticles() {
        for (const [name, entry] of this.nicknameParticles) {
            clearTimeout(entry.timeout);
            this.timeouts.delete(entry.timeout);
            entry.particle.remove();
            if (entry.changedPosition && name.style.position === "relative") name.style.position = entry.oldPosition;
        }
        this.nicknameParticles.clear();
    }

    updateNicknameParticles(mode, chatVisible) {
        const seasonal = mode === "autumn" || mode === "winter" || mode === "newyear" || mode === "spring";
        if (!chatVisible || !this.settings.interactions || !seasonal || matchMedia("(prefers-reduced-motion: reduce)").matches) {
            this.clearNicknameParticles();
            return;
        }
        const now = performance.now();
        if (now < this.nextNicknameAt || this.nicknameParticles.size >= 2 || !this.chatList) return;
        this.nextNicknameAt = now + 3400 + Math.random() * 3000;
        const viewport = this.layer.getBoundingClientRect();
        const names = [...this.chatList.querySelectorAll('[id^="message-username-"], h3 [class*="username_"]')].filter(name => {
            if (this.nicknameParticles.has(name) || !name.textContent?.trim()) return false;
            const rect = name.getBoundingClientRect();
            return rect.width > 12 && rect.width < 320 && rect.top > viewport.top + 35 && rect.bottom < viewport.bottom - 30;
        });
        if (!names.length) return;
        if (Math.random() >= Math.min(.10, names.length * .04)) return;
        const name = names[Math.floor(Math.random() * names.length)];
        const particle = document.createElement("span");
        particle.className = "sm-nickname-perch";
        particle.setAttribute("aria-hidden", "true");
        const snow = mode === "winter" || mode === "newyear";
        const size = snow ? 6 + Math.random() * 3 : mode === "autumn" ? 13 + Math.random() * 5 : 11 + Math.random() * 3;
        const palette = snow ? ["#eef7ff", "#d9edff", "#ffffff"] : mode === "autumn"
            ? ["#ee862a", "#d4542b", "#f3ab35", "#bd3d35"] : ["#ffb7d5", "#ffd7e6", "#f8a9cf"];
        for (const [key, value] of Object.entries({
            "--sm-perch-left": `${15 + Math.random() * 65}%`,
            "--sm-perch-size": `${size}px`,
            "--sm-perch-color": palette[Math.floor(Math.random() * palette.length)]
        })) particle.style.setProperty(key, value);
        if (snow) particle.classList.add("sm-perch-snow");
        else if (mode === "autumn") {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("viewBox", "0 0 14 14");
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", LEAF_PATH);
            svg.appendChild(path);
            particle.appendChild(svg);
        } else particle.textContent = "✿";
        const changedPosition = getComputedStyle(name).position === "static";
        const oldPosition = name.style.position;
        if (changedPosition) name.style.position = "relative";
        name.appendChild(particle);
        const timeout = setTimeout(() => {
            this.timeouts.delete(timeout);
            particle.remove();
            if (changedPosition && name.style.position === "relative") name.style.position = oldPosition;
            this.nicknameParticles.delete(name);
        }, 4500);
        this.timeouts.add(timeout);
        this.nicknameParticles.set(name, {particle, timeout, oldPosition, changedPosition});
    }

    syncParticlePhases() {
        const now = performance.now();
        for (const particle of this.layer.children) {
            if (!particle._smDurationMs) continue;
            const elapsed = ((now - particle._smPhaseStart) % particle._smDurationMs + particle._smDurationMs) % particle._smDurationMs;
            particle.style.setProperty(particle.classList.contains("sm-rain-drop") ? "--sm-rain-delay" : "--sm-delay", `${-elapsed / 1000}s`);
        }
    }

    attachChat(viewport, list, kind = "chat") {
        if (this.viewport !== viewport) {
            this.detachChat();
            this.viewport = viewport;
            this.surfaceKind = kind;
            this.oldViewportPosition = viewport.style.position;
            if (getComputedStyle(viewport).position === "static") viewport.style.position = "relative";
            viewport.insertBefore(this.layer, viewport.firstChild);
            viewport.addEventListener("scroll", this.positionLayer, {passive: true});
            this.syncParticlePhases();
            this.positionLayer();
        }
        this.surfaceKind = kind;
        this.layer.classList.toggle("sm-call-layer", kind === "call");
        this.layer.style.opacity = kind === "call" ? ".7" : "1";
        if (!list) {
            if (this.chatList) {
                this.chatList.style.position = this.oldListPosition;
                this.chatList.style.zIndex = this.oldListZIndex;
                this.chatList = null;
            }
            return;
        }
        if (this.chatList !== list) {
            this.clearNicknameParticles();
            if (this.chatList) {
                this.chatList.style.position = this.oldListPosition;
                this.chatList.style.zIndex = this.oldListZIndex;
            }
            this.chatList = list;
            this.oldListPosition = list.style.position;
            this.oldListZIndex = list.style.zIndex;
            if (getComputedStyle(list).position === "static") list.style.position = "relative";
            list.style.zIndex = "1";
        }
    }

    positionLayer() {
        if (!this.viewport || !this.layer) return;
        const viewportRect = this.viewport.getBoundingClientRect();
        const composer = this.surfaceKind === "chat" ? document.querySelector('main [class*="channelTextArea"], [class*="channelTextArea"]') : null;
        const composerTop = composer?.getBoundingClientRect().top;
        const height = composerTop > viewportRect.top + 100 && composerTop < viewportRect.bottom + 20
            ? Math.min(this.viewport.clientHeight, composerTop - viewportRect.top - 2)
            : this.viewport.clientHeight;
        Object.assign(this.layer.style, {
            top: `${this.viewport.scrollTop}px`,
            left: `${this.viewport.scrollLeft}px`,
            width: `${this.viewport.clientWidth}px`,
            height: `${height}px`
        });
        const bankTop = this.surfaceKind === "chat" && (this.mode === "winter" || this.mode === "newyear") && this.snowbank?.isConnected
            ? this.snowbank.getBoundingClientRect().top + 3 : null;
        this.layer.style.setProperty("--sm-height", `${bankTop == null ? height : bankTop - this.layer.getBoundingClientRect().top}px`);
        const blur = Number(this.settings.blur || 0);
        this.layer.style.setProperty("--sm-layer-blur", `${this.mode === "rain" ? Math.min(blur, 1.5) : this.mode === "birthday" || this.mode === "newyear" ? Math.min(blur, .5) : blur}px`);
    }

    tick() {
        if (!this.layer) return;
        const now = new Date();
        const mode = this.getMode(now);
        const chat = this.findChat();
        const call = this.findCall();
        const surface = call || (chat?.viewport ? {...chat, kind: "chat"} : null);
        const rect = surface?.viewport.getBoundingClientRect();
        if (!rect || rect.width <= 200 || rect.height <= 100 || rect.bottom <= 0) {
            if (!this.viewport) { this.updateTone(false); return; }
            if (!this.absenceTimer && !this.fadeRemovalTimer) this.absenceTimer = setTimeout(() => {
                this.absenceTimer = null;
                if (this.findCall() || this.findChat()) { this.scheduleTick(); return; }
                if (this.previewMode !== null || this.previewTheme !== null) this.resetPreview(false);
                this.layer.style.opacity = "0";
                this.removeCards();
                this.updateTree(now, false);
                this.removeSnowbank();
                this.removeSnowBridge();
                this.stopThunder();
                this.stopFireworks();
                this.updateTone(false);
                this.fadeRemovalTimer = setTimeout(() => {
                    this.fadeRemovalTimer = null;
                    if (this.findCall() || this.findChat()) { this.scheduleTick(); return; }
                    this.detachChat();
                    this.layer.remove();
                }, 220);
            }, 180);
            return;
        }
        clearTimeout(this.absenceTimer);
        clearTimeout(this.fadeRemovalTimer);
        this.absenceTimer = null;
        this.fadeRemovalTimer = null;
        this.updateTone(mode === "rain");
        const visible = rect.width > 200 && rect.height > 100 && rect.bottom > 0;
        if (!visible) return;
        this.attachChat(surface.viewport, surface.list, surface.kind);
        this.mode = mode;
        this.updateSnowbank(mode, surface.kind === "chat");
        this.positionLayer();
        const key = `${mode}:${this.settings.intensity}`;
        if (key !== this.modeKey) { this.modeKey = key; this.fillParticles(mode); if (mode === "newyear") this.launchFirework(); }
        if (mode === "rain" && this.stormActive()) this.scheduleThunder();
        else this.stopThunder();
        if (mode === "newyear") this.scheduleFireworks();
        else this.stopFireworks();
        this.updateTree(now, surface.kind === "chat");
        this.updateSnowBridge(mode, surface.kind === "chat");
        this.updateNicknameParticles(mode, surface.kind === "chat");
        if (surface.kind === "chat") this.ensureCards(surface.list, now);
        else this.removeCards();
    }

    fillParticles(mode) {
        this.layer.replaceChildren();
        this.flash = null;
        if (mode === "none") return;
        if (mode === "rain") {
            const count = {low: 26, normal: 44, high: 68}[this.settings.intensity] || 44;
            for (let i = 0; i < count; i++) this.layer.appendChild(this.makeRainDrop());
            return;
        }
        const count = mode === "birthday"
            ? ({low: 8, normal: 14, high: 24}[this.settings.intensity] || 14)
            : mode === "winter" || mode === "newyear"
                ? ({low: 22, normal: 36, high: 55}[this.settings.intensity] || 36)
                : mode === "summer"
                    ? ({low: 30, normal: 55, high: 85}[this.settings.intensity] || 55)
                : ({low: 13, normal: 24, high: 40}[this.settings.intensity] || 24);
        for (let i = 0; i < count; i++) this.layer.appendChild(this.makeParticle(mode, true));
    }

    makeRainDrop() {
        const drop = document.createElement("span");
        drop.className = "sm-rain-drop";
        const duration = 1.4 + Math.random() * 1.1;
        const phase = Math.random() * duration;
        drop._smDurationMs = duration * 1000;
        drop._smPhaseStart = performance.now() - phase * 1000;
        for (const [key, value] of Object.entries({
            "--sm-left": `${Math.random() * 100}%`,
            "--sm-rain-length": `${18 + Math.random() * 22}px`,
            "--sm-rain-duration": `${duration}s`,
            "--sm-rain-delay": `${-phase}s`,
            "--sm-rain-drift": `${-14 + Math.random() * 28}px`
        })) drop.style.setProperty(key, value);
        const streak = document.createElement("span"); streak.className = "sm-rain-streak";
        const splash = document.createElement("span"); splash.className = "sm-rain-splash";
        drop.append(streak, splash);
        return drop;
    }

    makeSnowbank() {
        const bank = document.createElement("div");
        bank.className = "sm-composer-snowbank";
        bank.setAttribute("aria-hidden", "true");
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("preserveAspectRatio", "none");
        svg.setAttribute("aria-hidden", "true");
        bank.appendChild(svg);
        this.snowbankSvg = svg;
        return bank;
    }

    drawSnowbank(measuredWidth) {
        const width = Math.round(measuredWidth);
        if (!this.snowbankSvg || width < 200 || Math.abs(width - this.snowbankWidth) < 4) return;
        this.snowbankWidth = width;
        const svg = this.snowbankSvg;
        svg.setAttribute("viewBox", `0 0 ${width} 14`);
        let seed = 0x5eed1234;
        const random = () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
        let shape = `M0 12.8H${width}V14H0Z`;
        for (let x = -8; x < width + 12; x += 7 + random() * 6) {
            const swell = Math.max(0, Math.sin(x * .019) + Math.sin(x * .047) * .55);
            const radius = Math.min(14, 7.2 + random() * 4.8 + swell * 2.5);
            const centerY = 15.2 + random() * 2.2;
            const r = radius.toFixed(1);
            const diameter = (radius * 2).toFixed(1);
            shape += `M${(x - radius).toFixed(1)} ${centerY.toFixed(1)}a${r} ${r} 0 1 1 ${diameter} 0a${r} ${r} 0 1 1 -${diameter} 0`;
        }
        const snow = document.createElementNS("http://www.w3.org/2000/svg", "path");
        snow.setAttribute("d", shape);
        snow.setAttribute("fill", "rgba(224,240,251,.69)");
        svg.replaceChildren(snow);
    }

    makeSparkleSvg() {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("aria-hidden", "true");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M12 0C13.6 6.4 17.6 10.4 24 12C17.6 13.6 13.6 17.6 12 24C10.4 17.6 6.4 13.6 0 12C6.4 10.4 10.4 6.4 12 0Z");
        svg.appendChild(path);
        return svg;
    }

    makeParticle(mode, staggered) {
        const particle = document.createElement("span");
        particle.className = "sm-particle";
        const random = Math.random;
        const snow = mode === "winter" || mode === "newyear";
        const summer = mode === "summer";
        const size = summer ? (random() < .78 ? 1.5 + random() * 1.8 : 3.2 + random() * 2.1)
            : snow ? 3 + random() * 5 : mode === "birthday" ? 7 + random() * 7 : 16 + random() * 18;
        const duration = summer ? 3.5 + random() * 5 : snow ? 10 + random() * 9 : 8 + random() * 9;
        const phase = staggered ? random() * duration : 0;
        particle._smDurationMs = duration * 1000;
        particle._smPhaseStart = performance.now() - phase * 1000;
        const palette = {autumn: ["#ee862a", "#d4542b", "#f3ab35", "#bd3d35", "#e8bc4c"], winter: ["#eef7ff", "#d9edff", "#ffffff"], newyear: ["#eef7ff", "#d9edff", "#ffffff"], spring: ["#ffb7d5", "#ffd7e6", "#f8a9cf"], summer: ["#fff9e7", "#e6efff", "#fff1c5", "#ffffff"], birthday: ["#f5ecff", "#d9c4ff", "#fff2c6", "#e5d5ff"]}[mode];
        const color = palette[Math.floor(random() * palette.length)];
        const opacity = summer ? .42 + random() * .43 : snow ? .45 + random() * .4 : .42 + random() * .46;
        const variables = {"--sm-left": `${random() * 100}%`, "--sm-size": `${size}px`, "--sm-color": color, "--sm-opacity": String(opacity), "--sm-duration": `${duration}s`, "--sm-delay": `${-phase}s`};
        if (summer) Object.assign(variables, {"--sm-star-top": `${3 + random() * 48}%`, "--sm-star-glow": `${size < 3 ? 3 : 5}px`, "--sm-dim-opacity": String(opacity * .35)});
        else Object.assign(variables, {"--sm-drift": `${snow ? -35 + random() * 70 : -80 + random() * 160}px`, "--sm-rotation": `${snow ? 0 : -360 + random() * 720}deg`});
        for (const [key, value] of Object.entries(variables)) particle.style.setProperty(key, value);
        if (summer) {
            particle.classList.add("sm-summer-star");
        } else if (mode === "birthday") {
            particle.appendChild(this.makeSparkleSvg());
        } else if (snow) {
            particle.classList.add("sm-snow");
        } else if (mode === "autumn") {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("viewBox", "0 0 14 14");
            svg.setAttribute("aria-hidden", "true");
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", LEAF_PATH);
            svg.appendChild(path);
            particle.appendChild(svg);
        } else particle.textContent = {spring: "✿"}[mode];
        return particle;
    }

    removeCards() {
        this.cards.birthday?.remove();
        this.cards.newyear?.remove();
    }

    ensureCards(list, now) {
        if (!list.isConnected) return;
        const host = list.parentElement;
        if (!host) return;
        const day = now.toDateString();
        const active = [];
        if (this.previewMode !== null) {
            if (this.previewMode === "birthday" && this.previewHidden !== "birthday") active.push("birthday");
            if (this.previewMode === "newyear" && this.previewHidden !== "newyear") active.push("newyear");
        } else {
            if (this.settings.birthdayEffect && this.birthdayToday(now) && this.hiddenFor.birthday !== day) active.push("birthday");
            if (this.isNewYear(now) && this.hiddenFor.newyear !== day) active.push("newyear");
        }
        for (const kind of ["birthday", "newyear"]) if (!active.includes(kind)) this.cards[kind]?.remove();
        if (!active.length) return;
        const locale = this.isRussian() ? "ru" : "en";
        for (const kind of active) if (this.cards[kind] && this.cards[kind].dataset.smLocale !== locale) {
            this.cards[kind].remove();
            this.cards[kind] = null;
        }
        const viewport = this.viewport;
        const nearBottom = viewport && viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight < 100;
        const cards = active.map(kind => this.cards[kind] ||= this.makeCard(kind));
        const tail = [...host.children].slice(-cards.length);
        const moved = cards.some((card, index) => tail[index] !== card);
        if (moved) for (const card of cards) host.appendChild(card);
        const composer = document.querySelector('main [class*="channelTextArea"], [class*="channelTextArea"]');
        const overlap = viewport && composer ? Math.max(0, viewport.getBoundingClientRect().bottom - composer.getBoundingClientRect().top) : 0;
        cards.forEach((card, index) => {
            card.style.paddingBottom = `${index === cards.length - 1 ? Math.max(32, overlap + 24) : 20}px`;
            card.style.setProperty("--sm-card-blur", `${Number(this.settings.blur || 0)}px`);
        });
        if (moved && nearBottom) requestAnimationFrame(() => {
            if (cards.at(-1)?.parentElement === host && this.viewport === viewport) viewport.scrollTop = viewport.scrollHeight - viewport.clientHeight;
        });
    }

    makeCard(kind = "birthday") {
        const ru = this.isRussian();
        const li = document.createElement("div");
        li.className = `sm-birthday-li${kind === "newyear" ? " sm-newyear-card" : ""}`;
        li.dataset.smLocale = ru ? "ru" : "en";
        li.setAttribute("role", "article");
        li.setAttribute("aria-label", kind === "newyear" ? (ru ? "Личное поздравление с Новым годом" : "Private New Year greeting") : (ru ? "Личное поздравление с днём рождения" : "Private birthday greeting"));
        const bell = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        bell.classList.add("sm-birthday-bell");
        bell.setAttribute("viewBox", "0 0 24 24");
        bell.setAttribute("aria-hidden", "true");
        const bellPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        bellPath.setAttribute("d", "M9.7 2.89c.18-.07.32-.24.37-.43a2 2 0 0 1 3.86 0c.05.2.19.36.38.43A7 7 0 0 1 19 9.5v2.09c0 .12.05.24.13.33l1.1 1.22a3 3 0 0 1 .77 2.01v.28c0 .67-.34 1.29-.95 1.56-1.31.6-4 1.51-8.05 1.51-4.05 0-6.74-.91-8.05-1.5-.61-.28-.95-.9-.95-1.57v-.28a3 3 0 0 1 .77-2l1.1-1.23a.5.5 0 0 0 .13-.33V9.5a7 7 0 0 1 4.7-6.61ZM9.18 19.84A.16.16 0 0 0 9 20a3 3 0 1 0 6 0c0-.1-.09-.17-.18-.16a24.86 24.86 0 0 1-5.64 0Z");
        bell.appendChild(bellPath);
        const card = document.createElement("div"); card.className = "sm-birthday-card";
        const icon = document.createElement("div"); icon.className = "sm-birthday-icon";
        let user;
        try { user = BdApi.Webpack.getStore("UserStore")?.getCurrentUser?.(); } catch (_) {}
        let avatarUrl;
        try { avatarUrl = user?.getAvatarURL?.(null, 64, true); } catch (_) {}
        if (!avatarUrl && user?.id && user?.avatar && /^\d+$/.test(user.id) && /^[a-zA-Z0-9_]+$/.test(user.avatar)) {
            avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith("a_") ? "gif" : "webp"}?size=64`;
        }
        if (avatarUrl) {
            const img = document.createElement("img");
            img.src = avatarUrl;
            img.alt = "";
            icon.appendChild(img);
        } else icon.textContent = "👤";
        const copy = document.createElement("div"); copy.className = "sm-birthday-copy";
        const title = document.createElement("div"); title.className = "sm-birthday-title"; title.textContent = kind === "newyear" ? (ru ? "С Новым годом!" : "Happy New Year!") : (ru ? "Отпразднуйте ваш день рождения!" : "Celebrate your birthday!");
        const subtitle = document.createElement("div"); subtitle.className = "sm-birthday-subtitle"; subtitle.textContent = kind === "newyear" ? (ru ? "Сегодня вам явно подарят парочку подарков под ёлкой)" : "A couple of presents are surely waiting under the tree for you today!") : (ru ? "Сегодня ваш день" : "Today is your day");
        copy.append(title, subtitle);
        const actions = document.createElement("div"); actions.className = "sm-birthday-actions";
        const hide = document.createElement("button"); hide.type = "button"; hide.textContent = ru ? "Скрыть" : "Hide";
        hide.addEventListener("click", () => this.hideCard(kind));
        const celebrate = document.createElement("button"); celebrate.type = "button";
        celebrate.append(this.makeSparkleSvg(), document.createTextNode(kind === "newyear" ? (ru ? "Больше фейерверков" : "More fireworks") : (ru ? "Больше блёсток" : "More sparkles")));
        celebrate.addEventListener("click", () => kind === "newyear" ? this.launchFirework(true) : this.burst());
        actions.append(hide, celebrate); card.append(icon, copy, actions);
        const privateLine = document.createElement("div"); privateLine.className = "sm-birthday-private";
        const eye = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        eye.setAttribute("viewBox", "0 0 24 24"); eye.setAttribute("aria-hidden", "true");
        const eyePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        eyePath.setAttribute("d", "M12 4C5.5 4 2 9.2 1 12c1 2.8 4.5 8 11 8s10-5.2 11-8c-1-2.8-4.5-8-11-8Zm0 14c-4.5 0-7.3-3-8.8-6C4.7 9 7.5 6 12 6s7.3 3 8.8 6C19.3 15 16.5 18 12 18Zm0-10a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z");
        eye.appendChild(eyePath);
        privateLine.append(eye, document.createTextNode(ru ? "Только вы видите это сообщение •" : "Only you can see this message •"));
        const dismiss = document.createElement("button"); dismiss.type = "button"; dismiss.textContent = ru ? "Убрать его" : "Dismiss"; dismiss.addEventListener("click", () => this.hideCard(kind));
        privateLine.appendChild(dismiss); li.append(bell, card, privateLine);
        return li;
    }

    hideCard(kind) {
        if (this.previewMode === kind) this.previewHidden = kind;
        else this.hiddenFor[kind] = new Date().toDateString();
        this.cards[kind]?.remove();
    }

    burst() {
        const card = this.cards.birthday;
        if (!this.layer || !card?.isConnected || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const layerRect = this.layer.getBoundingClientRect();
        const cardRect = card.querySelector(".sm-birthday-card").getBoundingClientRect();
        const colors = ["#fff8e6", "#f7e9ff", "#d9c9ff", "#ffffff"];
        const nodes = [];
        for (let i = 0; i < 20; i++) {
            const node = document.createElement("span"); node.className = "sm-birthday-burst";
            const x = Math.max(0, Math.min(layerRect.width - 12, cardRect.left - layerRect.left + Math.random() * cardRect.width));
            const y = Math.max(0, Math.min(layerRect.height - 12, cardRect.top - layerRect.top + Math.random() * 55 - 20));
            const dx = -34 + Math.random() * 68;
            const dy = -35 + Math.random() * 48;
            for (const [key, value] of Object.entries({"--sm-burst-left": `${x}px`, "--sm-burst-top": `${y}px`, "--sm-burst-size": `${7 + Math.random() * 9}px`, "--sm-burst-color": colors[i % colors.length], "--sm-burst-x": `${dx}px`, "--sm-burst-y": `${dy}px`, "--sm-burst-x-mid": `${dx * .45}px`, "--sm-burst-y-mid": `${dy * .45}px`})) node.style.setProperty(key, value);
            node.style.animationDelay = `${i * 18}ms`;
            node.appendChild(this.makeSparkleSvg());
            this.layer.appendChild(node);
            nodes.push(node);
        }
        const timeout = setTimeout(() => { this.timeouts.delete(timeout); nodes.forEach(node => node.remove()); }, 1300);
        this.timeouts.add(timeout);
    }
};
