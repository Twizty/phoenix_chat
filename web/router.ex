defmodule Chat.Router do
  use Chat.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
    plug Guardian.Plug.VerifySession
    plug Guardian.Plug.LoadResource
  end

  scope "/", Chat do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/register", PageController, :index
    get "/:name", PageController, :index
    get "/chat/:name", PageController, :index
  end

  # Other scopes may use custom stacks.
   scope "/api", Chat do
     pipe_through :api
     post "/sign_in", SessionController, :sign_in
     delete "/sign_out", SessionController, :sign_out
     get "/handshake", SessionController, :handshake
     post "/register", UserController, :create
     get "/rooms/:name", RoomController, :show
     get "/rooms", RoomController, :index
     post "/:name/messages", MessagesController, :create
   end
end
