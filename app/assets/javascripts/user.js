$(function() {
  function appendUser(user){
    
    var html = `
                <div class = "search-box" id = "${user.id}" value = "${user.id}">
                  <div class="chat-group-user clearfix">
                    <p class="chat-group-user__name" id = "${user.id}name">${ user.name }</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="60" data-user-name="ll" id = "${user.id}">追加</a>
                  </div>
                </div>
                `
    return html;
    }

  function appendMsg(){
    var html = `
                <div class = "search-box" id = "noname">
                  <div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">人物はいません</p>
                  </div>
                </div>
               `
    return html;
  }

  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url:  '/users',
      data: { keyword: input },
      dataType: 'json'
    })  
    .done(function(users){
      $(".search-box").remove();
      if(users.length !== 0) {
        users.forEach(function(user){
          $('#user-search-result').append(appendUser(user));
        })
        if($("#user-search-field").val() == ""){
          $(".search-box").remove();
        }
      }else{
          $('#user-search-result').append(appendMsg());
      }

      if($("#user-search-field").val() != ""){
        if($('.search-box').attr("id") != "noname"){
          addcount = $('.search-box').length;
          delcount = $('.chat-group-menber').length;
          adddata = [];
          deldata = [];
          for ( i = 0;  i < addcount;  i++  ){
            adddata[i] = $('.search-box').eq(i).attr("value");
            for ( k = 0;  k < delcount;  k++  ){
              deldata[k] = $('.chat-group-menber').eq(k).attr("value");
              if(adddata[i] == deldata[k]){
                console.log("OK");
                //$('.search-box').eq(i).remove();
              };
            };
          };
        };
      };
    })
    .fail(function(){
      alert('検索に失敗しました');
    })
  });
});

function appendAdd(name, boxid){
  var html2 = `<div class='chat-group-user' id = "${boxid}name3" value = "${boxid}">
                <input name='group[user_ids]][]' type='hidden' value='${boxid}'>
                <p class='chat-group-user__name'>
                ${name}
                </p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' id = "${boxid}name3">削除</div>
              </div>`
  return html2
}

$(function() {
  $(document).on('click', '.user-search-add', function(e){
    e.preventDefault();
    var boxid = $(this).attr("id");  
    var add = appendAdd($("#"+boxid+"name").text(), boxid);
    $(".chat-group-menber2").append(add);
    $("#" + boxid).remove();
    //$("#" + boxid).unwrap();
    });
  });

$(function() {
  $(document).on('click', '.user-search-remove', function(e){
    e.preventDefault();
    var boxid = $(this).attr("id");
    $('#'+boxid).remove();
    $('#'+boxid).unwrap();
    });
  });

