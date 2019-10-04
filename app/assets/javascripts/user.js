$(function() {

  function appendUser(user){
    console.log("OK1")
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="60" data-user-name="ll">追加</a>
                </div>`
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
      if(users.length !== 0) {
        users.forEach(function(user){
          $('#user-search-result').append(appendUser(user));
          console.log("OK2");
        })
      }
      else{
        appendUser('そんな人間はござらん')
      }
    })
  })
})