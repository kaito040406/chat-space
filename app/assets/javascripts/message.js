
$(function(){
  i = 0;
  j = 0;
  k = 0;

  function buildMessage1(message, pic){
    var html = `<div class="message-box" id = "${message.id}" value = "${message.body}">
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker" value = "${message.name}">
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
    group_id = $('.main-header__left-box__current-group').attr('id');
    group_name = $('.main-header__left-box__current-group').attr('value');
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
      mshtml =null;
      mshtml = buildMessage1(message, pic); 
      $('.messages').append(mshtml);
      $('form').get(0).reset();
      $('#'+group_id).empty();
      if(message.body == ""){ message.body = "画像が投稿されています"};
      topHTML = buildtopHTML(message.body, group_id, group_name);
      $('#'+group_id).append(topHTML);
      topHTML = null;
      $('.messages').animate({
        scrollTop: $('.messages')[0].scrollHeight
      },600);
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
        var html = `<div class="message-box" id = "${message.id}" value = "${message.text}">
                      <div class="message__upper-info">
                        <p class="message__upper-info__talker" value = "${message.name}">
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
    path = location.pathname
    group_id = $('.main-header__left-box__current-group').attr('id');
    if (path == "/groups/" + group_id + "/messages"){
      last_message_id = $('.message-box').last().attr('id');
      last_message_text = $('.message-box').last().attr('value');
      last_message_name = $('.message__upper-info__talker').last().attr('value');
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

        if ($(".message-box").length != 0){
        //サイドバー自動更新はじまり
          $('#'+group_id).empty();
          if(last_message_text == ""){ last_message_text = "画像が投稿されています"};
          topHTML = buildtopHTML(last_message_text, group_id, group_name);
          $('#'+group_id).append(topHTML);
          topHTML = null;
        //サイドバー自動更新おわり
        }

        messages.forEach(function(message){
          var pic = message.image.url ? `<img class="lower-message__image" src="${message.image.url}" alt="Ph thumb"></img>` : '';
          insertHTML[i] = buildMessageHTML(message, pic); 
            if(last_message_id < message.id || last_message_id == null){
              console.log("自動更新アップデート発動");
              $('.messages').append(insertHTML[i]);
              la_ms = $('.message-box').last().attr('id');
              number = $('.message-box').length
                la_ms2 = $('.message-box').eq(number-2).attr('id');
                console.log(la_ms);
                console.log(la_ms2);
                if(la_ms == la_ms2){
                  if(last_message_id != null){
                    $('.message-box').last().remove();
                  }
                }
              i = i + 1;
              $('.messages').animate({
                scrollTop: $('.messages')[0].scrollHeight
              },600);
            };
          var pic = null;
        })
      })
      .fail(function(){
        alert('自動更新失敗');
      }); 
    }else{

    }
  };setInterval(reloadMessages, 1200);
});

