import { defineConfig, presetUno, presetAttributify, presetWebFonts, presetIcons, transformerVariantGroup } from 'unocss'
import transformerCompileClass from '@unocss/transformer-compile-class'
import transformerDirectives from '@unocss/transformer-directives'
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'
// import presetRemToPx from '@unocss/preset-rem-to-px'

// px 轉 vw
function convertPxToVw(px: string, designW: string = '1920') {
  const pxValue = parseFloat(px);
  const designWidth = parseFloat(designW);
  const vwValue = (pxValue / designWidth) * 100;
  return `${vwValue}vw`;
}

// variables
const deskGutter = 20; // 電腦版 gutter
const mobGutter = 10; // 手機版 gutter
const duration = 300; // transition duration

export default defineConfig({
  // ...UnoCSS options
  shortcuts: [
    [/^u-transition-(.*)$/, ([_, value]) => {
      // 是否為 'linear'
      const easeValue = value === 'linear' ? `ease-${value}` : value;
      return `transition-property-all transition-${easeValue} transition-duration-${duration}`;
    }], // 支持 'ease'、'ease-in'、'ease-out'、'ease-in-out'、'linear'
    {'u-flex-center': 'flex justify-center items-center'},
    [/^u-(absolute|relative|fixed|sticky)-center$/, ([, value]) => `${value} top-50% left-50% translate-x--50% translate-y--50%`],
    {'u-link-range': 'absolute top-0 left-0 w-100% h-100%'},
    {'u-hidden': 'absolute w-0 h-0 overflow-hidden'},
    [/^u-bg-(.*)$/, ([, value]) => `bg-no-repeat bg-size-${value} bg-position-center`], // width、height 要自行設定
    [/^u-img-(.*)$/, ([, value]) => `object-${value} object-position-center`], // width、height 要自行設定
    {'u-bg-ratio': 'w-100% h-100% u-bg-cover u-absolute-center bg-white'},
    {'u-img-ratio': 'w-100% h-100% u-img-cover u-absolute-center'},
    // 文字
    {'u-h1': 'font-size-[54px]'}, // 設定字級
    {'u-h2': 'font-size-[38px]'},
    {'u-h3': 'font-size-[24px]'},
    {'u-h4': 'font-size-[20px]'},
    {'u-h5': 'font-size-[18px]'},
    {'u-h6': 'font-size-[16px]'},
    {'u-text': 'font-size-[16px]'},
    {'u-caption': 'font-size-[14px]'},
    {'u-focus-only': 'border-rounded bg-main color-white fixed top-0 left-0 p-2 z-1000 hover:color-white focus:u-transition-ease'}, // 無障礙第一個導盲磚使用(快速跳至主要內容區塊)
    {'u-icon': 'inline-block w-[24px] h-[24px] stroke-width-none stroke-current fill-current u-transition-ease'}, // svg iconfont use
    // 隔線
    {'g-container': `container px-${mobGutter} mx-auto max-sm:max-w-100%`},
    {'g-grid': `grid gap-[${mobGutter}px] md:gap-[${deskGutter}px]`},
    // {'g-row': `flex flex-wrap gap-[-${mobGutter}] md:gap-[-${deskGutter}]`},
    {'u-max-w-gutter': `max-w-[calc(100%-${mobGutter * 2}px)]`},
  ],
  rules: [
    ['img-render-vector', { 'image-rendering': '-webkit-optimize-contrast' }], // chrome 圖片銳利化
    [/^bgi-\[([\w\W]+)\]$/, ([_, value]) => {
      const imgRegx = /(http|https):\/\/([\w.]+\/?)\S*/
      // '/assets' is the location of dest in your plugin configuration(dest: 'assets').
      const path = `${imgRegx.test(value) ? '' : '/src/assets/images/'}`
      return ({ 'background-image': `url('${path}${value}')` })
    }], // 背景圖 (ex: bgi-[image.jpg])
    [/^vw-(width|margin|padding|height|fontSize)-\[(-?\d+)\](?:-\[(-?\d+)\])?$/, ([, prop, value]) => {
      const cssProp = {
        'width': 'width',
        'margin': 'margin',
        'padding': 'padding',
        'height': 'height',
        'fontSize': 'font-size'
      }[prop as keyof typeof cssProp];
      return { [cssProp]: convertPxToVw(value) };
    }], // vw 計算 (ex: vw-width-[10])
    [/^u-ratio-\[(\d+)x(\d+)\]$/, ([_, w, h]) => {
      const paddingTop = (Number(h) / Number(w)) * 100;
      
      return {
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        'padding-top': `${paddingTop}%`,
      };
    }], // 寬高比 (ex: u-ratio-[16x9])
    // 覆蓋
    ['h-dvh', { 'height': 'calc(var(--vh, 1vh) * 100)' }], // 100dvh
  ],
  theme: {
    breakpoints: {
      'tiny': '375px',
      'xs': '414px',
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      'xxl': '1400px',
      'jumbo': '1620px',
    },
    colors: {
      'main': '#56ce9c',
      'main-dark': '#47ad82',
      'minor': '#ffc044',
      'minor-dark': '#dba53b',
      'light': '#F0F0F0',
      'gray': '#666666',
      'dark': '#030101',
      'success': '#1FA809',
      'error' : '#ff0000',
    },
    extend: {
      screens: {
        portrait: {
          raw: "(orientation: portrait)"
        },
        landscape: {
          raw: "(orientation: landscape)"
        },
        'is-touch': {
          raw: "(hover: none)"
        },
        'not-touch': {
          raw: "(hover: hover)"
        },
      },
      keyframes: {
        'overflow-modify': {
          '0%, 99.9%': { overflow: 'hidden' },
          '100%': { overflow: 'visible' }
        }
      },
      animation: {
        'overflow-modify': 'overflow-modify 0.5s ease'
      },
    },
  },
  presets: [
    presetUno(), 
    presetAttributify(),
    presetWebFonts({
      provider: 'google', // default provider
      fonts: {
        base: [
          {
            name: 'Noto Sans TC',
            weights: ['300', '400', '500', '600', '700', '800', '900'],
            italic: true,
          },
          {
            name: 'Roboto',
            weights: ['300', '400', '500', '600', '700', '800', '900'],
            italic: true,
          },
          {
            name: 'sans-serif',
            provider: 'none',
          },
        ],
        en: [
          {
            name: 'Roboto',
            weights: ['300', '400', '500', '600', '700', '800', '900'],
            italic: true,
          },
          {
            name: 'sans-serif',
            provider: 'none',
          },
        ],
        un: [
          {
            name: 'Uniform',
            weights: ['400'],
          },
          {
            name: 'Uniform-Medium',
            weights: ['500'],
          },
          {
            name: 'Uniform-Bold',
            weights: ['700'],
          },
          {
            name: 'sans-serif',
            provider: 'none',
          },
        ]
      },
      // This will download the fonts and serve them locally
      processors: createLocalFontProcessor({
        // Directory to cache the fonts
        cacheDir: 'node_modules/.cache/unocss/fonts',

        // Directory to save the fonts assets
        fontAssetsDir: 'public/assets/fonts',

        // Base URL to serve the fonts from the client
        fontServeBaseUrl: '/assets/fonts'
      })
    }),
    presetIcons({
      collections: {
        custom: {
          circle: '<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50"></circle></svg>',
          /* ... */
        },
      },
      extraProperties: {
        'display': 'inline-block',
        'width': '24px',
        'height': '24px',
      },
    }),
    // presetRemToPx({
    //   baseFontSize: 4,
    // }),
    // presetMini({
    //   dark: 'media'
    // })
  ],
  variants: [
    // 支援 @group-hover:xxx / @parent-hover:xxx
    (matcher) => {
      const match = matcher.match(/^@(\w+)-(\w+):/)
      if (!match) return

      const [, parentClass, pseudo] = match
      const raw = matcher.slice(match[0].length)

      return {
        matcher: raw,
        selector: (s) => `.${parentClass}:${pseudo} ${s}`,
        parent: '@media (hover: hover)', // 只在非觸控裝置有效
      }
    },
    // @peer-hover:xxx
    (matcher) => {
      const match = matcher.match(/^@peer-(\w+):/)
      if (!match) return

      const [, pseudo] = match
      const raw = matcher.slice(match[0].length)

      return {
        matcher: raw,
        selector: (s) => `.peer:${pseudo} ~ ${s}`, // 相鄰兄弟元素
        parent: '@media (hover: hover)', // 只在非觸控裝置有效
      }
    },
  ],
  transformers: [
    transformerCompileClass(),
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})