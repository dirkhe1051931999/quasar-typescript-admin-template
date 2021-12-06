// https://gitee.com/LongbowEnterprise/SliderCaptcha
export class sliderCaptcha {
  constructor(element: any, option: any) {
    this.$element = element;
    this.option = Object.assign({}, this.option, option);
    this.$element.style.position = 'relative';
    this.$element.style.width = this.option.width + 'px';
    this.$element.style.margin = '0 auto';
    this.init();
  }
  private option = {
    width: 280, // canvas宽度
    height: 155, // canvas高度
    PI: Math.PI,
    sliderL: 42, // 滑块边长
    sliderR: 9, // 滑块半径
    offset: 5, // 容错偏差
    loadingText: 'Loading...',
    failedText: 'Refresh',
    barText: 'Swipe right to fill the puzzle',
    maxLoadCount: 3,
    localImages: () => {
      return '/866-536x354.jpg';
    },
    verify: (arr: any[], url: any): boolean => {
      return true;
    },
    remoteUrl: null,
    outSrc: '',
    onRefresh: () => {},
    onSuccess: () => {},
    onFail: () => {},
  };
  private canvasOption: any = {};
  private $element: any;
  private init() {
    this.initDOM();
    this.initImg();
    this.bindEvents();
  }
  private initDOM() {
    var createElement = (tagName: string, className: string) => {
      var elment = document.createElement(tagName);
      elment.className = className;
      return elment;
    };

    var createCanvas = (width: number, height: number) => {
      var canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      return canvas;
    };

    var canvas = createCanvas(this.option.width - 2, this.option.height); // 画布
    var block: any = canvas.cloneNode(true); // 滑块
    var sliderContainer = createElement('div', 'sliderContainer');
    var refreshIcon = createElement('i', 'refreshIcon ');
    var sliderMask = createElement('div', 'sliderMask');
    var sliderbg = createElement('div', 'sliderbg');
    var slider = createElement('div', 'slider');
    var sliderIcon = createElement('i', '');
    var text = createElement('span', 'sliderText');

    block.className = 'slidercaptcha-block';
    text.innerHTML = this.option.barText;
    refreshIcon.innerHTML = 'Refresh';
    sliderIcon.innerHTML = '→';
    var el = this.$element;
    el.appendChild(canvas);
    el.appendChild(refreshIcon);
    el.appendChild(block);
    slider.appendChild(sliderIcon);
    sliderMask.appendChild(slider);
    sliderContainer.appendChild(sliderbg);
    sliderContainer.appendChild(sliderMask);
    sliderContainer.appendChild(text);
    el.appendChild(sliderContainer);

    Object.assign(this.canvasOption, {
      canvas: canvas,
      block: block,
      sliderContainer: sliderContainer,
      refreshIcon: refreshIcon,
      slider: slider,
      sliderMask: sliderMask,
      sliderIcon: sliderIcon,
      text: text,
      canvasCtx: canvas.getContext('2d'),
      blockCtx: block.getContext('2d'),
      x: 0,
    });
  }
  private initImg() {
    var x: any, y: any;
    var imgSrc = '';
    var isIE = window.navigator.userAgent.indexOf('Trident') > -1;
    var L = this.option.sliderL + this.option.sliderR * 2 + 3; // 滑块实际边长
    var drawImg = (ctx: any, operation: any) => {
      var l = this.option.sliderL;
      var r = this.option.sliderR;
      var PI = this.option.PI;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
      ctx.lineTo(x + l, y);
      ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI);
      ctx.lineTo(x + l, y + l);
      ctx.lineTo(x, y + l);
      ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true);
      ctx.lineTo(x, y);
      ctx.lineWidth = 2;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.stroke();
      ctx[operation]();
      ctx.globalCompositeOperation = isIE ? 'xor' : 'destination-over';
    };

    var getRandomNumberByRange = (start: number, end: number) => {
      return Math.round(Math.random() * (end - start) + start);
    };
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    var loadCount = 0;
    img.onload = () => {
      // 随机创建滑块的位置
      this.canvasOption.x = x = getRandomNumberByRange(L + 10, this.option.width - (L + 10));
      y = getRandomNumberByRange(10 + this.option.sliderR * 2, this.option.height - (L + 10));

      drawImg(this.canvasOption.canvasCtx, 'fill');
      drawImg(this.canvasOption.blockCtx, 'clip');

      this.canvasOption.canvasCtx.drawImage(img, 0, 0, this.option.width - 2, this.option.height);
      this.canvasOption.blockCtx.drawImage(img, 0, 0, this.option.width - 2, this.option.height);
      var Y = y - this.option.sliderR * 2 - 1;
      var ImageData = this.canvasOption.blockCtx.getImageData(x - 3, Y, L, L);
      this.canvasOption.block.width = L;
      this.canvasOption.blockCtx.putImageData(ImageData, 0, Y + 1);
      this.canvasOption.text.textContent = this.canvasOption.text.getAttribute('data-text');
    };
    img.onerror = () => {
      loadCount++;
      if (window.location.protocol === 'file:') {
        loadCount = this.option.maxLoadCount;
        throw new Error("can't load pic resource file from File protocal. Please try http or https");
      }
      if (loadCount >= this.option.maxLoadCount) {
        this.canvasOption.text.textContent = 'Image failed to load';
        this.canvasOption.text.classList.add('text-red');
        return;
      }
      img.src = this.option.localImages();
    };
    if (this.option.outSrc) imgSrc = this.option.outSrc;
    img.src = imgSrc;
    this.canvasOption.text.setAttribute('data-text', this.option.barText);
    this.canvasOption.text.textContent = this.option.loadingText;
  }
  private bindEvents() {
    this.$element.addEventListener('selectstart', () => {
      return false;
    });
    this.canvasOption.refreshIcon.addEventListener('click', () => {
      this.canvasOption.text.textContent = this.option.barText;
      this.reset();
      this.option.onRefresh.call(this.$element);
    });
    var originX: any,
      originY: any,
      trail: any[] = [],
      isMouseDown = false;

    var handleDragStart = (e: any) => {
      if (this.canvasOption.text.classList.contains('text-danger')) return;
      originX = e.clientX || e.touches[0].clientX;
      originY = e.clientY || e.touches[0].clientY;
      isMouseDown = true;
    };

    var handleDragMove = (e: any) => {
      if (!isMouseDown) return false;
      var eventX = e.clientX || e.touches[0].clientX;
      var eventY = e.clientY || e.touches[0].clientY;
      var moveX = eventX - originX;
      var moveY = eventY - originY;
      if (moveX < 0 || moveX + 40 > this.option.width) return false;
      this.canvasOption.slider.style.left = moveX - 1 + 'px';
      var blockLeft = ((this.option.width - 40 - 20) / (this.option.width - 40)) * moveX;
      this.canvasOption.block.style.left = blockLeft + 'px';
      this.canvasOption.sliderContainer.classList.add('sliderContainer_active');
      this.canvasOption.sliderMask.style.width = moveX + 4 + 'px';
      trail.push(Math.round(moveY));
    };

    var handleDragEnd = (e: any) => {
      if (!isMouseDown) return false;
      isMouseDown = false;
      var eventX = e.clientX || e.changedTouches[0].clientX;
      if (eventX === originX) return false;
      this.canvasOption.sliderContainer.classList.remove('sliderContainer_active');
      this.canvasOption.trail = trail;
      var data = this.verify();
      if (data.spliced && data.verified) {
        this.canvasOption.sliderContainer.classList.add('sliderContainer_success');
        this.option.onSuccess.call(this.$element);
      } else {
        this.canvasOption.sliderContainer.classList.add('sliderContainer_fail');
        this.option.onFail.call(this.$element);
        setTimeout(() => {
          this.canvasOption.text.innerHTML = this.option.failedText;
          this.reset();
        }, 1000);
      }
    };

    this.canvasOption.slider.addEventListener('mousedown', handleDragStart);
    this.canvasOption.slider.addEventListener('touchstart', handleDragStart);
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('touchmove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchend', handleDragEnd);
    document.addEventListener('mousedown', function() {
      return false;
    });
    document.addEventListener('touchstart', function() {
      return false;
    });
    document.addEventListener('swipe', function() {
      return false;
    });
  }
  private clean() {
    this.canvasOption.canvasCtx.clearRect(0, 0, this.option.width, this.option.height);
    this.canvasOption.blockCtx.clearRect(0, 0, this.option.width, this.option.height);
    this.canvasOption.block.width = this.option.width;
  }
  private verify() {
    var arr = this.canvasOption.trail; // 拖动时y轴的移动距离
    var left = parseInt(this.canvasOption.block.style.left);
    var verified = false;
    if (this.option.remoteUrl !== null) {
      verified = this.option.verify(arr, this.option.remoteUrl);
    } else {
      var sum = function(x: number, y: number) {
        return x + y;
      };
      var square = function(x: number) {
        return x * x;
      };
      var average = arr.reduce(sum) / arr.length;
      var deviations = arr.map((x: number) => {
        return x - average;
      });
      var stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length);
      verified = stddev !== 0;
    }
    return {
      spliced: Math.abs(left - this.canvasOption.x) < this.option.offset,
      verified: verified,
    };
  }
  public reset() {
    this.canvasOption.sliderContainer.classList.remove('sliderContainer_fail');
    this.canvasOption.sliderContainer.classList.remove('sliderContainer_success');
    this.canvasOption.slider.style.left = 0;
    this.canvasOption.block.style.left = 0;
    this.canvasOption.sliderMask.style.width = 0;
    this.clean();
    this.canvasOption.text.setAttribute('data-text', this.canvasOption.text.textContent);
    this.canvasOption.text.textContent = this.option.loadingText;
    this.initImg();
  }
}
