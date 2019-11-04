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
})