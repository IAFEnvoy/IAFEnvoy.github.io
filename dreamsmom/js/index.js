window.onload = () => {
  loadTable();
  loadMeme();
  clock();
}

const loadTable = async () => {
  result = await downloadAssets('data.json');
  table = document.getElementById('table');

  for (i = 0; i < 8; i++) {
    let counter = 0;
    for (let { } in result[i]['data']) {
      buttonNode = document.createElement('button');
      buttonNode.className = result[i]['data'][counter]['allow'];
      buttonNode.style.position = 'absolute';
      buttonNode.style.marginLeft = `${300 + 300 * counter}px`;
      buttonNode.style.marginTop = `${50 * i + 55}px`;
      buttonNode.style.width = '300px';
      buttonNode.style.height = '50px';
      buttonNode.name = result[i]['data'][counter]['location'];

      const id = result[i]['data'][counter]['location'];
      buttonNode.onclick = () => {
        window.open(`info.html?info&${id}`, '_blank');
      }

      roomNode = document.createElement('span');
      roomNode.className = 'normalClass';
      roomNode.style.width = '300px';
      roomNode.innerHTML = `${result[i]['data'][counter]['location']} ${result[i]['data'][counter]['name']}<br>
      ${result[i]['data'][counter]['stats']} 热度：${result[i]['data'][counter]['temp']}`;
      buttonNode.appendChild(roomNode);
      table.appendChild(buttonNode);
      counter++;
    }
  }
}

const loadMeme = async () => {
  memeResult = await downloadAssets('DataBase/meme.json');
  memeCnt = 0;
  for (let { } in memeResult) memeCnt++;
  memeNo = Math.floor(Math.random() * memeCnt);
  document.getElementById('meme').innerText = '今日笑话：' + memeResult[memeNo]['data'];
  document.getElementById('memeAuthor').innerText = memeResult[memeNo]['author'] != '' ? '---' + memeResult[memeNo]['author'] : '';
}

const seeMemeDetail = () => {
  if (memeResult[memeNo]['url'] != '')
    window.open(memeResult[memeNo]['url'], '_blank');
}

const clock = () => {
  //yyyy/mm/dd hh:mm:ss
  let timerNode = document.getElementById('timer');
  let date = new Date();
  let string = '当前时间：' + betterShow(date.getFullYear(), 4) + '/' + betterShow(date.getMonth() + 1, 2) + '/' + betterShow(date.getDate(), 2) + ' ';
  string += betterShow(date.getHours(), 2) + ':' + betterShow(date.getMinutes(), 2) + ':' + betterShow(date.getSeconds(), 2);
  timerNode.innerText = string;
}

const betterShow = (num, digit) => {
  let string = '';
  let num_string = num.toString();
  for (let i = 0; i < digit - num_string.length; i++)
    string += '0';
  string += num_string;
  return string;
}
setInterval(clock, 1000);

const dxzp = () => {
  window.open('https://www.bilibili.com/video/BV1GJ411x7h7', '_blank');
}

const downloadAssets = async (url) => {
  try {
    console.log(url);
    return await fetch(url).then(res => res.json());
  } catch (error) {
    return {};
  }
}

const openFanPage = () => {
  let url = document.baseURI.replace('index.html', '').replace('index', '') + 'info.html?fan';
  window.open(url, '_blank');
}

const openUpdateLog=()=>{
  let url = document.baseURI.replace('index.html', '').replace('index', '') + 'info.html?UpdateLog';
  window.open(url, '_blank');
}