defmodule Chat.GuardianLoginHelper do
  use ExUnit.CaseTemplate
  use Phoenix.ConnTest
  @endpoint Chat.Endpoint

  def guardian_login(user, token \\ :token, opts \\ []) do
    build_conn
    |> bypass_through(Chat.Router, [:browser])
    |> get("/")
    |> Guardian.Plug.sign_in(user, token, opts)
    |> send_resp(200, "")
    |> recycle()
  end
end