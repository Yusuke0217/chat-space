# 左の変数に、右の値を代入するイメージ
json.id @message.id
json.content @message.content
json.user_name @message.user.name
json.image @message.image.url
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")