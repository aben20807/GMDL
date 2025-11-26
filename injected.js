console.log("GMDL injected");

function* execAll(str, regex) {
  if (!regex.global) {
    console.error('RegExp must have the global flag to retrieve multiple results.');
  }

  let match;
  while (match = regex.exec(str)) {
    yield { 'id': match[1], 'caption': match[2] };
  }
}

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const postfix = ["Image", "圖片", "Image Shared", "已共用", "Image Shortcut", "圖片捷徑"];
var matches;

document.addEventListener("pointermove", (_) => {
  // append the direct link if it is removed by google drive
  sleep(500).then(() => {
    let elm_cnt = 0;
    matches.forEach(function (element, _) {
      // console.log(element);
      if (!postfix.some(s => element['caption'].trim().includes(s))) {
        return;
      }
      const elms = document.querySelectorAll('div[data-id="' + element['id'] + '"]');
      if (elms.length === 0) {
        return;
      }
      const elm = elms[elms.length - 1];
      elm_cnt++;
      if (elm.nextSibling === null || elm.nextSibling.className != "injected-gmdl-link") {
        elm.insertAdjacentHTML('afterend',
          '<div class="injected-gmdl-link" style="z-index: 999; text-align: center;"><a href="https://lh3.googleusercontent.com/d/' + element['id'] + '" target="_blank">direct link</a></div>');
        // console.log("https://lh3.googleusercontent.com/d/" + element['id']);
      }
    });
    // trigger reload for changing folder, hidden files in first render, and new file upload
    let source = document.getElementsByTagName('html')[0].innerHTML;
    const myRegexp = new RegExp("data-id=\"(.*?)\"[\\s\\S]*?aria-label=\"(.*?)\"", "gm");
    matches = [...execAll(source, myRegexp)];
  });
});

async function main() {
  let source = document.getElementsByTagName('html')[0].innerHTML;
  const myRegexp = new RegExp("data-id=\"(.*?)\"[\\s\\S]*?aria-label=\"(.*?)\"", "gm");
  matches = [...execAll(source, myRegexp)];
}

main().then().catch(err => { console.error(err); })
