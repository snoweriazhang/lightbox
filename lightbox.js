/* Lightbox example by Snoweria Zhang */

$(document).ready(function(){


	/*--------------------------------------------------
		OVERLAY ANIMATION
	----------------------------------------------------*/    

	$(function() {
		$(".overlay").css("opacity","0");
		$(".overlay").hover(
			function () {
				$(this).stop().animate({opacity: 1}, 200);
				$(this).css('height',$(this).parent().find('img').height());
			},
			function () {
				$(this).stop().animate({opacity: 0}, 200);
		});
	});


	/*--------------------------------------------------
		MODAL
	----------------------------------------------------*/   

	$id='';

    function showART(str){
		
		if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp=new XMLHttpRequest();
		}else{// code for IE6, IE5
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange=function(){
		  if (xmlhttp.readyState==4 && xmlhttp.status==200){
		  	$("#txtHint").html(xmlhttp.responseText);
		  	//position image
		  	$art_height=$('img.art').attr('height');
	   		$art_width=$('img.art').attr('width');
	    	$('img.art').css('left',360-$art_width/2).css('top',265-$art_height/2);
		  }
		  if (xmlhttp.readyState==1 || xmlhttp.readyState==2 || xmlhttp.readyState==3){
		  	$("#txtHint").html("<p class='alert'>Loading...<p>");
		  }
		  if (xmlhttp.status==404){
		  	$("#txtHint").html("<p class='alert'>Image not found.</p>");
		  }
		}
		xmlhttp.open("GET","getlist.php?q="+str,true);
		xmlhttp.send();

	}

	$('#modal').hide();
	
	//show modal on click
	$('ul li').click(function(){
		$id=this.id;
		showART($id);
		$('#modal').fadeIn(200);
	});
	
	//hide modal when area outside of modal is clicked
	$('#modal').click(function(event){
	    if (event.target == $('#modal').get(0)){
			$('#modal').fadeOut(200);
	    }
	    
    });
    
    //hide modal when close button is closed
    $('#close').click(function(){
	    $('#modal').fadeOut(500);
    });
    
    $('#prev').click(function(){
        $id=$('#'+$id).prevAll().not('.inactive').first().attr('id');
        if($id==undefined)
	        $id=$('ul li').not('.inactive').last().attr('id');
	    showART($id);
    });
    
    $('#next').click(function(){
        $id=$('#'+$id).nextAll().not('.inactive').first().attr('id');
        if($id==undefined)
	        $id=$('ul li').not('.inactive').first().attr('id');
	    showART($id);
    });

}); 
