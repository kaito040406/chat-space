$(function(){
  function buildMessage1(message, pic){
    var html = `<div class="message-box" id = "${message.id}">
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

    var buildMessageHTML = function(message) {
      if (message.content && message.image.url) {
        //data-idが反映されるようにしている
        var html = '<div class="message" data-id=' + message.id + '>' +
          '<div class="upper-message">' +
            '<div class="upper-message__user-name">' +
              message.user_name +
            '</div>' +
            '<div class="upper-message__date">' +
              message.created_at +
            '</div>' +
          '</div>' +
          '<div class="lower-message">' +
            '<p class="lower-message__content">' +
              message.content +
            '</p>' +
            '<img src="' + message.image.url + '" class="lower-message__image" >' +
          '</div>' +
        '</div>'
        }else if (message.content) {
          //同様に、data-idが反映されるようにしている
          var html = '<div class="message" data-id=' + message.id + '>' +
            '<div class="upper-message">' +
              '<div class="upper-message__user-name">' +
                message.user_name +
              '</div>' +
              '<div class="upper-message__date">' +
                message.created_at +
              '</div>' +
            '</div>' +
            '<div class="lower-message">' +
              '<p class="lower-message__content">' +
                message.content +
              '</p>' +
            '</div>' +
          '</div>'
      }else if (message.image.url) {
        //同様に、data-idが反映されるようにしている
        var html = '<div class="message" data-id=' + message.id + '>' +
          '<div class="upper-message">' +
            '<div class="upper-message__user-name">' +
              message.user_name +
            '</div>' +
            '<div class="upper-message__date">' +
              message.created_at +
            '</div>' +
          '</div>' +
          '<div class="lower-message">' +
            '<img src="' + message.image.url + '" class="lower-message__image" >' +
          '</div>' +
        '</div>'
      };
      return html;
  }


  var reloadMessages = function(){
    last_message_id = $('.message-box').last().attr('id');
    console.log(last_message_id);
    var urldata = "groups/" + last_message_id;
    $.ajax({
      url: urldata,
      type: 'GET',
      dagaType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      console.lod('success');
    })
    .fail(function(){
      console.log('error');
    });
  };
  setInterval(reloadMessages, 5000);
});

