json.name @message.user.name
json.date @message.created_at.strftime("%Y/%m/%d %H:%M")

json.(@message, :body, :image)
json.id @message.id