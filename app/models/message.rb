class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  valodates :content, presence: true, unless: :image?

  mount_uploader  :image, ImageUploader
end
