defmodule LandMap do
  # https://bost.ocks.org/mike/algorithms/
  #

  # Algorithme pour générer une map de rectangles aléatoires.

  # On commence par générer une grille (width et height) et des tailles mini et
  # maxi pour les côtés des régions. On garde ensuite la liste des cellules
  # libres. On définit également un ordre d'élargissement, par exemple [haut,
  # bas, gauche, droite].
  #
  # Dans une boucle
  #   * On va sélectionner une cellule libre aléatoirement. Cela nous donne une
  #     région de width = 1 et height = 1 correspondant à la cellule.
  #   * On initialise une valeur max_try à 0.
  #   * On aggrandit ensuite la région par l'un de ses côtés sur toute la
  #     longueur du côté. Si par exemple on a un carré de 2 de côté, alors on
  #     ajoute 2 cellules sur un des côtés, par exemple sur le côté gauche. La
  #     largeur devient donc 3 :
  #       [ | ]        ->     [ | | ]
  #       [ | ]        ->     [ | | ]
  #   * On choisit ensuite un autre côté  et on continue. Si par exemple on
  #     pioche le côté bas :
  #       [ | | ]      ->      [ | | ]
  #       [ | | ]      ->      [ | | ]
  #                            [ | | ]
  #   * À chaque étape, on regarde si le nouveau rectangle généré rentre
  #     toujours dans de cellules libres uniquement, et s'il ne dépasse pas la
  #     taille de région autorisée.
  #     - Si la taille maximale est atteinte, on s'arrête et on garde le
  #       rectangle comme région.
  #     - Sinon si on mord sur des cellules non-libres, on garde le rectngle et
  #       on teste un autre côté. On augmente max_try de 1.
  #     - Si jamais max_try est à 4 on a essayé les quatres côtés depuis la
  #       forme courante et on n'a pas pu expand, on s'arrête là.
  #     - Sinon, on garde notre nouvelle forme, on remet max_try à 0 puisque on
  #       a réussi à changer de forme, et on boucle.
  #
  #   * On enregistre notre région et on met à jour la liste des cellules
  #     libres.
  #   * On passe à la suite de la boucle.
  #   * On s'arrête quand il n'y a plus de cellules libres.
  #
  # Il est ensuite nécessaire de faire une passe sur les régions pour leur
  # associer des propriétés (biome, slots, etc.). Pour les régions de taille
  # inférieure à un certain seuil (petit côté / grande côté / surface ?) -
  # typiquement les régions d'une seule cellule - on aura un biome non
  # habitable.

  @default_width 15
  @default_height 15

  defstruct [
    freecells: %{},
    regions: [],
    width: @default_width,
    height: @default_height
  ]

  def new(width \\ @default_width, height \\ @default_height) do
    freecells = for x <- 0..(width - 1),
        y <- 0..(height - 1),
        into: [] do
        {x, y}
    end
    world = %__MODULE__{width: width, height: height, freecells: freecells}
  end

  def random_map(list) do
    new |> add_random_regions(3) # @todo :fill
  end

  # this is a front function for seeding
  def add_random_regions(world = %__MODULE__{}, spec) do
    # @todo spec is a number or :fill
    :random.seed :erlang.monotonic_time
    seeded_add_random_regions(world, spec)
  end

  def generate_random_regions(0) do
  end

  def random_pick(list) do
    Enum.random(list)
  end

  def random_rect(min \\ 1, max \\ 4) do
    width = random(min, max)
    height = random(min, max)
    %{w: width, h: height}
  end

  def random(min, max) when min >= 1 do
    offset = min - 1
    max = max
    base = :random.uniform(max - offset) # in 1..(max - offset)
    base + offset
  end

  # randomized
  def next_expand_side(:right), do: :up
  def next_expand_side(:up), do: :down
  def next_expand_side(:down), do: :left
  def next_expand_side(:left), do: :right

end

defmodule Pickr.PageController do
  use Pickr.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end


  def generate_map(conn, _params) do
    render conn, "map.html", map: LandMap.random_map
  end

end
