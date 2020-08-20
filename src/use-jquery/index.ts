/**
 * 获得 img 标签中图片的地址
 * @param {String | Element} jqCur css选择器或者jQuery对象
 * @param {String | Element} [jqContainer] 祖先元素的css选择器或者jQuery对象
 * @return {String}
 */
export function getImageDomUrl(
  jqCur: string,
  jqContainer: string | JQuery<HTMLElement>
): string {
  const res = $(jqCur, jqContainer);

  return $.trim(res.attr('src'));
}

/**
 * 获得文字信息
 * @param {String | Element} jqCur css选择器或者jQuery对象
 * @param {String | Element} [jqContainer] 祖先元素的css选择器或者jQuery对象
 * @return {String}
 */
export function getText(
  jqCur: string,
  jqContainer: string | JQuery<HTMLElement>
): string {
  const res = $(jqCur, jqContainer);

  return $.trim(res.text());
}

/**
 * 获得 input/select/textarea 元素中的值
 * @param {String | Element} jqCur css选择器或者jQuery对象
 * @param {String | Element} [jqContainer] 祖先元素的css选择器或者jQuery对象
 * @return {String}
 */
export function getVal(
  jqCur: string,
  jqContainer: string | JQuery<HTMLElement>
): string | number | string[] {
  const res = $(jqCur, jqContainer);

  return res.val();
}

/**
 * 获得dom上的属性
 * @param {String} name 属性名字
 * @param {String | Element} jqCur css选择器或者jQuery对象
 * @param {String | Element} [jqContainer] 祖先元素的css选择器或者jQuery对象
 * @return {String}
 */
export function getAttr(
  name: string,
  jqCur: string,
  jqContainer: string | JQuery<HTMLElement>
): string {
  const res = $(jqCur, jqContainer);

  return $.trim(res.attr(name));
}

/**
 * 获得符合条件的DOM数量
 * @param {String | Element} jqCur css选择器或者jQuery对象
 * @param {String | Element} [jqContainer] 祖先元素的css选择器或者jQuery对象
 * @return {Number}
 */
export function getTotal(
  jqCur: string,
  jqContainer: string | JQuery<HTMLElement>
): number {
  const res = $(jqCur, jqContainer);

  return res.length;
}

/**
 * 是否存在
 * @param {String | Element} jqCur css选择器或者jQuery对象
 * @param {String | Element} [jqContainer] 祖先元素的css选择器或者jQuery对象
 * @return {Boolean}
 */
export function isExist(
  jqCur: string,
  jqContainer: string | JQuery<HTMLElement>
): boolean {
  return getTotal(jqCur, jqContainer) > 0;
}

/**
 * 获得 dom 元素中的部分计算属性值，只取一部分即可
 * @param {String | Element} jqCur css选择器或者jQuery对象
 * @param {String | Element} [jqContainer] 祖先元素的css选择器或者jQuery对象
 * @return {Object}
 */
export function getStyle(
  jqCur: string,
  jqContainer: string | JQuery<HTMLElement>
): {
  isExist: boolean;
  width?: string;
  height?: string;
  lineHeight?: string;
  isOneLine?: boolean;
} {
  const computedStyle = getComputedStyle(jqCur, jqContainer);
  if (!computedStyle) {
    return {
      isExist: false,
    };
  }

  return {
    isExist: true,
    width: computedStyle.width,
    height: computedStyle.height,
    lineHeight: computedStyle.lineHeight,
    // 判断是否是一行文字，注意此处即使是一行，height和lineHeight可能不是绝对相等，比如前者是 24.14px，而后者可能为 24.13px，但相差不大
    isOneLine: parseInt(computedStyle.height) === parseInt(computedStyle.lineHeight),
  };
}

/**
 * 获得 computedStyle 计算样式
 * @param {String | Element} jqCur css选择器或者jQuery对象
 * @param {String | Element} [jqContainer] 祖先元素的css选择器或者jQuery对象
 * @return {Object}
 */
export function getComputedStyle(
  jqCur: string,
  jqContainer: string | JQuery<HTMLElement>
): any {
  const curDom = $(jqCur, jqContainer)[0];

  if (!curDom) {
    return null;
  }

  return document.defaultView.getComputedStyle(curDom);
}

/**
 * 获得背景图地址
 * @param {String | Element} jqCur css选择器或者jQuery对象
 * @param {String | Element} [jqContainer] 祖先元素的css选择器或者jQuery对象
 * @return {String}
 */
export function getBackgroundImageUrl(
  jqCur: string,
  jqContainer: string | JQuery<HTMLElement>
): string {
  const computedStyle = getComputedStyle(jqCur, jqContainer);

  if (!computedStyle) {
    return '';
  }

  // 这里不能够直接使用jQuery获取style的方式，因为有可能这个并没有写在其中

  // 获得 background-image 的设置，例如 'url("https://pic.url.cn/hy_personal_room/1210697536/12106975361512129362/640")';
  const backgroundImage = computedStyle.backgroundImage;

  // 正则匹配找出实际的 url 地址，例如 https://pic.url.cn/hy_personal_room/1210697536/12106975361512129362/640
  const matchResult = backgroundImage.match(/url\("(.*)"\)/) || [];

  return matchResult[1] || '';
}

/**
 * 获得table表格中的数据
 * @param {String | Element} jqCur css选择器或者jQuery对象
 * @param {String | Element} [jqContainer] 祖先元素的css选择器或者jQuery对象
 * @return {Array}
 */
export function getDataFromTable(
  jqCur: string,
  jqContainer: string | JQuery<HTMLElement>
): any[] {
  const data = [];

  // table，但是也不用局限是 table
  const jqTable = $(jqCur, jqContainer);

  // table tr
  const jqTableTr = $('tr', jqTable);

  // 必须要有 tr ，这样才能拿到数据，如果不存在则直接返回
  if (!jqTableTr.length) {
    return data;
  }

  // 遍历 tr，获取其中 th 和 td 的数据存入到结果数组中
  jqTableTr.each(function () {
    const arr = [];

    $(this).children('th,td').each(function () {
      const content = $.trim($(this).text());
      arr.push(content);

      // 注意处理跨列的场景 colspan
      const colspanVal = $(this).attr('colspan');
      if (colspanVal) {
        for (let i = 0, len = parseInt(colspanVal) - 1; i < len; i++) {
          arr.push(content);
        }
      }
    });

    data.push(arr);
  });

  // 二次处理，主要是为了处理跨行 rowspan
  let yIndex = 0;
  jqTableTr.each(function () {
    let xIndex = 0;

    $(this).children('th,td').each(function () {
      // 计算跨行的场景
      const rowspanVal = $(this).attr('rowspan');
      if (rowspanVal) {
        // 如果该 th 或 td 上有 rowspan 值，则其后续行数（具体看 rowspan 的值）对于位置的值都一样
        for (let i = 1, len = parseInt(rowspanVal); i < len; i++) {
          // 后续被跨行的表格数据数组
          const arr = data[yIndex + i];

          // 在被跨行的位置上插入一个同一个值
          arr.splice(xIndex, 0, data[yIndex][xIndex]);
        }
      }

      // 计算跨列的场景
      const colspanVal = $(this).attr('colspan');
      if (colspanVal) {
        xIndex += parseInt(colspanVal);
      } else {
        xIndex++;
      }
    });

    yIndex++;
  });

  return data;
}
