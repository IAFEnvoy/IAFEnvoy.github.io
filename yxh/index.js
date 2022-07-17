const printText = (obj, des1, des2, aut) => {
    let s = getNewText(obj, des1, des2, aut);
    let s1 = s.split('\n');
    for (let i in s1) console.log(s1[i]);
}

const generate = () => {
    let obj = document.getElementById('object').value;
    let des1 = document.getElementById('describe1').value;
    let des2 = document.getElementById('describe2').value;
    let aut = document.getElementById('author').value;
    let s = getNewText(obj, des1, des2, aut == '' ? undefined : aut);
    document.getElementById('textholder').innerHTML = s;
}