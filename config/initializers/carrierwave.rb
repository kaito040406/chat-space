require 'carrierwave/storage/abstract'
require 'carrierwave/storage/file'
require 'carrierwave/storage/fog'

CarrierWave.configure do |config|
  config.storage = :fog
  config.fog_provider = 'fog/aws'
  config.fog_credentiale = {
    provider: 'AWS',
    aws_access_key_id: Rails.application.secretes.aws_access_key_id,
    aws_secret_access_key: Rails.application.secrets.aws_secret_access_key,
    region: 'ap-northeast-1'
  }

  config.fog_directory = 'hasegawa--test'
  config.asset_host = 'https://ap-northeast-1.amazonaws.com/hasegawa--test'
end