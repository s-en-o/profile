-- Pull in the wezterm API
local wezterm = require("wezterm")                                                                                             
-- This will hold the configuration.
local config = wezterm.config_builder()

-- This is where you actually apply your config choices

-- For example, changing the color scheme:
config.color_scheme = "Catppuccin Mocha (Gogh)"
config.automatically_reload_config = true
config.enable_tab_bar = false
config.window_close_confirmation = "NeverPrompt"
config.window_decorations = "RESIZE"
config.font = wezterm.font("JetBrainsMono Nerd Font", { weight = "Bold" })
config.font_size = 16.0

config.window_padding = {
        left = 3,
        right = 3,
        top = 3,
        bottom = 3,
}
config.background = {
        {
                source = {
                        Color = "#282c35",
                },
                width = "100%",
                height = "100%",
                opacity = 0.9,
        },
}
-- from: https://akos.ma/blog/adopting-wezterm/
config.hyperlink_rules = {
        -- Matches: a URL in parens: (URL)
        {
                regex = "\\((\\w+://\\S+)\\)",
                format = "$1",
                highlight = 1,
        },
        -- Matches: a URL in brackets: [URL]
        {
                regex = "\\[(\\w+://\\S+)\\]",
                format = "$1",
                highlight = 1,
        },
        -- Matches: a URL in curly braces: {URL}
        {
                regex = "\\{(\\w+://\\S+)\\}",
                format = "$1",
                highlight = 1,
        },
        -- Matches: a URL in angle brackets: <URL>
        {
                regex = "<(\\w+://\\S+)>",
                format = "$1",
                highlight = 1,
        },
        -- Then handle URLs not wrapped in brackets
        {
                -- Before
                --regex = '\\b\\w+://\\S+[)/a-zA-Z0-9-]+',
                --format = '$0',
                -- After
                regex = "[^(]\\b(\\w+://\\S+[)/a-zA-Z0-9-]+)",
                format = "$1",
                highlight = 1,
        },
        -- implicit mailto link
        {
                regex = "\\b\\w+@[\\w-]+(\\.[\\w-]+)+\\b",
                format = "mailto:$0",
        },
}
-- and finally, return the configuration to wezterm
return config
