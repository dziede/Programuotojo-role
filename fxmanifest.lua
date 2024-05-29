
fx_version 'cerulean'
games {'gta5'}
lua54 'yes'

author 'arnas'
description 'arnas modern notify'
version '1.2'

ui_page 'web/index.html'

client_scripts {
    'client/*.lua',
}

shared_scripts {
    'config.lua'
}


escrow_ignore {
    'config.lua'
}

files {
    'web/*.html',
    'web/*.css',
    'web/*.mp3',
    'web/*.js'
}
