$(function() {
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="main-message" data-id="${message.id}">
                 <div class="main-message__upper-info">
                   <p class ="main-message__upper-info__talker">
                     ${message.user_name}
                    </p>
                    <p class="main-message__upper-info__date">
                      ${message.created_at}
                    </p>
                  </div>
                  <p class="message__text__content">
                    <div>
                    ${content}
                    </div>
                    ${img}
                    </p>
                  </div>`
  return html;
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault()
    var message = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
  // append = 指定した要素の最後にHTML要素を追加できる
      $('.main-middle').append(html);
  // メッセージコンテントの中身を空にする
      $('#message_content').val('');
  // メッセージを追加したら、メッセージの最下部まで自動でスクロールするようにする
      $('.main-middle').animate({ scrollTop: $('.main-middle')[0].scrollHeight});
      return false;
    })
    .fail(function() {
      alert('エラーが発生したため送信できませんでした');
    })
    .always(function(data){
      $('.input-submit-btn').removeAttr('disabled');
    })
  })
   // ここより上はインクリメンタルサーチの記述.下は自動更新


  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    //dataメソッドで.main-middleにある:last,最後のカスタムデータ属性を取得しlast_message_idに代入。
      var last_message_id = $('.main-message:last').data("id");
      $.ajax({
        //ルーティングで設定した/groups/id番号/api/messagesとなるよう文字列を書く
        url: "api/messages",
        //httpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
        
      })
      .done(function(messages) {//通信成功したら、controllerから受け取ったデータ（messages)を引数にとって行う
        var insertHTML = ''; //追加するHTMLの入れ物を作る
        messages.forEach(function (message) {//配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせ
          insertHTML = buildHTML(message);
          $('.main-middle').append(insertHTML);//メッセージを追加
        })
        $('.main-middle').animate({sctollTop: $('.main-middle')[0].scrollHeight}, 'fast');//最新のメッセージが一番下に表示されようにスクロールする。
      })
      .fail(function() {
        alert('失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 5000);
});