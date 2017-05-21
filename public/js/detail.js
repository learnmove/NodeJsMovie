$(function(){
    $(".comment").click(function(e){
        var target=$(this);
        var tid=target.data('tid');
        var cid=target.data('cid');
        if($('#comment-tid').length>0||$('#comment-tid').length>0){
            $('#comment-tid').val(tid);
            $('#comment-cid').val(cid);
            
        }else{
            $('<input>').attr({
                    id:'comment-tid',
                    type:'hidden',
                    name:'comment[tid]',
                    value:tid
        }).appendTo('#commentForm');
           $('<input>').attr({
            id:'comment-cid',
            type:'hidden',
            name:'comment[cid]',
            value:cid
        }).appendTo('#commentForm');
        }
    
    });

});