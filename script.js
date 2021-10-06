window.onresize = () => {

var left = document.getElementById("professional-content").offsetHeight;
var right = document.getElementById("personal-content").offsetHeight;

console.log(right);
console.log(left);

if(left > right)
{
    document.getElementById("personal-content").setAttribute("style",`height:${left}px`);
}
else
{
    document.getElementById("professional-content").setAttribute("style",`height:${right}px`);
}

console.log(document.getElementById("personal-content").offsetHeight);
console.log(document.getElementById("professional-content").offsetHeight);
};