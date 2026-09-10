#!/usr/bin/env jq -f

debug("Input is: \(.)")
| if type == "object" then ("cannot multiply object with number" | halt_error) end
| . * 2
