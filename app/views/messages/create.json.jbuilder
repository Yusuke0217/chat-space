# 右のカラム名を、jsonがjsのテンプレートリテラルの、式展開のところにjson名で持っていく。
json.id @message.id
json.content @message.content
json.user_id @message.user_id
json.image @message.image.url
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")
json.id @message.id