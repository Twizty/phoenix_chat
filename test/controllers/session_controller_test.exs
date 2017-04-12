defmodule Chat.SessionControllerTest do
  use Chat.ConnCase

  import Chat.GuardianLoginHelper

  alias Chat.User

  test "handshake returns 200 and user if user signed in" do
    user = Repo.insert! %User{name: "Foo", encrypted_password: "bar"}
    conn = guardian_login(user)
    resp = get conn, session_path(conn, :handshake)
    assert resp.status == 200

    parsed_resp = Poison.Parser.parse!(resp.resp_body)["currentUser"]
    assert parsed_resp["name"] == "Foo"
  end

  test "handshake returns 401 if user not signed in", %{conn: conn} do
    resp = get conn, session_path(conn, :handshake)
    assert resp.status == 401
  end

  test "signs user in if data is valid", %{conn: conn} do
    Chat.CreateUserService.perform(%{ "name" => "Foo", "password" => "123", "password_confirmation" => "123" })

    resp = post conn, session_path(conn, :sign_in, name: "Foo", password: "123")
    assert resp.status == 200

    parsed_resp = Poison.Parser.parse!(resp.resp_body)["currentUser"]
    assert parsed_resp["name"] == "Foo"
  end

  test "does not sign user in if data is invalid", %{conn: conn} do
    resp = post conn, session_path(conn, :sign_in, name: "Foo", password: "123")
    assert resp.status == 404

    parsed_resp = Poison.Parser.parse!(resp.resp_body)["error"]
    assert parsed_resp == "Couldn't find a user"
  end


  test "returns 404 if user already signed in" do
    user = Repo.insert! %User{name: "Foo", encrypted_password: "bar"}
    conn = guardian_login(user)

    resp = post conn, session_path(conn, :sign_in, name: "Foo", password: "123")
    assert resp.status == 404
    assert resp.resp_body == ""
  end

  test "signs out user if user logged in" do
    user = Repo.insert! %User{name: "Foo", encrypted_password: "bar"}
    conn = guardian_login(user)
    resp = delete conn, session_path(conn, :sign_out)

    assert resp.status == 201
    assert resp.resp_body == ""
  end

  test "returns 404 if user not signed in and tries to sign out", %{conn: conn} do
    resp = delete conn, session_path(conn, :sign_out)
    assert resp.status == 404
    assert resp.resp_body == ""
  end
end