Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resources :groups, only: [:new, :create, :edit, :update, :index, :search] do
    resources :messages, only: [:index, :create]

    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }
    end
  end
  namespace :api do
    resources :groups, only: :index, defaults: { format: 'json' }
  end
end
