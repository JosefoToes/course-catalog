var domain = 'https://hpe.sabacloud.com/Saba/Web_spf/HPE/common/ledetail/000';
var domain2 = 'https://hpe-external.sabacloud.com/Saba/Web_spf/HPE/common/ledetail/000';
var valueslist = document.getElementsByClassName('valueslist');
var vs = document.querySelectorAll('.valueslist');
var content = document.getElementById('content');
var title;
var turn;
var filteredValues;
var whiledo;
var year;
var month;
var confdnt;
var audience;
var link;
var btn;
var newkeywords;
var ltype;
var whites = document.getElementsByClassName('white');
var clocks = document.getElementsByClassName("clock");
var categ = document.getElementsByClassName("category");
var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function filterCustom(custom, btn){
  for (i=0;i<whites.length;i++) {
    whites[i].classList.remove('active');
  }
  for (i=0;i<valueslist.length;i++) {
    if(valueslist[i].classList.contains(custom)){
      valueslist[i].style.display = 'block'; 
    }else{
      valueslist[i].style.display = 'none'; 
    }
  }
  document.getElementById(btn).classList.add('active');
}
function showall(){
  for(i=values.length-1;i>=0;i--){
    if(values[i].id === 'no'){
      link = '\''+domain2+'/'+values[i].url+'\'';
    }else{      
      link = '\''+domain+'/'+values[i].id+'\'';
    }
    if(values[i].info[0] == 'special'){
      ltype = 'special'
    }else{
      ltype = '';
    }
      if(values[i].private){
      confdnt = 'initial';
      // link = 'style="cursor: not-allowed;"';
      // btn = 'disabled';      
      btn = 'active';
      audience = 'private';
    }else{      
      confdnt = 'none';
      btn = 'active';
      audience = 'public';
    }
    month = months[new Date(values[i].date_created).getMonth()];
    year = new Date(values[i].date_created).getFullYear().toString();
    document.getElementById('courses_list').innerHTML += '<div class="col-10 col-sm-5 col-md-3 valueslist '+audience+' '+ltype+'" id="v'+i+'"><span class="category" style="display:'+confdnt+';">Private</span><figure><a href='+link+' target="_blank"><img src="img/'+values[i].img_min+'" alt="Hero image"></a><figcaption><a href='+link+' target="_blank"><h3>'+values[i].title+'</h3></a></figcaption></figure></div>';
    newkeywords = values[i].title.split(' ');
    values[i].keywords = newkeywords.concat(values[i].info);
    values[i].keywords.push(month, year, month + ', ' + year, audience);
    values[i].keywords.forEach(function(keyword){
      if(keyword == 'public'){
        values[i].keywords.push('public courses');
      }
      if(keyword == 'private'){
        values[i].keywords.push('private courses');
      }
    });
  }
  // btn4.innerHTML = play_icon;
  btn2.focus();
  filterCustom('public', 'btn2');
}
function openall(){
  for(i=values.length-1;i>=0;i--){
    if(values[i].id != 'no'){
      window.open(domain+'/'+values[i].id);
    }else{
      window.open(domain2+'/'+values[i].url);
    }
  }
}
function unhideall(){
  for (i=0;i<whites.length;i++) {
    whites[i].classList.remove('active');
  }
  for (i=0;i<valueslist.length;i++) {
    valueslist[i].style.display = 'block'; 
  }
  document.getElementById('btn3').classList.add('active');
}
function checkValue(keyword){
  return filter.value.toLowerCase() == keyword.toLowerCase();
}
function filterBoxes(){
  for (i=0;i<whites.length;i++) {
    whites[i].classList.remove('active');
  }
  whiledo = 0;
  var itxt = filter.value.toLowerCase();
  for(i=values.length-1;i>=0;i--){   
    turn = document.getElementById('v'+ i);
    while(itxt == '' && whiledo == 0){
      unhideall();
      whiledo ++;
    }
    values[i].keywords.forEach(function(keyword) {
      while (itxt != keyword && whiledo == 0) {
        turn.style.display = 'block';
        whiledo++;
      }
    });
    filteredValues = values[i].keywords.filter(checkValue);
    if(filteredValues.length >= 1){
      turn.style.display = 'block';
    }else if(filteredValues.length <= 0){
      turn.style.display = 'none';
    }
  }
  location.hash = '#msites';
  filter.focus()
}; 
function toggletime(){
  if(timezones_container.style.display == 'grid'){
    timezones_container.style.display = 'none';
    clock_icon_par.style.opacity = '0.3';
  }else{
    timezones_container.style.display = 'grid';
    clock_icon_par.style.opacity = '1';
  }
}
function openvideo(){
  content.innerHTML = introvideo.innerHTML;
  openfeedback();
}
function opencontact(){
  content.innerHTML = contactus.innerHTML;
  openfeedback();
}
function preview(cual){
  content.innerHTML = '<object data="'+cual+'" id="preview_obj"></object>';
  openfeedback();
}
function recommend(){
  content.innerHTML = recommendations.innerHTML;
  openfeedback();
}

function closefeed(){
  document.getElementById('content').innerHTML = '';
  document.getElementById('win_feedback').style.top = '0';
  document.getElementById('feedback').style.opacity = 0;
  document.getElementById('win_feedback').style.opacity = 0;
  setTimeout(function(){
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('win_feedback').style.display = 'none';
  },100);
}
function showclear(){
  // clear.style.opacity = 0;
  console.log('');
}
function clearinput(){
  filter.value = '';
  unhideall();
  clear.style.opacity = 0;
}
function openfeedback(){
  document.getElementById('feedback').style.display = 'block';
  document.getElementById('win_feedback').style.display = 'block';
  setTimeout(function(){
    document.getElementById('win_feedback').style.top = '10%';
    document.getElementById('feedback').style.opacity = 1;
    document.getElementById('win_feedback').style.opacity = 1;
  },50);
}
showall();

/* POP-OVER */
$(function () {
  $('[data-toggle="popover"]').popover({ 
    html : true, 
    content: function() {
      return $('#popover_content_wrapper').html();
    }
  });
});