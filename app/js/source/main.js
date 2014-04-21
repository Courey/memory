(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('#animate').click(animate);
    $('#start').click(loadBoard);
    $('.grid').click(flip);
  }

  var countdown = 600;
  var longerRandom = [];
  var imageNumber = [];
  var click = 0;
  var timer;


  function loadImg(){
    var $tableInfo = $('tbody > tr > td > .grid');
    $tableInfo.append('<img>');
    $tableInfo.append('<img>');
  }

  function loadBoard(){
    clearImages();
    loadImg();
    addImgClass();
    randomImage();
    timerReset();
    updateTimer();
  }

  function timerReset(){
    clearInterval(timer);
    countdown = 60;
    $('#countdown').css('background-color', 'rgba(37, 68, 134, 0.88)');
    timer = setInterval(updateTimer, 1000);
  }

  function updateTimer(){
    $('#countdown').text(countdown);
      if (countdown < 11 && countdown > 0){
        $('#countdown').css('background-color', 'rgba(227, 17, 17, 0.84)');
        countdown --;
      }
      else if(countdown === 0){
        clearImages();
        alert('You loose!');
        clearInterval(timer);
      }
      else{
        countdown --;
      }
  }

  function clearImages(){
    $('.grid').removeClass('match selected rotate');
    $('img').remove();
    longerRandom = [];
  }

  function addImgClass(){
    $('tbody > tr > td > .grid > img:nth-child(1)').addClass('back');
    $('tbody > tr > td > .grid > img:nth-child(2)').addClass('front');
    $('tbody > tr > td > .grid > img.back').attr('src','./media/back.png');
  }

  function randomImage(){
    randomNumGen();
    var $gameArray = $('tbody > tr > td > .grid > img.front');
    for(var i = 0; i < 20; i++){
      $($gameArray[i]).attr('src', './media/' + longerRandom[i] + '.jpeg');
    }
  }

  function randomNumGen(){
    var random = [];
    var secondRandom = [];
    for(var i = 1; i < 11; i++){//changed 21 to 11
      random.push(i);
      secondRandom.push(i);
    }
    longerRandom = random.concat(secondRandom);
    longerRandom.sort(function() {
      return 0.5 - Math.random();
    });
  }

  function flip(){
    click ++;
    $(this).toggleClass('rotate selected');
    var selectedImage = $(this).children('.front');
    var source = selectedImage.attr('src');
    var sourceArray = source.split('/');
    var parsedNumber = parseInt(sourceArray[2]);
    imageNumber.push(parsedNumber);
    if(click === 2){
      click = 0;
      matchCheck();
    }
  }

  function matchCheck(){
    var winCheck = $('.match').length;

    if(imageNumber[0] !== imageNumber[1]){
      setTimeout(function(){
        $('.selected:not(.match)').toggleClass('rotate');
        $('.selected').toggleClass('selected');
      }, 1000);

      imageNumber = [];
    }else{
      $('.selected').addClass('match');
      imageNumber = [];
    }

    if(winCheck === 18){
      alert('You win!');
      clearInterval(timer);
    }
  }

  function animate(){
    $('.grid').toggleClass('rotate');
  }





})();
