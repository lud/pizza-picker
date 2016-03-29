ExUnit.start

Mix.Task.run "ecto.create", ~w(-r Pickr.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r Pickr.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(Pickr.Repo)

