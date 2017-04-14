$(function(){
    $('.del').click(function(e){
    var id=$(this).data('id');
    var tr=$('.item-id-'+id);
    
    console.log(tr);
    $.ajax({
        type:'DELETE',
        url:'/admin/list?id='+id
    }).done(function(results){
        console.log(results);
        if(results.success===1){
            if(tr.length>0){
                tr.remove();
            }
        }

    });
        
    });
});