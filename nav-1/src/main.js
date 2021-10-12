const $siteList=$('.siteList'); 
const $last=$('.siteList').find('li.last');
const x= localStorage.getItem('x');
const temp=JSON.parse(x);
const hashMap = temp||[
    {logo:'A',url:"acfun.cn"},
    {logo:'B',url:'bilibili.com'}
];
const simplify = (url)=>{
    return url.replace('https://','').replace('http://','').replace('www.','').replace(/\/.*/,'');//通过正则表达式清除后缀
}
hashMap.forEach((node,index)=>{
    const $li=$(`<li>
    <a href="https://${node.url}"><div class="site">
        <div class="close">
        <svg class="icon-ashbin" >
            <use xlink:href="#icon-ashbin"></use>
        </svg></div>
        <div class="logo">${node.logo}</div>
            <div class="link">${node.url}</div>
    </div></a>
    
</li>`).insertBefore($last);
$li.on('click','.close',(e)=>{
    e.preventDefault();
    $li.remove();
    hashMap.splice(index,1);
});
});
$('.addButton')
    .on('click',()=>{
       let url= window.prompt("请输入网址");
       url=simplify(url);
       const name=simplify(url)[0].toUpperCase();
       hashMap.push({logo:name,url:url});
       const $li=$(`<li>
       <a href="https://${url}"><div class="site">
       <div class="close">
        <svg class="icon-ashbin" >
            <use xlink:href="#icon-ashbin"></use>
        </svg></div>
           <div class="logo">${name}</div>
               <div class="link">${url}</div>
       </div></a>
       
   </li>`).insertBefore($last);
   $li.on('click','.close',(e)=>{
    e.preventDefault();
    $li.remove();
    hashMap.pop();
});
    })
    window.onbeforeunload=()=>{
        const string=JSON.stringify(hashMap);//对象转字符串（数组也是对象）
        localStorage.setItem('x',string);
    }

    $(document).on('keypress',(e)=>{
        const key=e.key;//可简写为const {key}=e
        for(let i=0;i<hashMap.length;++i){
            if(hashMap[i].logo===key.toUpperCase()){
                window.open("https://"+hashMap[i].url);
            }
        }
    })
    