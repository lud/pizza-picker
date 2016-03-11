defmodule Pickr.PageController do
  use Pickr.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
