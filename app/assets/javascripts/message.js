$(function(){
  function buildMessage1(message, pic1,pic2,pic3){
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
                      ${pic1}${pic2}${pic3}
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
      if (message.image.url == null){
        var pic1 = ''
        var pic2 = ''
        var pic3 = ''
      }else{
        var pic1 = '<img class="lower-message__image" src="'
        var pic2 = message.image.url
        var pic3 = '" alt="Ph thumb"></img>'
      }
      var html = buildMessage1(message, pic1,pic2,pic3); 
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
});

