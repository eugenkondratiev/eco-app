$(function(){
    $('#restart').click(()=> {
        $.post("http://95.158.44.52:3001/restart",{reason: "user request"}, (err) => {console.log("restart fail ", err)});
    });
});

