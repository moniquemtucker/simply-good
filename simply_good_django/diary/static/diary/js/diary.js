/**
 * Created by student on 11/8/14.
 */


//function myFunction() {
//    var x = document.getElementsByClassName("wf-count");
//    var wf_total = document.getElementsByClassName('wf-count').length;
//    var date_value = document.getElementById('date-test').value;
//    x[0].innerHTML = wf_total;
//}


$(document).ready(function() {
    //ajax to add portion
//    function getCookie(name) {
//        var cookieValue = null;
//        if (document.cookie && document.cookie != '') {
//            var cookies = document.cookie.split(';');
//            for (var i = 0; i < cookies.length; i++) {
//                var cookie = jQuery.trim(cookies[i]);
//                // Does this cookie string begin with the name we want?
//                if (cookie.substring(0, name.length + 1) == (name + '=')) {
//                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                    break;
//                }
//            }
//        }
//        return cookieValue;
//    }
//    var csrftoken = getCookie('csrftoken');
//
//    function csrfSafeMethod(method) {
//        // these HTTP methods do not require CSRF protection
//        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
//    }
//
//    $.ajaxSetup({
//        beforeSend: function(xhr, settings) {
//            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
//                xhr.setRequestHeader("X-CSRFToken", csrftoken);
//            }
//        }
//    });
//

    // adding ajax request
    function addDate(date, userId) {
        	$.ajax({
                "method": "GET",
                "url": "/diary/get_date",
                "data": {"date": date, "userId": userId},
                "success": function (data) {
                }
            });
    }

    // event handler for changing date and ajax request
    $("#left-cal").click(function () {
        var date = dateGroom();
        var userId = getUserId();
        return addDate(date, userId);
    });

    $("#right-cal").click(function () {
        var date = dateGroom();
        var userId = getUserId();
        return addDate(date, userId);
    });

    $("#date-btn").click(function () {
        var date = dateGroom();
        var userId = getUserId();
        return addDate(date, userId);
    });

    //draws portion elements on click
    $(".add-portion-wf").click(function () {
        $("#diary-wf").append("<li><span class='ionicons ion-ios7-tennisball-outline wf-portion'></span></li>");
    });
    $(".add-portion-pf").click(function () {
        $("#diary-pf").append("<li><span class='ionicons ion-ios7-tennisball-outline pf-portion'></span></li>");
    });
    //TO DO: add a Python Counter() and an if statement to format; pop ups for goals achieved

    //capture number of portion elements
    function portionCount() {
        wf_total = document.getElementsByClassName('wf-portion').length;
        pf_total = document.getElementsByClassName('pf-portion').length;
        notes_total = document.getElementById("notes").value;
    }

    //extract user pk from current url
    function getUserId () {
        var url = window.location,
        splitUrl = url.toString().split("/");
        return splitUrl[4];
    }

    //capture date information and turn into ISO format
    function dateGroom() {
        var active_date = document.getElementById('date-cal').innerHTML;
        var active_year = document.getElementById('year-cal').innerHTML;
        var active_date_array = active_date.split(" ");
        var active_month = active_date_array[0];
        if (active_date_array[1].length > 3) {
            var active_day = active_date_array[1].substring(0, 2);
        }
        else {
            var active_day = "0" + active_date_array[1].substring(0, 1);
        }
        var monthmatch = {
            January: "01",
            February: "02",
            March: "03",
            April: "04",
            May: "05",
            June: "06",
            July: "07",
            August: "08",
            September: "09",
            October: 10,
            November: 11,
            December: 12
        };

        var monthnum = monthmatch[active_month];
        // TO DO --- determine if date needs to be a particular data type
        return active_year + "/" + monthnum + "/" + active_day
    }
    // test calendar
    $('.date-picker').each(function () {
        var $datepicker = $(this),
            cur_date = ($datepicker.data('date') ? moment($datepicker.data('date'), "YYYY/MM/DD") : moment()),
            format = {
                "weekday": ($datepicker.find('.weekday').data('format') ? $datepicker.find('.weekday').data('format') : "dddd"),
                "date": ($datepicker.find('.date').data('format') ? $datepicker.find('.date').data('format') : "MMMM Do"),
                "year": ($datepicker.find('.year').data('year') ? $datepicker.find('.weekday').data('format') : "YYYY")
            };

        function updateDisplay(cur_date) {
            $datepicker.find('.date-container > .weekday').text(cur_date.format(format.weekday));
            $datepicker.find('.date-container > .date').text(cur_date.format(format.date));
            $datepicker.find('.date-container > .year').text(cur_date.format(format.year));
            $datepicker.data('date', cur_date.format('YYYY/MM/DD'));
            $datepicker.find('.input-datepicker').removeClass('show-input');
        }

        updateDisplay(cur_date);

        $datepicker.on('click', '[data-toggle="calendar"]', function (event) {
            event.preventDefault();
            $datepicker.find('.input-datepicker').toggleClass('show-input');
        });

        $datepicker.on('click', '.input-datepicker > .input-group-btn > button', function (event) {
            event.preventDefault();
            var $input = $(this).closest('.input-datepicker').find('input'),
                date_format = ($input.data('format') ? $input.data('format') : "YYYY/MM/DD");
            if (moment($input.val(), date_format).isValid()) {
                updateDisplay(moment($input.val(), date_format));
            } else {
                alert('Invalid Date');
            }
        });

        $datepicker.on('click', '[data-toggle="datepicker"]', function (event) {
            event.preventDefault();

            var cur_date = moment($(this).closest('.date-picker').data('date'), "YYYY/MM/DD"),
                date_type = ($datepicker.data('type') ? $datepicker.data('type') : "days"),
                type = ($(this).data('type') ? $(this).data('type') : "add"),
                amt = ($(this).data('amt') ? $(this).data('amt') : 1);

            if (type == "add") {
                cur_date = cur_date.add(date_type, amt);
            } else if (type == "subtract") {
                cur_date = cur_date.subtract(date_type, amt);
            }

            updateDisplay(cur_date);
        });

        if ($datepicker.data('keyboard') == true) {
            $(window).on('keydown', function (event) {
                if (event.which == 37) {
                    $datepicker.find('span:eq(0)').trigger('click');
                } else if (event.which == 39) {
                    $datepicker.find('span:eq(1)').trigger('click');
                }
            });
        }
    });
});

