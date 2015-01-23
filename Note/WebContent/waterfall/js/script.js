window.onload =function(){
    appendBox(98);
    waterfall('main','box');
    
    //var dataInt = { 'data':[{'src':'images/0.jpg'},{'src':'images/1.jpg'},{'src':'images/2.jpg'}]}
    
    window.onscroll =function() {
        if(shouldScroll('main','box')) {
            appendBox(98);
            waterfall('main','box');
        }   
    }
}

function shouldScroll(parent, box) {
    var oParent = document.getElementById(parent);
    var oBoxs = getByClass(oParent, box);
    
    var lastboxH = oBoxs[oBoxs.length-1].offsetTop + Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
    
    var srcollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var browserHeiht = document.body.clientHeight || document.documentElement.clientHeight;
    
    return lastboxH < (srcollTop + browserHeiht);
}

function appendBox(num) {
    var mainElement = document.getElementById('main');
    for(var i=0;i<num;i++) {
        var boxElement = document.createElement('div');
        boxElement.className = 'box';
        mainElement.appendChild(boxElement);
        
        var picElement = document.createElement('div');
        boxElement.appendChild(picElement);
        picElement.className = 'pic';
        
        var imgElement = document.createElement('img');
        picElement.appendChild(imgElement);
        
        var src = 'images/{0}.jpg';
        src = src.replace('{0}',i);
        imgElement.src = src;
        
    }
}

function waterfall(parent, box) {
    var oParent = document.getElementById(parent);
    var oBoxs = getByClass(oParent, box);
    
    var oBoxW = oBoxs[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
   
    var st = 'width:{0}px;margin:0 auto;';
    st = st.replace('{0}', oBoxW*cols);
    oParent.style = st;
    
    // 找最矮的元素
    var hArr = [];
    
    for(var i=0;i<oBoxs.length;i++) {
        if(i<cols) {
            hArr.push(oBoxs[i].offsetHeight);
        } else {
            var minH = Math.min.apply(null, hArr);
            var index = getMinhIndex(hArr, minH);
            oBoxs[i].style.position = 'absolute';
            oBoxs[i].style.top = minH + 'px';
            oBoxs[i].style.left = oBoxW*index + 'px';
            
            hArr[index] = hArr[index] + oBoxs[i].offsetHeight;
        }
    }
    
}

function getByClass(oParent, clsName) {
    var boxArr = [];
    var oElements = oParent.getElementsByTagName('*');
    for(var i=0;i<oElements.length;i++) {
        if(oElements[i].className==clsName) {
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
}

function getMinhIndex(arr,val) {
    for(var i=0;i<arr.length;i++) {
        if(arr[i]==val) {
            return i;
        }
    }
}

