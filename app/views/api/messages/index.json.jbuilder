json.array! @messages do |message|
  json.content message.content
  json.image message.image.url
  json.created_at message.created_at.strftime("%Y/%m/%d %H:%M")
  # 左がカラム右が式展開の値
  json.user_id message.user.name
  json.id message.id
end