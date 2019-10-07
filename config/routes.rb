Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resources :groups, only: [:new, :create, :edit, :update, :index, :search] do

    resources :messages, only: [:index, :create]
  end
  resources :users, only: [:index, :edit, :update]
end