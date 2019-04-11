
$(document).ready(function() {
    const url = "https://randomuser.me/api/?results=12&nat=us";
    const callback = function(data) {
      $('main').prepend(createSearchInput());
      $('.employees').html(createListOfSmallCards(data.results));
      $('.gallery').html(createListOfBigCards(data.results) + createGalleryButtons());
      $('.gallery .big-cards .big-card').each(function() {
        $(this).hide();
      });
      $('.gallery').hide();
    };
    $.getJSON(url, callback);
  });
  
  const createSearchInput = function() {
    let html = '<div class="employee-search">';
    html += `<input type="text" placeholder="Search employees"/>`;
    html += `</div>`;
    return html;
  };
 
  const createListOfSmallCards = function(dataArray) {
    let html = `<ul class="small-cards" >`;
    dataArray.forEach(function(employee){
      html += `<li class="small-card">`;
      html += `<img src="${employee.picture.large}" alt="Employee profile picture"/>`;
      html += `<div class="brief-info">`;
      html += `<p class="name">${employee.name.first} ${employee.name.last}</p>`;
      html += `<p class="email">${employee.email}</p>`;
      html += `<p class="city">${employee.location.city}</p>`;
      html += `<p class="username" style="display: none">${employee.login.username}</p>`;
      html += `</div>`;
      html += `</li>`;
    });
    html += `</ul>`;
    return html;
  };
  
 const createListOfBigCards = function(dataArray) {
    let html = `<ul class="big-cards">`; //style="display: none"
    dataArray.forEach(function(employee){
      html += `<li class="big-card">`;
      html += `<button class="button close-button">x</button>`;
      html += `<img src="${employee.picture.large}" alt="Employee profile picture"/>`;
      html += `<div class="brief-info">`;
      html += `<p class="name">${employee.name.first} ${employee.name.last}</p>`;
      html += `<p class="email">${employee.email}</p>`;
      html += `<p class="city">${employee.location.city}</p>`;
      html += `</div>`;
      html += `<div class="extended-info">`;
      html += `<p class="phone">${employee.phone}</p>`;
      html += `<p class="address">${employee.location.street}, ${employee.location.state} ${employee.location.postcode}</p>`;
      html += `</div>`;
      html += `</li>`;
    });
    html += `</ul>`;
    return html;
  };
  

  const createGalleryButtons = function() {
    let html = `<div class="nav-buttons">`;
    html +=  `<button class="button nav-button"><</button>`;
    html += `<button class="button nav-button">></button>`;
    html += `</div>`;
    return html;
  };
  
  $('.employees').on('click', '.small-card', function(event) {
    if( $(event.currentTarget).attr('class').includes("small-card") ) {
      $('.gallery').show();

      $('.big-card').each(function() {
        const nameOnBigCard = $(this).children('.brief-info').children('.name').text();
        const nameOnSmallCard = $(event.currentTarget).children('.brief-info').children('.name').text();
        if( nameOnBigCard === nameOnSmallCard ) {
          $(this).show();
          return;
        }
      });
    }
  });
  
  $('.gallery').on('click', function(event) {

    if( $(event.target).attr('class').includes("close-button") ) {
      $('.gallery').fadeOut();
      $(event.target).parent().fadeOut();
    } else if( $(event.target).attr('class').includes("nav-button") ) {
      const $currentCard = $('.big-card[style=""]');
      const $leftCard = $($currentCard).prev();
      const $rightCard = $($currentCard).next();
     
      if( $(event.target).text() === '<' && $leftCard.length > 0) {
        $($currentCard).hide();
        $($leftCard).show();

      } else if ( $(event.target).text() === '>' && $rightCard.length > 0 ) {
        $($currentCard).hide();
        $($rightCard).show();
      }
    }
  });
 
  $('main').on('keyup', 'input', function(event) {
    
    if( $(this).val() === "" ) {
      $('.small-card').each(function(event) {
        $(this).show();
      });
    }
    
    else if((event.which >= 33 && event.which <= 222) || event.which === 8
    && $(event.target).val().length > 0) {
     
      const inputText = $(event.target).val().toLowerCase();
    
      $('.small-card').each(function() {
        const $employeeName = $(this).children('.brief-info').children('.name').text();
        const $employeeUserName = $(this).children('.brief-info').children('.username').text();
        
        if(!$employeeName.includes(inputText) && !$employeeUserName.includes(inputText)) {
          $(this).fadeOut(200);
        
        } else {
          $(this).fadeIn(200);
        }
      });
    }
  });
  