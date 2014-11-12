/**
 * Created by student on 11/8/14.
 */

//function myFunction() {
//    var x = document.getElementsByClassName("wf-count");
//    var wf_total = document.getElementsByClassName('wf-count').length;
//    x[0].innerHTML = wf_total;
//}


$(document).ready(function() {
    //ajax to add portion
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

    function addPortion (foodId) {
        $.ajax({
            type: "POST",
            url: "/diary/",
            data: {"foodId": foodId, "vote": "up"},
            success: function (data) {
                $("#blog-vote-up-" + foodId).show();
                $("#blog-vote-down-" + foodId).hide();
                $("#upvotes").html(data.votes)
            }
        });
        return false;
}

    $(".add-portion-whole-foods").click(function () {
        var foodId = parseInt(this.id.split("-")[3]);
        if (this.id.split("-")[2] === "add") {
            return addPortion(foodId);
        }
    });



    $(".add-portion-whole-foods").click(function () {
        $("#diary-whole-foods").append("<li><span class='ionicons ion-ios7-tennisball-outline wf-count'></span></li>");
    });
    $(".add-portion-other").click(function () {
        $("#diary-other").append("<li><span class='ionicons ion-ios7-tennisball-outline'></span></li>");
    });

//add a Python Counter() and an if statement to format; pop ups for goals achieved

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