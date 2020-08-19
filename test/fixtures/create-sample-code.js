// const { useJquery } = webCrawlUtil;

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

  for (path = "", i = 0; dom && dom.nodeType === 1; dom = dom.parentNode, i++) {
    // 有 id 的情况直接退出
    if (dom.id) {
      path = "#" + dom.id + " " + path;
      break;
    }

    // 可能会有多个class
    if (dom.className) {
      path = "." + dom.className.trim().split(/\s+/).join(".") + " " + path;
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

// TODO 测试代码
// console.log(getSelector($0), $0);

/**
 * 生成代码
 *
 * @param {DOM} dom
 */
function createSampleCode(dom) {
  const selector = getSelector(dom);
  console.log("---createSampleCode---", selector, dom);

  const result = [];

  result.push(`// [元素选择器]： ${selector}`);
  result.push(`const selector = "${selector}";`);
  result.push("");

  result.push(`// [文本内容]： ${useJquery.getText(selector)}`);
  result.push(`const text = useJquery.getText("${selector}");`);
  result.push("");

  result.push(`// [匹配个数]： ${useJquery.getTotal(selector)}`);
  result.push(`const total = useJquery.getTotal("${selector}");`);
  result.push("");

  result.push(`// [是否存在]： ${useJquery.isExist(selector)}`);
  result.push(`const isExist = useJquery.isExist("${selector}");`);
  result.push("");


  result.push(`// [是否存在]： ${useJquery.isExist(selector)}`);
  result.push(`const isExist = useJquery.isExist("${selector}");`);
  result.push("");

  console.log(result.join("\n"));
}

// TODO 测试代码
// createSampleCode($0);
