/**
 * Created by student on 10/24/14.
 */
$(document).ready(function() {
    $(".add-portion-veg").click( function(){
           $("#diary-veg").append("<li><span class='ionicons ion-ios7-tennisball-outline'></span></li>");
    });
    $(".add-portion-pro").click( function(){
           $("#diary-pro").append("<li><span class='ionicons ion-ios7-tennisball-outline'></span></li>");
    });
    $(".add-portion-fru").click( function(){
           $("#diary-fru").append("<li><span class='ionicons ion-ios7-tennisball-outline'></span></li>");
    });
    $(".add-portion-other").click( function(){
           $("#diary-other").append("<li><span class='ionicons ion-ios7-tennisball-outline'></span></li>");
    });
//add a counter and if statement to format; pop ups for goals achieved
});