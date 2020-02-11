function getImageFromScript(tag){
	var s = tag.innerHTML;
	var r = /[0-9]+\-[0-9A-z]+/g
	if(s){
		var a = s.match(r);
		if(a && a[1]){
			return "https://html1-f.scribdassets.com/4ok8d1r5j44zrqsd/images/"+a[1]+".jpg";
    	}
	}
return "";
}

var xqv = document.getElementsByTagName("script");
var lll = [];
for(var i in xqv){
	
	lll.push(getImageFromScript(xqv[i]));
}
console.log(JSON.stringify(lll));