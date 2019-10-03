$(function(){
  function buildMessage1(message){
    var html1 = `<div class="message-box">
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
    return html1;
  }

  function buildMessage2(message){
    var html2 = `<div class="message-box">
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
                    <img class="lower-message__image" src="${message.image.url}" alt="Ph thumb"></img>
                    <p></p>
                </div>`
    return html2;
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
      if (message.image.url == null){
        var html1 = buildMessage1(message); 
        $('.messages').append(html1);
        $('#message_body').val('');
        console.log("画像なし投稿OK");
      } else{
        var html2 = buildMessage2(message); 
        $('.messages').append(html2);
        $('#message_body').val('');
        console.log("画像あり投稿OK");
      }
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

