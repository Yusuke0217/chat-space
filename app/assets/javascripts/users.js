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

  // function appendErrMsgToHTML(user) {
  //   var html = `
  //         <div class="chat-group-user clearfix">
  //           <p class="chat-group-user__name">${user}</p>
  //         </div>
  //         `;
  //         $("#user-search-result").append(html);
  // }

  function addDeleteUser(name, id) {
    let html = `
    <div class="ChatMember clearfix" id="${id}">
      <p class="ChatMember__name">${name}</p>
      <div class="ChatMember__remove ChatMember__button" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    $(".ChatMembers").append(html);
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
        
        // if (input.length === 0) {  // フォームの文字列長さが0であれば、インクリメンタルサーチ結果を表示しないようにする
        //   $('#user-search-result').empty();
        // }
        
        if (input.length !== 0) { // 値が等しくないもしくは型が等しくなければtrueを返す。
          $('#user-search-result').empty();
          users.forEach(function(user){ // users情報をひとつずつとりだしてuserに代入
            appendUser(user)
          });
        }
        else {
          appendErrMsgToHTML("一致するユーザーが見つかりません");
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
  });

});
