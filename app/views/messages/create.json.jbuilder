json.name @message.user.name
json.body @message.body
json.date @message.created_at.strftime("%Y/%m/%d %H:%M")
json.image @message.image