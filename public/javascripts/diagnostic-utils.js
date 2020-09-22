$(function(){
    $('#restart').click(()=> {
        $.post("http://95.158.47.15:3001/restart",{reason: "user request"}, (err) => {console.log("restart fail ", err)});
    });
});

