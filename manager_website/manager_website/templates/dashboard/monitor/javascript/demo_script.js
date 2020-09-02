$(function(){
    $('video').each(function(index,ele){
        ele.currentTime=Math.random()*100;
    });
    $('.vid-item').on('click',function(event){
        var element=event.target;
        var ele=$('video',$(element).parent());
        $('video').get(0).currentTime= $(ele).get(0).currentTime;
    });
});