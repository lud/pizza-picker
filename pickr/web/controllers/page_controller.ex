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
    debug_expand_steps: [],
    # traits
    climate: nil,
    landstyle: nil,
    outland: false,
    biome: nil
  ]
  def from_cell(cell = %{x: x, y: y}), do: %Region{x: x, y: y, width: 1, height: 1, debug_creation_cell: cell}

  def expand(r = %Region{debug_expand_steps: steps}, side) do
    expand_shape(%{r | debug_expand_steps: [side|steps]}, side)
  end
  defp expand_shape(r = %Region{y: y, height: h}, :top),    do: %{r | y: y - 1, height: h + 1}
  defp expand_shape(r = %Region{height: h}, :bottom), do: %{r | height: h + 1}
  defp expand_shape(r = %Region{x: x, width:  w}, :left),   do: %{r | x: x - 1, width: w + 1}
  defp expand_shape(r = %Region{width:  w}, :right),  do: %{r | width: w + 1}

  def longer_side(%Region{width: w, height: h}), do: Kernel.max(w, h)
  def shorter_side(%Region{width: w, height: h}), do: Kernel.min(w, h)

  def area(%Region{width: w, height: h}), do: w * h

  def cells(region = %Region{x: xmin, y: ymin, width: w, height: h}) do
    for x <- xmin..cell_xmax(region),
        y <- ymin..cell_ymax(region),
        into: %MapSet{},
        do: %{x: x, y: y}
  end

  def in_bounds?(r = %Region{x: reg_xmin, y: reg_ymin, width: w, height: h}, xmin, ymin, xmax, ymax) do
    # checks the outer bounds. so the region {1,1} with width = 1 and height = 1
    # fits in bounds 1,1,2,2
    reg_xmax = xmax(r)
    reg_ymax = ymax(r)
    is_in_bounds =
    # min region bound must fit in all bounds
    reg_xmin >= xmin && reg_xmin <= xmax &&
      reg_ymin >= ymin && reg_ymin <= ymax &&
    # max region bound must fit in all bounds
      reg_xmax >= xmin && reg_xmax <= xmax &&
      reg_ymax >= ymin && reg_ymax <= ymax
    is_in_bounds
  end

  def set_climate(r = %Region{}, :polar),     do: %{r | climate: :polar}
  def set_climate(r = %Region{}, :temperate), do: %{r | climate: :temperate}
  def set_climate(r = %Region{}, :tropical),  do: %{r | climate: :tropical}

  def set_outland(r = %Region{}, is_outland \\ true) when is_boolean(is_outland), do: %{r | outland: is_outland}

  # when outland, landstyle is just water
  def set_landstyle(r = %Region{climate: nil}, _), do: raise "You must set the climate first"
  def set_landstyle(r = %Region{}, landstyle) do
    set_biome(Map.put(r, :landstyle, landstyle))
  end

  def set_biome(r = %Region{climate: c, landstyle: l}) do
    set_biome(r, calc_biome(c, l))
  end

  def set_biome(r = %Region{}, biome) do
    %{r | biome: biome}
  end


  # some biomes are universal
  defp calc_biome(_,     :chasm),          do: :chasm
  defp calc_biome(_,     :volcano),        do: :volcano
  defp calc_biome(_,     :ocean),          do: :ocean
  defp calc_biome(_,     :lake),           do: :lake
  defp calc_biome(_,     :mountains),      do: :mountains

  defp calc_biome(:polar,     :desert),    do: :ice
  defp calc_biome(:polar,     :forest),    do: :taiga
  defp calc_biome(:polar,     :grassland), do: :tundra
  defp calc_biome(:polar,     :wetland),   do: :tundra # no iced wetlands so tundra too
  defp calc_biome(:temperate, :desert),    do: :mojave
  defp calc_biome(:temperate, :forest),    do: :woods
  defp calc_biome(:temperate, :grassland), do: :country
  defp calc_biome(:temperate, :wetland),   do: :swamp
  defp calc_biome(:tropical,  :desert),    do: :sahara
  defp calc_biome(:tropical,  :forest),    do: :jungle
  defp calc_biome(:tropical,  :grassland), do: :savana
  defp calc_biome(:tropical,  :wetland),   do: :mangrove

  # if x = 5 and width = 2 then we have cells where x = 5 and we have cells
  # where x = 6. So, 6 = (5 + 2 - 1). cell_xmax and cell_ymax retuns the
  # maximum *origin* coordinates of the cells. so, 1 unit less thant the real
  # geographic maximum (the cell {1,1} has {2,2} as maximum geographic
  # coordinates (actually 1.999999999999999999999999999999999...))
  defp cell_xmax(%Region{x: x, width: w}), do: x + w - 1
  defp cell_ymax(%Region{y: y, height: h}), do: y + h - 1

  # geo corrdinates. So if region is {1,1, width 1, height 1},
  # xmax and ymax = 2
  defp xmax(%Region{x: x, width: w}), do: x + w
  defp ymax(%Region{y: y, height: h}), do: y + h
end
















defmodule LandGrid do
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
  # associer des propriétés (landstyle, slots, etc.). Pour les régions de taille
  # inférieure à un certain seuil (petit côté / grande côté / surface ?) -
  # typiquement les régions d'une seule cellule - on aura un landstyle non
  # habitable.

  @square 32

  @default_width  @square
  @default_height @square

  @all_expand_sides [:top,:bottom,:left,:right]

  defstruct [
    freecells: MapSet.new,
    regions: [],
    width: @default_width,
    height: @default_height,
    max_reg_side: 5,
    max_reg_area: 20,
    max_reg_ratio: 999 # if X, width cannot be (X + 1) times longer than height, and height than width
  ]

  @type t :: %LandGrid{}




  defp new(width, height) do
    freecells = for x <- 0..(width - 1),
                    y <- 0..(height - 1),
                    # into: %MapSet{},
                    do: %{x: x, y: y}
    freecells = MapSet.new(freecells)
    # IO.inspect(freecells)
    _world = %LandGrid{width: width, height: height, freecells: freecells}
  end

  def random_grid(options) do
    regions_amount = Keyword.get(options, :regions_amount, :fill)
    width = Keyword.get(options, :width, @default_width)
    height = Keyword.get(options, :height, @default_height)
    :rand.seed(:exsplus, {1,System.system_time,System.monotonic_time})
    # :rand.seed(:exsplus, {1,2,3}) # externalize seed
    {:ok, landmap} = new(width, height) |> add_random_regions(regions_amount)
    landmap
    |> reverse_regions # for debugging, reorder with creation order
    |> Map.put(:freecells, nil) # remove freecells info
  end

  defp reverse_regions(world = %LandGrid{regions: regions}) do
    %{world | regions: Enum.reverse(regions)}
  end

  defp insert_region(world = %LandGrid{freecells: freecells, regions: regions}, region = %Region{}) do
    {:ok, new_freecells} = region_fits(world, region)
    region2 = %{region | debug_expand_steps: Enum.reverse(region.debug_expand_steps)}
    %{world | freecells: new_freecells, regions: [region2|regions]}
  end

  # @doc region_fits returns {:error, reason} or {:ok, new_freecells} where
  # new_freecells is the list of cells without those used by region
  defp region_fits(world = %LandGrid{freecells: freecells}, region = %Region{}) do
    with :ok <- ensure(accept_max_side?(world, region), :max_region_dimensions),
         :ok <- ensure(accept_max_area?(world, region), :max_region_dimensions),
         :ok <- ensure(accept_max_ratio?(world, region), :max_region_dimensions),
         regcells = Region.cells(region),
         :ok <- ensure(Region.in_bounds?(region, 0, 0, world.width, world.height), :out_of_bounds),
         :ok <- ensure(cells_free?(world, regcells), :cells_not_free),
      do: {:ok, MapSet.difference(freecells, regcells)}
  end

  defp accept_max_side?(%LandGrid{max_reg_side: max_reg_side}, region) do
    Region.longer_side(region) <= max_reg_side
  end

  defp accept_max_area?(%LandGrid{max_reg_area: max_reg_area}, region) do
    Region.area(region) <= max_reg_area
  end

  defp accept_max_ratio?(%LandGrid{max_reg_ratio: max_reg_ratio}, %Region{width: w, height: h}) do
    {min_side, max_side} = if(w < h, do: {w, h}, else: {h, w})
    ratio = max_side / min_side
    ratio <= max_reg_ratio
  end

  defp cells_free?(%LandGrid{freecells: freecells}, cells) do
    MapSet.subset?(cells, freecells)
  end

  @spec add_random_regions(LandGrid.t, regions_to_add :: :fill | Integer) :: {:ok, LandGrid.t}

  defp add_random_regions(world = %LandGrid{}, 0) do
    # No more regions to add, return the world
    # IO.puts "No more space"
    {:ok, world}
  end
  defp add_random_regions(world = %LandGrid{freecells: freecells}, :fill) do
    # No more free cells but we want to fill so it's ok
    if MapSet.size(freecells) === 0 do
      {:ok, world}
    else
      # add another region and loop
      {:ok, new_world} = add_random_regions(world, 1)
      add_random_regions(new_world, :fill)
    end
  end

  defp add_random_regions(%LandGrid{freecells: []}, n) when is_number(n),
    # No more free cells but we want to add <n> more regions
    do: {:error, :no_more_space}

  # Add one region then recurse with n-1
  defp add_random_regions(world = %LandGrid{}, n) when is_number(n) do
    case add_rnd_region(world) do
      {:ok, new_world} ->
        add_random_regions(new_world, n - 1)
      err -> err
    end
  end

  defp add_rnd_region(world = %LandGrid{freecells: freecells}) do
    # a 1-cell region created from a free cell always fits
    # IO.puts "\nAdding random region"
    # Choosing a random cell
    cell = Enum.random(freecells)
    region = Region.from_cell(cell)
    expand_region_or_insert(world, region, expand_sides_list())
  end

  defp expand_sides_list() do
    # Use of the process dictionnary is quite bad but osef
    [a,b,c,d] = Process.get(:cache_last_sides_list, @all_expand_sides)
    next = [b,c,d,a] # just rotate the list to the left
    Process.put(:cache_last_sides_list, next)
    next
  end

  defp expand_region_or_insert(world, fitting_region, other_expand_sides = []) do
    # IO.puts "no more side to expand, return"
    {:ok, insert_region(world, fitting_region)}
  end
  defp expand_region_or_insert(world, fitting_region, [side|other_expand_sides]) do
    # IO.puts "try to expand [#{side}]"
    # we try to expand the region and fit it. if it fits, we keep the new
    # expanded region and recurse to expand more. If it doesn't fit because we
    # are to max size, we insert the prev region (the one that fits) to the
    # world and we return the world. If it doesn't fit because cells are not
    # free, we try on another side
    expanded_region = Region.expand(fitting_region, side)
    case region_fits(world, expanded_region) do
      # region has maximum size :
      {:error, :max_region_dimensions} ->
        # IO.puts "max region size reached, return"
        {:ok, insert_region(world, fitting_region)}
      # doesn't fit, try another side :
      {:error, reason} when reason === :out_of_bounds or reason === :cells_not_free ->
        # Trying other sides or abandon ?
        # IO.puts "could not expand this side, try other side"
        expand_region_or_insert(
          world, fitting_region, other_expand_sides
        )
      # fits, try to expand more :
      {:ok, _} ->
        # IO.puts "expanded, try other side"
        # we keep the succesful side at the end of the list
        # '++' is slow but the list is only 4 elems
        expand_region_or_insert(
          world, expanded_region, other_expand_sides ++ [side]
        )
    end
  end

  defp ensure(true, _), do: :ok
  defp ensure(false, reason), do: {:error, reason}


end





defmodule LandMap do

  @default_climate_band_height 30
  @default_outland_landstyle :ocean

  defstruct [
    regions: nil,
    width: nil,
    height: nil,
  ]

  def random_map(options \\ []) do
    # @todo each function walk the regions list. We should walk only once and
    # put all the traits at once for each region.
    LandGrid.random_grid(options)
    |> grid_to_map
    |> set_outland_traits
    |> set_latitude_traits(options)
    |> set_regions_landstyles(options)
  end

  defp grid_to_map(%{regions: regions, width: width, height: height}) do
    %LandMap{regions: regions, width: width, height: height}
  end

  defp set_outland_traits(landmap = %LandMap{regions: regions, width: width, height: height}) do
    # remove every region touching the borders of the grid
    # @todo put this function into the grid generator module ?
    calc_outland = fn(region) ->
      if region.x === 0
         || region.y === 0
         || region.x + region.width === width
         || region.y + region.height === height
      do
        Region.set_outland(region)
      else
        region
      end
    end
    Map.put(landmap, :regions, Enum.map(regions, calc_outland))
  end
  defp set_latitude_traits(landmap = %LandMap{height: height, regions: regions}, options) do
    # Split the map in 3 parts, 1 north, 1 south, and the middle north and south
    # parts take <special_zone_height> precent  hight each. Every region contained (entirely) in one of
    # this zones will get the spec :polar or :tropical
    special_zone_height = Keyword.get(options, :special_zone_height, @default_climate_band_height)
    hemisphere = Keyword.get(options, :hemisphere, :north)
    {north_trait, south_trait} = case hemisphere do
      :north -> {:polar, :tropical}
      :south -> {:tropical, :polar}
    end
    north_cap = height * special_zone_height / 100
    south_cap = height * (100 - special_zone_height) / 100
    set_latitude_trait = fn(region) ->
      is_north = Region.in_bounds?(region, -999999, 0, 999999, north_cap)
      is_south = Region.in_bounds?(region, -999999, south_cap, 999999, height)
      Region.set_climate(region, cond do
        is_north -> north_trait
        is_south -> south_trait
        true ->     :temperate
      end)
    end
    Map.put(landmap, :regions, Enum.map(regions, set_latitude_trait))
  end

  defp set_regions_landstyles(landmap = %LandMap{regions: regions}, options) do
    Map.put(landmap, :regions, Enum.map(regions, &(set_region_landstyle(&1, options))))
  end

  defp set_region_landstyle(region, options) do
    # landstyles are types of vegetation / animals / resources but the final result
    # depend of the latitude trait : if the landstyle is forest and the trait
    # tropical is true, then the actual look & resources will correspond to a
    # jungle. If the landstyle is desert and the polar trait is true, il will be
    # just flat ice.

    # if region has a side of 1 lenght, it has chances to be a lake or a
    # mountain.
    landstyles_pool =
      case {Region.shorter_side(region), Region.area(region), region.outland} do
        # outland have a specific landstyle :
        {_, _, true} -> [Keyword.get(options, :outland_landstyle, @default_outland_landstyle)]
        # 1x1 regions :
        {_, 1, _} -> [:volcano, :chasm]
        # regions with a side of 1 (2x mountains, 2x lakes)
        {1, _, _} -> [:forest, :wetland, :mountains, :mountains, :lake, :lake]
        # all other regions
        {_, _, _} -> [:forest, :desert, :wetland, :grassland]
      end
    Region.set_landstyle(region, Enum.random(landstyles_pool))
  end

end












defmodule Pickr.PageController do
  use Pickr.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end


  def generate_map(conn, _params) do
    map = LandMap.random_map
    IO.puts "output map = #{inspect map}"
    render conn, "map.html", map: LandMap.random_map
  end

end
