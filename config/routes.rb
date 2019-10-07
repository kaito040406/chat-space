Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update, :index, :search] do
    resources :messages, only: [:index, :create]

    namespace :api do
      resource :messages, only: :index, defaults: { format: 'json' }
  end
end