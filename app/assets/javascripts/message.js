$(function(){
  function buildMessage(message){
    var html = `<div class="message-box">
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
      var html = buildMessage(message); 
      $('.messages').append(html);
      $('#message_body').val('');
      console.log("投稿OK");

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
});

