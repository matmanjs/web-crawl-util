/**
 * 通过选择的 DOM ，获得 selector 选择器
 *
 * @param {DOM} dom
 * @returns {String}
 */
function getSelector(dom) {
  let path;
  let i;
  const originalDom = dom;

  for (path = '', i = 0; dom && dom.nodeType === 1; dom = dom.parentNode, i++) {
    // 有 id 的情况直接退出
    if (dom.id) {
      path = '#' + dom.id + ' ' + path;
      break;
    }

    // 可能会有多个class
    if (dom.className) {
      path = '.' + dom.className.trim().split(/\s+/).join('.') + ' ' + path;
    } else if (i === 0) {
      // 如果是当前 dom 节点，且无 class，则使用其 tagName
      path = dom.tagName.toLowerCase();
    }
  }

  let result = path.trim();

  // 注意，有可能会有多个结果，此时需要加上序号，确保唯一，
  // 例如如果 #expTable .head th 有多个值，
  // 则会追加序号来区别L #expTable .head th:nth-child(6)
  const selectorAll = document.querySelectorAll(result);
  if (selectorAll && selectorAll.length > 1) {
    for (let index = 0; index < selectorAll.length; index++) {
      const element = selectorAll[index];
      if (element === originalDom) {
        result = `${result}:nth-child(${index + 1})`;
        break;
      }
    }
  }

  return result;
}

/**
 * 生成代码
 *
 * @param {DOM} dom
 */
function createSampleCode(dom) {
  const selector = getSelector(dom);
  console.log('---createSampleCode---', selector, dom);

  const result = createSampleCodeBySelector(selector);

  console.log(result);

  return result;
}

/**
 * 通过制定的 selector 生成代码
 *
 * @param {String} selector
 */
function createSampleCodeBySelector(selector) {
  const result = [];
  const { useJquery } = window.webCrawlUtil || {};

  result.push(`// [元素选择器]： ${selector}`);
  result.push(`const selector = "${selector}";`);
  result.push('');

  if (typeof useJquery !== 'undefined') {
    result.push(`// [是否存在]： ${useJquery.isExist(selector)}`);
    result.push(`const isExist = useJquery.isExist("${selector}");`);
    result.push('');

    if ($(selector).is('input')
      || $(selector).is('select')
      || $(selector).is('textarea')) {
      result.push(`/* [获得 input/select/textarea 元素中的值]：`);
      result.push(`${useJquery.getVal(selector)}`);
      result.push(`*/`);
      result.push(`const val = useJquery.getVal("${selector}");`);
      result.push('');
    } else if ($(selector).is('img')) {
      const imageDomUrl = useJquery.getImageDomUrl(selector);
      if (imageDomUrl) {
        result.push(`// [img 标签中图片的地址]： ${imageDomUrl}`);
        result.push(`const imageDomUrl = useJquery.getImageDomUrl("${selector}");`);
        result.push('');
      }
    } else if ($(selector).is('table')) {
      const dataFromTable = useJquery.getDataFromTable(selector);
      if (dataFromTable) {
        result.push(`/* [获得table表格中的数据]：`);
        result.push(`${JSON.stringify(dataFromTable)}`);
        result.push(`*/`);
        result.push(`const dataFromTable = useJquery.getDataFromTable("${selector}");`);
        result.push('');
      }
    } else {
      result.push(`/* [文本内容]：`);
      result.push(`${useJquery.getText(selector)}`);
      result.push(`*/`);
      result.push(`const text = useJquery.getText("${selector}");`);
      result.push('');
    }

    result.push(`// [匹配个数]： ${useJquery.getTotal(selector)}`);
    result.push(`const total = useJquery.getTotal("${selector}");`);
    result.push('');

    result.push(`// [获得dom上的属性，举例获取 class]： ${useJquery.getAttr('class', selector)}`);
    result.push(`const attrClass = useJquery.getAttr('class',"${selector}");`);
    result.push('');

    const styleObj = useJquery.getStyle(selector);
    result.push(`/* [dom 元素中的部分计算属性值]：`);
    result.push(`${JSON.stringify(styleObj, null, 2)}`);
    result.push(`注意：你也可以通过 useJquery.getComputedStyle("${selector}") 方法获得更多计算属性`);
    result.push(`*/`);
    result.push(`const styleObj = useJquery.getStyle("${selector}");`);
    result.push('');

    const backgroundImageUrl = useJquery.getBackgroundImageUrl(selector);
    if (backgroundImageUrl) {
      result.push(`// [背景图地址]： ${backgroundImageUrl}`);
      result.push(`const backgroundImageUrl = useJquery.getBackgroundImageUrl("${selector}");`);
      result.push('');
    }

  } else {
    result.push(`// window.webCrawlUtil.useJquery 不存在`);
    result.push('');
  }

  return result.join('\n');
}

// TODO 测试代码
// console.log(getSelector($0), $0);

// TODO 测试代码
// createSampleCode($0);
