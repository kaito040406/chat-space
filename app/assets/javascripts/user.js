$(function() {
  function appendUser(user){
    
    var html = `
                <div class = "search-box" id = "${user.id}name2" value = "${user.id}">
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
 
        if($(".chat-group-user").attr("value") == $(".search-box").attr("value")){
          $(".search-box","#" + $(".search-box").attr("value")).remove();
        }
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


function appendAdd(name, boxid3,boxid4){
  var html2 = `<div class='chat-group-user' value = "${boxid3}">
                <input name='group[user_ids][${boxid3}]' type='hidden' value='${boxid4}'>
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
    var boxid4 = $(this).attr("id") + "name2";
    var boxid3 = $(this).attr("id")
    console.log(boxid3)
    var name = $("#"+boxid1).text();
    $.ajax({
      type: 'GET',
      url:  '/users',
      data: { id: boxid3 },
      dataType: 'json'
    }) 
    .done(function(user){
      var add = appendAdd(name, boxid3, boxid4);
      $(".chat-group-form__search").append(add);
      $(boxid2).remove();
      $(boxid2).unwrap();
    });
  });
});

