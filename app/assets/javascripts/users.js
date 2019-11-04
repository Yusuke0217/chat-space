$(function() {
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
        console.log("成功です");
      })
      .fail(function() {
        console.log("失敗です");
      });
  });
});