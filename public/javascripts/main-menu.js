const MotherOfReports = "http://95.158.47.15:3001/";

const menuItems =  [
    { text :"Главная", href: MotherOfReports },
//    { text :"Котельная 1", href: "eco1.html" },
//    { text :"Котельная 2", href: "eco2.html" },
    { text :"Котельная 1", href: MotherOfReports + "1" },
    { text :"Котельная 2", href: MotherOfReports+ "2" },
    { text :"Суточный отчет", href:  MotherOfReports + "reports/day" },
    { text :"Месячный отчет", href: MotherOfReports + "reports/month" },
];

$(function() {

    function getMenuItem(options) {
        options.text = options.text || "Главная";
        options.href = options.href || "http://95.158.47.15:3001/";

        return $("<li>", {
            append: $('<a>', {
                        text : options.text,
                        href: options.href
                    })
        })
        ;

    }

    function getMenu(prefix = "Eco1"){

        const menu = $('<div>', { 
            "class" :"ecoMenu",
            id : "topmenu"
            ,
            append: 
                $('<ul>')
        });

        menuItems.forEach(item => {
            menu.children(0).append(getMenuItem(item));
        });
        
        return menu;

    };

    console.log("menu");
    // $.getJSON('../public/data/ais.json',data => {

    //     for (ai in data.eco2) {
    //         $('#dataEco2').append(getAiRow(ai, data.eco2[ai], "Eco2"));
    //     }
        
    //     for (ai in data.eco1) {
    //         $('#dataEco1').append(getAiRow(ai, data.eco1[ai], "Eco1"));
    //     }

    //     // console.log("$('#Eco1_T_10').val()",  $('#Eco1_T_10').val() );
    //     // console.log("$('#Eco2_T_10').text()",  $('#Eco2_T_10').text() );
        
    //     // $('#data').text(data.parameters.eco1[0]);
    //     // $('#data').val = data.eco1;
    // });
    // $('header').append(getMenu());
    // $('body').prepend(getMenu());
    //let menu;
    try {
      $('body').prepend(getMenu());
      
      $(window).scroll(function() {
        const menu = $("#topmenu");

        if ( $(this).scrollTop() > 30  && menu.hasClass("ecoMenu")) {
            menu.removeClass("ecoMenu").addClass("fixed");
        } else if ( $(this).scrollTop() <= 30  && menu.hasClass("fixed")) {
            menu.removeClass("fixed").addClass("ecoMenu");
        };
    })
    } catch (error) {
        console.log(error.message);
        
    }


    

});
