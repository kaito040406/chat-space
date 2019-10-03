Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resources :groups, only: [:edit,:new, :create, :update, :index] do
    resources :messages, only: [:index, :create]
  end
  resources :users, only: [:index, :edit, :update]
end