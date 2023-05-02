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

const postfix = ["Image", "圖片", "Image Shortcut", "圖片捷徑"];
var matches;

document.addEventListener("pointermove", (_) => {
  // append the direct link if it is removed by google drive
  sleep(500).then(() => {
    let elm_cnt = 0;
    matches.forEach(function (element, _) {
      
      if (!postfix.some(s => element['caption'].endsWith(s))) {
        return;
      }
      const elm = document.querySelector('div[data-id="' + element['id'] + '"]');
      if (elm === null) {
        return;
      }
      elm_cnt++;
      if (elm.nextSibling.className != "injected-gmdl-link") {
        elm.insertAdjacentHTML('afterend',
          '<div class="injected-gmdl-link" style="z-index: 999; text-align: center;"><a href="https://lh3.googleusercontent.com/d/' + element['id'] + '" target="_blank">direct link</a></div>');
      }
    });
    if (elm_cnt == 0) {
      // trigger reload for changing folder
      let source = document.getElementsByTagName('html')[0].innerHTML;
      const myRegexp = new RegExp("data-id=\"(.*?)\"[\\s\\S]*?aria-label=\"(.*?)\"", "g");
      matches = [...execAll(source, myRegexp)];
    }
  });
});

async function main() {
  let source = document.getElementsByTagName('html')[0].innerHTML;
  const myRegexp = new RegExp("data-id=\"(.*?)\"[\\s\\S]*?aria-label=\"(.*?)\"", "g");
  matches = [...execAll(source, myRegexp)];
}

main().then().catch(err => { console.error(err); })