json.array! @messages do |message|
  json.content message.content
  json.image message.image.url
  json.created_at message.created_at.strftime("%Y/%m/%d %H:%M")
  # json.user_name左側が式展開に定義する値 message.user.name右側がカラム
  json.user_id message.user.name
  json.id message.id
end