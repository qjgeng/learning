function getClass(oParent,sClass)
{
	var value=[];
	var Ele=oParent.getElementsByTagName('*');
	for(var i=0; i<Ele.length; i++)
	{
		var aClass=Ele[i].className.split(' ');
		for(n=0; n<aClass.length; n++)
		{
			if(aClass[n]==sClass)
			{
				value.push(Ele[i]);
			}
		}
	}
	return value;
}
function getStyle(obj,name)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[name];
	}
	else
	{
		return getComputedStyle(obj,false)[name];
	}
}
function startRuning(obj,json,fnEnd)
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function()
	{
		var bStop=true;
		var now=0;
		var speed=0;
		for (var attr in json)
		{
			if(attr=='opacity')
			{
				now=Math.round(parseFloat(getStyle(obj,attr))*100);
			}
			else
			{
				now=parseInt(getStyle(obj,attr));
			}
			speed=(json[attr]-now)/10;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(now!=json[attr])bStop=false;
			if(attr=='opacity')
			{
				obj.style.filter='alpha(opacity:'+now+speed+')';
				obj.style.opacity=(now+speed)/100;
			}
			else
			{
				obj.style[attr]=now+speed+'px';
			}
		}
		if(bStop)
		{
			clearInterval(obj.timer);
			if(fnEnd)fnEnd();
		}
	}, 30);
}
window.onload=function()
{
	var oUL=document.getElementById('pic');
	var oImages=getClass(oUL,'images');
	var bigPic=document.getElementById('bigshow');
	var space=Math.ceil((document.documentElement.clientWidth-oImages[0].offsetWidth*oImages.length)/oImages.length);
	var CenterX=Math.ceil(document.documentElement.clientWidth/2);
	var CenterY=Math.ceil(document.documentElement.clientHeight/2);
	var open=false;
	var now=0;
	var bg=[
	'images/big/01.jpg',
	'images/big/02.jpg',
	'images/big/03.jpg',
	'images/big/04.jpg',
	'images/big/05.jpg',
	'images/big/06.jpg'
	];
	
	bigPic.onclick=function()
	{				
		startRuning(this,{opacity:0});				
	}
	
	for(var i=0; i<oImages.length; i++)
	{
		var rotate=Math.random()*40-20;
		oImages[i].style.webkitTransform='rotate('+rotate+'deg)';
		oImages[i].style.MozTransform='rotate('+rotate+'deg)';
		oImages[i].style.transform='rotate('+rotate+'deg)'
	}
	
	function close()
	{
		var i=0;
		var timer=setInterval(function()
		{
			startRuning(oImages[i],{left:0,opacity:100,bottom:-50});
			i++;
			if(i==oImages.length)
			{
				clearInterval(timer);
				open=false;				
			}
		}, 30);			
	}
	
	for(var i=0; i<oImages.length; i++)
	{
		oImages[i].index=i;
		oImages[i].onclick=function()
		{
			now=this.index;
			if(open)
			{	
				startRuning(this,{bottom:CenterY,left:CenterX,opacity:0},function()
				{
					close();
					//bigPic.style.backgroundImage=bg[now];
					document.getElementById("imgShow").src=bg[now];
					startRuning(bigPic,{opacity:100});
				});
			}
			else
			{
				var i=oImages.length-1;
				var timer=setInterval(function()
				{	
					var between=oImages[i].offsetWidth*i+space*i;
					startRuning(oImages[i],{left:between});
					i--;
					if(i<0)
					{
						clearInterval(timer);
						open=true;
					}
				}, 30);					
			}
	
		}
	}
	
	var autostart=setTimeout(function()
	{
		for(var i=0; i<oImages.length; i++)
		{
			startRuning(oImages[i],{bottom:-50,opacity:100});
		}
	}, 1000);
}
