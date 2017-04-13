defmodule Chat.RoomControllerTest do
  use Chat.ConnCase
  import Chat.GuardianLoginHelper

  import Chat.Router.Helpers

  alias Chat.Room
  alias Chat.User
  alias Chat.Message

  test "raises 401 if user not logged in", %{conn: conn} do
    resp = get conn, room_path(conn, :show, "foo")
    assert resp.status == 401
  end

  test "filters existing rooms" do
    user = Repo.insert! %User{name: "Foo", encrypted_password: "bar"}
    conn = guardian_login(user)

    Repo.insert! %Room{name: "Test1"}
    Repo.insert! %Room{name: "Test2"}
    Repo.insert! %Room{name: "foo"}

    resp = get conn, room_path(conn, :index, name: "test")
    assert resp.status == 200

    parsed_response = Poison.Parser.parse!(resp.resp_body)["rooms"]
    assert Enum.member?(parsed_response, %{"name" => "Test1"})
    assert Enum.member?(parsed_response, %{"name" => "Test2"})
    refute Enum.member?(parsed_response, %{"name" => "foo"})
  end

  test "creates room if it does not exist" do
    query = from r in Room, where: r.name == "foo"
    user = Repo.insert! %User{name: "Foo", encrypted_password: "bar"}
    conn = guardian_login(user)
    prev_count = Repo.aggregate(query, :count, :id)
    assert prev_count == 0

    get conn, room_path(conn, :show, "foo")
    next_count = Repo.aggregate(query, :count, :id)
    assert next_count == 1
  end

  test "fetches last 30 messages" do
    room = Repo.insert! %Room{name: "foo"}
    user = Repo.insert! %User{name: "Foo", encrypted_password: "bar"}
    conn = guardian_login(user)

    message = Repo.insert! %Message{user_id: user.id, room_id: room.id, body: "Foo 0"}
    messages = create_messages(30, user, room)

    resp = get conn, room_path(conn, :show, "foo")
    parsed_response = Poison.Parser.parse!(resp.resp_body)["messages"]

    refute Enum.member?(parsed_response, %{"author" => user.name, "body" => message.body, "id" => message.id})
    assert length(parsed_response) == 30
    Enum.map(messages, fn e ->
      assert Enum.member?(parsed_response, %{"author" => user.name, "body" => e.body, "id" => e.id  })
    end)
  end

  test "fetches last 30 messages when last id is given" do
    room = Repo.insert! %Room{name: "foo"}
    user = Repo.insert! %User{name: "Foo", encrypted_password: "bar"}
    conn = guardian_login(user)

    messages = create_messages(30, user, room)
    message = Repo.insert! %Message{user_id: user.id, room_id: room.id, body: "Foo 31"}

    resp = get conn, room_path(conn, :show, "foo", last_message_id: message.id)
    parsed_response = Poison.Parser.parse!(resp.resp_body)["messages"]

    refute Enum.member?(parsed_response, %{"author" => user.name, "body" => message.body, "id" => message.id})
    assert length(parsed_response) == 30
    Enum.map(messages, fn e ->
      assert Enum.member?(parsed_response, %{"author" => user.name, "body" => e.body, "id" => e.id})
    end)
  end

  def create_messages(count, user, room) do
    Enum.to_list(1..(count))
    |> Enum.map(fn e -> Repo.insert! %Message{user_id: user.id, room_id: room.id, body: "Foo #{e}"} end)
  end
end
