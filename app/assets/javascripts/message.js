
$(function(){
  i = 0;
  function buildMessage1(message, pic){
    var html = `<div class="message-box" id = "${message.id}" value = "${message.body}">
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">
                      ${message.name}
                    </p>
                    <p class="message__upper-info__date">
                      ${message.date}
                    </p>
                  </div>
                    <p class="message__text">
                    </p><p class="lower-message__content">
                      ${message.body}
                    </p>
                      ${pic}
                    <p></p>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var pic = message.image.url ? `<img class="lower-message__image" src="${message.image.url}" alt="Ph thumb"></img>` : '';
      var html = buildMessage1(message, pic); 
      $('.messages').append(html);
      $('form').get(0).reset();
      $('html, body').animate({
        scrollTop: $(document).height()
      },2000);
      return false;
    })
    .fail(function(){
      alert('error');
    })
    .always(() => {
      $(".submit-btn").removeAttr("disabled");
    });
  });

    var buildMessageHTML = function(message, pic) {
        //data-idが反映されるようにしている
        var html = `<div class="message-box" id = "${message.id}"value = "${message.text}">
                      <div class="message__upper-info">
                        <p class="message__upper-info__talker">
                          ${message.name}
                        </p>
                        <p class="message__upper-info__date">
                          ${message.created_at}
                        </p>
                      </div>
                        <p class="message__text">
                        </p><p class="lower-message__content">
                          ${message.text}
                        </p>
                          ${pic}
                        <p></p>
                    </div>`
      return html;
    }
    var buildtopHTML = function(message, group_id, group_name) {
      var html= `
                  <p class="group__group-name"><a data-method="get" href="/groups/${group_id}/messages">${group_name}</a><span></span></p>
                  <p class="group__latest-name"><a data-method="get" href="/groups/19/messages">${message}</a><span></span></p>
                `
      return html;
    }
  var reloadMessages = function(message, group_id, group_name){
    last_message_id = $('.message-box').last().attr('id');
    last_message_text = $('.message-box').last().attr('value');
    group_id = $('.main-header__left-box__current-group').attr('id');
    group_name = $('.main-header__left-box__current-group').attr('value');

    $.ajax({
      url: '/groups/' + group_id + '/api/messages',
      type: 'get',
      dagaType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      insertHTML = [];
      topHTML = [];
      $('#group'+group_id).empty();
      console.log(group_id);
      topHTML = buildtopHTML(last_message_text, group_id, group_name);
      $('#group'+group_id).append(topHTML);
      topHTML = "";
      messages.forEach(function(message){
        var pic = message.image.url ? `<img class="lower-message__image" src="${message.image.url}" alt="Ph thumb"></img>` : '';
        insertHTML[i] = buildMessageHTML(message, pic); 
        if(message.text == null){ message = "画像が投稿されています"};
        if(last_message_id < message.id){
          $('.messages').append(insertHTML[i]);
          i = i + 1;
          $('html, body').animate({
            scrollTop: $(document).height()
          },2000);
        };
        var pic = "";
      })
    })
    .fail(function(){
      console.log('error');
    });
  };
  setInterval(reloadMessages, 800);
});

