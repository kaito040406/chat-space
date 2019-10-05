$(function() {

  function appendUser(user){
    
    var html = `
                <div class = "search-box" id = "${user.id}name2">
                  <div class="chat-group-user clearfix">
                    <p class="chat-group-user__name" id = "${user.id}name1">${ user.name }</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="60" data-user-name="ll" id = "${user.id}">追加</a>
                  </div>
                </div>
                `
    return html;
    }

  function appendMsg(){
    var html = `
                <div class = "search-box">
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
      $(".search-box").empty();
      if(users.length !== 0) {
        users.forEach(function(user){
          $('#user-search-result').append(appendUser(user));
        })
      }
      else{
        $('#user-search-result').append(appendMsg());
      }
    })
    .fail(function(){
      alert('検索に失敗しました');
    })
  });
});


function appendAdd(user,name){
  var html2 = `<div class='chat-group-user'>
                <input name='group[user_ids][]' type='hidden' value='ユーザーのid'>
                <p class='chat-group-user__name'>${name}</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
              </div>`
  return html2
}


$(function() {
  $(document).on('click', '.user-search-add', function(e){
    e.preventDefault();
    var boxid1 = $(this).attr("id") + "name1";
    var boxid2 = "#" + $(this).attr("id") + "name2";
    var name = $("#"+boxid1).text();
    console.log(boxid1);
    console.log(name);
    $.ajax({
      type: 'GET',
      url:  '/users',
      dataType: 'json'
    }) 
    .done(function(user){
      var add = appendAdd(user,name);
      $(".chat-group-form__search").append(add);
      $(boxid2).empty();
    });
  });
});

