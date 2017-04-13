defmodule Chat.UserControllerTest do
  use Chat.ConnCase

  alias Chat.User

  test "creates user when params are valid", %{conn: conn} do
    user_params = %{"user" => %{"name" => "Foo", "password" => "123", "password_confirmation" => "123"}}
    query = from r in User, where: r.name == "Foo"
    prev_count = Repo.aggregate(query, :count, :id)
    assert prev_count == 0

    resp = post conn, user_path(conn, :create, user_params)
    assert resp.status == 201

    next_count = Repo.aggregate(query, :count, :id)
    assert next_count == 1
  end

  test "raises bad request when user with the same name exists", %{conn: conn} do
    query = from r in User, where: r.name == "Foo"
    Repo.insert! %User{name: "Foo", encrypted_password: "bar"}
    prev_count = Repo.aggregate(query, :count, :id)
    user_params = %{"user" => %{"name" => "Foo", "password" => "123", "password_confirmation" => "123"}}

    resp = post conn, user_path(conn, :create, user_params)
    assert resp.status == 400

    next_count = Repo.aggregate(query, :count, :id)
    assert next_count == prev_count

    parsed_response = Poison.Parser.parse!(resp.resp_body)["errors"]
    assert parsed_response["name"] == "has already been taken"
  end

  test "raises bad request when password not equal password_confirmation", %{conn: conn} do
    query = from r in User, where: r.name == "Foo"
    prev_count = Repo.aggregate(query, :count, :id)
    user_params = %{"user" => %{"name" => "Foo", "password" => "123", "password_confirmation" => "1234"}}

    resp = post conn, user_path(conn, :create, user_params)
    assert resp.status == 400

    next_count = Repo.aggregate(query, :count, :id)
    assert next_count == prev_count

    parsed_response = Poison.Parser.parse!(resp.resp_body)["errors"]
    assert parsed_response["passwords"] == "does not match"
  end

  test "raises bad request when name is empty", %{conn: conn} do
    user_params = %{"user" => %{"name" => "", "password" => "123", "password_confirmation" => "123"}}
    query = from r in User
    prev_count = Repo.aggregate(query, :count, :id)
    assert prev_count == 0

    resp = post conn, user_path(conn, :create, user_params)
    assert resp.status == 400

    next_count = Repo.aggregate(query, :count, :id)
    assert next_count == prev_count

    parsed_response = Poison.Parser.parse!(resp.resp_body)["errors"]
    assert parsed_response["name"] == "can't be blank"
  end
end
