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
  #   * On initialise une liste de côtés possible à éendre à [haut, bas, gauche,
  #     droite] (shuffled)
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
  #     - Sinon si on mord sur des cellules non-libres, on garde le rectangle,
  #       on supprime le côté échoué de nos côtés étendables et on teste d'un
  #       autre côté.
  #     - Si jamais on a essayé les quatres côtés (liste des côtés étendables
  #       vides) depuis la forme courante et on n'a pas pu expand, on s'arrête
  #       là.
  #     - Sinon, on garde notre nouvelle forme, et on cherche à s'étendre d'un
  #       autre côté. (ou bien on shuffle ? @todo doc ?)
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

  @square 16

  @default_width @square
  @default_height @square
  @all_expand_sides [:top,:bottom,:left,:right]

  defstruct [
    freecells: MapSet.new,
    regions: [],
    width: @default_width,
    height: @default_height,
    max_reg_side: 3
  ]

  @type t :: %LandMap{}

  defmodule Region do
    @type t :: %Region{}
    # x & y are the orign corrdinates of the region rectangle. We work with SVG
    # in mind so when y' > y, y' is below on the map image. When expanding top,
    # we raise the height and LOWER the y coordinate. When expanding bottom, we
    # just raise the height.
    defstruct [
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      id: 0,
      debug_creation_cell: :nothing,
      debug_expand_steps: []
    ]
    def from_cell(cell = %{x: x, y: y}), do: %Region{x: x, y: y, width: 1, height: 1, debug_creation_cell: cell}

    def expand(r = %Region{debug_expand_steps: steps}, side) do
      expand_shape(%{r | debug_expand_steps: [side|steps]}, side)
    end
    defp expand_shape(r = %Region{y: y, height: h}, :top),    do: %{r | y: y - 1, height: h + 1}
    defp expand_shape(r = %Region{y: y, height: h}, :bottom), do: %{r | height: h + 1}
    defp expand_shape(r = %Region{x: x, width:  w}, :left),   do: %{r | x: x - 1, width: w + 1}
    defp expand_shape(r = %Region{x: x, width:  w}, :right),  do: %{r | width: w + 1}

    def longer_side(%Region{width: w, height: h}), do: Kernel.max(w, h)

    def cells(region = %Region{x: xmin, y: ymin, width: w, height: h}) do
      for x <- xmin..cell_xmax(region),
          y <- ymin..cell_ymax(region),
          into: %MapSet{},
          do: %{x: x, y: y}
    end

    def in_bounds?(r = %Region{x: reg_xmin, y: reg_ymin, width: w, height: h}, xmin, ymin, xmax, ymax) do
      reg_xmax = cell_xmax(r)
      reg_ymax = cell_ymax(r)
      is_in_bounds =
      # min region bound must fit in all bounds
      reg_xmin >= xmin && reg_xmin <= xmax &&
        reg_ymin >= ymin && reg_ymin <= ymax &&
      # max region bound must fit in all bounds
        reg_xmax >= xmin && reg_xmax <= xmax &&
        reg_ymax >= ymin && reg_ymax <= ymax
      is_in_bounds
    end

    # if x = 5 and width = 2 then we have cells where x = 5 and we have cells
    # where x = 6. So, 6 = (5 + 2 - 1). cell_xmax and cell_ymax retuns the
    # maximum *origin* coordinates of the cells. so, 1 unit less thant the real
    # geographic maximum (the cell {1,1} has {2,2} as maximum geographic
    # coordinates (actually 1.999999999999999999999999999999999...))
    defp cell_xmax(%Region{x: x, width: w}), do: x + w - 1
    defp cell_ymax(%Region{y: y, height: h}), do: y + h - 1
  end



  defp new(width \\ @default_width, height \\ @default_height) do
    freecells = for x <- 0..(width - 1),
                    y <- 0..(height - 1),
                    # into: %MapSet{},
                    do: %{x: x, y: y}
    freecells = MapSet.new(freecells)
    # IO.inspect(freecells)
    _world = %LandMap{width: width, height: height, freecells: freecells}
  end

  def random_map() do
    :rand.seed(:exsplus, {1,System.system_time,System.monotonic_time})
    {:ok, landmap} = new |> add_random_regions(:fill) # @todo :fill
    landmap |> reverse_regions
  end

  defp reverse_regions(world = %LandMap{regions: regions}) do
    %{world | regions: Enum.reverse(regions)}
  end

  defp insert_region(world = %LandMap{freecells: freecells, regions: regions}, region = %Region{}) do
    {:ok, new_freecells} = region_fits(world, region)
    region2 = %{region | debug_expand_steps: Enum.reverse(region.debug_expand_steps)}
    %{world | freecells: new_freecells, regions: [region2|regions]}
  end

  # @doc region_fits returns {:error, reason} or {:ok, new_freecells} where
  # new_freecells is the list of cells without those used by region
  defp region_fits(world = %LandMap{freecells: freecells}, region = %Region{}) do
    with :ok <- ensure(accept_max_side?(world, region), :max_side_size),
         regcells = Region.cells(region),
         :ok <- ensure(Region.in_bounds?(region, 0, 0, world.width - 1, world.height - 1), :out_of_bounds),
         :ok <- ensure(cells_free?(world, regcells), :cells_not_free),
      do: {:ok, MapSet.difference(freecells, regcells)}
  end

  defp accept_max_side?(%LandMap{max_reg_side: max_reg_side}, region) do
    Region.longer_side(region) <= max_reg_side
  end

  defp cells_free?(%LandMap{freecells: freecells}, cells) do
    MapSet.subset?(cells, freecells)
  end

  @spec add_random_regions(LandMap.t, regions_to_add :: :fill | Integer) :: LandMap.t

  defp add_random_regions(world = %LandMap{}, 0),
    # No more regions to add, return the world
    do: {:ok, world}
  defp add_random_regions(world = %LandMap{freecells: freecells}, :fill) do
    # No more free cells but we want to fill so it's ok
    if MapSet.size(freecells) === 0 do
      {:ok, world}
    else
      # add another region and loop
      {:ok, new_world} = add_random_regions(world, 1)
      add_random_regions(new_world, :fill)
    end
  end

  defp add_random_regions(%LandMap{freecells: []}, n) when is_number(n),
    # No more free cells but we want to add <n> more regions
    do: {:error, :no_more_space}

  # Add one region then recurse with n-1
  defp add_random_regions(world = %LandMap{}, n) when is_number(n) do
    case add_rnd_region(world) do
      {:ok, new_world} ->
        add_random_regions(new_world, n - 1)
      err -> err
    end
  end

  defp add_rnd_region(world = %LandMap{freecells: freecells}) do
    # a 1-cell region created from a free cell always fits
    IO.puts "\nAdding random region"
    # Choosing a random cell
    cell = Enum.random(freecells)
    # Or choosing a specific cell : here we try with the lowest x + y
    # cell = Enum.reduce(freecells, &choose_start_cell_closest_to_center/2)
    region = Region.from_cell(cell)
    expand_region_or_insert(world, region, expand_sides_list())
  end


  # defp choose_start_cell_closest_to_origin(a = %{x: xA, y: yA}, b = %{x: xB, y: yB})
  #   when xA + yA < xB + yB, do: a
  # defp choose_start_cell_closest_to_origin(a, b), do: b

  # defp choose_start_cell_biggest_xy_diff(a = %{x: xA, y: yA}, b = %{x: xB, y: yB})
  #   when abs(xA - yA) > abs(xB - yB), do: a
  # defp choose_start_cell_biggest_xy_diff(a, b), do: b

  # # use a global here. if map accepts dynamic square size, we'll have to use a
  # # fun generator
  # defp choose_start_cell_closest_to_center(a = %{x: xA, y: yA}, b = %{x: xB, y: yB}) do
  #   square_center = @square / 2
  #   dist_a = abs(square_center - xA) + abs(square_center - yA)
  #   dist_b = abs(square_center - xB) + abs(square_center - yB)
  #   if(dist_a < dist_b, do: a, else: b)
  # end

  defp expand_sides_list() do
    Enum.shuffle(@all_expand_sides)
    # Enum.drop(Enum.shuffle(@all_expand_sides), 1)
  end

  defp expand_region_or_insert(world, fitting_region, expand_sides = []) do
    IO.puts "no more side to expand, return"
    {:ok, insert_region(world, fitting_region)}
  end
  defp expand_region_or_insert(world, fitting_region, [side|expand_sides]) do
    IO.puts "try to expand [#{side}]"
    # we try to expand the region and fit it. if it fits, we keep the new
    # expanded region and recurse to expand more. If it doesn't fit because we
    # are to max size, we insert the prev region (the one that fits) to the
    # world and we return the world. If it doesn't fit because cells are not
    # free, we try on another side
    expanded_region = Region.expand(fitting_region, side)
    case region_fits(world, expanded_region) do
      # region has maximum size :
      {:error, :max_side_size} ->
        IO.puts "max region size reached, return"
        {:ok, insert_region(world, fitting_region)}
      # doesn't fit, try another side :
      {:error, reason} when reason === :out_of_bounds or reason === :cells_not_free ->
        IO.puts "could not expand this side, try other side"
        expand_region_or_insert(
          world, fitting_region, expand_sides
        )
      # fits, try to expand more :
      {:ok, _} ->
        IO.puts "expanded, try other side"
        # we keep the succesful side at the end of the list
        # '++' is slow but the list is only 4 elems
        expand_region_or_insert(
          world, expanded_region, expand_sides ++ [side]
        )
    end
  end

  defp ensure(true, _), do: :ok
  defp ensure(false, reason), do: {:error, reason}


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
