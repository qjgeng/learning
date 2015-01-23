var waterfall = (function(){
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
    
    
    return {
        shouldScroll: function(parent, box) {
            var oParent = document.getElementById(parent);
            var oBoxs = getByClass(oParent, box);

            var lastboxH = oBoxs[oBoxs.length-1].offsetTop +         Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);

            var srcollTop = document.body.scrollTop || document.documentElement.scrollTop;
            var browserHeiht = document.body.clientHeight || document.documentElement.clientHeight;

            return lastboxH < (srcollTop + browserHeiht);
        },        
        appendBox: function(num) {
            var mainElement = document.getElementById('main');
            //mainElement.style.display = 'None';
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
                //this.doLayout('main','box');
            }
        },
        
        doLayout: function(parent, box){
            var oParent = document.getElementById(parent);
            var oBoxs = getByClass(oParent, box);

            var oBoxW = oBoxs[0].offsetWidth;
            var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
            
            oParent.style.width = oBoxW*cols + 'px';
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
            //oParent.style.display = 'block';
        }
    }
})();

window.onload =function(){
    waterfall.appendBox(98);
    
    setInterval("waterfall.doLayout('main','box')", 1);
    //waterfall.doLayout('main','box');
    window.onscroll = function() {
        if(waterfall.shouldScroll('main','box')) {
            waterfall.appendBox(98);
            waterfall.doLayout('main','box');
        }
    }
}