use Mix.Config

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with brunch.io to recompile .js and .css sources.
config :pickr, Pickr.Endpoint,
  http: [port: 4000],
  debug_errors: true,
  code_reloader: true,
  check_origin: false,
  watchers: [node: ["node_modules/webpack/bin/webpack.js", "--watch", "--color"]]

# Watch static and templates for browser reloading.
config :pickr, Pickr.Endpoint,
  live_reload: [
    patterns: [
      ~r{priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$},
      ~r{priv/gettext/.*(po)$},
      ~r{web/views/.*(ex)$},
      ~r{web/templates/.*(eex)$}
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development.
# Do not configure such in production as keeping
# and calculating stacktraces is usually expensive.
config :phoenix, :stacktrace_depth, 20

config :guardian, Guardian,
  issuer: "Pickr",
  ttl: { 30, :days },
  serializer: Pickr.GuardianSerializer

# Configure your database
# see secret


import_config "dev.secret.exs"

# # Sample secret
#
# config :pickr, Pickr.Repo,
#   adapter: Ecto.Adapters.Postgres,
#   username: "pickr_dev",
#   password: "pickr_dev",
#   database: "pickr_dev",
#   pool_size: 5


# config :guardian, Guardian,
#   secret_key: "some secret key"
