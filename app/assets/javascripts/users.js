$(function() {
  function appendUser(user) {
  var html = 
              `
              <div class="chat-group-user clearfix">
                <input name='group[user_ids][]' type='hidden' value='ユーザーのid'>
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
              </div>
              `;
            $("#user-search-result").append(html);
  }

  function appendErrMsgToHTML() {
    var html = `
          <div class="chat-group-user clearfix">
            <p class="chat-group-user__name">ユーザーが見つかりません</p>
          </div>
          `;
          $("#user-search-result").append(html);
  }

  function addDeleteUser(name, id) {
    let html = `
    <div class="chat-group-user clearfix" id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <input value="${id}" name="group[user_ids][]" type="hidden" id="group_user_ids_${id}" />
      <div class="chat-group-user__btn--remove chat-group-user__btn" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    // $(".js-chat-member").append(html);
    $(".js-add-user").append(html);
  } 


  function addMember(userid) {
    let html = `<input value="${userid}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userid}" />`;
    $(`#${userid}`).append(html);
  }


  // ここより上はテンプレートリテラル



// 検索入力のタグである #user-search-field を指定しjQueryオブジェクトを取得します。「テキストフィールドに文字が入力されるたびにイベントを発火させるメソッド」はkeyupとし、入力するためにキーが押された後、上がるタイミングで処理が実行されるようにします。
  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();
    
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input},
      dataType: 'json'
    })
      .done(function(users) { 
        // usersにjson形式のuser変数が代入される。複数形なので配列型で入ってくる
        $('#user-search-result').empty();
        
        // if (input.length === 0) {  // フォームの文字列長さが0であれば、インクリメンタルサーチ結果を表示しないようにする
        //   $('#user-search-result').empty();
        // }
        
        if (users.length !== 0) { // user達の数が0では無い時
          users.forEach(function(user){ // users情報をひとつずつとりだしてuserに代入
            appendUser(user)
          });
        } else if (input.length == 0) {
          return false;
        }else {
          appendErrMsgToHTML();
        }
      })
      .fail(function() {
        alert("失敗です");
      });
  });

//".chat-group-user__btn--add"がクリックされたらイベント発火！
// let 変数名 イベント内容 dataの中身の値を取得
  $(document).on('click', ".chat-group-user__btn--add", function() {
    let uname = $(this).data("user-name");
    let uid = $(this).data("user-id");
    $(this).parent().remove();
    addDeleteUser(uname, uid);
    addMember(userid)
  });
  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this).parent().remove();
  });
});
