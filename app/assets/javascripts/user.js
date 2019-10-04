$(function() {

  function appendUser(user){
    
    var html = `
                <div class = "search-box">
                  <div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${ user.name }</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="60" data-user-name="ll">追加</a>
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
      console.log("OK1");
      $(".search-box").empty();
      if(users.length !== 0) {
        users.forEach(function(user){
          $('#user-search-result').append(appendUser(user));
        })
      }
      else{
        console.log("OK1");
        $('#user-search-result').append(appendMsg());
      }
    })
    .fail(function(){
      alert('検索に失敗しました');
    })
  });
});