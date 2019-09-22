Rails.application.routes.draw do

  # FIRST IN LAST OUT
  
  post '/auth/login', to: 'authentication#login'
  resources :users do
    resources :matches
  end
  get '/matches/random', to: 'matches#random'
  resources :matches

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
