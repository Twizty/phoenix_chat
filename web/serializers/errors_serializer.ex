defmodule Chat.ErrorsSerializer do

  def serialize(errs) do
    %{
      errors: Enum.into(errs, %{}, fn {k, v} -> {k, elem(v, 0)} end)
    }
  end
  
end