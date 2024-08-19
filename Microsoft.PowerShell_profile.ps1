#OH MY POSH
oh-my-posh init pwsh --config 'https://raw.githubusercontent.com/JanDeDobbeleer/oh-my-posh/main/themes/multiverse-neon.omp.json' | Invoke-Expression

# ALIASES
function Get-GitPush { & git push }
New-Alias -Name "gpss" Get-GitPush
function Get-GitPull { & git pull }
New-Alias -Name "gpl" Get-GitPull
function Get-GitStatus { & git status }
New-Alias -Name "gst" Get-GitStatus
function Get-GitCommit { & git commit -m $args }
New-Alias -Name "gcmm" Get-GitCommit
function Get-GitAdd { & git add $args }
New-Alias -Name "ga" Get-GitAdd
function Get-GitCheckout { & git checkout $args }
New-Alias -Name "gch" Get-GitCheckout
function Get-YarnDev { & yarn dev }
New-Alias -Name "yd" Get-YarnDev
function Get-GitUserEmail { & git config --local user.email $args }
New-Alias -Name "gue" Get-GitUserEmail
function Get-GitUserName { & git config --local user.name $args }
New-Alias -Name "gun" Get-GitUserName
