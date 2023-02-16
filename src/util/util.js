
// 防抖函数
export function debounce(fn, times, isImmediately = true) {
    let timer = null;
    let cb;
    if (isImmediately) {
        cb = function (...args) {
            timer && clearTimeout(timer);
            let isDone = !timer;
            timer = setTimeout(() => {
                timer = null
            }, times);
            isDone && fn.apply(this, args);
        }
    } else {
        cb = function (...args) {
            const content = this;
            timer && clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(content, args)
            }, times)
        }
    }
    return cb;
}




// 获取路由信息
export function getRouterOptions(hash) {
    /* 
       ComponentName : js 组件名字，必填
       params: 需要传递的参数，可选
       query ： search 参数，可选
       
       <a href="#/ComponentName/:params?query=value"></a>
   */

    const options = {
        // 路由配置信息
        name: "",
        params: "",
        query: "",
    }
    // 默认hoom路由
    if (!hash || hash == '#home') {
        options.name = 'home';
    } else {
        // 提取路由地址的name params query信息
        try {
            const routerArr = hash.slice(1).split("/");
            options.name = routerArr[1];
            const paramsArr = routerArr[2].split("?");
            options.params = paramsArr[0].slice(1);
            options.query = paramsArr.slice(1);
        } catch (error) {
            options.name = "404";
        }
    }
    return options;
}

// 格式化日期
export function formatCreateTime(time) {
    let now = new Date(time);
    let year = now.getFullYear();
    let month = now.getMonth();
    let day = now.getDay();
    return `${year}-${month}-${day}`
}


//高斯模糊
function gaussBlur(imgData) {
    var pixes = imgData.data;
    var width = imgData.width;
    var height = imgData.height;
    var gaussMatrix = [],
        gaussSum = 0,
        x,
        y,
        r,
        g,
        b,
        a,
        i,
        j,
        k,
        len;

    var radius = 10;
    var sigma = 5; //标准差σ，σ描述正态分布资料数据分布的离散程度，σ越大，数据分布越分散，σ越小，数据分布越集中

    a = 1 / (Math.sqrt(2 * Math.PI) * sigma);
    b = -1 / (2 * sigma * sigma);
    //生成高斯矩阵
    for (i = 0, x = -radius; x <= radius; x++, i++) {
        g = a * Math.exp(b * x * x); //标准正态分布函数，正态分布记作N(μ,σ2)，其中μ = 0 ，σ2 = 5
        gaussMatrix[i] = g;
        gaussSum += g;
    }
    //归一化, 保证高斯矩阵的值在[0,1]之间
    for (i = 0, len = gaussMatrix.length; i < len; i++) {
        gaussMatrix[i] /= gaussSum;
    }
    //x 方向一维高斯运算
    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            r = g = b = a = 0;
            gaussSum = 0;
            for (j = -radius; j <= radius; j++) {
                k = x + j;
                if (k >= 0 && k < width) {
                    //确保 k 没超出 x 的范围
                    //r,g,b,a 四个一组
                    i = (y * width + k) * 4;
                    r += pixes[i] * gaussMatrix[j + radius];
                    g += pixes[i + 1] * gaussMatrix[j + radius];
                    b += pixes[i + 2] * gaussMatrix[j + radius];
                    // a += pixes[i + 3] * gaussMatrix[j];
                    gaussSum += gaussMatrix[j + radius];
                }
            }
            i = (y * width + x) * 4;
            // 除以 gaussSum 是为了消除处于边缘的像素, 高斯运算不足的问题
            // console.log(gaussSum)
            pixes[i] = r / gaussSum;
            pixes[i + 1] = g / gaussSum;
            pixes[i + 2] = b / gaussSum;
            // pixes[i + 3] = a ;
        }
    }
    //y 方向一维高斯运算
    for (x = 0; x < width; x++) {
        for (y = 0; y < height; y++) {
            r = g = b = a = 0;
            gaussSum = 0;
            for (j = -radius; j <= radius; j++) {
                k = y + j;
                if (k >= 0 && k < height) {
                    //确保 k 没超出 y 的范围
                    i = (k * width + x) * 4;
                    r += pixes[i] * gaussMatrix[j + radius];
                    g += pixes[i + 1] * gaussMatrix[j + radius];
                    b += pixes[i + 2] * gaussMatrix[j + radius];
                    // a += pixes[i + 3] * gaussMatrix[j];
                    gaussSum += gaussMatrix[j + radius];
                }
            }
            i = (y * width + x) * 4;
            pixes[i] = r / gaussSum;
            pixes[i + 1] = g / gaussSum;
            pixes[i + 2] = b / gaussSum;
        }
    }
    //end
    return imgData;
}


export function blur(ele, src) {
    //设置 canvas 画布
    const canvas = document.createElement("canvas");
    //width & height越小，图片越模糊
    canvas.width = 100;
    canvas.height = 100;
    // 获得 canvas 上下文
    const ctx = canvas.getContext("2d");
    //Image()函数将会创建一个新的HTMLImageElement实例。它的功能等价于 document.createElement('img')
    const img = new Image();
    img.src = src;
    // 添加属性crossorigin，增加img元素的跨域支持，设置值为anonymous，表示对此元素的 CORS 请求将不设置凭据标志
    img.setAttribute("crossorigin", "anonymous");
    //当img元素加载完成时执行
    img.onload = function () {
        const { width, height } = canvas;
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
        let imgData = ctx.getImageData(0, 0, width, height);
        //高斯模糊
        let gaussData = gaussBlur(imgData);
        ctx.putImageData(gaussData, 0, 0);

        //将图片转变为base64的编码格式
        let imgSrc = canvas.toDataURL();
        //设置背景图片
        ele.style.backgroundImage = "url(" + imgSrc + ")";
    };
}


export function formatSongTime(time) {
    let formatedTime = new Date(time);
    let seconds = formatedTime.getSeconds();
    let minutes = formatedTime.getMinutes();
    seconds < 10 ? seconds = '0' + String(seconds) : seconds = String(seconds);
    minutes < 10 ? minutes = '0' + String(minutes) : minutes = String(minutes);
    time = `${minutes}:${seconds}`;
    return time
}

/**
 * @description: 格式化歌词格式
 * @param {*} lyricStr
 * @return {*}
 */
export function formatSongLyric(lyricStr) {
    if (typeof lyricStr != "string") return "歌词加载失败";
    // lyricStr = JSON.stringify(lyricStr)

    const tempArr = lyricStr.split("\n");
    const lyric = tempArr.map((v, i) => {
        let reg = /^\[(\w*:\w*.?\w*)\](.*)/g;
        let lyricObj = {};
        if (reg.test(v)) {
            let timeStr = RegExp.$1;
            let second = timeStr
                .split(":")
                .reduce(
                    (accumulator, curValue) => 60 * Number(accumulator) + Number(curValue)
                )
                .toFixed(2);
            lyricObj.time = Number(second);
            lyricObj.lyric = RegExp.$2;
        }

        return lyricObj;

    });

    return lyric;
}


/**
 * @description: 取出歌单列表中的重复歌曲
 * @param {*} songList : 添加的歌单
 * @return {*}
 */
export function songListFilter(songList) {
    let songListArr = JSON.parse(window.localStorage.getItem('songList')) || [];
    let addToList = songList.map(
        (item) => ({
            id: item.id,
            name: item.name,
            ar: item.ar,
            dt: item.dt,
        }));

    //过滤  利用Map 对象 key 的唯一性
    songListArr = [...addToList, ...songListArr];
    const tempMap = new Map();
    songListArr.forEach((item) => {
        !tempMap.has(item.id) && tempMap.set(item.id, item);
    });

    //限制数量
    const limitArr = [...tempMap.values()];
    //超过一百 ，裁剪前一百
    limitArr.length > 100 && (limitArr = limitArr.slice(limitArr.length - 100))
    return limitArr
}