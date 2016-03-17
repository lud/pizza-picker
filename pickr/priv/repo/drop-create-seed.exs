# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Pickr.Repo.insert!(%Pickr.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Pickr.Ingredient
alias Pickr.Repo

defmodule Seeder do
	def add_ingredient(attrs) do
		changeset = Ingredient.changeset(%Ingredient{}, attrs)
		Repo.insert!(changeset)
	end
end

Mix.Task.run "ecto.drop"
Mix.Task.run "ecto.create"
Mix.Task.run "ecto.migrate"

Seeder.add_ingredient(%{name_fr: "Anchois"})
Seeder.add_ingredient(%{name_fr: "Artichauts"})
Seeder.add_ingredient(%{name_fr: "Aubergines rôties"})
Seeder.add_ingredient(%{name_fr: "Aubergines"})
Seeder.add_ingredient(%{name_fr: "Basilic frais"})
Seeder.add_ingredient(%{name_fr: "Champignons",   list_priority: 1})
Seeder.add_ingredient(%{name_fr: "Chèvre"})
Seeder.add_ingredient(%{name_fr: "Crème fraîche", list_priority: 2})
Seeder.add_ingredient(%{name_fr: "Câpres"})
Seeder.add_ingredient(%{name_fr: "Emmental"})
Seeder.add_ingredient(%{name_fr: "Friarielli (brocoli-rave)"})
Seeder.add_ingredient(%{name_fr: "Gorgonzola"})
Seeder.add_ingredient(%{name_fr: "Gésiers"})
Seeder.add_ingredient(%{name_fr: "Huile aromatisée"})
Seeder.add_ingredient(%{name_fr: "Huile basilic"})
Seeder.add_ingredient(%{name_fr: "Jambon",        list_priority: 1})
Seeder.add_ingredient(%{name_fr: "Lardons"})
Seeder.add_ingredient(%{name_fr: "Miel"})
Seeder.add_ingredient(%{name_fr: "Mozzarella",    list_priority: 1})
Seeder.add_ingredient(%{name_fr: "Noix"})
Seeder.add_ingredient(%{name_fr: "Oignons"})
Seeder.add_ingredient(%{name_fr: "Olives",        list_priority: 1})
Seeder.add_ingredient(%{name_fr: "Origan",        list_priority: 1})
Seeder.add_ingredient(%{name_fr: "Parmigiano (parmesan)"})
Seeder.add_ingredient(%{name_fr: "Persillade"})
Seeder.add_ingredient(%{name_fr: "Poivrons rôtis"})
Seeder.add_ingredient(%{name_fr: "Poivrons"})
Seeder.add_ingredient(%{name_fr: "Radicchio (salade rouge)"})
Seeder.add_ingredient(%{name_fr: "Ricotta"})
Seeder.add_ingredient(%{name_fr: "Roquefort"})
Seeder.add_ingredient(%{name_fr: "Roquette"})
Seeder.add_ingredient(%{name_fr: "Sauce basilic"})
Seeder.add_ingredient(%{name_fr: "Saucisse"})
Seeder.add_ingredient(%{name_fr: "Saumon"})
Seeder.add_ingredient(%{name_fr: "Scamorza (fromage fumé à pâte filée)"})
Seeder.add_ingredient(%{name_fr: "Speck"})
Seeder.add_ingredient(%{name_fr: "Spianata calabrese (charcuterie calabraise pimentée)"})
Seeder.add_ingredient(%{name_fr: "Thon"})
Seeder.add_ingredient(%{name_fr: "Tomate",        list_priority: 3})
Seeder.add_ingredient(%{name_fr: "Tomates fraîches"})

require Ecto.Query
import Ecto.Query

Ingredient
	|> select([ing], {ing.id, ing.name_fr, ing.list_priority})
	|> order_by([desc: :list_priority, asc: :name_fr])
	|> Repo.all
	|> Enum.map(fn({id, name_fr, list_priority}) -> %{
		"id" => id,
		"name_fr" => name_fr,
		"prio" => list_priority
	} end)
	|> Table.table
	|> IO.puts
