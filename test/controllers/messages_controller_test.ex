defmodule Chat.MessagesControllerTest do
  use Chat.ConnCase
  import Chat.GuardianLoginHelper

  import Chat.Router.Helpers

  alias Chat.Room
  alias Chat.User
  alias Chat.Message

  test "returns 401 if user not signed in", %{conn: conn} do
    resp = post conn, messages_path(conn, :create, "foo")
    assert resp.status == 401
  end

  test "creates message if everything is valid" do
    user = Repo.insert! %User{name: "Foo", encrypted_password: "bar"}
    room = Repo.insert! %Room{name: "foo"}
    conn = guardian_login(user)
    query = from r in Message, where: r.user_id == ^user.id

    prev_count = Repo.aggregate(query, :count, :id)
    assert prev_count == 0

    resp = post conn, messages_path(conn, :create, "foo", body: "bar")
    assert resp.status == 201

    next_count = Repo.aggregate(query, :count, :id)
    assert next_count == 1

    last_message = Repo.one(from m in Message, order_by: [desc: m.id], limit: 1)
    assert last_message.user_id == user.id
    assert last_message.body == "bar"
    assert last_message.room_id == room.id
  end

  test "creates room if it does not exist" do
    user = Repo.insert! %User{name: "Foo", encrypted_password: "bar"}
    conn = guardian_login(user)
    query_messages = from r in Message, where: r.user_id == ^user.id
    query_rooms = from r in Room, where: r.name == "foo"

    prev_messages_count = Repo.aggregate(query_messages, :count, :id)
    assert prev_messages_count == 0

    prev_rooms_count = Repo.aggregate(query_rooms, :count, :id)
    assert prev_rooms_count == 0

    resp = post conn, messages_path(conn, :create, "foo", body: "bar")
    assert resp.status == 201

    next_messages_count = Repo.aggregate(query_messages, :count, :id)
    assert next_messages_count == 1

    next_rooms_count = Repo.aggregate(query_rooms, :count, :id)
    assert next_rooms_count == 1

    last_room = Repo.one(from r in Room, order_by: [desc: r.id], limit: 1)
    assert last_room.name == "foo"

    last_message = Repo.one(from m in Message, order_by: [desc: m.id], limit: 1)
    assert last_message.user_id == user.id
    assert last_message.body == "bar"
    assert last_message.room_id == last_room.id
  end

  test "returns 400 if body is empty" do
    user = Repo.insert! %User{name: "Foo", encrypted_password: "bar"}
    conn = guardian_login(user)

    resp = post conn, messages_path(conn, :create, "foo", body: "")
    assert resp.status == 400

    parsed_response = Poison.Parser.parse!(resp.resp_body)["errors"]
    assert parsed_response["body"] == "can't be blank"
  end
end